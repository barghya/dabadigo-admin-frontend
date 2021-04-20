import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WorkItemTask, FSQDetails, WorkItemInDetail, WorkItemAssignmentRequest } from 'src/app/models/fsqManagement';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-report-popover',
  templateUrl: './report-popover.component.html',
  styleUrls: ['./report-popover.component.scss']
})
export class ReportPopoverComponent implements OnInit, OnDestroy {
  
  @Input() activeFsqList$: Observable<FSQDetails[]>;
  @Input() workItem$: Observable<WorkItemInDetail>;
  workItemInDetail: WorkItemInDetail
  @Input() work_item_id: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() submitEvent = new EventEmitter<WorkItemAssignmentRequest>();
  @Output() closePopup = new EventEmitter();
  private subs = new SubSink();

  PopoverForm: FormGroup;
  dataSource: MatTableDataSource<WorkItemTask>;
  displayedColumns: string[] = [ 'select_task','task_name', 'task_severity_name', 'create_at', 'task_status_name', 'task_code'];
  
  Tasks: number[] = [];
  submitData: WorkItemAssignmentRequest;

  constructor(public languageService: LanguageService, private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.PopoverForm = this.formbuilder.group({
      admn_user_id: ['', [Validators.required]],
    })

    this.subs.add(this.workItem$.subscribe(
      (data) => {
        if(!!data) {
          this.workItemInDetail= data;
          this.dataSource = new MatTableDataSource<WorkItemTask>(data.workitem_task);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ));
  }

  CancelOperation() {
    this.closePopup.emit();  
  }
  
  AddTask(task:number, event: any){

    if(event.checked){
      this.Tasks.push(task);
    }
    else{
      this.Tasks.splice(this.Tasks.findIndex(m => m == task), 1);
    }
    console.log(this.Tasks);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }

  Submit() {
    console.log(this.PopoverForm.value);
    console.log(this.Tasks);
    this.submitData = {
      admn_user_id: +this.PopoverForm.controls.admn_user_id.value,
      work_item_id: this.work_item_id,
      tasks: this.Tasks
    }

    console.log(this.submitData);
    this.submitEvent.emit(this.submitData);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
