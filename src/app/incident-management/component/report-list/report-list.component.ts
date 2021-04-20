import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportPopoverContainerComponent } from '../../container/report-popover-container/report-popover-container.component';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';
import { WorkItem } from 'src/app/models/fsqManagement';
import { ReportDetailPopoverContainerComponent } from '../../container/report-detail-popover-container/report-detail-popover-container.component';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] =['work_item_ref_no', 'work_item_type_name', 'vehicle_id', 'customer_state', 'fsq_user','customer' , 'raised_by_role', 'reported_timestamp', 'status', 'action'];
  dataSource: MatTableDataSource<WorkItem>;
  dataSourceWithoutAssigned: MatTableDataSource<WorkItem>;
  dataSourceWithAssigned: MatTableDataSource<WorkItem>;
  @Input() workItemList$: Observable<WorkItem[]>
  @Output() AssignEvent = new EventEmitter<number>();
  @Output() reportDetailEvent = new EventEmitter<number>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;FSQReportDetails
  viewDialog: MatDialogRef<ReportPopoverContainerComponent>;
  viewDialog2: MatDialogRef<ReportDetailPopoverContainerComponent>;
  private subs = new SubSink();

  constructor(public languageService: LanguageService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.workItemList$.subscribe(
      (data) => {
        if (!!data) {
          var reducedData = data.filter(m =>m.problem_status == 1 || (m.work_item_type == 6 && (m.problem_status < 6 || m.problem_status == 7)));
          console.log(data);
          console.log(reducedData);
          var resolveddata =data.filter(m=>m.problem_status !=6);
          this.dataSourceWithAssigned= new MatTableDataSource<WorkItem>(data);
          this.dataSourceWithoutAssigned= new MatTableDataSource<WorkItem>(resolveddata);
          this.dataSource = this.dataSourceWithoutAssigned;
          console.log(resolveddata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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

  ShowHideUnassigned(checked: boolean){
    if(checked) {
      this.dataSource = this.dataSourceWithAssigned;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource);
      
    }
    else {
      this.dataSource = this.dataSourceWithoutAssigned;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource);
    }
  }
  
  assign(value: WorkItem) {
    console.log(value);
    // console.log(this.task.value);
    this.viewDialog = this.dialog.open(ReportPopoverContainerComponent, {
      data: {
        work_item_id: value.work_item_id,
        work_item_type: value.work_item_type,
      },
      disableClose: true,
      width: "90%",
    });
  }
  reassign(value: WorkItem) {
    console.log(value);
    // console.log(this.task.value);
    this.viewDialog = this.dialog.open(ReportPopoverContainerComponent, {
      data: {
        work_item_id: value.work_item_id,
        work_item_type: value.work_item_type,
      },
      disableClose: true,
      width: "90%",
    });
  }
  viewButton(work_item_id: number) {
   this.reportDetailEvent.emit(work_item_id)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
