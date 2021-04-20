import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { TransferRequestLoadPayload, TransferRequestCreatePayload, TransferRequestActionPayload } from 'src/app/models/transferpartsModel';
import { PartsStockItem } from 'src/app/models/asset-inventoryModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQDetails } from 'src/app/models/fsqManagement';

export enum TransferPartsActionTypes {
    Transfer_Request_Load = "[TRANSFER PARTS] Transfer Request Load Action",
    Transfer_Request_Load_Success = "[TRANSFER PARTS] Transfer Request Load Success Action",
    Transfer_Request_Load_Failure = "[TRANSFER PARTS] Transfer Request Load Failure Action",

    Transfer_Request_Create_Load = "[TRANSFER PARTS] Transfer Request Create Load Action",
    Transfer_Request_Create_Load_Success = "[TRANSFER PARTS] Transfer Request Create Load Success Action",
    Transfer_Request_Create_Load_Failure = "[TRANSFER PARTS] Transfer Request Create Load Failure Action",

    Transfer_Request_Rentalpoint_Load = "[TRANSFER PARTS] Transfer Request Rentalpoint Load Action",
    Transfer_Request_Rentalpoint_Load_Success = "[TRANSFER PARTS] Transfer Request Rentalpoint Load Success Action",
    Transfer_Request_Rentalpoint_Load_Failure = "[TRANSFER PARTS] Transfer Request Rentalpoint Load Failure Action",

    Transfer_Request_Fsq_Load = "[TRANSFER PARTS] Transfer Request Fsq Load Action",
    Transfer_Request_Fsq_Load_Success = "[TRANSFER PARTS] Transfer Request Fsq Load Success Action",
    Transfer_Request_Fsq_Load_Failure = "[TRANSFER PARTS] Transfer Request Fsq Load Failure Action",

    Parts_Stock_Load = "[TRANSFER PARTS] Parts Stock Load Action",
    Parts_Stock_Load_Success = "[TRANSFER PARTS] Parts Stock Load Success Action",
    Parts_Stock_Load_Failure = "[TRANSFER PARTS] Parts Stock Load Failure Action",

    Transfer_Request_Create = "[TRANSFER PARTS] Transfer Request Create Action",
    Transfer_Request_Create_Success = "[TRANSFER PARTS] Transfer Request Create Success Action",
    Transfer_Request_Create_Failure = "[TRANSFER PARTS] Transfer Request Create Failure Action",

    Transfer_Request_Approve = "[TRANSFER PARTS] Transfer Request Approve Action",
    Transfer_Request_Approve_Success = "[TRANSFER PARTS] Transfer Request Approve Success Action",
    Transfer_Request_Approve_Failure = "[TRANSFER PARTS] Transfer Request Approve Failure Action",

    Transfer_Request_Reject = "[TRANSFER PARTS] Transfer Request Reject Action",
    Transfer_Request_Reject_Success = "[TRANSFER PARTS] Transfer Request Reject Success Action",
    Transfer_Request_Reject_Failure = "[TRANSFER PARTS] Transfer Request Reject Failure Action",

    Transfer_Request_Delete = "[TRANSFER PARTS] Transfer Request Delete Action",
    Transfer_Request_Delete_Success = "[TRANSFER PARTS] Transfer Request Delete Success Action",
    Transfer_Request_Delete_Failure = "[TRANSFER PARTS] Transfer Request Delete Failure Action",
}

//Transfer Request Load
export class TransferRequestLoadAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Load;
    constructor(public payload: TransferRequestLoadPayload) { }
}
export class TransferRequestLoadSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Load_Success;
    constructor(public payload: any) { }
}
export class TransferRequestLoadFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

//Transfer Request Create
export class TransferRequestCreateLoadAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Create_Load;
}
export class TransferRequestCreateLoadSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Create_Load_Success;
    constructor(public payload: any) { }
}
export class TransferRequestCreateLoadFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Create_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class TransferRequestRentalpointLoadAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load;
    constructor(public payload: number) { }
}
export class TransferRequestRentalpointLoadSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load_Success;
    constructor(public payload: RentalPoint[]) { }
}
export class TransferRequestRentalpointLoadFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class TransferRequestFsqLoadAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Fsq_Load;
    constructor(public payload: string) { }
}
export class TransferRequestFsqLoadSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Fsq_Load_Success;
    constructor(public payload: FSQDetails[]) { }
}
export class TransferRequestFsqLoadFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Fsq_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class PartsStockLoadAction implements Action {
    readonly type = TransferPartsActionTypes.Parts_Stock_Load;
    constructor(public payload: number) { }
}
export class PartsStockLoadSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Parts_Stock_Load_Success;
    constructor(public payload: PartsStockItem[]) { }
}
export class PartsStockLoadFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Parts_Stock_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class TransferRequestCreateAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Create;
    constructor(public payload: TransferRequestCreatePayload) { }
}
export class TransferRequestCreateSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Create_Success;
    constructor(public payload: any) { }
}
export class TransferRequestCreateFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Create_Failure;
    constructor(public payload: ErrorModel) { }
}

//Transfer Request Approve
export class TransferRequestApproveAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Approve;
    constructor(public payload: TransferRequestActionPayload) { }
}
export class TransferRequestApproveSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Approve_Success;
    constructor(public payload: any) { }
}
export class TransferRequestApproveFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Approve_Failure;
    constructor(public payload: ErrorModel) { }
}

//Transfer Request Reject
export class TransferRequestRejectAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Reject;
    constructor(public payload: TransferRequestActionPayload) { }
}
export class TransferRequestRejectSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Reject_Success;
    constructor(public payload: any) { }
}
export class TransferRequestRejectFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Reject_Failure;
    constructor(public payload: ErrorModel) { }
}

//Transfer Request Delete
export class TransferRequestDeleteAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Delete;
    constructor(public payload: TransferRequestActionPayload) { }
}
export class TransferRequestDeleteSuccessAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Delete_Success;
    constructor(public payload: any) { }
}
export class TransferRequestDeleteFailureAction implements Action {
    readonly type = TransferPartsActionTypes.Transfer_Request_Delete_Failure;
    constructor(public payload: ErrorModel) { }
}

export type TransferPartsActions = TransferRequestLoadAction
| TransferRequestLoadSuccessAction
| TransferRequestLoadFailureAction
| TransferRequestCreateAction
| TransferRequestCreateSuccessAction
| TransferRequestCreateFailureAction
| TransferRequestCreateLoadAction
| TransferRequestCreateLoadSuccessAction
| TransferRequestCreateLoadFailureAction
| PartsStockLoadAction
| PartsStockLoadSuccessAction
| PartsStockLoadFailureAction
| TransferRequestApproveAction
| TransferRequestApproveSuccessAction
| TransferRequestApproveFailureAction
| TransferRequestRejectAction
| TransferRequestRejectSuccessAction
| TransferRequestRejectFailureAction
| TransferRequestDeleteAction
| TransferRequestDeleteSuccessAction
| TransferRequestDeleteFailureAction
| TransferRequestRentalpointLoadAction
| TransferRequestRentalpointLoadSuccessAction
| TransferRequestRentalpointLoadFailureAction
| TransferRequestFsqLoadAction
| TransferRequestFsqLoadSuccessAction
| TransferRequestFsqLoadFailureAction