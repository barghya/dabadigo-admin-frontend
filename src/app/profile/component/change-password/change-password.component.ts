import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { changePassword } from 'src/app/models/profileManagement';
import { Observable } from 'rxjs';
import { users } from 'src/app/models/userManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy{
  @Input() singleprofile$: Observable<users>;
  @Input() changepassword$: Observable<changePassword>;
  ChangePasswordForm:FormGroup
  @Output() cancelchangePassword = new EventEmitter();
  @Output() changepasswordForm = new EventEmitter<changePassword>();
  private subs = new SubSink();
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.ChangePasswordForm = this.formbuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
    {'validator': this.isMatching})
  }

  cancelChangePassword(){
    this.cancelchangePassword.emit();
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

  ChangePassword() {
    var formdata: changePassword = {
      new_password: this.ChangePasswordForm.controls.new_password.value,
      old_password: this.ChangePasswordForm.controls.old_password.value
    }
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        formdata.admn_user_id = admn_user_id;
        this.changepasswordForm.emit(formdata);
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
