import { CorporateRequestManagementMain } from "src/app/models/corporateRequestManagementModel";
import { corporateRequest, CorporateRequestManagementAction } from '../actions/corporate_request_management.action';

const initialState: CorporateRequestManagementMain = {
    error: undefined,
    loading: false,
    CorporateRequestList: [],
    singleCorporateRequest: undefined
}

export function CorporateRequestManagementReducer(state: CorporateRequestManagementMain = initialState, action: corporateRequest) {
    switch (action.type) {
        case CorporateRequestManagementAction.Corporate_Request_Management_Load:
            return { ...state, loading: true };
        case CorporateRequestManagementAction.Corporate_Request_Management_Load_Success:
            return { ...state, loading: false, error: undefined, CorporateRequestList: action.payload };
        case CorporateRequestManagementAction.Corporate_Request_Management_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CorporateRequestManagementAction.Approve_Request:
            return { ...state, loading: true };
        case CorporateRequestManagementAction.Approve_Request_Success:
            return { ...state, loading: false };
        case CorporateRequestManagementAction.Approve_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        case CorporateRequestManagementAction.Corporate_Request_Detail_Load:
            return { ...state, loading: true };
        case CorporateRequestManagementAction.Corporate_Request_Detail_Load_Success:
            return { ...state, loading: false, singleCorporateRequest: action.payload };
        case CorporateRequestManagementAction.Corporate_Request_Detail_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}