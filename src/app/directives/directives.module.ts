import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayErrorDirective } from './error/display-error.directive';
import { MatErrorComponent } from './mat-error/mat-error.component';
import { MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [
    DisplayErrorDirective,
    MatErrorComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    DisplayErrorDirective,
    MatErrorComponent
  ],
  entryComponents: [
    MatErrorComponent
  ]
})
export class DirectivesModule { }
