import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { DemoDeviceDetails } from 'src/app/models/iotControllereModel';

@Component({
  selector: 'app-demo-device-main',
  templateUrl: './demo-device-main.component.html',
  styleUrls: ['./demo-device-main.component.scss']
})
export class DemoDeviceMainComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["device_imei","device_data","vehicle_number","action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() addDemodevice = new EventEmitter();
  @Output() editDemodevice = new EventEmitter();
  @Input() AlldemoDeviceList$: Observable<DemoDeviceDetails[]>;
  private subs =  new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.AlldemoDeviceList$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<DemoDeviceDetails>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )); 

  }

  addDemoDevice(){
    this.addDemodevice.emit();
  }

  edit(device_imei: string){
    this.editDemodevice.emit(device_imei);
  }
  // active(){

  // }
  // inactive(){

  // }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addBattery() {
    
  }
}
