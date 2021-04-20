import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsAndConditionsPageComponent } from './page/terms-and-conditions-page/terms-and-conditions-page.component';
import { TermsAndConditionsContainerComponent } from './container/terms-and-conditions-container/terms-and-conditions-container.component';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'terms-and-conditions',
        pathMatch: 'full',
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsAndConditionsRoutingModule { }
