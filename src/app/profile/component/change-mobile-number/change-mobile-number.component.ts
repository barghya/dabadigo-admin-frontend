import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { changeMobile } from 'src/app/models/profileManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-change-mobile-number',
  templateUrl: './change-mobile-number.component.html',
  styleUrls: ['./change-mobile-number.component.scss']
})
export class ChangeMobileNumberComponent implements OnInit {

  ChangeMobileNoForm: FormGroup;

  @Output() cancel = new EventEmitter();
  @Output() changeMobileNumber = new EventEmitter();

  constructor(public languageService: LanguageService, private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.ChangeMobileNoForm = this.fb.group({
      password: ['', [Validators.required]],
      new_mobile_no: ['', [Validators.required, Ms3Validators.phonenumber]]
    })
  }

  cancelChangeMobileNo() {
    this.cancel.emit();
  }

  ChangeMobileNo() {
    var formData: changeMobile = {
      password: this.ChangeMobileNoForm.controls.password.value,
      contact_phone: this.ChangeMobileNoForm.controls.new_mobile_no.value,
    }
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        if(!!admn_user_id) {
          formData.admn_user_id = admn_user_id;
          console.log(admn_user_id);
          this.changeMobileNumber.emit(formData);
        }
      }
    )
  }

}
