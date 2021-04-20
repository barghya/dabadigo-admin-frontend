import { ProblemInventorytaggingMain } from "src/app/models/problem-inventory-taggingModel";
import { ProblemInventoryTaggingAction, ProblemInventoryTaggingActionTypes } from '../actions/problem_inventory_tagging.action';

const initialState: ProblemInventorytaggingMain = {
    error: undefined,
    loading: false,
    problemtaggedDetails: undefined,
    problemDetails: [],
    parts: [],
}

export function ProblemInventoryTaggingReducer(state: ProblemInventorytaggingMain = initialState, action: ProblemInventoryTaggingAction) {
    switch(action.type) {
        //Get problem by code
        case ProblemInventoryTaggingActionTypes.Get_Problem_Load_Action:
            return { ...state, loading: true, problemtaggedDetails: undefined };
        case ProblemInventoryTaggingActionTypes.Get_Problem_Load_Success_Action:
            return { ...state, loading: false, problemtaggedDetails: action.payload };
        case ProblemInventoryTaggingActionTypes.Get_Problem_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Get All Problems/ Problem Inventory tagging Load Action
        case ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Action:
            return { ...state, loading: true };
        case ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Success_Action:
            return { ...state, loading: false, problemDetails: action.payload[0], parts: action.payload[1] };
        case ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Action:
            return { ...state, loading: true, problemtaggedDetails: undefined };
        case ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Success_Action:
            return { ...state, loading: false };
        case ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}