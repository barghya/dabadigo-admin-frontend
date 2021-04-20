import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PartsMasterItem } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-parts-master-main',
  templateUrl: './parts-master-main.component.html',
  styleUrls: ['./parts-master-main.component.scss']
})
export class PartsMasterMainComponent implements OnInit, OnDestroy {
  @Input() partsMasterList$: Observable<PartsMasterItem[]>;
  @Output() addPartsMaster = new EventEmitter();
  @Output() editPartsMaster = new EventEmitter<number>();
  @Output() deletePartsMaster = new EventEmitter<number>();
  @Output() partsInventory = new EventEmitter();

  dataSource: MatTableDataSource<PartsMasterItem>;
  displayedColumns: string[] = ['part_name', 'part_short_code', 'part_tag', 'part_manufacturer', 'part_source_country', 'part_price', 'in_stock', 'in_use', 'damaged', 'action']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private subs = new SubSink();
  
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.partsMasterList$.subscribe(
      (data) => {
        if (!!data) {
          this.dataSource = new MatTableDataSource<PartsMasterItem>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  AddPartsMaster() {
    this.addPartsMaster.emit();
  }

  EditPartsMaster(parts_master_id: number) {
    this.editPartsMaster.emit(parts_master_id);
  }
  
  DeletePartsMaster(parts_master_id: number) {
    this.deletePartsMaster.emit(parts_master_id);
  }

  PartsInventory(parts_master_id?: number) {
    this.partsInventory.emit(parts_master_id);
  }

}
