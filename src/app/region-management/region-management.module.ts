import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionManagementRoutingModule } from './region-management-routing.module';
import { RegionManagementComponent } from './page/region-management/region-management.component';
import { RegionManagementMainComponent } from './component/region-management-main/region-management-main.component';
import { RegionManagementMainContainerComponent } from './container/region-management-main-container/region-management-main-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { AddRegionComponent } from './component/add-region/add-region.component';
import { AddRegionContainerComponent } from './container/add-region-container/add-region-container.component';
import { EditRegionComponent } from './component/edit-region/edit-region.component';
import { EditRegionContainerComponent } from './container/edit-region-container/edit-region-container.component';
import { DirectivesModule } from '../directives/directives.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [RegionManagementComponent, RegionManagementMainComponent, RegionManagementMainContainerComponent, AddRegionComponent, AddRegionContainerComponent, EditRegionComponent, EditRegionContainerComponent],
  imports: [
    CommonModule,
    RegionManagementRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    AngularOpenlayersModule,
    DirectivesModule
  ]
})
export class RegionManagementModule { }
