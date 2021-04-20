import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferPartsComponent } from './page/transfer-parts/transfer-parts.component';
import { TransferPartsListContainerComponent } from './container/transfer-parts-list-container/transfer-parts-list-container.component';
import { TransferPartsCreateContainerComponent } from './container/transfer-parts-create-container/transfer-parts-create-container.component';


const routes: Routes = [{
  path: '',
  component: TransferPartsComponent,
  children: [
    {
      path: '',
      redirectTo: 'transfer-list',
      pathMatch: 'full'
    },
    {
      path: 'transfer-list',
      component: TransferPartsListContainerComponent,
    },
    {
      path: 'add-transfer-request',
      component: TransferPartsCreateContainerComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferPartsRoutingModule { }
