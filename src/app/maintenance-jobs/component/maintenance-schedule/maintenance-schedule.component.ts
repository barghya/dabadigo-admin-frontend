import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { MaintenanceScheduleItem } from 'src/app/models/maintenanceJobsModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { Ms3Validators } from 'src/app/validators/ms3-validators';

@Component({
  selector: 'app-maintenance-schedule',
  templateUrl: './maintenance-schedule.component.html',
  styleUrls: ['./maintenance-schedule.component.scss']
})
export class MaintenanceScheduleComponent implements OnInit {
  @Input() vehicleTypes$: Observable<DomainData[]>;
  @Input() maintenanceSchedules$: Observable<MaintenanceScheduleItem[]>;
  VehicleTypeForm: FormGroup;
  ScheduleFormArray: FormArray;
  ScheduleFormGroup: FormGroup;
  private subs = new SubSink();
  @Output() vehicleTypeChange = new EventEmitter<number>();
  @Output() schedulesSubmit = new EventEmitter<MaintenanceScheduleItem[]>();

  constructor(public languageService: LanguageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.VehicleTypeForm = this.fb.group({
      vehicle_type: [null]
    })

    this.ScheduleFormArray = this.fb.array([])
    this.ScheduleFormArray.push(this.BuildScheduleForm());
    this.ScheduleFormArray.push(this.BuildScheduleForm());
    this.ScheduleFormArray.push(this.BuildScheduleForm());

    this.ScheduleFormGroup = this.fb.group({
      schedules: this.ScheduleFormArray
    })

    this.subs.add(this.maintenanceSchedules$.subscribe(
      schedules => {
        if(!!schedules) {
          this.schedules.patchValue(schedules)
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get schedules(): FormArray {
    return <FormArray>this.ScheduleFormGroup.get("schedules");
  }

  VehicleTypeChange(vehicle_type: number) {
    this.vehicleTypeChange.emit(vehicle_type);
  }

  BuildScheduleForm() {
    return this.fb.group({
      vehicle_type: [null],
      vehicle_age: [null],
      vehicle_age_name: [null],
      distance_limit: [null, [Validators.required, Validators.min(0), Ms3Validators.integer]],
      days_limit: [null, [Validators.required, Validators.min(0), Ms3Validators.integer]]
    })
  }

  SchedulesSubmit() {
    this.schedulesSubmit.emit(this.schedules.value)
  }
}
