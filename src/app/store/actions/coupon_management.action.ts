import { Action } from '@ngrx/store';
import { couponManagement, singleCoupon, UsageDetails, Referrals } from 'src/app/models/couponManagementModel';
import { ErrorModel } from 'src/app/models/errorModel';
import { customerDetails } from 'src/app/models/customerManagementModel';



export enum CouponManagementActiontypes {
    //All Coupon List Load
    Coupon_List_Load = "[COUPON] Coupon List Load",
    Coupon_List_Load_Success = "[COUPON] Coupon List Load Success",
    Coupon_List_Load_Failure = "[COUPON] Coupon List Load Failure",
    //Add Coupon Dropdown Load Action
    Add_Coupon_Load = "[COUPON] Add Coupon Load Action",
    Add_Coupon_Load_Success = "[COUPON] Add Coupon Load Success Action",
    Add_Coupon_Load_Failure = "[COUPON] Add Coupon Load Failure Action",
    //Add Coupon Action
    Add_Coupon = "[COUPON] Add Coupon Action",
    Add_Coupon_Success = "[COUPON] Add Coupon Success Action",
    Add_Coupon_Failure = "[COUPON] Add Coupon Failure Action",
    //Add Another Coupon 
    Add_Another_Coupon_Action = "[COUPON] Add Another Coupon Action",
    //Edit Coupon Load Action
    Edit_Coupon_Load_Action = "[COUPON] Edit Coupon Load Action",
    Edit_Coupon_Load_Success_Action = "[COUPON] Edit Coupon Load Success Action",
    Edit_Coupon_Load_Failure_Action = "[COUPON] Edit Coupon Load Failure Action",
    //Edit Coupon Action
    Edit_Coupon = "[COUPON] Edit Coupon Action",
    Edit_Coupon_Success = "[COUPON] Edit Coupon Success Action",
    Edit_Coupon_Failure = "[COUPON] Edit Coupon Failure Action",
    //Delete Coupon Action
    Delete_Coupon = "[COUPON] Delete Coupon Action",
    Delete_Coupon_Failure = "[COUPON] Delete Coupon Failure Action",
    //Assign Coupon
    Assign_Coupon_Load = "[COUPON] Assign Coupon Load Action",
    Assign_Coupon_Load_Success = "[COUPON] Assign Coupon Load Success Action",
    Assign_Coupon_Load_Failure = "[COUPON] Assign Coupon Load Failure Action",
    Assign_Coupon_Customer_Load = "[COUPON] Assign Coupon Customer Load Action",
    Assign_Coupon_Customer_Load_Success = "[COUPON] Assign Coupon Customer Load Success Action",
    Assign_Coupon_Customer_Load_Failure = "[COUPON] Assign Coupon Customer Load Failure Action",
    Assign_Coupon = "[COUPON] Assign Coupon Action",
    Assign_Coupon_Success = "[COUPON] Assign Coupon Success Action",
    Assign_Coupon_Failure = "[COUPON] Assign Coupon Failure Action",
    //Usage History
    Usage_History_Load = "[COUPON] Usage History Load",
    Usage_History_Load_Success = "[COUPON] Usage History Load Success",
    Usage_History_Load_Failure = "[COUPON] Usage History Load Failure",
    //referral list load
    Referrals_List_Load_Action = "[COUPON] Referrals List Load Action",
    Referrals_List_Load_Success_Action = "[COUPON] Referrals List Load Success Action",
    Referrals_List_Load_Failure_Action = "[COUPON] Rferrals List Load Failure Action",
}
//Coupon List Load
export class CouponListLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Coupon_List_Load;
}

export class CouponListLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Coupon_List_Load_Success;

    constructor(public payload: couponManagement[]) { }
}

export class CouponListLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Coupon_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}


//Add Coupon DropDown Load Action
export class AddCouponLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Coupon_Load;
}

export class AddCouponLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Coupon_Load_Success;

    constructor(public payload: any[]) { }
}

export class AddCouponLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Coupon_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Add Coupon Action
export class AddCouponAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Coupon;
    constructor(public payload: couponManagement) { }
}

