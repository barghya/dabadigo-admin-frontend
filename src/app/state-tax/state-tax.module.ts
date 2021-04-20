import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateTaxRoutingModule } from './state-tax-routing.module';
import { StateTaxMainComponent } from './component/state-tax-main/state-tax-main.component';
import { StateTaxMainContainerComponent } from './container/state-tax-main-container/state-tax-main-container.component';
import { StateTaxComponent } from './page/state-tax/state-tax.component';
import { MatTableModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatInputModule, MatSelectModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StateTaxModifyComponent } from './component/state-tax-modify/state-tax-modify.component';
import { DirectivesModule } from '../directives/directives.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [StateTaxMainComponent, StateTaxMainContainerComponent, StateTaxComponent, StateTaxModifyComponent],
  imports: [
    CommonModule,
    StateTaxRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    DirectivesModule,
    MatSortModule,
  ]
})
export class StateTaxModule { }
