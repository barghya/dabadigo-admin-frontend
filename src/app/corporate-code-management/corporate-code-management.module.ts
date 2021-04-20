import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateCodeManagementRoutingModule } from './corporate-code-management-routing.module';
import { CorporateCodeManagementComponent } from './page/corporate-code-management/corporate-code-management.component';
import { CodeListComponent } from './component/code-list/code-list.component';
import { CodeListContainerComponent } from './container/code-list-container/code-list-container.component';
import { CodeAddComponent } from './component/code-add/code-add.component';
import { CodeAddContainerComponent } from './container/code-add-container/code-add-container.component';
import { CodeEditContainerComponent } from './container/code-edit-container/code-edit-container.component';
import { CodeEditComponent } from './component/code-edit/code-edit.component';
import { MatFormFieldModule, MatIconModule, MatSortModule, MatTableModule, MatSelectModule, MatButtonModule, MatCardModule, MatBottomSheetModule, MatInputModule, MatDatepickerModule, MatPaginatorModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../directives/directives.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CorporateCodeManagementComponent, CodeListComponent, CodeListContainerComponent, CodeAddComponent, CodeAddContainerComponent, CodeEditContainerComponent, CodeEditComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatTooltipModule,
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
    CorporateCodeManagementRoutingModule
  ]
})
export class CorporateCodeManagementModule { }
