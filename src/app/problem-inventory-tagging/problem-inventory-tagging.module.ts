import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemInventoryTaggingRoutingModule } from './problem-inventory-tagging-routing.module';
import { ProblemInventoryTaggingComponent } from './page/problem-inventory-tagging/problem-inventory-tagging.component';
import { ProblemInventoryTaggingMainComponent } from './component/problem-inventory-tagging-main/problem-inventory-tagging-main.component';
import { ProblemInventoryTaggingMainContainerComponent } from './container/problem-inventory-tagging-main-container/problem-inventory-tagging-main-container.component';
import { MatTableModule, MatButtonModule, MatSortModule, MatInputModule, MatCheckboxModule, MatIconModule, MatSelectModule, MatCardModule, MatDatepickerModule, MatPaginatorModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { MatFormFieldModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ProblemInventoryTaggingComponent, ProblemInventoryTaggingMainComponent, ProblemInventoryTaggingMainContainerComponent],
  imports: [
    CommonModule,
    ProblemInventoryTaggingRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    DirectivesModule,
    MatAutocompleteModule,
  ]
})
export class ProblemInventoryTaggingModule { }
