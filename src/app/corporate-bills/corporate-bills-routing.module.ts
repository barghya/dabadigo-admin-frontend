import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateBillsComponent } from './page/corporate-bills/corporate-bills.component';
import { CorporateBillsMainContainerComponent } from './container/corporate-bills-main-container/corporate-bills-main-container.component';
import { CorporateBillsDetailContainerComponent } from './container/corporate-bills-detail-container/corporate-bills-detail-container.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateBillsComponent,
    children: [
      {
        path: '',
        redirectTo: 'corporate-bills-main',
        pathMatch: 'full',
      }, 
      {
        path: 'corporate-bills-main',
        component: CorporateBillsMainContainerComponent,
      },
      {
        path: 'corporate-bills-detail/:id',
        component: CorporateBillsDetailContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateBillsRoutingModule { }
