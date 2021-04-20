import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceJobsRoutingModule } from './maintenance-jobs-routing.module';
import { MaintenanceJobsComponent } from './page/maintenance-jobs/maintenance-jobs.component';
import { MaintenanceJobsMainContainerComponent } from './container/maintenance-jobs-main-container/maintenance-jobs-main-container.component';
import { MaintenanceJobsMainComponent } from './component/maintenance-jobs-main/maintenance-jobs-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatIconModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from '../directives/directives.module';
import { MaintenanceJobDetailComponent } from './component/maintenance-job-detail/maintenance-job-detail.component';
import { MaintenanceJobDetailContainerComponent } from './container/maintenance-job-detail-container/maintenance-job-detail-container.component';
import { MaintenanceJobCreateComponent } from './component/maintenance-job-create/maintenance-job-create.component';
import { MaintenanceJobCreateContainerComponent } from './container/maintenance-job-create-container/maintenance-job-create-container.component';
import { MaintenanceScheduleComponent } from './component/maintenance-schedule/maintenance-schedule.component';
import { MaintenanceScheduleContainerComponent } from './container/maintenance-schedule-container/maintenance-schedule-container.component';
import { FsqSearchComponent } from '../transfer-parts/container/fsq-search/fsq-search.component';
import { SharedModule } from '../common/shared.module';
import { FsqSearchDialogComponent } from './container/fsq-search-dialog-component/fsq-search-dialog-component.component';


@NgModule({
  declarations: [MaintenanceJobsComponent, MaintenanceJobsMainContainerComponent, MaintenanceJobsMainComponent, MaintenanceJobDetailComponent, MaintenanceJobDetailContainerComponent, MaintenanceJobCreateComponent, MaintenanceJobCreateContainerComponent, MaintenanceScheduleComponent, MaintenanceScheduleContainerComponent, FsqSearchDialogComponent],
  imports: [
    CommonModule,
    MaintenanceJobsRoutingModule,
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
    MatTooltipModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [FsqSearchDialogComponent]
})
export class MaintenanceJobsModule { }
