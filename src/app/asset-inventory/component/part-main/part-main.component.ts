import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { parts, partID } from 'src/app/models/asset-inventoryModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { LoginAction } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-part-main',
  templateUrl: './part-main.component.html',
  styleUrls: ['./part-main.component.scss']
})
export class PartMainComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['part_name','part_code', 'part_manufacturer', 'part_source_country', 'part_price', 'vehicle_part_state', 'action']
  dataSource: MatTableDataSource<parts>;
  dataSourceWithoutInactive: MatTableDataSource<parts>;
  dataSourceWithInactive: MatTableDataSource<parts>;
  @Input() partDetails$: Observable<parts[]>;
  @Output() openadd = new EventEmitter()
  @Output() editPart = new EventEmitter()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() pageSizeOptions: number[];
  @Output() deletedPartId = new EventEmitter<partID>();
  subs = new SubSink();
  constructor(public languageService: LanguageService,private router: Router) { }

  ngOnInit() {
    this.subs.add(this.partDetails$.subscribe(
      (data) => {
        if (!!data) {
          var reducedData = data.filter(m => m.status !=4)
          console.log(reducedData);
          this.dataSourceWithInactive = new MatTableDataSource<parts>(data);
          this.dataSourceWithoutInactive = new MatTableDataSource<parts>(reducedData);
          this.dataSource = this.dataSourceWithoutInactive;
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

  OpenAdd(){
    this.openadd.emit();
  }

  editParts(vehicle_part_id:number){
    console.log(vehicle_part_id);
    this.editPart.emit(vehicle_part_id);
  }

  deletePart(part_id: number) {
    var data: partID = {
      vehicle_part_id: part_id
    }
    this.deletedPartId.emit(data);
  }
  ShowHideInactive(checked: boolean) {
    if (checked) {
      this.dataSource = this.dataSourceWithInactive;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
    else {
      this.dataSource = this.dataSourceWithoutInactive;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
  }
}
