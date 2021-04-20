import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferPartsRoutingModule } from './transfer-parts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatDialogModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from '../directives/directives.module';
import { TransferPartsComponent } from './page/transfer-parts/transfer-parts.component';
import { TransferPartsListContainerComponent } from './container/transfer-parts-list-container/transfer-parts-list-container.component';
import { TransferPartsListComponentComponent } from './component/transfer-parts-list-component/transfer-parts-list-component.component';
import { TransferPartsCreateContainerComponent } from './container/transfer-parts-create-container/transfer-parts-create-container.component';
import { TransferPartsCreateComponent } from './component/transfer-parts-create/transfer-parts-create.component';
import { FsqSearchComponent } from './container/fsq-search/fsq-search.component';
import { SharedModule } from '../common/shared.module';


@NgModule({
  declarations: [TransferPartsComponent, TransferPartsListContainerComponent, TransferPartsListComponentComponent, TransferPartsCreateContainerComponent, TransferPartsCreateComponent, FsqSearchComponent],
  imports: [
    CommonModule,
    TransferPartsRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    SharedModule,
  ],
  entryComponents: [FsqSearchComponent]
})
export class TransferPartsModule { }
