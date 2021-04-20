import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentDetail, Task, Fsq, Task1 } from 'src/app/models/fsqManagement';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { SubSink } from 'subsink';
import * as ol from 'openlayers';
import { SourceVectorComponent, MapComponent } from 'ngx-openlayers';
import { Router } from '@angular/router';
import { TaskDetailPopoverContainerComponent } from '../../container/task-detail-popover-container/task-detail-popover-container.component';

@Component({
  selector: 'app-report-detail-popover',
  templateUrl: './report-detail-popover.component.html',
  styleUrls: ['./report-detail-popover.component.scss']
})
export class ReportDetailPopoverComponent implements OnInit, OnDestroy {
  @Input() workDetail$: Observable<IncidentDetail>;
  @Output() refreshData = new EventEmitter();
  @Output() taskDetailEvent = new EventEmitter<number>();
  viewDialog: MatDialogRef<TaskDetailPopoverContainerComponent>;

  constructor(public languageService: LanguageService, private router: Router, public dialog: MatDialog) { }
  displayedColumns: string[] =['task_code', 'task_name', 'create_at', 'priority', 'task_status_name','action'];
  displayedColumns2: string[] =['fsq_name','username', 'contact_phone', 'assigned_on', 'work_assignment_status_name'];
  dataSource: MatTableDataSource<Task>;
  dataSource2: MatTableDataSource<Fsq>;
  subs = new SubSink();
  @ViewChild('onTripMarkersSource', { static: false }) onTripMarkersSource: SourceVectorComponent;
  @ViewChild('fsqUsingMarkersSource', { static: false }) fsqUsingMarkersSource: SourceVectorComponent;
  @ViewChild('problemHighMarkersSource', { static: false }) problemHighMarkersSource: SourceVectorComponent;
  @ViewChild('maintenanceMarkersSource', { static: false }) maintenanceMarkersSource: SourceVectorComponent;
  @ViewChild('map', { static: false }) map: MapComponent;
  ontripFeatures: ol.Feature[] = [];
  fsqUsingFeatures: ol.Feature[] = [];
  problemHighFeatures: ol.Feature[] = [];
  maintenanceFeatures: ol.Feature[] = [];

  ngOnInit() {
    this.subs.add(this.workDetail$.subscribe(
      data=>{
        if(!!data){
          console.log(data);
          this.dataSource= new MatTableDataSource<Task>(data.tasks);
          this.dataSource2= new MatTableDataSource<Fsq>(data.fsqs);
          if(!!data.reported_location && !!data.reported_location.latitude && !!data.reported_location.longitude) {
            this.problemHighFeatures = [];
            var reportMarker = ol.proj.fromLonLat([+(+data.reported_location.longitude).toFixed(4), +(+data.reported_location.latitude).toFixed(4)]);
            var reportfeature = new ol.Feature(new ol.geom.Point(reportMarker));
            reportfeature.setId(data.work_item.raised_by);
            reportfeature.setProperties([{ "router": this.router }]);
            this.problemHighFeatures.push(reportfeature);
            this.problemHighMarkersSource.instance.clear();
            this.problemHighMarkersSource.instance.addFeatures(this.problemHighFeatures);
          }
          else {
            this.problemHighFeatures = [];
            this.problemHighMarkersSource.instance.clear();
          }

          if(!!data.accepted_location && !!data.accepted_location.latitude && !!data.accepted_location.longitude) {
            this.maintenanceFeatures = [];
            var acceptMarker = ol.proj.fromLonLat([+(+data.accepted_location.longitude).toFixed(4), +(+data.accepted_location.latitude).toFixed(4)]);
            var acceptfeature = new ol.Feature(new ol.geom.Point(acceptMarker));
            acceptfeature.setId(data.work_item.raised_by);
            acceptfeature.setProperties([{ "router": this.router }]);
            this.maintenanceFeatures.push(acceptfeature);
            this.maintenanceMarkersSource.instance.clear();
            this.maintenanceMarkersSource.instance.addFeatures(this.maintenanceFeatures);
          }
          else {
            this.maintenanceFeatures = [];
            this.maintenanceMarkersSource.instance.clear();
          }
          
          if(!!data.fsq_location && !!data.fsq_location.latitude && !!data.fsq_location.longitude) {
            this.fsqUsingFeatures = [];
            var fsqMarker = ol.proj.fromLonLat([+(+data.fsq_location.longitude).toFixed(4), +(+data.fsq_location.latitude).toFixed(4)]);
            var fsqfeature = new ol.Feature(new ol.geom.Point(fsqMarker));
            fsqfeature.setId(data.work_item.assigned_to_id);
            fsqfeature.setProperties([{ "router": this.router }]);
            this.fsqUsingFeatures.push(fsqfeature);
            this.fsqUsingMarkersSource.instance.clear();
            this.fsqUsingMarkersSource.instance.addFeatures(this.fsqUsingFeatures);
            this.map.instance.setView(
              new ol.View({
                center: fsqMarker,
                zoom: 11
              })
            )
          }
          else {
            this.fsqUsingFeatures = [];
            this.fsqUsingMarkersSource.instance.clear();
          }

          if(!!data.customer_location && !!data.customer_location.latitude && !!data.customer_location.longitude) {
            this.ontripFeatures = [];
            var custMarker = ol.proj.fromLonLat([+(+data.customer_location.longitude).toFixed(4), +(+data.customer_location.latitude).toFixed(4)]);
            var custfeature = new ol.Feature(new ol.geom.Point(custMarker));
            custfeature.setId(data.work_item.raised_by);
            custfeature.setProperties([{ "router": this.router }]);
            this.ontripFeatures.push(custfeature);
            this.onTripMarkersSource.instance.clear();
            this.onTripMarkersSource.instance.addFeatures(this.ontripFeatures);
            this.map.instance.setView(
              new ol.View({
                center: custMarker,
                zoom: 11
              })
            )
          }
          else {
            this.ontripFeatures = [];
            this.onTripMarkersSource.instance.clear();
          }
        }
      }
    ))
  }

 
  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  mapOnClick(evt) { }

  RefreshData() {
    this.refreshData.emit();
  }
  viewButton(value:Task){
   console.log(value)
    this.viewDialog = this.dialog.open(TaskDetailPopoverContainerComponent, {
      data: {
        work_item_task_id: value.work_item_task_id
       
      },
      disableClose: true,
      width: "90%",
    });
   
  }

}
