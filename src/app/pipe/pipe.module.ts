import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayHourMinutePipe } from './day-hour-minute/day-hour-minute.pipe';



@NgModule({
  declarations: [DayHourMinutePipe],
  imports: [
    CommonModule
  ],
  exports: [DayHourMinutePipe]
})
export class PipeModule { }
