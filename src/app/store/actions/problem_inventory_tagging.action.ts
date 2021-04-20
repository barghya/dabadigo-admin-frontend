import { Action } from '@ngrx/store';
import { GetProblemByCodeService, ProblemDetails, ProblemTaggedDetails } from 'src/app/models/problem-inventory-taggingModel';
import { ErrorModel } from 'src/app/models/errorModel';

export enum ProblemInventoryTaggingActionTypes {
    //Get Problem by code
    Get_Problem_Load_Action = "[PROBLEMTAGGING] Get Problem Load Action",
    Get_Problem_Load_Success_Action = "[PROBLEMTAGGING] Get Problem Load Success Action",
    Get_Problem_Load_Failure_Action = "[PROBLEMTAGGING] Get Problem Load Failure Action",
    //Get All Problems/ Problem Inventory tagging Load Action
    Problem_Inventory_Tagging_Load_Action = "[PROBLEMTAGGING] Problem Inventory Tagging Load Action",
    Problem_Inventory_Tagging_Load_Success_Action = "[PROBLEMTAGGING] Problem Inventory Tagging Load Success Action",
    Problem_Inventory_Tagging_Load_Failure_Action = "[PROBLEMTAGGING] Problem Inventory Tagging Load Failure Action",
    //Update Problem inventory tagging
    Update_Problem_InventoryTagging_Action = "[PROBLEMTAGGING] Update Problem Inventory Tagging Action",
    Update_Problem_InventoryTagging_Success_Action = "[PROBLEMTAGGING] Update Problem Inventory Tagging Success Action",
    Update_Problem_InventoryTagging_Failure_Action = "[PROBLEMTAGGING] Update Problem Inventory Tagging Failure Action",
}

export class GetProblemLoadAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Get_Problem_Load_Action;
    constructor(public payload: GetProblemByCodeService) {}
}

export class GetProblemLoadSuccessAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Get_Problem_Load_Success_Action;
    constructor(public payload: ProblemTaggedDetails) {}
}

export class GetProblemLoadFailureAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Get_Problem_Load_Failure_Action;
    constructor(public payload: ErrorModel) { }
}

//Get All Problems/ Problem Inventory tagging Load Action
export class ProblemInventoryTaggingLoadAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Action;
}

export class ProblemInventoryTaggingLoadSuccessAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Success_Action;
    constructor( public payload: any ) { }
}

export class ProblemInventoryTaggingLoadFailureAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Failure_Action;
    constructor( public payload: ErrorModel ) { }
}

//Update Problem inventory tagging
export class UpdateProblemInventoryTaggingAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Action;
    constructor(public payload: ProblemTaggedDetails) {console.log(this.type)}
}

export class UpdateProblemInventoryTaggingSuccessAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Success_Action;
    constructor() { console.log(this.type)}
}

export class UpdateProblemInventoryTaggingFailureAction implements Action {
    readonly type = ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Failure_Action;
    constructor(public payload: ErrorModel) { console.log(this.type) }
}
export type ProblemInventoryTaggingAction = GetProblemLoadAction
    | GetProblemLoadSuccessAction
    | GetProblemLoadFailureAction
    | ProblemInventoryTaggingLoadAction
    | ProblemInventoryTaggingLoadSuccessAction
    | ProblemInventoryTaggingLoadFailureAction
    | UpdateProblemInventoryTaggingAction
    | UpdateProblemInventoryTaggingSuccessAction
    | UpdateProblemInventoryTaggingFailureAction