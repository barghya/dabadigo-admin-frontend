import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { isNumber } from 'util';

export class Ms3Validators {
    
    constructor(){ }

    static MaxTotalAmountValidation = (balance_amount: number): ValidatorFn => {
        return (fg: FormGroup) => {
            var amount = fg.get('amount').value;
            var adjust_amount = fg.get('adjust_amount').value;
            amount = !!amount ? +amount : 0;
            adjust_amount = !!adjust_amount ? +adjust_amount : 0;
            var total_amount = amount + adjust_amount;
            console.log(total_amount > balance_amount);
            if(total_amount > balance_amount){
                console.log("Error");
                return { totalMax: true }
            }
            else {
                return null;
            }
        }
    }

    static percentage(c: AbstractControl) : {[key: string] : boolean} | null {
        if(c.value != null && (isNaN(c.value) || c.value > 100)){
            return {'percentage': true};
        }
    }

    static email(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'email': true};
        }
        return null;
    }

    static pincode(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'pincode': true};
        }
        return null;
    }

    static bankaccount(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'bankaccount': true};
        }
        return null;
    }

    static phonenumber(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]{10}$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'phonenumber': true};
        }
        return null;
    }

    static nonleadingspace(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[A-Za-z0-9].*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'leadingspace': true};
        }
        return null;
    }

    static decimal(c: AbstractControl): {[key: string] : boolean} | null {
        //var test = regexp.test(this.value);
        if(c.value != null && isNaN(c.value)){
            return {'decimal': true};
        }
        return null;
    }

    static Currency(c: AbstractControl): {[key: string] : boolean} | null {
        var regexp = new RegExp(/^\d+(\.\d{1,2}){0,1}$/);
        if(!!c.value && c.value != null && !regexp.test(c.value)){
            return {'currency': true};
        }
        return null;
    }
    static GreaterThenZero(c: AbstractControl): {[key: string] : boolean} | null {
        if(c.value != null && isNaN(c.value)) {
            // console.log("is not a number");
            // console.log(c.value);
            return {'greaterthenzero': true}
        } 
        else if(c.value <= 0) {
            // console.log("form zero");
            // console.log(c.value);
            return {'greaterthenzero': true}
        }
        return null;
    }

    static integer(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'integer': true};
        }
        return null;
    }

    static hours(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]{2}$/);
        //var test = regexp.test(this.value);
        if(c.value != null && (!(regexp.test(c.value)) || +c.value >= 24)){
            return {'hours': true};
        }
        return null;
    }

    static minutes(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]{2}$/);
        //var test = regexp.test(this.value);
        if(c.value != null && (!(regexp.test(c.value)) || +c.value >= 60)){
            return {'minutes': true};
        }
        return null;
    }

    static second(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]{2}$/);
        //var test = regexp.test(this.value);
        if(c.value != null && (!(regexp.test(c.value)) || +c.value >= 60)){
            return {'second': true};
        }
        return null;
    }


}
