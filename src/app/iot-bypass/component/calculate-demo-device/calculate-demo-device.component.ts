import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalculateDemoDeviceContainerComponent } from '../../container/calculate-demo-device-container/calculate-demo-device-container.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-calculate-demo-device',
  templateUrl: './calculate-demo-device.component.html',
  styleUrls: ['./calculate-demo-device.component.scss']
})
export class CalculateDemoDeviceComponent implements OnInit {
  deviceimei: string;
  devicedata: string;
  deviceImei: string;
  deviceData: string;
  calculateForm : FormGroup;
  lockStatus: number;
  chargeStatus: number;
  plugStatus: number;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() Canceloption = new EventEmitter();
  public text: string = 'Lock Status';
  string: string= "";
  batterystatus = '';
  displayString : string = ""
  commandArray: string[] = []
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder,public dialogRef: MatDialogRef<CalculateDemoDeviceContainerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,@Inject(MAT_DIALOG_DATA) private data1: any) {
    this.deviceimei = data.device_imei;
    this.devicedata = data.device_data;
    // this.deviceImei = data1.device_imei;
    // this.deviceData = data1.device_data;

    console.log(data);
    // console.log(data1);

    if(!!this.devicedata){
      this.string = data.device_data;
    }else {
      this.string = this.deviceimei + ",22.60,88.36,0.00,0,0,83,0"
    }
   }
  ngOnInit() {
    this.commandArray = this.string.split(",");
    if(this.commandArray[4]== "0"){
      this.lockStatus = 0
    }else {
      this.lockStatus = 1
    }
    if(this.commandArray[5]== "0"){
      this.chargeStatus = 0
    }else {
      this.chargeStatus = 1
    }

    if(this.commandArray[7]== "0"){
      this.plugStatus = 0
    }else {
      this.plugStatus = 1
    }

    
    console.log(this.commandArray);
    this.calculateForm = this.formbuilder.group({
      device_imei: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      speed: ['', [Validators.required]],
      battery_status: ['', [Validators.required]],
    })
    this.calculateForm.patchValue({
      device_imei: this.commandArray[0],
      latitude: this.commandArray[1],
      longitude: this.commandArray[2],
      speed: this.commandArray [3],
      battery_status: this.commandArray[6]
    })
    this.device_imei.disable();    
  }
  get device_imei(): FormControl {
    return <FormControl> this.calculateForm.get('device_imei');
  }
  CancelOperation() {
    this.Canceloption.emit();
  }
  vehicleLock(){
    if(this.lockStatus == 1){
      this.lockStatus = 0;
      this.commandArray[4] = "0";
      this.string= this.commandArray.toString();
    }else {
      this.lockStatus = 1;
      this.commandArray[4] = "1";
      this.string= this.commandArray.toString();
    }
  }
  vehicleCharge(){
    if(this.chargeStatus == 1){
      this.chargeStatus = 0;
      this.commandArray[5] = "0";
      this.string= this.commandArray.toString();
    }else {
      this.chargeStatus = 1;
      this.commandArray[5] = "1";
      this.string= this.commandArray.toString();
    }
  }
  
  plugstatus(){
    if(this.plugStatus == 1){
      this.plugStatus = 0;
      this.commandArray[7] = "0";
      this.string= this.commandArray.toString();
    }else {
      this.plugStatus = 1;
      this.commandArray[7] = "1";
      this.string= this.commandArray.toString();
    }
  }

  
    inputChange(){
      this.commandArray[1]= this.calculateForm.controls['latitude'].value;
      this.commandArray[2]= this.calculateForm.controls['longitude'].value;
      this.commandArray[3]= this.calculateForm.controls['speed'].value;
      this.commandArray[6]= this.calculateForm.controls['battery_status'].value;
      this.string= this.commandArray.toString();
    }

  save(){
    // this.dialogRef.close({ event: 'close', data: this.string });
    this.submitClicked.emit(this.string);
  }

}
