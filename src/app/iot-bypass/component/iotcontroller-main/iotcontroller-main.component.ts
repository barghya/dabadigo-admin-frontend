import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { IotControllerDetails } from 'src/app/models/iotControllereModel';

@Component({
  selector: 'app-iotcontroller-main',
  templateUrl: './iotcontroller-main.component.html',
  styleUrls: ['./iotcontroller-main.component.scss']
})
export class IotcontrollerMainComponent implements OnInit {
  dataSource: MatTableDataSource<IotControllerDetails>;
  @Output() addIotBypass = new EventEmitter();
  @Input() iotControllerDetails$: Observable<IotControllerDetails[]>
  displayedColumns: string[] = ["vehicle_id","vehicle_current_state","action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subs = new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.iotControllerDetails$.subscribe(
      (data) => {
        if(!!data){
          
         console.log(data);
         
         this.dataSource = new MatTableDataSource<IotControllerDetails>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        }
      }
    ));
  }

  addIot(vehicle_id:number){
    this.addIotBypass.emit(vehicle_id);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
