import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { DeployItemListMain, getSingleRequestItem } from 'src/app/models/transferDeviceBatteryModel';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-transfer-device-battery-view',
  templateUrl: './transfer-device-battery-view.component.html',
  styleUrls: ['./transfer-device-battery-view.component.scss']
})
export class TransferDeviceBatteryViewComponent implements OnInit {
  @Output() CancelOperation = new EventEmitter();
  @Input() data: DeployItemListMain;
  @Input() sourcedetail$: Observable<getSingleRequestItem[]>;
  dataSource: MatTableDataSource<getSingleRequestItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['source_region_name','item_model', 'item_make','source_store_type_name','source_store_name', 'commissioning_date', 'item_status_name']
  private subs = new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.sourcedetail$.subscribe(
      (data)=>{
        this.dataSource = new MatTableDataSource<getSingleRequestItem>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
    ))
  }
  CancelOperations(){
    this.CancelOperation.emit();
  }
}
