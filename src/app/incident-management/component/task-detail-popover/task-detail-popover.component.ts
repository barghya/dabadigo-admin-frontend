import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource } from '@angular/material';
import { Task, Taskdetails } from 'src/app/models/fsqManagement';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-task-detail-popover',
  templateUrl: './task-detail-popover.component.html',
  styleUrls: ['./task-detail-popover.component.scss']
})
export class TaskDetailPopoverComponent implements OnInit {
  @Output() Canceloption = new EventEmitter();
  dataSource: MatTableDataSource<Taskdetails>;
  @Input() TaskDetailsList$: Observable<Taskdetails[]>
  displayedColumns: string[] =['task_name','part_name', 'parts_status_name'];
  private subs = new SubSink();
  constructor(public languageService: LanguageService,) { }

  ngOnInit() {
    this.subs.add(this.TaskDetailsList$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          this.dataSource= new MatTableDataSource<Taskdetails>(data);
        }
      }
    ))

  }
  CancelOperation(){
    this.Canceloption.emit();
  }
}
