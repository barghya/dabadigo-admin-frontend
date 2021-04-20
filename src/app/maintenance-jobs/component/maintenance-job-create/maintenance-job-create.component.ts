import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Assets } from 'src/app/models/asset-inventoryModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-maintenance-job-create',
  templateUrl: './maintenance-job-create.component.html',
  styleUrls: ['./maintenance-job-create.component.scss']
})
export class MaintenanceJobCreateComponent implements OnInit {
  @Input() vehicles$?: Observable<Assets[]>;
  @Output() create = new EventEmitter<number>();
  @Output() cancel = new EventEmitter();
  VehicleForm: FormGroup;

  constructor(private fb: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.VehicleForm = this.fb.group({
      vehicle_id: [null, [Validators.required]]
    })
  }
  
  Create() {
    this.create.emit(this.VehicleForm.controls.vehicle_id.value);
  }

  Cancel() {
    this.cancel.emit();
  }
}
