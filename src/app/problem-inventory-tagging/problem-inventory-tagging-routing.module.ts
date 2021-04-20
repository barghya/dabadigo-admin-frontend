import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemInventoryTaggingComponent } from './page/problem-inventory-tagging/problem-inventory-tagging.component';
import { ProblemInventoryTaggingMainContainerComponent } from './container/problem-inventory-tagging-main-container/problem-inventory-tagging-main-container.component';


const routes: Routes = [
  {
    path: '',
    component: ProblemInventoryTaggingComponent,
    children: [
      {
        path: '',
        redirectTo: 'problem-inventory-tagging',
        pathMatch: 'full'
      },
      {
        path: 'problem-inventory-tagging',
        component: ProblemInventoryTaggingMainContainerComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemInventoryTaggingRoutingModule { }
