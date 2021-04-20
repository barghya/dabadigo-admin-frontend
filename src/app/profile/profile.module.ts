import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { ProfileComponent } from './page/profile/profile.component';
import { ProfileMainComponent } from './component/profile-main/profile-main.component';
import { ProfileMainContainerComponent } from './container/profile-main-container/profile-main-container.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ChangePasswordContainerComponent } from './container/change-password-container/change-password-container.component';
import { ChangeMobileNumberComponent } from './component/change-mobile-number/change-mobile-number.component';
import { ChangeMobileNumberContainerComponent } from './container/change-mobile-number-container/change-mobile-number-container.component';



@NgModule({
  declarations: [ProfileMainComponent, ProfileMainContainerComponent, ProfileComponent, ChangePasswordComponent, ChangePasswordContainerComponent, ChangeMobileNumberComponent, ChangeMobileNumberContainerComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatSelectModule
  ]
})
export class ProfileModule { }
