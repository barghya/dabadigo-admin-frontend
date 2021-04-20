import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { DeviceDetails } from 'src/app/models/iotControllereModel';

@Component({
  selector: 'app-device-bypass-main',
  templateUrl: './device-bypass-main.component.html',
  styleUrls: ['./device-bypass-main.component.scss']
})
export class DeviceBypassMainComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["device_imei","vehicle_number","vehicle_type_name","action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() AllactiveDeviceList$: Observable<DeviceDetails[]>;
  @Output() addIOT = new EventEmitter<number>();
  private subs =  new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
   
    this.subs.add(this.AllactiveDeviceList$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<DeviceDetails>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )); 

  }
  addIot(value:number){
    this.addIOT.emit(value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(filterValue);
  }

}