export class AddCouponSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Coupon_Success;

}

export class AddCouponFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Coupon_Failure;

    constructor(public payload: ErrorModel) { }
}
//Add Another Coupon
export class AddAnotherCouponAction implements Action {
    readonly type = CouponManagementActiontypes.Add_Another_Coupon_Action;
    constructor(public payload: couponManagement) { }
}
//Edit Coupon Load
export class EditCouponLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Edit_Coupon_Load_Action;
    constructor(public payload: singleCoupon) { }
}

export class EditCouponLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Edit_Coupon_Load_Success_Action;

    constructor(public payload: any[]) { }
}

export class EditCouponLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Edit_Coupon_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}
//Edit Coupon
export class EditCouponAction implements Action {
    readonly type = CouponManagementActiontypes.Edit_Coupon;
    constructor(public payload: couponManagement) { }
}

export class EditCouponSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Edit_Coupon_Success;
}

export class EditCouponFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Edit_Coupon_Failure;

    constructor(public payload: ErrorModel) { }
}

//Delete Coupon
export class DeleteCouponAction implements Action {
    readonly type = CouponManagementActiontypes.Delete_Coupon;

    constructor(public payload: singleCoupon) { }
}

export class DeleteCouponFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Delete_Coupon_Failure;

    constructor(public payload: ErrorModel) { }
}

//Assign Coupon
export class AssignCouponLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Load;
    constructor(public payload: singleCoupon) { }
}
export class AssignCouponLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Load_Success;
    constructor(public payload: any) { }
}
export class AssignCouponLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class AssignCouponCustomerLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Customer_Load;
    constructor(public payload: string) { }
}
export class AssignCouponCustomerLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Customer_Load_Success;
    constructor(public payload: customerDetails[]) { }
}
export class AssignCouponCustomerLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Customer_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class AssignCouponAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon;
    constructor(public payload: any) { }
}
export class AssignCouponSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Success;
}
export class AssignCouponFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Assign_Coupon_Failure;
    constructor(public payload: ErrorModel) { }
}

//Usage History
export class UsageHistoryLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Usage_History_Load;
    constructor(public payload: singleCoupon) { }
}
export class UsageHistoryLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Usage_History_Load_Success;
    constructor(public payload: UsageDetails) { }
}
export class UsageHistoryLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Usage_History_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

//Referral List Load
export class ReferralListLoadAction implements Action {
    readonly type = CouponManagementActiontypes.Referrals_List_Load_Action;
}

export class ReferralListLoadSuccessAction implements Action {
    readonly type = CouponManagementActiontypes.Referrals_List_Load_Success_Action;

    constructor(public payload: Referrals[]) {}
}

export class ReferralListLoadFailureAction implements Action {
    readonly type = CouponManagementActiontypes.Referrals_List_Load_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

export type CouponManagementAction = CouponListLoadAction
    | CouponListLoadSuccessAction
    | CouponListLoadFailureAction
    | AddCouponLoadAction
    | AddCouponLoadSuccessAction
    | AddCouponLoadFailureAction
    | AddCouponAction
    | AddCouponSuccessAction
    | AddCouponFailureAction
    | AddAnotherCouponAction
    | EditCouponLoadAction
    | EditCouponLoadSuccessAction
    | EditCouponLoadFailureAction
    | EditCouponAction
    | EditCouponSuccessAction
    | EditCouponFailureAction
    | DeleteCouponAction
    | DeleteCouponFailureAction
    | AssignCouponLoadAction
    | AssignCouponLoadSuccessAction
    | AssignCouponLoadFailureAction
    | AssignCouponAction
    | AssignCouponSuccessAction
    | AssignCouponFailureAction
    | AssignCouponCustomerLoadAction
    | AssignCouponCustomerLoadSuccessAction
    | AssignCouponCustomerLoadFailureAction
    | UsageHistoryLoadAction
    | UsageHistoryLoadSuccessAction
    | UsageHistoryLoadFailureAction
    | ReferralListLoadAction
    | ReferralListLoadSuccessAction
    | ReferralListLoadFailureAction