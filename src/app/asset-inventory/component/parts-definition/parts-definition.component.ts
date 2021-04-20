import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { PartsDefinitionUpdatePayload, PartsDefinitionItem, PartsMasterItem } from 'src/app/models/asset-inventoryModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { MatTableDataSource } from '@angular/material';
import { SubSink } from 'subsink';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-parts-definition',
  templateUrl: './parts-definition.component.html',
  styleUrls: ['./parts-definition.component.scss']
})
export class PartsDefinitionComponent implements OnInit, OnDestroy {
  @Input() Vehicle_Types$: Observable<DomainData[]>;
  @Input() partsDefinitions$: Observable<PartsDefinitionItem[]>;
  @Input() partsMasterList$: Observable<PartsMasterItem[]>;
  filteredPartsMasterList$: Observable<PartsMasterItem[]>;
  @Output() vehicleTypeChange = new EventEmitter<number>();
  @Output() partsDefinitionUpdate = new EventEmitter<PartsDefinitionUpdatePayload>();
  @Output() cancel = new EventEmitter();
  VehicleTypeForm: FormGroup;
  PartsDefinitionForm: FormGroup;
  partsDefinitionList: PartsDefinitionItem[] = [];
  private subs = new SubSink();

  displayedColumns: string[] = ["part_name", "part_short_code", "count", "action"];
  dataSource: MatTableDataSource<PartsDefinitionItem>;
  
  constructor(private fb: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.VehicleTypeForm = this.fb.group({
      vehicle_type_id: ["", [Validators.required]]
    })

    this.PartsDefinitionForm = this.fb.group({
      parts_master_id: ["", [Validators.required]],
      count: [null, [Validators.required, Ms3Validators.integer, Validators.min(1)]]
    })

    this.subs.add(this.partsDefinitions$.subscribe(
      definitions => {
        this.partsDefinitionList = JSON.parse(JSON.stringify(definitions));
        this.dataSource = new MatTableDataSource(this.partsDefinitionList);
        
        if(this.PartsDefinitionForm.dirty) {
          this.PartsDefinitionForm.reset();
        }

        this.filteredPartsMasterList$ = this.partsMasterList$.pipe(map(
          data => data.filter(m => this.partsDefinitionList.findIndex(partdef => partdef.parts_master_id == m.parts_master_id) == -1)
        ));
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  VehicleTypeChange(vehicle_type_id: number) {
    this.vehicleTypeChange.emit(vehicle_type_id);
  }

  Delete(parts_master_id: number) {
    this.partsDefinitionList.splice(this.partsDefinitionList.findIndex(m => m.parts_master_id == parts_master_id), 1);
    this.dataSource = new MatTableDataSource<PartsDefinitionItem>(this.partsDefinitionList);
    this.filteredPartsMasterList$ = this.partsMasterList$.pipe(map(
      data => data.filter(m => this.partsDefinitionList.findIndex(partdef => partdef.parts_master_id == m.parts_master_id) == -1)
    ));
  }

  AddPart() {
    var parts_master_id = +this.PartsDefinitionForm.controls.parts_master_id.value;
    this.partsMasterList$.pipe(take(1)).subscribe(
      parts => {
        var selectedPartMaster = parts.find(m => m.parts_master_id == parts_master_id);
        this.partsDefinitionList.push({
          parts_master_id: parts_master_id,
          count: +this.PartsDefinitionForm.controls.count.value,
          part_name: selectedPartMaster.part_name,
          part_short_code: selectedPartMaster.part_short_code
        })
        this.dataSource = new MatTableDataSource<PartsDefinitionItem>(this.partsDefinitionList);
        
        this.PartsDefinitionForm.reset();
        
        this.filteredPartsMasterList$ = this.filteredPartsMasterList$.pipe(map(
          partsMasters => partsMasters.filter(m => m.parts_master_id != parts_master_id)
        ))
      }
    )
  }

  Save() {
    this.partsDefinitionUpdate.emit({
      vehicle_type_id: this.VehicleTypeForm.controls.vehicle_type_id.value,
      parts_definitions: this.partsDefinitionList
    })
  }

  Cancel() {
    this.cancel.emit();
  }
}
