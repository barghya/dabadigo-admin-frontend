import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentManagementRoutingModule } from './incident-management-routing.module';
import { IncidentManagementComponent } from './page/incident-management/incident-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { ReportListComponent } from './component/report-list/report-list.component';
import { ReportPopoverContainerComponent } from './container/report-popover-container/report-popover-container.component';
import { ReportPopoverComponent } from './component/report-popover/report-popover.component';
import { ReportListContainerComponent } from './container/report-list-container/report-list-container.component';
import { ReportDetailPopoverComponent } from './component/report-detail-popover/report-detail-popover.component';
import { ReportDetailPopoverContainerComponent } from './container/report-detail-popover-container/report-detail-popover-container.component';
import { AngularOpenlayersModule } from "ngx-openlayers";
import { TaskDetailPopoverComponent } from './component/task-detail-popover/task-detail-popover.component';
import { TaskDetailPopoverContainerComponent } from './container/task-detail-popover-container/task-detail-popover-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [IncidentManagementComponent, ReportListContainerComponent, ReportListComponent, ReportPopoverContainerComponent, ReportPopoverComponent, ReportDetailPopoverComponent, ReportDetailPopoverContainerComponent, TaskDetailPopoverComponent, TaskDetailPopoverContainerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
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
    IncidentManagementRoutingModule,
    MatCardModule,
    AngularOpenlayersModule,
    MatTooltipModule
  ],
  entryComponents: [ReportPopoverContainerComponent, ReportDetailPopoverContainerComponent, ReportDetailPopoverComponent]
})
export class IncidentManagementModule { }
