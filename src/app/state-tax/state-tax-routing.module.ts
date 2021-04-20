import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateTaxComponent } from './page/state-tax/state-tax.component';
import { StateTaxMainContainerComponent } from './container/state-tax-main-container/state-tax-main-container.component';


const routes: Routes = [
  {
    path: '',
    component: StateTaxComponent,
    children: [
      {
        path: '',
        redirectTo: 'state-tax-main',
        pathMatch: 'full'
      },
      {
        path: 'state-tax-main',
        component: StateTaxMainContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateTaxRoutingModule { }
