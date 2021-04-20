import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsqHubRoutingModule } from './fsq-hub-routing.module';
import { FsqHubPageComponent } from './page/fsq-hub-page/fsq-hub-page.component';
import { FsqHubComponent } from './component/fsq-hub/fsq-hub.component';
import { FsqHubContainerComponent } from './container/fsq-hub-container/fsq-hub-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatNativeDateModule, MatDialogModule, MatDatepickerModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddFsqHubComponent } from './component/add-fsq-hub/add-fsq-hub.component';
import { AddFsqHubContainerComponent } from './container/add-fsq-hub-container/add-fsq-hub-container.component';
import { EditFsqHubComponent } from './component/edit-fsq-hub/edit-fsq-hub.component';
import { EditFsqHubContainerComponent } from './container/edit-fsq-hub-container/edit-fsq-hub-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [FsqHubPageComponent,FsqHubComponent,FsqHubContainerComponent, AddFsqHubComponent, AddFsqHubContainerComponent,EditFsqHubComponent,EditFsqHubContainerComponent],
  imports: [
    CommonModule,
    FsqHubRoutingModule,
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
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatChipsModule,
  ]
})
export class FsqHubModule { }
