import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppState } from './models/appStateModel';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Userdetail } from './models/userModel';
import { ErrorModel, Error, error_repo } from './models/errorModel';
import { MatSnackBar } from '@angular/material';
import { ErrorFrameworkLoadAction } from './store/actions/domain.action';
import { SubSink } from 'subsink';
import { LanguageService } from './service/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dabadigo-admin';
  sidenavState: string = 'open';
  userdetail$: Observable<Userdetail>;
  private subs = new SubSink();
  error_framework: error_repo[];

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar, private languageService: LanguageService) {
  }

  ngOnInit() {
    this.userdetail$ = this.store.select(state => state.user.userdetail);
    this.store.dispatch(new ErrorFrameworkLoadAction());

    //Error Framework Subscribing
    this.subs.add(this.store.select(state => state.domainData.error_framework).subscribe(
      error_framework => {
        if(!!error_framework) {
          this.error_framework = error_framework;
        }
      }
    ));

    //Error Subscriptions
    this.subs.add(this.store.select(state => state.user.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.asset_inventory.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.corporate_code_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.corporate_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.corporate_request_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.coupon_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.customer_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.deploy_vehicle.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.domainData.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.fsq_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.parameter_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.pricing_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.region_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.rental_point.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.trip_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.user_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.profile_management.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.stateTaxManagement.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.transferParts.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.maintenanceJobManagement.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.problemInventoryTagging.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))

    this.subs.add(this.store.select(state => state.corporate_billing.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))
    this.subs.add(this.store.select(state => state.transferDeviceBattery.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))
    this.subs.add(this.store.select(state => state.terms_and_conditions.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))
    this.subs.add(this.store.select(state => state.franchisee_billing.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))
    this.subs.add(this.store.select(state => state.franchisee_rental_point.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))
    this.subs.add(this.store.select(state => state.franchisee_vehicle.error).subscribe(
      errors => {
        if(!!errors) {
          this.showToast(errors);
        }
      }
    ))
  }

  constructErrorMessage(errors: Error[]): string {
    var message = "";
    errors.forEach(error => {
      if(this.error_framework.length > 0){
        var errorData = this.error_framework.find(m => m.error_code == error.Code);
        if(!!errorData) {
          message += errorData.error_message;
        }
        else {
          message = this.languageService.getText("defaultErrorMessage");
        }
      }
      else {
        message = this.languageService.getText("defaultErrorMessage");
      }
    })
    return message;
  }

  async showErrorToast(errors: Error[]) {
    var message = this.constructErrorMessage(errors);
    const snackbar = await this._snackBar.open(message, "DISMISS", {
      panelClass: ["error-snackbar"],
      duration: 3000
    });
  }

  async showWarningToast(warnings: Error[]){
    var message = this.constructErrorMessage(warnings);
    const snackbar = await this._snackBar.open(message, "DISMISS", {
      panelClass: ["warning-snackbar"],
      duration: 3000
    });
  }

  async showInfoToast(infos: Error[]){
    var message = this.constructErrorMessage(infos);
    const snackbar = await this._snackBar.open(message, "DISMISS", {
      panelClass: ["info-snackbar"],
      duration: 3000
    });
  }

  async showToast(error: ErrorModel) {
    if(error.System_Errors.length > 0) {
      return await this.showErrorToast(error.System_Errors);
    }
    else if(error.Business_Errors.length > 0){
      return await this.showErrorToast(error.Business_Errors);
    }
    else if(error.Info.length > 0) {
      return await this.showInfoToast(error.Info);
    }
    else if(error.Warnings.length > 0) {
      return await this.showWarningToast(error.Warnings);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
