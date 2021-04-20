import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { customerDetails, ActiveInactiveRequest, SingleCustomerInDetail } from 'src/app/models/customerManagementModel';

export enum CustomerManagementActionTypes {
    Customer_Management_List_Load = "[CUSTOMER MANAGEMENT] Customer Management List Load",
    Customer_Management_List_Load_success = "[CUSTOMER MANAGEMENT] Customer Management List Load Success",
    Customer_Mamagement_List_Load_Failure = "[CUSTOMER MANAGEMENT] Customer Management List Load Failure",

    Activate_Request = "[CUSTOMER MANAGEMENT] Activate Request",
    Activate_Request_Success = "[CUSTOMER MANAGEMENT] Activate Request Success",
    Activate_Request_Failure = "[CUSTOMER MANAGEMENT] Activate Request Failure",

    Inactivate_Request = "[CUSTOMER MANAGEMENT] Inactivate Request",
    Inactivate_Request_Success = "[CUSTOMER MANAGEMENT] Inactivate Request Success",
    Inactivate_Request_Failure = "[CUSTOMER MANAGEMENT] Inactivate Request Failure",

    Customer_Detail_Load = "[CUSTOMER_MANAGEMENT] Customer Detail Load",
    Customer_Detail_Load_Success = "[CUSTOMER_MANAGEMENT] Customer Detail Load Success",
    Customer_Detail_Load_Failure = "[CUSTOMER_MANAGEMENT] Customer Detail Load Failure",
}

//Customer Management List Load
export class CustomerManagementListLoadAction implements Action {
    readonly type = CustomerManagementActionTypes.Customer_Management_List_Load;
    constructor(public payload: number) {}
}

export class CustomerManagementListLoadSuccessAction implements Action {
    readonly type = CustomerManagementActionTypes.Customer_Management_List_Load_success;
    constructor(public payload: customerDetails[]) {}
}

export class CustomerManagementListLoadFailureAction implements Action {
    readonly type = CustomerManagementActionTypes.Customer_Mamagement_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//Active Request
export class ActiveAction implements Action {
    readonly type = CustomerManagementActionTypes.Activate_Request;
    constructor(public payload: ActiveInactiveRequest) {}
}

export class ActiveSuccessAction implements Action {
    readonly type = CustomerManagementActionTypes.Activate_Request_Success;
}


export class ActiveFailureAction implements Action {
    readonly type = CustomerManagementActionTypes.Activate_Request_Failure
    constructor(public payload: ErrorModel) {}
}

//Inactive Request
export class InactiveAction implements Action {
    readonly type = CustomerManagementActionTypes.Inactivate_Request;
    constructor(public payload: ActiveInactiveRequest) {}
}

export class InactiveSuccessAction implements Action {
    readonly type = CustomerManagementActionTypes.Inactivate_Request_Success
}

export class InactiveFailureAction implements Action {
    readonly type = CustomerManagementActionTypes.Inactivate_Request_Failure
    constructor(public payload: ErrorModel) {}
}

export class CustomerDetailLoadAction implements Action {
    readonly type = CustomerManagementActionTypes.Customer_Detail_Load
    constructor(public payload: ActiveInactiveRequest) { }
}

export class CustomerDetailLoadSuccessAction implements Action {
    readonly type = CustomerManagementActionTypes.Customer_Detail_Load_Success
    constructor(public payload: SingleCustomerInDetail) { }
}

export class CustomerDetailLoadFailureAction implements Action {
    readonly type = CustomerManagementActionTypes.Customer_Detail_Load_Failure
    constructor(public payload: ErrorModel) { }
}

export type CustomerManagementAction = CustomerManagementListLoadAction
| CustomerManagementListLoadSuccessAction
| CustomerManagementListLoadFailureAction
| ActiveAction
| ActiveFailureAction
| ActiveSuccessAction
| InactiveAction
| InactiveFailureAction
| InactiveSuccessAction
| CustomerDetailLoadAction
| CustomerDetailLoadSuccessAction
| CustomerDetailLoadFailureAction