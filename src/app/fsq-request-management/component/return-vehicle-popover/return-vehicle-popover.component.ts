import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { ReturnRegion, ReturnRP } from 'src/app/models/fsqManagement';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-return-vehicle-popover',
  templateUrl: './return-vehicle-popover.component.html',
  styleUrls: ['./return-vehicle-popover.component.scss']
})
export class ReturnVehiclePopoverComponent implements OnInit {
  @Output() CancelOption = new EventEmitter();
  @Output() GetRpEvent = new EventEmitter();
  @Input() Region$: Observable<ReturnRegion[]>;
  @Input() RentalPoint$: Observable<ReturnRP[]>;
  @Output() returnVehicleEvent = new EventEmitter<number>()
  vehicleReturnForm: FormGroup;
  constructor(private store: Store<AppState>, public languageService: LanguageService, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.vehicleReturnForm = this.fb.group({
      region: ["", [Validators.required]],
      rental_point: ["", [Validators.required]]
    });
  }
  CancelOperation() {
    this.CancelOption.emit();
}
displayRegion(regionId?: number): string | undefined {
  var region: ReturnRegion = !!regionId && !!this.Region$ ? this.showRegion(regionId) : undefined;
  return region ? region.region_name  : undefined;
}
showRegion(regionId?: number): ReturnRegion {
  var region: ReturnRegion = {}
  this.Region$.pipe(take(1)).subscribe(
    data => {
      region = data.find(m => m.region_id == regionId)
    }
  );
  return region;
}
displayRP(RpId?: number): string | undefined {
  var rp: ReturnRP = !!RpId && !!this.RentalPoint$ ? this.showRP(RpId) : undefined;
  return rp ? rp.rentalpoint_name  : undefined;
}
showRP(RpId?: number): ReturnRegion {
  var rp: ReturnRP = {}
  this.RentalPoint$.pipe(take(1)).subscribe(
    data => {
      rp = data.find(m => m.rentalpoint_id == RpId)
    }
  );
  return rp;
}
getRP(data: number){
  this.GetRpEvent.emit(data);
}
returnVehicle(){
  this.returnVehicleEvent.emit(this.vehicleReturnForm.controls['rental_point'].value)
}
}
