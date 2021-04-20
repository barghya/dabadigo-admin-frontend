import { Directive, ElementRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { MatFormField } from '@angular/material';
import { MatErrorComponent } from '../mat-error/mat-error.component';
import { merge, Observable, fromEvent } from 'rxjs';
import { shareReplay, debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Directive({
  selector: 'mat-form-field:not([novalidate])'
})
export class DisplayErrorDirective implements AfterViewInit {

  ref: ComponentRef<MatErrorComponent>;
  subs = new SubSink();
  
  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private formField: MatFormField
  ) { }
  
  public ngAfterViewInit()
  {
    let controlBlurs: Observable<any> = fromEvent((this.formField._control as any)._elementRef.nativeElement, 'blur').pipe(shareReplay(1))

    this.subs.add(merge(
      controlBlurs,
      this.formField._control.ngControl.control.statusChanges,
    ).pipe(debounceTime(250)).subscribe(
        res=>this.onChange(res)
    ));
  }

  public onChange(res) {
    if (this.formField._control.ngControl.control.errors)
    {
      var errors = this.formField._control.ngControl.control.errors;
      if(errors.required){
        this.setError('This field is required');
      }
      else if(errors.email){
        this.setError('Invalid email format');
      }
      else if(errors.pincode){
        this.setError('Invalid pincode');
      }
      else if(errors.phonenumber){
        this.setError('Invalid phone number');
      }
      else if(errors.percentage){
        this.setError('Value Must Be Less Than 100');
      }
      else if(errors.max){
        console.log(errors);
        this.setError('Maximum Possible Value: ' + errors.max.max);
      }
      else if(errors.totalMax){
        this.setError('Total Payment Amount Must Not Exceed Balance Amount');
      }
      else if(errors.decimal){
        this.setError('Only Decimal Value Allowed');
      }
      else if(errors.currency){
        this.setError('Only Currency Values Allowed');
      }
      else if(errors.bankaccount){
        this.setError('Invalid Bank Account Number');
      }
      else if(errors.leadingspace){
        this.setError('Invalid Data');
      }
      else if(errors.maxlength){
        this.setError('Maximum Length Limit :' + errors.maxlength.requiredLength + ", Provided :" + errors.maxlength.actualLength );
      }
      else if(errors.greaterthenzero) {
        this.setError('Value Must Be Greater Then Zero');
      }
      else if(errors.duplicateUsername) {
        this.setError('Duplicate Username')
      }
      else if(errors.duplicatePart) {
        this.setError('Duplicate Part Tag')
      }
      else if(errors.duplicatePartCode) {
        this.setError('Duplicate Part Code')
      }
      else if(errors.duplicateDevicecode) {
        this.setError('Duplicate Device Tag')
      }
      else if(errors.duplicateCorporateCode) {
        this.setError('Duplicate Corporate Code')
      }
      else if (errors.duplicateBatteryTag) {
        this.setError('Duplicate Battery');
      }
      else if(errors.duplicateImeiCode) {
        this.setError('Duplicate IMEI Number')
      }
      else if(errors.duplicateAssetcode){
        this.setError('Duplicate Asset Code')
      }
      else if(errors.duplicateVehicleID){
        this.setError('Duplicate Vehicle ID')
      }
      else if(errors.duplicatePartnerCode){
        this.setError('Duplicate Partner Code')
      }
      else if(errors.duplicateCouponCode) {
        this.setError('Duplicate Coupon Code')
      }
      else if(errors.integer) {
        this.setError('Field Must Be Integer');
      }
      else if(errors.duplicateRegioncode) {
        this.setError('Duplicate Region Code')
      }
      else if(errors.rentalpoint_shortcode) {
        this.setError('Duplicate Rental Point Short Code')
      }
      else if(errors.hours) {
        this.setError('Hour Must Be Less Than 23');
      }
      else if (errors.minutes) {
        this.setError('Minutes Must Be Less Than 60');
      }
      else if (errors.second) {
        this.setError('Second must Be Less Than 60');
      }
      else if(errors.duplicateparameterkey) {
        this.setError('Duplicate Parameter Key');
      }
      else if(errors.duplicateHubcode) {
        this.setError('Duplicate Hub Code');
      }
    }
    else
    {
      this.setError('')
    }
  }

  setError(text: string) {
    if (!this.ref) {
     const factory = this.resolver.resolveComponentFactory(MatErrorComponent);
     this.formField._elementRef
     this.ref = this.vcr.createComponent(factory);
   }
   this.ref.instance.message=text;
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
