import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { LoginMainComponent } from './component/login-main/login-main.component';
import { LoginMainContainerComponent } from './container/login-main-container/login-main-container.component';
import { LoginRoutingModule } from './login-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FirstLoginPasswordchangeComponent } from './component/first-login-passwordchange/first-login-passwordchange.component';
import { FirstLoginPasswordchangeContainerComponent } from './container/first-login-passwordchange-container/first-login-passwordchange-container.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ForgetPasswordContainerComponent } from './container/forget-password-container/forget-password-container.component';

@NgModule({
  declarations: [
    LoginComponent, 
    LoginMainComponent, 
    LoginMainContainerComponent, 
    FirstLoginPasswordchangeComponent, 
    FirstLoginPasswordchangeContainerComponent, 
    ForgetPasswordComponent, 
    ForgetPasswordContainerComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class LoginModule { }
