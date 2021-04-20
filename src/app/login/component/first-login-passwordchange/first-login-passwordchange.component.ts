import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SubSink } from 'subsink';
import { firsttimepasswordchange } from 'src/app/models/userModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-first-login-passwordchange',
  templateUrl: './first-login-passwordchange.component.html',
  styleUrls: ['./first-login-passwordchange.component.scss']
})
export class FirstLoginPasswordchangeComponent implements OnInit, OnDestroy{
  @Output() cancelPassword = new EventEmitter();
  @Output() firsttimechangepasswordForm = new EventEmitter<firsttimepasswordchange>();
  FirsttimechangePasswordForm:FormGroup
  private subs = new SubSink();
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.FirsttimechangePasswordForm = this.formbuilder.group({
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
    {'validator': this.isMatching})
  }

  isMatching(group: FormGroup){
    var firstPassword = group.controls['new_password'].value;
    var secondPassword = group.controls['confirm_password'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      return { "pw_mismatch": true };
    } else{
      return null;
    }
  }

  cancelChangePassword(){
    this.cancelPassword.emit()
  }

  FirstTimeChangePassword() {
    var formdata: firsttimepasswordchange = {
      new_password: this.FirsttimechangePasswordForm.controls.new_password.value
    }
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        formdata.admn_user_id = admn_user_id;
        console.log(formdata);
        
        this.firsttimechangepasswordForm.emit(formdata);
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
