import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegionItem } from 'src/app/models/regionManagement';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FsqShift, editShiftService } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute } from '@angular/router';
import { GetRp } from 'src/app/models/rentalPoint';
import { Ms3Validators } from 'src/app/validators/ms3-validators';

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.scss']
})
export class EditShiftComponent implements OnInit, OnDestroy {
  ShiftEditForm: FormGroup;
  fsqshiftedit: FsqShift;
  @Output() cancelshift = new EventEmitter;
  @Output() EditShift = new EventEmitter<editShiftService>();
  EditData: editShiftService;
  @Input() rentalPointList$?: Observable<GetRp[]>;
  @Input() fsqRegion$: Observable<RegionItem[]>;
  @Input() singleshift$: Observable<FsqShift>;
  SingleFsqShift: FsqShift;
  start_min: Date;
  end_min: Date;
  private subs = new SubSink();
  dateFilter: FormGroup;
  show: boolean = false;
  Rentalpointmanager: number;
  Rentalpoint: number;
  @Output() regionSelected = new EventEmitter<number>();
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ShiftEditForm = this.formbuilder.group({
      fsq_name: [''],
      region: ['', [Validators.required]],
      shift_start_datetime: ['', [Validators.required]],
      shift_end_datetime: ['', [Validators.required]],
      break_time: ['', [Validators.required, Ms3Validators.integer]],
      rentalpoint_id: ['', [Validators.required]],
    })
    // this.dateFilter = this.formbuilder.group({
    //   filterStartTime: [null],
    //   filterEndTime: [null]
    // })

    this.subs.add(this.fsqRegion$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          if (!!this.SingleFsqShift) {
            this.ShiftEditForm.patchValue({
              fsq_name: this.SingleFsqShift.fsq_name,
              region: this.SingleFsqShift.region_id,
              shift_start_datetime: this.SingleFsqShift.shift_start_datetime,
              shift_end_datetime: this.SingleFsqShift.shift_end_datetime,
              rentalpoint_id: this.SingleFsqShift.rentalpoint_id,
              break_time: this.SingleFsqShift.break_time,
            });
          }
        }
      }
    ))

    this.subs.add(this.rentalPointList$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          if (!!this.SingleFsqShift) {
            this.ShiftEditForm.patchValue({
             
              rentalpoint_id: this.SingleFsqShift.rentalpoint_id,
              
            });
          }

        }
      }
    ))

    this.subs.add(this.singleshift$.subscribe(
      data => {
        if (!!data) {
          console.log(data);
          this.SingleFsqShift = data;
          this.Rentalpointmanager = data.shift_as;
          console.log(this.Rentalpointmanager);

          this.Rentalpoint = data.rentalpoint_id;
          console.log(this.Rentalpoint);
        }
        this.ShiftEditForm.controls.fsq_name.disable();
       
      }
    ))
    if (this.Rentalpointmanager == 2) {
      this.show = true;
      this.ShiftEditForm.controls.rentalpoint_id.enable();
      // this.ShiftEditForm.controls.rentalpoint_id.patchValue(data.rentalpoint_id);
      console.log(this.Rentalpoint);
    }
    else {
      this.show = false;
      this.ShiftEditForm.controls.rentalpoint_id.disable();
    }
  }
  // ShowHideUnchecked(checked: boolean){
  //   if(checked) {
  //   //  this.Rentalpointmanager=2;
  //    this.show = true;
  //    this.ShiftEditForm.controls.rentalpoint_id.enable();
  //   }
  //   else {
  //     // this.Rentalpointmanager=1;
  //     this.show = false;
  //     this.ShiftEditForm.controls.rentalpoint_id.disable();
  //   }
  // }


  displayRegion(data?: number): string | undefined {
    var region: RegionItem = !!data && this.fsqRegion$ ? this.showRegion(data) : undefined;
    return region ? region.region_name : undefined;
  }
  showRegion(data?: number) {
    var region: RegionItem = {}
    this.fsqRegion$.pipe(take(1)).subscribe(
      reg => {
        region = reg.find(m => m.region_id == data)
      }
    );
    return region;
  }

  displayRentalPoint(data?: number): string | undefined {
    var rentalpoint: GetRp = !!data && this.rentalPointList$ ? this.showRentalPoint(data) : undefined;
    return rentalpoint ? rentalpoint.rentalpoint_name : undefined;
  }
  showRentalPoint(data: number) {
    var rentalpoint: GetRp = {}
    this.rentalPointList$.pipe(take(1)).subscribe(
      reg => {
        rentalpoint = reg.find(m => m.rentalpoint_id == data)
      }
    );
    console.log(rentalpoint);
    return rentalpoint;
  }

  RegionSelection(region_id: number) {
    
    if (!!region_id) {
      this.regionSelected.emit(region_id);

    }

    console.log(region_id);
  }

  DateAdjustment() {
    if (!!this.ShiftEditForm.controls['shift_start_datetime'].value) {
      this.end_min = new Date(new Date(this.ShiftEditForm.controls['shift_start_datetime'].value).getTime() + 60000)
    } else {
      this.end_min = new Date(new Date().getTime() + 60000);
    }
    if (this.ShiftEditForm.controls['shift_start_datetime'].value > this.ShiftEditForm.controls['shift_start_datetime'].value) {
      this.ShiftEditForm.patchValue({ end_date: '' });
    }
  }


  saveShift() {
    this.EditData = {
      fsq_id: this.SingleFsqShift.fsq_id,
      fsq_shift_management_id: this.SingleFsqShift.fsq_shift_management_id,
      shift_end_datetime: this.ShiftEditForm.controls['shift_end_datetime'].value,
      shift_start_datetime: this.ShiftEditForm.controls['shift_start_datetime'].value,
      region_id: this.ShiftEditForm.controls['region'].value,
      rentalpoint_id: this.ShiftEditForm.controls['rentalpoint_id'].value ? this.ShiftEditForm.controls.rentalpoint_id.value : null,
      break_time: this.ShiftEditForm.controls['break_time'].value
    }
    this.EditShift.emit(this.EditData);
  }

  cancelShift() {
    this.cancelshift.emit()
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
