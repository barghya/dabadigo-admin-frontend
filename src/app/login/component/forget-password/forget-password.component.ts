import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel, forgetpassword } from 'src/app/models/userModel';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetpasswordForm: FormGroup;
  @Output() forgetPasswordEvent = new EventEmitter<LoginModel>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.forgetpasswordForm = this.fb.group({
      user_name: ['',Validators.required],
    });
  }
  onSubmit(){
    var data: forgetpassword ={
      username: this.forgetpasswordForm.controls['user_name'].value
    }
    this.forgetPasswordEvent.emit(data);
  }

}
