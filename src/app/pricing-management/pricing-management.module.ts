import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingManagementRoutingModule } from './pricing-management-routing.module';
import { PricingManagementComponent } from './page/pricing-management/pricing-management.component';
import { PricingMainComponent } from './component/pricing-main/pricing-main.component';
import { PricingMainContainerComponent } from './container/pricing-main-container/pricing-main-container.component';
import { PricingAddContainerComponent } from './container/pricing-add-container/pricing-add-container.component';
import { PricingAddComponent } from './component/pricing-add/pricing-add.component';
import { PricingEditComponent } from './component/pricing-edit/pricing-edit.component';
import { PricingEditContainerComponent } from './container/pricing-edit-container/pricing-edit-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { BatterySwapPricingAddComponent } from './component/battery-swap-pricing-add/battery-swap-pricing-add.component';
import { BatterySwapPricingEditComponent } from './component/battery-swap-pricing-edit/battery-swap-pricing-edit.component';
import { BatterySwapPricingAddContainerComponent } from './container/battery-swap-pricing-add-container/battery-swap-pricing-add-container.component';
import { BatterySwapPricingEditContainerComponent } from './container/battery-swap-pricing-edit-container/battery-swap-pricing-edit-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [PricingManagementComponent, PricingMainComponent, PricingMainContainerComponent, PricingAddContainerComponent, PricingAddComponent, PricingEditComponent, PricingEditContainerComponent, BatterySwapPricingAddComponent, BatterySwapPricingEditComponent, BatterySwapPricingAddContainerComponent, BatterySwapPricingEditContainerComponent],
  imports: [
    CommonModule,
    PricingManagementRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatSelectModule
  ]
})
export class PricingManagementModule { }
