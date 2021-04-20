import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FsqHubPageComponent } from './page/fsq-hub-page/fsq-hub-page.component';
import { FsqHubContainerComponent } from './container/fsq-hub-container/fsq-hub-container.component';
import { AddFsqHubContainerComponent } from './container/add-fsq-hub-container/add-fsq-hub-container.component';
import { EditFsqHubContainerComponent } from './container/edit-fsq-hub-container/edit-fsq-hub-container.component';


const routes: Routes = [
  {
    path: '',
    component: FsqHubPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'fsq-hub',
        pathMatch: 'full'
      },
      {
        path: 'fsq-hub',
        component: FsqHubContainerComponent,
      },
      {
        path: 'add-fsq-hub',
        component: AddFsqHubContainerComponent,
      },
      {
        path: 'edit-fsq-hub/:id',
        component: EditFsqHubContainerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FsqHubRoutingModule { }
