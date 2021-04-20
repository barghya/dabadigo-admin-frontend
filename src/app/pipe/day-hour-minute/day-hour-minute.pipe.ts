import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayHourMinute'
})
export class DayHourMinutePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value > 0){
      var hours: number = Math.floor(value / 60);
      var minutes: number = Math.floor(value % 60);
      var days: number = Math.floor(hours / 24);
      hours = hours % 24;
  
      if(days == 0 && hours == 0) {
        return minutes + "M";
      }
      else if(days == 0) {
        return hours + "H " + minutes + "M";
      }
      else {
        return days + "D " + hours + "H " + minutes + "M";
      }
    }else{
      return "0M";
    }
  }

}
