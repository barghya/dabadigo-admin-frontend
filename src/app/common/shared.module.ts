import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatIconModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { SearchSelectComponent } from './search-select/search-select.component';



@NgModule({
  declarations: [
    SearchSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [
    SearchSelectComponent
  ]
})
export class SharedModule { }
