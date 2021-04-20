import { CorporateBillingMain } from "src/app/models/corporateBillingModel";
import { CorporateBillingAction, CorporateBillingActionTypes } from '../actions/corporate_billing.action';

const initialState: CorporateBillingMain = {
    loading: false,
    error: undefined,
    bills: [],
    corporateDetails: [],
    legalEntityDetails: [],
    billsSetupModel: [],
    legalEntity: undefined,
    corporate: undefined,
    countries: [],
    states: [],
    cities: [],
    billDetailsModel: undefined,
    billStatusList: [],
    pdfData: undefined,
    emailDetails: undefined,
    adjustments: undefined
}

export function CorporateBillingReducer(state: CorporateBillingMain = initialState, action: CorporateBillingAction) {
    switch(action.type) {
        //Get corporate bills
        case CorporateBillingActionTypes.Corporate_Bills_List_Load_Action:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Corporate_Bills_List_Load_Success_Action:
            return { ...state, loading: false, bills: action.payload[0], cities: action.payload[1], states: action.payload[2],
                countries: action.payload[3], billsSetupModel: action.payload[4], billStatusList: action.payload[5] };
        case CorporateBillingActionTypes.Corporate_Bills_List_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case CorporateBillingActionTypes.Corporate_Bills_Filter:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Corporate_Bills_Filter_Success:
            return { ...state, loading: false, bills: action.payload };
        case CorporateBillingActionTypes.Corporate_Bills_Filter_Failure:
            return { ...state, loading: false, error: action.payload };
        //Set bills List Load
        case CorporateBillingActionTypes.Bill_Setups_List_Load_Action:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Bill_Setups_List_Load_Success_Action:
            return { ...state, loading: false, billsSetupModel: action.payload };
        case CorporateBillingActionTypes.Bill_Setups_List_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Setup Bills Load Action
        case CorporateBillingActionTypes.Setup_Bills_Load_Action:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Setup_Bills_Load_Success_Action:
            return { ...state, loading: false, legalEntityDetails: action.payload[0], corporateDetails: action.payload[1] };
        case CorporateBillingActionTypes.Setup_Bills_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        // Create Bill Setup
        case CorporateBillingActionTypes.Create_Setup_Bill_Action:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Create_Setup_Bill_Success_Action:
            return { ...state, loading: false };
        case CorporateBillingActionTypes.Create_Setup_Bill_Failure_action:
            return { ...state, loading: false, error: action.payload };
        // Bill Details Load Action
        case CorporateBillingActionTypes.Bill_Details_Load_Action:
            return { ...state, loading: true, billDetailsModel: undefined, pdfData: undefined };
        case CorporateBillingActionTypes.Bill_Details_Load_Success_Action:
            return { ...state, loading: false, billDetailsModel: action.payload };
        case CorporateBillingActionTypes.Bill_Details_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Generate PDF
        case CorporateBillingActionTypes.Billing_Generate_PDF:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Billing_Generate_PDF_Success:
            return { ...state, loading: false, pdfData: action.payload };
        case CorporateBillingActionTypes.Billing_Generate_PDF_Failure:
            return { ...state, loading: false, error: action.payload };
        //Send Email Load Action
        case CorporateBillingActionTypes.Send_Email_Load_Action:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Send_Email_Load_Success_Action:
            return { ...state, loading: false, emailDetails: action.payload };
        case CorporateBillingActionTypes.Send_Email_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Send Email
        case CorporateBillingActionTypes.Billing_Send_Email:
            return { ...state, loading: true, pdfData: undefined };
        case CorporateBillingActionTypes.Billing_Send_Email_Success:
            return { ...state, loading: false };
        case CorporateBillingActionTypes.Billing_Send_Email_Failure:
            return { ...state, loading: false, error: action.payload };
        //add adjustments
        case CorporateBillingActionTypes.Add_Adjustments_Action:
            return { ...state, loading: true };
        case CorporateBillingActionTypes.Add_Adjustments_Success_Action:
            return { ...state, loading: false };
        case CorporateBillingActionTypes.Add_Adjustments_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Bill payment Status change
        case CorporateBillingActionTypes.Bill_Payment_Status_Change_Action:
            return { ...state, loading: true };
        case CorporateBillingActionTypes.Bill_Payment_Status_Change_Success_Action:
            return { ...state, loading: false };
        case CorporateBillingActionTypes.Bill_Payment_Status_Change_Failure_Action:
            return { ...state, loading: false, error: undefined };
        default:
            return state;
    }
}