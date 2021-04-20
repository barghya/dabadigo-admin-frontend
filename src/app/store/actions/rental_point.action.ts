import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { RentalPoint, RpId, GetRp, RentalPoint2, AddBatteryService, BatteryRemoveService, RevoveBatteryReloadService } from 'src/app/models/rentalPoint';


export enum RentalPointAction {
    Rental_Point_Load = "[RENTALPOINT] Rental Point Load",
    Rental_Point_Load_Success = "[RENTALPOINT] Rental Point Load Success",
    Rental_Point_Load_Failure = "[RENTALPOINT] Rental Point Load Failure",

    Add_Rental_Point_Load = "[RENTALPOINT] Add Rental Point Load",
    Add_Rental_Point_Load_Success = "[RENTALPOINT] Add Rental Point Load Success",
    Add_Rental_Point_Load_Failure = "[RENTALPOINT] Add Rental Point Load Failure",

    Add_Rental_Point = "[RENTALPOINT] Add Rental Point",
    Add_Rental_Point_Success = "[RENTALPOINT] Add Rental Point Success",
    Add_Rental_Point_Failure = "[RENTALPOINT] Add Rental Point Failure",

    Add_Another_Rental_Point = "[RENTALPOINT] Add Another Rental Point",

    Delete_Rental_Point = "[RENTALPOINT] Delete Rental Point",
    Delete_Rental_Point_Failure = "[RENTALPOINT] Delete Rental Point Failure",

    Edit_Rental_Point_Load = "[RENTALPOINT] Edit Rental Point Load",
    Edit_Rental_Point_Load_Success = "[RENTALPOINT] Edit Rental Point Load Success",
    Edit_Rental_Point_Load_Failure = "[RENTALPOINT] Edit Rental Point Load Failure",

    Edit_Rental_Point = "[RENTALPOINT] Edit Rental Point",
    Edit_Rental_Point_Success = "[RENTALPOINT] Edit Rental Point Success",
    Edit_Rental_Point_Failure = "[RENTALPOINT] Edit Rental Point Failure",

    Get_Rental_Point_History = "[RENTALPOINT] Get Rental Point History",
    Get_Rental_Point_History_Success = "[RENTALPOINT] Get Rental Point History_Success",
    Get_Rental_Point_History_Failure = "[RENTALPOINT] Get Rental Point History Failure",

    Move_Rental_Point = "[RENTALPOINT] Move Rental Pointe",
    Move_Rental_Point_Success = "[RENTALPOINT] Move Rental Pointe Success",
    Move_Rental_Point_Failure = "[RENTALPOINT] Move Rental Pointe Failure",

    Add_Battery_RP_Action="[RENTALPOINT] Add Battery RP Action",
    Add_Battery_RP_Success_Action="[RENTALPOINT] Add Battery RP Success Action",
    Add_Battery_RP_Failure_Action="[RENTALPOINT] Add Battery RP Failure Action",

    Remove_Battery_RP_Action="[RENTALPOINT] Remove Battery RP Action",
    Remove_Battery_RP_Success_Action="[RENTALPOINT] Remove Battery RP Success Action",
    Remove_Battery_RP_Failure_Action="[RENTALPOINT] Remove Battery RP Failure Action",
}

//Rental Point Load
export class RentalPointLoadAction implements Action {
    readonly type = RentalPointAction.Rental_Point_Load;
}

export class RentalPointLoadSuccessAction implements Action {
    readonly type = RentalPointAction.Rental_Point_Load_Success;

    constructor(public payload: any[]){}
}

export class RentalPointLoadFailureAction implements Action {
    readonly type = RentalPointAction.Rental_Point_Load_Failure;

    constructor(public payload: ErrorModel) {}
}

// Add Rental Point Load
export class AddRentalPointLoadAction implements Action {
    readonly type = RentalPointAction.Add_Rental_Point_Load;
}
export class AddRentalPointLoadSuccessAction implements Action {
    readonly type = RentalPointAction.Add_Rental_Point_Load_Success;
    
    constructor(public payload:any[]){}
}
export class AddRentalPointLoadFailureAction implements Action {
    readonly type = RentalPointAction.Add_Rental_Point_Load_Failure;

    constructor(public payload: ErrorModel){}
}

// Add Rental Point

export class AddRentalPointAction implements Action {
    readonly type = RentalPointAction.Add_Rental_Point;
    constructor(public payload: RentalPoint2) {}
}

export class AddRentalPointSuccessAction implements Action {
    readonly type = RentalPointAction.Add_Rental_Point_Success;
    
}

export class AddRentalPointFailureAction implements Action {
    readonly type = RentalPointAction.Add_Rental_Point_Failure;
    constructor(public payload: ErrorModel) {}
}

// Add Another Rental Point

