import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { adminUserID, pendingRequest, ApproveRequestPayload, LoadRequestsPayload, CorporateRequestDetail } from 'src/app/models/corporateRequestManagementModel';

export enum CorporateRequestManagementAction {
    Corporate_Request_Management_Load = "[CORPORATE REQUEST] Corporate Request Management Load",
    Corporate_Request_Management_Load_Success = "[CORPORATE REQUEST] Corporate Request Management Load Success",
    Corporate_Request_Management_Load_Failure = "[CORPORATE REQUEST] Corporate Request Management Load Failure",
    
    Approve_Request = "[CORPORATE REQUEST] Approve_Request",
    Approve_Request_Success = "[CORPORATE REQUEST] Approve_Request_Success",
    Approve_Request_Failure = "[CORPORATE REQUEST] Approve_Request_Failure",

    Reject_Request = "[CORPORATE REQUEST] Reject_Request",
    Reject_Request_Success = "[CORPORATE REQUEST] Reject_Request_Success",
    Reject_Request_Failure = "[CORPORATE REQUEST] Reject_Request_Failure",

    Corporate_Request_Detail_Load = "[CORPORATE REQUEST] Corporate Request Detail Load",
    Corporate_Request_Detail_Load_Success = "[CORPORATE REQUEST] Corporate Request Detail Load Success",
    Corporate_Request_Detail_Load_Failure = "[CORPORATE REQUEST] Corporate Request Detail Load Failure",
}

//Corporate Request Load
export class CorporateRequestManagementLoadAction implements Action {
    readonly type = CorporateRequestManagementAction.Corporate_Request_Management_Load;
    constructor(public payload: LoadRequestsPayload) {}
}
export class CorporateRequestManagementLoadSuccessAction implements Action {
    readonly type = CorporateRequestManagementAction.Corporate_Request_Management_Load_Success;
    constructor(public payload: pendingRequest[]) {}
}
export class CorporateRequestManagementLoadFailureAction implements Action {
    readonly type = CorporateRequestManagementAction.Corporate_Request_Management_Load_Failure
    constructor(public payload: ErrorModel) {}
}
// Approve Request
export class ApproveRequestAction implements Action {
    readonly type = CorporateRequestManagementAction.Approve_Request;
    constructor(public payload: ApproveRequestPayload) {}
   
}

export class ApproveRequestSuccessAction implements Action {
    readonly type = CorporateRequestManagementAction.Approve_Request_Success;
}

export class ApproveRequestFailureAction implements Action {
    readonly type = CorporateRequestManagementAction.Approve_Request_Failure
    constructor(public payload: ErrorModel) {}
}

// Reject Request
export class RejectRequestAction implements Action {
    readonly type = CorporateRequestManagementAction.Reject_Request;
    constructor(public payload: ApproveRequestPayload) {}
   
}

export class RejectRequestSuccessAction implements Action {
    readonly type = CorporateRequestManagementAction.Reject_Request_Success;
}

export class RejectRequestFailureAction implements Action {
    readonly type = CorporateRequestManagementAction.Reject_Request_Failure
    constructor(public payload: ErrorModel) {}
}


export class CorporateRequestDetailLoad implements Action {
    readonly type = CorporateRequestManagementAction.Corporate_Request_Detail_Load
    constructor(public payload: number) {}
}

export class CorporateRequestDetailLoadSuccess implements Action {
    readonly type = CorporateRequestManagementAction.Corporate_Request_Detail_Load_Success
    constructor(public payload: CorporateRequestDetail) {}
}

export class CorporateRequestDetailLoadFailure implements Action {
    readonly type = CorporateRequestManagementAction.Corporate_Request_Detail_Load_Failure
    constructor(public payload: ErrorModel) {}
}

export type corporateRequest = CorporateRequestManagementLoadAction
| CorporateRequestManagementLoadSuccessAction
| CorporateRequestManagementLoadFailureAction
| ApproveRequestAction
| ApproveRequestSuccessAction
| ApproveRequestFailureAction
| CorporateRequestDetailLoad
| CorporateRequestDetailLoadSuccess
| CorporateRequestDetailLoadFailure
| RejectRequestAction
| RejectRequestSuccessAction
| RejectRequestFailureAction