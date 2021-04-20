import { CorporateCodeMain } from 'src/app/models/corporateCodeManagementModel';
import { CorporateCodeManagementAction, CorporateCodeManagementActionTypes } from '../actions/corporate_code_management.action';

const initialState: CorporateCodeMain = {
    error: undefined,
    loading: false,
    CorporateCodeList: [],
    CodeTypes: [],
    CodeStatus: [],
    singleCode: undefined,
    CorporateList: []
}

export function CorporateCodeManagementReducer(state: CorporateCodeMain = initialState, action: CorporateCodeManagementAction) {
    switch(action.type) {
        //Code List Load
        case CorporateCodeManagementActionTypes.Code_List_Load:
            return { ...state, loading: true };
        case CorporateCodeManagementActionTypes.Code_List_Load_Success:
            return { ...state, loading: false, CorporateCodeList: action.payload };
        case CorporateCodeManagementActionTypes.Code_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        //Create Code Load
        case CorporateCodeManagementActionTypes.Create_Code_Load_Action:
            return { ...state, loading: true };
        case CorporateCodeManagementActionTypes.Create_Code_Load_Success_Action:
            return { ...state, loading: false, CodeTypes: action.payload[0], CodeStatus: action.payload[1], CorporateList: action.payload[2] };
        case CorporateCodeManagementActionTypes.Create_Code_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Create Code Action
        case CorporateCodeManagementActionTypes.Create_Code_Action:
            return { ...state, loading: true };
        case CorporateCodeManagementActionTypes.Create_Code_Success_Action:
            return { ...state, loading: false, CorporateCodeList: action.payload[0] };
        case CorporateCodeManagementActionTypes.Create_Code_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Create Another Corporate Code
        case CorporateCodeManagementActionTypes.Create_Another_Corporate_Code:
            return { ...state, loading: true };
        //Edit Code Load
        case CorporateCodeManagementActionTypes.Update_Code_Load_Action:
            return { ...state, loading: true };
        case CorporateCodeManagementActionTypes.Update_Code_Load_Success_Action:
            return { ...state, loading: false, CodeTypes: action.payload[0], CodeStatus: action.payload[1],  CorporateList: action.payload[2] , singleCode: action.payload[3] };
        case CorporateCodeManagementActionTypes.Update_Code_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Edit Code 
        case CorporateCodeManagementActionTypes.Update_Code_Action:
            return { ...state, loading: true };
        case CorporateCodeManagementActionTypes.Update_Code_Success_Action:
            return { ...state, loading: false };
        case CorporateCodeManagementActionTypes.Update_Code_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Delete Code Action
        case CorporateCodeManagementActionTypes.Delete_Code_Action:
            return { ...state };
        case CorporateCodeManagementActionTypes.Delete_Code_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}