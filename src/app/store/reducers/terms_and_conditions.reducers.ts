import { TermsandConditionsMain } from "src/app/models/termsandconditionsModel";
import { TermsandConditionsAction, TermsandConditionsActionTypes } from '../actions/term_and_conditions.action';

const initialState: TermsandConditionsMain = {
    loading: false,
    error: undefined,
    getTermsandConditions: [],
    singleTandC: undefined,
}

export function TermsandConditionsReducer(state: TermsandConditionsMain = initialState, action: TermsandConditionsAction) {
    switch(action.type) {
        //get terms and Conditions
        case TermsandConditionsActionTypes.Get_Terms_and_Conditions_Action:
            return { ...state, loading: true, getTermsandConditions:[] };
        case TermsandConditionsActionTypes.Get_Terms_and_Conditions_Succes_Action:
            return { ...state, loading: false, getTermsandConditions: action.payload };
        case TermsandConditionsActionTypes.Get_Terms_and_Conditions_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Add Terms and Conditions
        case TermsandConditionsActionTypes.Add_Terms_and_Conditions_Action:
            return { ...state, loading: true };
        case TermsandConditionsActionTypes.Add_Terms_and_Conditions_Success_Action:
            return { ...state, loading: false };
        case TermsandConditionsActionTypes.Add_Terms_and_Conditions_Failure_Action:
            return { ...state, loading: false, error: action.payload};
        //Edit terms and conditions load
        case TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Action:
            return { ...state, loading: true };
        case TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Success_Action:
            return { ...state, loading: false, singleTandC: action.payload };
        case TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Edit terms and Conditins
        case TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Action:
            return { ...state, loading: true };
        case TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Success_Action:
            return { ...state, loading: false };
        case TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        default: 
            return state;
    }
}