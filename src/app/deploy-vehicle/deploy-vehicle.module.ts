import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeployVehicleComponent } from './page/deploy-vehicle/deploy-vehicle.component';
import { DeployVehicleMainContainerComponent } from './container/deploy-vehicle-main-container/deploy-vehicle-main-container.component';
import { DeployVehicleMainComponent } from './component/deploy-vehicle-main/deploy-vehicle-main.component';
import { DeployVehicleRoutingModule } from './deploy-vehicle-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule, MatTableModule, MatRadioModule, MatExpansionModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from '../directives/directives.module';
import { AddDeployRequestContainerComponent } from './container/add-deploy-request-container/add-deploy-request-container.component';
import { AddDeployRequestComponent } from './component/add-deploy-request/add-deploy-request.component';
import { SelectVehiclePopoverContainerComponent } from './container/select-vehicle-popover-container/select-vehicle-popover-container.component';
import { SelectVehiclePopoverComponent } from './component/select-vehicle-popover/select-vehicle-popover.component';
import { DeployVehicleActionComponent } from './component/deploy-vehicle-action/deploy-vehicle-action.component';
import { DeployVehicleActionContainerComponent } from './container/deploy-vehicle-action-container/deploy-vehicle-action-container.component';


@NgModule({
  declarations: [DeployVehicleComponent, DeployVehicleMainContainerComponent, DeployVehicleMainComponent, AddDeployRequestContainerComponent, AddDeployRequestComponent, SelectVehiclePopoverContainerComponent, SelectVehiclePopoverComponent, DeployVehicleActionComponent, DeployVehicleActionContainerComponent],
  imports: [
    CommonModule,
    DeployVehicleRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    DirectivesModule,
  ],
  entryComponents: [SelectVehiclePopoverContainerComponent]
})
export class DeployVehicleModule { }
