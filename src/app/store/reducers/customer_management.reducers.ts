import { customerManagementMain } from "src/app/models/customerManagementModel";
import { CustomerManagementAction, CustomerManagementActionTypes } from '../actions/customer_management.action';

const initialState: customerManagementMain = {
    error: undefined,
    loading: false,
    CustomerDetails: [],
    SingleCustomer: undefined
}

export function CustomerManagementReducer(state: customerManagementMain = initialState, action: CustomerManagementAction) {
    switch (action.type) {
        case CustomerManagementActionTypes.Customer_Management_List_Load:
            return { ...state, loading: true };
        case CustomerManagementActionTypes.Customer_Management_List_Load_success:
            return { ...state, loading: false, CustomerDetails: action.payload };
        case CustomerManagementActionTypes.Customer_Mamagement_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CustomerManagementActionTypes.Activate_Request:
            return { ...state };
        case CustomerManagementActionTypes.Activate_Request_Success:
            return { ...state };
        case CustomerManagementActionTypes.Activate_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        case CustomerManagementActionTypes.Inactivate_Request:
            return { ...state };
        case CustomerManagementActionTypes.Inactivate_Request_Success:
            return { ...state };
        case CustomerManagementActionTypes.Inactivate_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        case CustomerManagementActionTypes.Customer_Detail_Load:
            return { ...state, loading: true, SingleCustomer: undefined };
        case CustomerManagementActionTypes.Customer_Detail_Load_Success:
            return { ...state, loading: true, SingleCustomer: action.payload };
        case CustomerManagementActionTypes.Customer_Detail_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}