import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegionItem } from 'src/app/models/regionManagement';
import { FSQDetails, FSQRegionUpdate } from 'src/app/models/fsqManagement';
import { SubSink } from 'subsink';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fsq-assign-region',
  templateUrl: './fsq-assign-region.component.html',
  styleUrls: ['./fsq-assign-region.component.scss']
})
export class FsqAssignRegionComponent implements OnInit, OnDestroy{
  fsqAssignRegionForm: FormGroup;
  @Input() fsqassignRegion$: Observable<RegionItem[]>
  @Input() singleFSQ$: Observable<FSQDetails>
  @Output() cancelFSQRegion = new EventEmitter();
  @Output() FSQassignRegionForm = new EventEmitter<FSQDetails>();
  private subs = new SubSink();
  adminUserId: number;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.fsqAssignRegionForm = this.formbuilder.group({
      region_id: ['', [Validators.required]],
      assigned_start: ['', [Validators.required]],
      assigned_end: ['', [Validators.required]],
    })

    this.subs.add(this.singleFSQ$.subscribe(
      (data) => {
        console.log(data);
        if(!!data) {
          console.log("Patching");
          console.log(data);
          this.adminUserId= +data.admn_user_id;
          this.fsqAssignRegionForm.patchValue(data);
        }
      }
    ));
  }

  SaveRegion(){
    // this.subs.add(this.singleFSQ$.subscribe(
    //   (data) => {
    //     console.log(data);
    //     var formdata = { ...data };
    //     formdata.region_id = +this.fsqAssignRegionForm.controls.region_id.value;
    //     formdata.assigned_start = this.fsqAssignRegionForm.controls.assigned_start.value;
    //     formdata.assigned_end = this.fsqAssignRegionForm.controls.assigned_end.value;
    //     console.log(data);
    //     this.FSQassignRegionForm.emit(formdata);
    //   }
    // ))
    // var formdata: FSQRegionUpdate={
    //   admn_user_id: this.adminUserId,
    //   assigned_end: this.fsqAssignRegionForm.controls.assigned_end.value,
    //   assigned_start: this.fsqAssignRegionForm.controls.assigned_start.value,
    //   region_id: +this.fsqAssignRegionForm.controls.region_id.value
    // }
    // console.log(formdata);
    
    this.FSQassignRegionForm.emit({
      admn_user_id: this.adminUserId,
      assigned_end: this.fsqAssignRegionForm.controls.assigned_end.value,
      assigned_start: this.fsqAssignRegionForm.controls.assigned_start.value,
      region_id: +this.fsqAssignRegionForm.controls.region_id.value
    });

  }

  cancelRegion(){
    this.cancelFSQRegion.emit()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  StartDateChanged(){
    if (this.fsqAssignRegionForm.controls.assigned_start.value) {
      if (this.fsqAssignRegionForm.controls.assigned_end.value && 
        (this.fsqAssignRegionForm.controls.assigned_start.value >= this.fsqAssignRegionForm.controls.assigned_end.value)) {
          this.fsqAssignRegionForm.get('assigned_end').reset();
        }
    }
    var fromDate: Date = new Date(this.fsqAssignRegionForm.controls.assigned_start.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

}
