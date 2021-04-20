import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.scss']
})
export class LoginMainComponent implements OnInit {

  @Output() login = new EventEmitter<LoginModel>();
  LoginForm: FormGroup;
  loginflag: boolean = true;
  constructor(private fb: FormBuilder) { 
  }


  ngOnInit() {
    this.LoginForm = this.fb.group({
      user_name: ['',Validators.required],
      password: ['',Validators.required]
    });
    
  }

  onSubmit(){
    var data: LoginModel = {
      username: this.LoginForm.value.user_name,
      password: this.LoginForm.value.password
    }
    console.log(data);
    this.login.emit(data);
  }
  
}
