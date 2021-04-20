import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateCodeManagementComponent } from './page/corporate-code-management/corporate-code-management.component';
import { CodeListContainerComponent } from './container/code-list-container/code-list-container.component';
import { CodeAddContainerComponent } from './container/code-add-container/code-add-container.component';
import { CodeEditContainerComponent } from './container/code-edit-container/code-edit-container.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateCodeManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'code-list',
        pathMatch: 'full',
      },
      {
        path: 'code-list',
        component: CodeListContainerComponent,
      },
      {
        path: 'add-code',
        component: CodeAddContainerComponent,
      },
      {
        path: 'edit-code/:id',
        component: CodeEditContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCodeManagementRoutingModule { }
