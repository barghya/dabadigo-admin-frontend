import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { TransferRequestLoadAction, TransferRequestApproveAction, TransferRequestRejectAction, TransferRequestDeleteAction } from 'src/app/store/actions/transfer_parts.action';
import { Observable } from 'rxjs';
import { PartsTransferItem, TransferRequestActionPayload } from 'src/app/models/transferpartsModel';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-parts-list-container',
  templateUrl: './transfer-parts-list-container.component.html',
  styleUrls: ['./transfer-parts-list-container.component.scss']
})
export class TransferPartsListContainerComponent implements OnInit {
  partsTransferList$: Observable<PartsTransferItem[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new TransferRequestLoadAction({
      past_flag: false
    }))

    this.partsTransferList$ = this.store.select(state => state.transferParts.partsTransferList);
  }

  ShowHidePastData(past_flag: boolean) {
    this.store.dispatch(new TransferRequestLoadAction({
      past_flag: past_flag
    }))
  }
  Approve(data: TransferRequestActionPayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new TransferRequestApproveAction({
          admn_user_id: admn_user_id,
          parts_transfer_id: data.parts_transfer_id,
          past_flag: data.past_flag
        }))
      }
    )
  }

  Reject(data: TransferRequestActionPayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new TransferRequestRejectAction({
          admn_user_id: admn_user_id,
          parts_transfer_id: data.parts_transfer_id,
          past_flag: data.past_flag
        }))
      }
    )
  }

  Delete(data: TransferRequestActionPayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new TransferRequestDeleteAction({
          admn_user_id: admn_user_id,
          parts_transfer_id: data.parts_transfer_id,
          past_flag: data.past_flag
        }))
      }
    )
  }

  AddTransfer() {
    this.router.navigate(["transfer-parts", "add-transfer-request"]);
  }
}
