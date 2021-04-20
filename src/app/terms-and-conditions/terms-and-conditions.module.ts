import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsPageComponent } from './page/terms-and-conditions-page/terms-and-conditions-page.component';
import { TermsAndConditionsComponent } from './component/terms-and-conditions/terms-and-conditions.component';
import { TermsAndConditionsContainerComponent } from './container/terms-and-conditions-container/terms-and-conditions-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [TermsAndConditionsPageComponent, TermsAndConditionsComponent, TermsAndConditionsContainerComponent],
  imports: [
    CommonModule,
    TermsAndConditionsRoutingModule,
    FlexLayoutModule,
    MatTableModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatPaginatorModule, 
    MatSortModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class TermsAndConditionsModule { }
