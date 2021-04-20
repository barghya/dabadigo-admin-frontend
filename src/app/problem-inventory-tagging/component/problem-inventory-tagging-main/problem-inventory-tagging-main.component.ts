import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProblemTaggedDetails, ProblemDetails, GetProblemByCodeService, AllPartsDetails, PartsDetails } from 'src/app/models/problem-inventory-taggingModel';
import { MatTableDataSource } from '@angular/material';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-problem-inventory-tagging-main',
  templateUrl: './problem-inventory-tagging-main.component.html',
  styleUrls: ['./problem-inventory-tagging-main.component.scss']
})
export class ProblemInventoryTaggingMainComponent implements OnInit, OnDestroy {

  @Input() Problemname$: Observable<ProblemDetails[]>;
  @Input() Parts$: Observable<AllPartsDetails[]>;
  filteredPartsList$: Observable<AllPartsDetails[]>;
  @Input() ProblemTaggedinventory$: Observable<ProblemTaggedDetails>;
  @Output() problemnameChangeEvent = new EventEmitter();
  @Output() updateProblemInventoryTaggingEvent = new EventEmitter<ProblemTaggedDetails>();
  ProblemNameForm: FormGroup;
  AddPartsForm: FormGroup;
  partsDetailList: PartsDetails[] = [];
  displayedColumns: string[] = ["part_name", "action"];
  dataSource: MatTableDataSource<ProblemTaggedDetails>;
  private subs = new SubSink();
  // problem_code: number;
  // display_desc: string;
  // severity: number;
  // map_to_image: number;
  //inventory_mapped: number;
  problemTaggedDetails: ProblemTaggedDetails;
  constructor( public languageService: LanguageService, private fb: FormBuilder, public store: Store<AppState> ) { }

  ngOnInit() {
    this.ProblemNameForm = this.fb.group({
      problem_name: ["", [Validators.required]]
    })
    this.AddPartsForm = this.fb.group({
      parts_details: ["", [Validators.required]]
    })
    this.subs.add(this.ProblemTaggedinventory$.subscribe(
      data => {
        if(!!data) {
          console.log(data);
          this.partsDetailList = JSON.parse(JSON.stringify(data.parts_details));
          console.log(this.partsDetailList);
          this.dataSource = new MatTableDataSource(this.partsDetailList);
          this.filteredPartsList$ = this.Parts$.pipe(map(
            data => data.filter(m => this.partsDetailList.findIndex(part_id => part_id.parts_master_id == m.parts_master_id) == -1)
          ));
        }
      }
    ))
  }

  ProblemNameChange(data: GetProblemByCodeService) {
    this.problemnameChangeEvent.emit(data);
  }

  AddPart() {
    var parts_master_id = +this.AddPartsForm.controls.parts_details.value;
    console.log("parts_master_id:",parts_master_id);
    var problem_code = +this.ProblemNameForm.controls.problem_name.value;
    console.log("problem_code:", problem_code);

    this.Parts$.pipe(take(1)).subscribe(
      parts => {
        var selectedPart = parts.find(m => m.parts_master_id == parts_master_id);
        console.log("selectedpart", selectedPart);
        
        this.partsDetailList.push({
          problem_code: problem_code,
          parts_master_id: parts_master_id,
          part_name: selectedPart.part_name,
        })
        console.log(parts);
        console.log(this.partsDetailList);
        this.dataSource = new MatTableDataSource<PartsDetails>(this.partsDetailList);
        this.AddPartsForm.reset();
        this.filteredPartsList$ = this.filteredPartsList$.pipe(map(
          data => data.filter(m => m.parts_master_id != parts_master_id)
        ))
      }
    )
  }

  DeletePart(parts_master_id: number) {
    this.partsDetailList.splice(this.partsDetailList.findIndex(m => m.parts_master_id == parts_master_id), 1);
    this.dataSource = new MatTableDataSource<PartsDetails>(this.partsDetailList);
    console.log(this.partsDetailList);
    this.filteredPartsList$ = this.Parts$.pipe(map(
      data => data.filter(m => this.partsDetailList.findIndex(part_id => part_id.parts_master_id == m.parts_master_id) == -1)
    ));
  }

  Save() {
    this.store.select(state => state.problemInventoryTagging.problemtaggedDetails).pipe(take(1)).subscribe(
      data => {
        console.log(data);
        if(!!data) {
          var emittedvalue: ProblemTaggedDetails = {
            problem_code: data.problem_code,
            parts_details: this.partsDetailList,
            display_desc: data.display_desc,
            inventory_mapped: data.inventory_mapped,
            map_to_image: data.map_to_image,
            severity: data.severity
          }
          this.updateProblemInventoryTaggingEvent.emit(emittedvalue);
        }
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