export class AddAnotherRentalPoint implements Action {
    readonly type = RentalPointAction.Add_Another_Rental_Point;

    constructor(public payload: RentalPoint2) {}
}

// Delete Rental Point
export class DeleteRentalPointAction implements Action {
    readonly type = RentalPointAction.Delete_Rental_Point;
    constructor(public payload: RpId) {}
}

export class DeleteRentalPointFailureAction implements Action {
    readonly type = RentalPointAction.Delete_Rental_Point_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Rental Point load Action
export class EditRentalPointLoadAction implements Action {
    readonly type = RentalPointAction.Edit_Rental_Point_Load;
    constructor(public payload: RpId) {}
}

export class EditRentalPointLoadSuccessAction implements Action {
    readonly type = RentalPointAction.Edit_Rental_Point_Load_Success;
    constructor(public payload: any[]) {}
}

export class EditRentalPointLoadFailureAction implements Action {
    readonly type = RentalPointAction.Edit_Rental_Point_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Rental Point Action
export class EditRentalPointAction implements Action {
    readonly type  = RentalPointAction.Edit_Rental_Point;
    constructor(public payload: GetRp) {}
}

export class EditRentalPointSuccessAction implements Action {
    readonly type = RentalPointAction.Edit_Rental_Point_Success;

}

export class EditRentalPointFailureAction implements Action {
    readonly type = RentalPointAction.Edit_Rental_Point_Failure;
    constructor(public payload: ErrorModel) {}
}

// Get Rental Point
export class GetRentalPointHistoryAction implements Action {
    readonly type = RentalPointAction.Get_Rental_Point_History;
    constructor(public payload: RpId) {}
}

export class GetRentalPointHistorySuccessAction implements Action {
    readonly type = RentalPointAction.Get_Rental_Point_History_Success;
    constructor(public payload: any[]) {}
}

export class GetRentalPointHistoryFailureAction implements Action {
    readonly type = RentalPointAction.Get_Rental_Point_History_Failure;
    constructor(public payload: ErrorModel) {}
}

// move Rental Point
export class MoveRentalPointAction implements Action {
    readonly type = RentalPointAction.Move_Rental_Point;
    constructor(public payload: RpId) {}
}

export class MoveRentalPointSuccessAction implements Action {
    readonly type = RentalPointAction.Move_Rental_Point_Success;
}

export class MoveRentalPointFailureAction implements Action {
    readonly type = RentalPointAction.Move_Rental_Point_Failure;
    constructor(public payload: ErrorModel) {}
}

//Add Battery To RP
export class AddBatteryRPAction implements Action {
    readonly type = RentalPointAction.Add_Battery_RP_Action
    constructor(public payload: AddBatteryService){}
}
export class AddBatteryRPSuccessAction implements Action {
    readonly type = RentalPointAction.Add_Battery_RP_Success_Action
    constructor(){}
}
export class AddBatteryRPFailureAction implements Action {
    readonly type = RentalPointAction.Add_Battery_RP_Failure_Action
    constructor(public payload: ErrorModel){}
}
//Remove Battery Rp
export class RemoveBatteryRPAction implements Action {
    readonly type = RentalPointAction.Remove_Battery_RP_Action
    constructor(public payload: RevoveBatteryReloadService){}
}
export class RemoveBatteryRPSuccessAction implements Action {
    readonly type = RentalPointAction.Remove_Battery_RP_Success_Action
    constructor(){}
}
export class RemoveBatteryRPFailureAction implements Action {
    readonly type = RentalPointAction.Remove_Battery_RP_Failure_Action
    constructor(public payload: ErrorModel){}
}
export type RentalPoints = RentalPointLoadAction
| RentalPointLoadSuccessAction
| RentalPointLoadFailureAction
| AddRentalPointAction
| AddRentalPointSuccessAction
| AddRentalPointFailureAction
| DeleteRentalPointAction
| DeleteRentalPointFailureAction
| EditRentalPointLoadAction
| EditRentalPointLoadSuccessAction
| EditRentalPointLoadFailureAction
| EditRentalPointAction
| EditRentalPointSuccessAction
| EditRentalPointFailureAction
| AddAnotherRentalPoint
| GetRentalPointHistoryAction
| GetRentalPointHistorySuccessAction
| GetRentalPointHistoryFailureAction
| MoveRentalPointAction
| MoveRentalPointSuccessAction
| MoveRentalPointFailureAction
| AddRentalPointLoadAction
| AddRentalPointLoadSuccessAction
| AddRentalPointLoadFailureAction
| AddBatteryRPAction
| AddBatteryRPSuccessAction
| AddBatteryRPFailureAction
| RemoveBatteryRPAction
| RemoveBatteryRPSuccessAction
| RemoveBatteryRPFailureAction