import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemDetails, ProblemTaggedDetails, PartsDetails, AllPartsDetails } from 'src/app/models/problem-inventory-taggingModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ProblemInventoryTaggingLoadAction, GetProblemLoadAction, UpdateProblemInventoryTaggingAction } from 'src/app/store/actions/problem_inventory_tagging.action';
import { PartsDefinitionItem } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-problem-inventory-tagging-main-container',
  templateUrl: './problem-inventory-tagging-main-container.component.html',
  styleUrls: ['./problem-inventory-tagging-main-container.component.scss']
})
export class ProblemInventoryTaggingMainContainerComponent implements OnInit {

  Problemname$: Observable<ProblemDetails[]>;
  Parts$: Observable<AllPartsDetails[]>;
  ProblemTaggedinventory$: Observable<ProblemTaggedDetails>;
  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.dispatch(new ProblemInventoryTaggingLoadAction());
    this.Problemname$ = this.store.select(state => state.problemInventoryTagging.problemDetails);
    this.Parts$ = this.store.select(state => state.problemInventoryTagging.parts);
    this.ProblemTaggedinventory$ = this.store.select(state => state.problemInventoryTagging.problemtaggedDetails);
  }

  ProblemNameChange(problem_code: number) {
    console.log(problem_code);
    this.store.dispatch(new GetProblemLoadAction({
      problem_code: problem_code
    }))
  }

  UpdateProblemInventoryTagging(data: ProblemTaggedDetails) {
    console.log(data);
    this.store.dispatch(new UpdateProblemInventoryTaggingAction(data));
  }

}
