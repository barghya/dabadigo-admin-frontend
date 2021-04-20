import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-calculate-demo-device-container',
  templateUrl: './calculate-demo-device-container.component.html',
  styleUrls: ['./calculate-demo-device-container.component.scss']
})
export class CalculateDemoDeviceContainerComponent implements OnInit {
  deviceimei: string;
  devicedata: string;
  constructor(public dialogRef: MatDialogRef<CalculateDemoDeviceContainerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,) {
    this.deviceimei = data.device_imei;
    this.devicedata = data.device_data;
   }

  ngOnInit() {
  }
  Canceloption(){
    this.dialogRef.close();
  }
  submitClicked(data:string){
    this.dialogRef.close({ event: 'close', data});
  }
}
