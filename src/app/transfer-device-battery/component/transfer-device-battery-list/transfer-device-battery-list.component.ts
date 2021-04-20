import { Component, OnInit, EventEmitter, Output, Input, OnDestroy, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { DeployItemListMain, multiTransferService } from 'src/app/models/transferDeviceBatteryModel';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-transfer-device-battery-list',
  templateUrl: './transfer-device-battery-list.component.html',
  styleUrls: ['./transfer-device-battery-list.component.scss']
})
export class TransferDeviceBatteryListComponent implements OnInit, OnDestroy {
  @Output() addTransfer = new EventEmitter();
  @Input() ItemList$: Observable<DeployItemListMain[]>
  private subs = new SubSink();
  dataSource: MatTableDataSource<DeployItemListMain>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() ViewEvent = new EventEmitter<DeployItemListMain>();
  @Output() multiActionEvent = new EventEmitter<multiTransferService>();
  @Output() getPastToggle = new EventEmitter<boolean>();
  displayedColumns: string[] = ['transfer_ref_no', 'region_name', 'store_type_name','destination_store_name','item_type_name', 'updated_on', 'transfer_status_name', 'action']
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.ItemList$.subscribe(
      (data)=>{
        this.dataSource = new MatTableDataSource<DeployItemListMain>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
    ))
  }
  AddTransfer() {
    this.addTransfer.emit();
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  view(element: DeployItemListMain){
    this.ViewEvent.emit(element)
  }
  
  Approve(data: number){
    var reqData: multiTransferService={
      action_type: 1,
      transfer_id: data,
      updated_by: null
    }
    this.multiActionEvent.emit(reqData)
  }
  Reject(data: number){
    var reqData: multiTransferService={
      action_type: 2,
      transfer_id: data,
      updated_by: null
    }
    this.multiActionEvent.emit(reqData)
  }
  Delete(data: number){
    var reqData: multiTransferService={
      action_type: 3,
      transfer_id: data,
      updated_by: null
    }
    this.multiActionEvent.emit(reqData)
  }
  ShowHidePastData(data: boolean){
    this.getPastToggle.emit(data);
  }
}
