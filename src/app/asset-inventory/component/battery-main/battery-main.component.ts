import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { battery, batteryID } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-battery-main',
  templateUrl: './battery-main.component.html',
  styleUrls: ['./battery-main.component.scss']
})
export class BatteryMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['battery_tag', 'battery_model', 'city_name','region_name', 'battery_manufacturing_date', 'battery_power', 'battery_state','assignment_name', 'store_type', 'store_name', 'action']; 
  dataSource: MatTableDataSource<battery>;

  @Output() addbattery = new EventEmitter();
  @Output() editBatteryEvent = new EventEmitter();
  @Output() deleteBatteryEvent = new EventEmitter<batteryID>();
  @Output() viewTransactionsEvent = new EventEmitter<number>();

  @Input() battery$ : Observable<battery[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSourceWithoutInactive: MatTableDataSource<battery>;
  dataSourceWithInactive: MatTableDataSource<battery>;

  subs = new SubSink();

  constructor(private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.battery$.subscribe(
      (data) => {
        if(!!data){
          var reducedData = data.filter(m => m.battery_status != 3);
          console.log(reducedData);
          this.dataSourceWithInactive = new MatTableDataSource<battery>(data);
          this.dataSourceWithoutInactive = new MatTableDataSource<battery>(reducedData);
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
    console.log(filterValue);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addBattery() {
    this.addbattery.emit();

  }

  editBattery(vehicle_battery_id:number) {
    this.editBatteryEvent.emit(vehicle_battery_id);
  }

  deleteBattery(battery_id: number) {
    var data: batteryID = {
      vehicle_battery_id: battery_id
    }
    console.log(battery_id);
    this.deleteBatteryEvent.emit(data);
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

  viewTransactions(vehicle_battery_id: number) {
    this.viewTransactionsEvent.emit(vehicle_battery_id);
  }
}
