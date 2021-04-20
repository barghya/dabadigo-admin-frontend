import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomainData } from 'src/app/models/domainModel';
import { Observable } from 'rxjs';
import { addDemoDevice } from 'src/app/models/iotControllereModel';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CalculateDemoDeviceContainerComponent } from '../../container/calculate-demo-device-container/calculate-demo-device-container.component';

@Component({
  selector: 'app-edit-demo-device',
  templateUrl: './edit-demo-device.component.html',
  styleUrls: ['./edit-demo-device.component.scss']
})
export class EditDemoDeviceComponent implements OnInit {
  demodeviceeditForm : FormGroup;
  @Output() editevent = new EventEmitter();
  @Input() singleDevice$: Observable<addDemoDevice>;
  @Output() cancelDemoDeviceevent = new EventEmitter();
  @Output() Calculateevent = new EventEmitter();
  @Input() deviceStatus$: Observable<DomainData[]>;
  device_data: string;
  device_Imei: string;
  result: string;
  private subs = new SubSink();
  viewDialog: MatDialogRef<CalculateDemoDeviceContainerComponent>;
  
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private router: Router, private store: Store<AppState>,public dialog: MatDialog) { }

  ngOnInit() {
    this.demodeviceeditForm = this.formbuilder.group({
      device_imei: ['', [Validators.required]],
      device_data: ['', [Validators.required]],
      
    })

     this.subs.add(this.singleDevice$.subscribe(
      (data) => {
        if (!!data) {
          var patchData = {...data};
        
          this.demodeviceeditForm.patchValue(data);
          this.subs.add(this.store.select(state=> state.iot_bypass.singleDevice).subscribe(
            (data)=>{
              console.log("single device", data);
              if(!!data){
                this.device_data = data.device_data;
                this.device_Imei = data.device_imei;
              }
            }
          ))
          

          
         
          this.device_imei.disable();
        }
      }
    ));
  }

  get device_imei(): FormControl {
    return <FormControl> this.demodeviceeditForm.get('device_imei');
  }


  cancelDemoDevice() {
    this.cancelDemoDeviceevent.emit();
  }

  edit(){
    this.singleDevice$.pipe(take(1)).subscribe(
      (data) => {
        var formData = {...data};
        formData.device_imei = this.demodeviceeditForm.controls.device_imei.value;
        formData.device_data = this.demodeviceeditForm.controls.device_data.value;
        
        this.editevent.emit(formData);
      }
    );
  }

  calculateDemoDevice(){
    // this.Calculateevent.emit(+this.demodeviceeditForm.controls['device_imei'].value);
    this.viewDialog = this.dialog.open(CalculateDemoDeviceContainerComponent, {
      data: {

        device_imei: this.device_Imei,
        device_data: this.device_data,

      },
      disableClose: true,
      width: "90%",
    });
    
    this.viewDialog.afterClosed().subscribe(result => {
      if(!!result) {
      this.demodeviceeditForm.controls.device_data.patchValue(result["data"]);
      }
    });  
  
  }

}
