import { FranchiseeBillingActionTypes } from './../actions/franchisee_billing.action';
import { FranchiseeMain } from "src/app/models/franchiseeBillingModel";
import { FranchiseeBillingActions } from '../actions/franchisee_billing.action';

const initialState: FranchiseeMain = {
    loading: false,
    error: undefined,
    franchiseeSetUps: [],
    franchisees: [],
    countries: [],
    states: [],
    cities: [],
    paymentStatusList: [],
    payments: [],
    viewFranchiseePaymentDetails: undefined,
}

export function FranchiseeBillingReducer(state: FranchiseeMain = initialState, action: FranchiseeBillingActions) {
    switch(action.type) {
        //get list of Franchisee set-up
        case FranchiseeBillingActionTypes.Bill_Setups_List_Load_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Bill_Setups_List_Load_Success_Action:
            return { ...state, loading: false, franchiseeSetUps: action.payload };
        case FranchiseeBillingActionTypes.Bill_Setups_List_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //add setup load
        case FranchiseeBillingActionTypes.Add_Setup_Load_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Add_Setup_Load_Success_Action:
            return { ...state, loading: false, franchisees: action.payload };
        case FranchiseeBillingActionTypes.Add_Setup_Load_Failure_Action:
            return { ...state, loadng: false, error: action.payload };
        //add Setup
        case FranchiseeBillingActionTypes.Add_Setup_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Add_Setup_Success_Action:
            return { ...state, loading: false };
        case FranchiseeBillingActionTypes.Add_Setup_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Get Franchisee payments
        case FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Success_Action:
            return { ...state, loading: false, payments: action.payload[0], cities: action.payload[1], states: action.payload[2],
                countries: action.payload[3], franchiseeSetUps: action.payload[4], paymentStatusList: action.payload[5] };
        case FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Get filtered Payments
        case FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Success_Action:
            return { ...state, loading: false, payments: action.payload };
        case FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //View Franchisee Details
        case FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Success_Action:
            return { ...state, loading: false, viewFranchiseePaymentDetails: action.payload };
        case FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Add penalty
        case FranchiseeBillingActionTypes.Add_Penalty_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Add_Penalty_Success_Action:
            return { ...state, loading: false };
        case FranchiseeBillingActionTypes.Add_Penalty_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        //Franchisee Payment Acknowledge
        case FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Action:
            return { ...state, loading: true };
        case FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Success_Action:
            return { ...state, loading: false };
        case FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Failure_Action:
            return { ...state, loading: false, error: action.payalod };
        default:
            return state;
    }
}