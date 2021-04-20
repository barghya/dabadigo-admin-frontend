import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { adminDevice, editDevice, deviceId } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-device-main',
  templateUrl: './device-main.component.html',
  styleUrls: ['./device-main.component.scss']
})
export class DeviceMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['device_name', 'device_model', 'device_code', 'device_imei', 'commissioning_date','device_status_name','city_name','region_name', 'store_type', 'store_name','action'];
  @Input() admindevice_det$: Observable<adminDevice[]>;
  @Output() adddevice = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() pageSizeOptions: number[];
  @Output() deletedevice = new EventEmitter();
  @Output() editdevice = new EventEmitter<number>();
  @Output() getDeviceTransactionsEvent = new EventEmitter<number>();
  dataSource: MatTableDataSource<adminDevice>;
  dataSourceWithoutInactive: MatTableDataSource<adminDevice>;
  dataSourceWithInactive: MatTableDataSource<adminDevice>;
  subs = new SubSink();

  constructor( public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.admindevice_det$.subscribe(
      (data) => {
        if(!!data){
          var reducedData = data.filter(m => m.device_status != 4);
          console.log(reducedData);
          this.dataSourceWithInactive = new MatTableDataSource<adminDevice>(data);
          this.dataSourceWithoutInactive = new MatTableDataSource<adminDevice>(reducedData);
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

  addDevices() {
    this.adddevice.emit();
  }
  editDevice(value:number){
    this.editdevice.emit(value);
  }
  deleteDevice(value: number) {
    console.log(value);
    var data: deviceId = {
      device_id: value
    }
    this.deletedevice.emit(data);
    console.log(data);
  }

  ShowHideInactive(checked: boolean) {
    if(checked) {
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

  getDeviceTransactions(device_id: number) {
    this.getDeviceTransactionsEvent.emit(device_id);
  }

}