import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { parts, partID } from 'src/app/models/asset-inventoryModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { PartListLoadAction, DeletePartAction } from 'src/app/store/actions/asset_inventory.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part-main-container',
  templateUrl: './part-main-container.component.html',
  styleUrls: ['./part-main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartMainContainerComponent implements OnInit {
  partDetails$: Observable<parts[]>
  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new PartListLoadAction());
    this.partDetails$ = this.store.select(state => state.asset_inventory.Parts);
    console.log(this.partDetails$);
  }

  openadd(){
    this.router.navigate(['asset-inventory', 'add-part'])
  }

  deletePart(value: partID) {
    //console.log(value);
    this.store.dispatch(new DeletePartAction(value));
  }

  editPart(vehicle_part_id:number){
    this.router.navigate(['asset-inventory', 'edit-part', vehicle_part_id]);
  }
}
