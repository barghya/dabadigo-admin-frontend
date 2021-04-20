import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceJobItemDetail, MaintenanceJobAssignPayload, MaintenanceJobResolvePayload } from 'src/app/models/maintenanceJobsModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Assets } from 'src/app/models/asset-inventoryModel';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { MatDialog } from '@angular/material';
import { FsqSearchDialogComponent } from '../../container/fsq-search-dialog-component/fsq-search-dialog-component.component';

@Component({
  selector: 'app-maintenance-job-detail',
  templateUrl: './maintenance-job-detail.component.html',
  styleUrls: ['./maintenance-job-detail.component.scss']
})
export class MaintenanceJobDetailComponent implements OnInit {
  @Input() maintenanceJobDetail$: Observable<MaintenanceJobItemDetail>;
  @Input() fsqList$?: Observable<FSQDetails[]>;
  DisplayedColumns: string[] = ["task_name", "part_name", "part_short_code", "parts_quantity"];
  ResolutionColumns: string[] = ["task_name", "comments"];
  ManagingBEUColumns: string[] = ["beu_name", "beu_phone"];
  @Output() resolve = new EventEmitter<MaintenanceJobResolvePayload>();
  @Output() assignLoad = new EventEmitter();
  @Output() assignSubmit = new EventEmitter<MaintenanceJobAssignPayload>();
  showAssignForm: boolean = false;
  showResolutionForm: boolean = false;

  selectedFsq: FSQDetails;
  AssignForm: FormGroup;
  ResolutionForm: FormGroup;
  ResolutionFormArray: FormArray;
  constructor(public languageService:LanguageService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.AssignForm = this.fb.group({
      fsq_id: [null, [Validators.required]]
    })

    this.AssignForm.controls.fsq_id.disable();

    this.ResolutionForm = this.fb.group({
      resolutions: this.fb.array([])
    })
  }

  get resolutions(): FormArray {
    return <FormArray>(this.ResolutionForm.controls.resolutions);
  }

  set resolutions(array: FormArray) {
    this.ResolutionForm.controls.resolutions = array;
  }

  Assign() {
    this.showAssignForm = true;
    // this.assignLoad.emit();
  }

  Search() {
    var dialogRef = this.dialog.open(
      FsqSearchDialogComponent,
      {
        width: '90%',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(
      result=> {
        if (result) {
          console.log('selected', result);
          this.selectedFsq = result;
          this.AssignForm.controls.fsq_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
        }
      }
    )
  }

  Cancel() {
    this.showAssignForm = false;
  }

  AssignSubmit() {
    this.maintenanceJobDetail$.pipe(take(1)).subscribe(
      maintenanceJob => {
        this.assignSubmit.emit({
          fsq_id: this.selectedFsq.admn_user_id,
          work_item_id: maintenanceJob.work_item_id
        });
      }
    )
  }
  
  Resolve() {
    this.resolutions = this.fb.array([])
    this.maintenanceJobDetail$.pipe(take(1)).subscribe(
      maintenance => {
        maintenance.resolutions.forEach(resolution => {
          this.resolutions.push(this.fb.group({
            comments: [""],
            work_item_task_id: [resolution.work_item_task_id],
            task_name: [resolution.task_name]
          }))
        });
      }
    )
    this.showResolutionForm = true;
  }

  CancelResolution() {
    this.showResolutionForm = false;
  }

  ResolveSubmit() {
    this.maintenanceJobDetail$.pipe(take(1)).subscribe(
      maintenanceJobDetail => {
        this.resolve.emit({
          work_item_id: maintenanceJobDetail.work_item_id,
          resolutions: this.ResolutionForm.controls.resolutions.value
        });
      }
    )
  }
}
