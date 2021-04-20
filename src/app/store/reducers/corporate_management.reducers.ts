import { CorporateManagementMain } from "src/app/models/corporateManagement";
import { CorporationManagements, CorporateManagementAction } from '../actions/corporate_management.action';

const initialState: CorporateManagementMain = {
    error: undefined,
    loading: false,
    corporateManagement: [],
    partner_type: [],
    partner_category: [],
    countries: [],
    corporate_size: [],
    corporate_contract: [],
    billing_type: [],
    payment_term: [],
    singleCorporate: {},
    States: [],
    cities: [],
}

export function CorporaterManagementReducer(state: CorporateManagementMain = initialState, action: CorporationManagements) {
    switch (action.type) {
        case CorporateManagementAction.Corporate_Management_Load:
            return { ...state, loading: true };
        case CorporateManagementAction.Corporate_Management_Load_Success:
            return { ...state, loading: false, error: undefined, corporateManagement: action.payload[0], partner_type: action.payload[1]};
        case CorporateManagementAction.Corporate_Management_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CorporateManagementAction.Add_Corporate_Management_Load_Action:
            return { ...state, loading: true };
        case CorporateManagementAction.Add_Corporate_Management_Load_Success_Action:
            return { ...state, loading: false, partner_type: action.payload[0], partner_category: action.payload[1], countries: action.payload[2],  corporate_size: action.payload[3], corporate_contract: action.payload[4], billing_type: action.payload[5], States: action.payload[6], payment_term: action.payload[7], cities: action.payload[8]}
        case CorporateManagementAction.Add_Corporate_Management_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case CorporateManagementAction.Edit_Corporate_Load:
            return { ...state, loading: true };
        case CorporateManagementAction.Edit_Corporate_Load_Success:
            return { ...state, loading: false, error: undefined, singleCorporate: action.payload[0], partner_type: action.payload[1], partner_category: action.payload[2], countries: action.payload[3], corporate_size: action.payload[4], corporate_contract: action.payload[5], billing_type: action.payload[6], States: action.payload[7], payment_term: action.payload[8]};
        case CorporateManagementAction.Edit_Corporate_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CorporateManagementAction.Edit_Corporate:
            return { ...state, loading: true };
        case CorporateManagementAction.Edit_Corporate_Success:
            return { ...state, loading: false, error: undefined };
        case CorporateManagementAction.Edit_Corporate_Failure:
            return { ...state, loading: false, error: action.payload };
        case CorporateManagementAction.Add_Corporate_Management_Action:
            return { ...state, loading: true };
        case CorporateManagementAction.Add_Corporate_Management_Success_Action:
            return { ...state, loading: false };
        case CorporateManagementAction.Add_Corporate_Management_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case CorporateManagementAction.Add_Another_Corporate_Management_Action:
            return { ...state, loading: true };
        default:
            return state
    }
}