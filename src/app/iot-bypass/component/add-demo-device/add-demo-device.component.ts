import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';
import { addDemoDevice } from 'src/app/models/iotControllereModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { map } from 'rxjs/operators';
import { IotControllerService } from 'src/app/service/iot-controller/iot-controller.service';
import { countries } from 'src/app/models/asset-inventoryModel';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CalculateDemoDeviceContainerComponent } from '../../container/calculate-demo-device-container/calculate-demo-device-container.component';

@Component({
  selector: 'app-add-demo-device',
  templateUrl: './add-demo-device.component.html',
  styleUrls: ['./add-demo-device.component.scss']
})
export class AddDemoDeviceComponent implements OnInit {
  demodeviceForm : FormGroup;
  @Output() addevent = new EventEmitter();
  @Output() cancelDemoDeviceevent = new EventEmitter();
  @Input() countriesName$: Observable<countries[]>;
  @Input() deviceStatus$: Observable<DomainData[]>;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  dialogValue: string;
  viewDialog: MatDialogRef<CalculateDemoDeviceContainerComponent>;
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder,private router: Router,private iotControllerService: IotControllerService,public dialog: MatDialog) { }

  ngOnInit() {
    this.demodeviceForm = this.formbuilder.group({
      device_data: [''],
      device_name: ['', [Validators.required]],
      device_make: ['', [Validators.required]],
      device_code: ['',[Validators.required],  [this.validateDevicecode.bind(this)]],
      device_model: ['', [Validators.required]],
      country_of_origin: ['', [Validators.required]],
      manufacturing_date: ['',[Validators.required]],
      commissioning_date: [''],
      device_imei_pre: ['000',[Validators.required]],
      device_imei: ['', [Validators.required,Ms3Validators.integer], [this.validateImeiCode.bind(this)]],
      // device_status: [{ value: 2, disabled: true }, [Validators.required]],
    })
    this.demodeviceForm.controls['device_imei_pre'].disable();
  }
 
  formatResponsedeviceTag = map((val: any) => {
    return val.response ? {duplicateDevicecode: true } : null;
  });

  validateDevicecode(control: AbstractControl) {
    var booleanResponse = this.iotControllerService.DuplicateDevice(control.value);
    return this.formatResponsedeviceTag(booleanResponse);
  }

  formatResponseImeiNumber = map((val: any) => {
    return val.response ? {duplicateImeiCode: true} : null;
  });

  validateImeiCode(control: AbstractControl) {
   var data = "000"+control.value
    var booleanresponse = this.iotControllerService.DuplicateImeiNumber(data);
    return this.formatResponseImeiNumber(booleanresponse);
  }

  cancelDemoDevice() {
    this.cancelDemoDeviceevent.emit();
  }

  add(){
    var formData: addDemoDevice = {
      device_name: this.demodeviceForm.controls.device_name.value,
      device_make: this.demodeviceForm.controls.device_make.value,
      device_code: this.demodeviceForm.controls.device_code.value,
      device_model: this.demodeviceForm.controls.device_model.value,
      country_of_origin: this.demodeviceForm.controls.country_of_origin.value,
      manufacturing_date: this.demodeviceForm.controls.manufacturing_date.value,
      commissioning_date: this.demodeviceForm.controls.commissioning_date.value,
      device_imei: "000"+this.demodeviceForm.controls.device_imei.value,
      // device_status : this.demodeviceForm.controls.device_status.value,
      device_data: this.demodeviceForm.controls.device_data.value,
      
    }
    this.addevent.emit(formData);
  }
  StartDateChanged(){
    if (this.demodeviceForm.controls.manufacturing_date.value) {
      if (this.demodeviceForm.controls.commissioning_date.value && 
        (this.demodeviceForm.controls.manufacturing_date.value >= this.demodeviceForm.controls.commissioning_date.value)) {
          this.demodeviceForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.demodeviceForm.controls.manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }
  calculateDemoDevice(){
    // this.Calculateevent.emit(+this.demodeviceForm.controls['device_imei'].value);
    this.viewDialog = this.dialog.open(CalculateDemoDeviceContainerComponent, {
      data: {

        device_imei: "000"+this.demodeviceForm.controls['device_imei'].value ,
        device_data: undefined,

      },
      disableClose: true,
      width: "90%",
    });
    this.viewDialog.afterClosed().subscribe(result => {
      if(!!result) {
        this.demodeviceForm.controls.device_data.patchValue(result["data"]);  
      }
    });
    
  }

}
