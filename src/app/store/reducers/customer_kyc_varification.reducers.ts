import { customerKycManagementMain } from "src/app/models/customerKycVerificationModel";
import { CustomerKycVarificationAction, CustomerKycVarificationActionTypes } from '../actions/customer_kyc_varification.action';

const initialState: customerKycManagementMain = {
    error: undefined,
    loading: false,
    CustomerKycDetails: [],
    SingleCustomerKyc: undefined,
    CustomerKycUrl: []
}
export function CustomerKycVarificationReducer(state: customerKycManagementMain = initialState, action: CustomerKycVarificationAction) {
    switch (action.type) {
        case CustomerKycVarificationActionTypes.Customer_Kyc_List_Load:
            return { ...state, loading: true };
        case CustomerKycVarificationActionTypes.Customer_Kyc_List_Load_success:
            return { ...state, loading: false, CustomerKycDetails: action.payload };
        case CustomerKycVarificationActionTypes.Customer_Kyc_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CustomerKycVarificationActionTypes.Activate_Kyc_Request:
            return { ...state };
        case CustomerKycVarificationActionTypes.Activate_Kyc_Request_Success:
            return { ...state };
        case CustomerKycVarificationActionTypes.Activate_Kyc_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        case CustomerKycVarificationActionTypes.Inactivate_Kyc_Request:
            return { ...state };
        case CustomerKycVarificationActionTypes.Inactivate_Kyc_Request_Success:
            return { ...state };
        case CustomerKycVarificationActionTypes.Inactivate_Kyc_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        case CustomerKycVarificationActionTypes.Customer_Kyc_Detail_Load:
            return { ...state, loading: true, SingleCustomer: undefined };
        case CustomerKycVarificationActionTypes.Customer_kyc_Detail_Load_Success:
            return { ...state, loading: false, SingleCustomerKyc: action.payload[0], CustomerKycUrl: action.payload[1] };
        case CustomerKycVarificationActionTypes.Customer_kyc_Detail_Load_Failure:
            return { ...state, loading: false, error: action.payload };
            case CustomerKycVarificationActionTypes.Approve_Request:
            return { ...state, loading: true };
        case CustomerKycVarificationActionTypes.Approve_Request_Success:
            return { ...state, loading: false };
        case CustomerKycVarificationActionTypes.Approve_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}