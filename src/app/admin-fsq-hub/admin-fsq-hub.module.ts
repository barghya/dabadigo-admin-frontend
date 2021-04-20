import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFsqHubRoutingModule } from './admin-fsq-hub-routing.module';
import { AdminFsqHubMainComponent } from './component/admin-fsq-hub-main/admin-fsq-hub-main.component';
import { AdminFsqHubMainContainerComponent } from './container/admin-fsq-hub-main-container/admin-fsq-hub-main-container.component';
import { AdminFsqHubComponent } from './page/admin-fsq-hub/admin-fsq-hub.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AdminFsqHubMainComponent, AdminFsqHubMainContainerComponent, AdminFsqHubComponent],
  imports: [
    CommonModule,
    AdminFsqHubRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
  ]
})
export class AdminFsqHubModule { }
