import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { PricingItem, BatteryswapPricingItem } from 'src/app/models/pricingManagement';

export enum PricingManagementActionTypes {
    Pricing_Management_Load = "[PRICING] Pricing Management Load",
    Pricing_Management_Load_Success = "[PRICING] Pricing Management Load Success",
    Pricing_Management_Load_Failure = "[PRICING] Pricing Management Load Failure",
    Add_Pricing_Load = "[PRICING] Add Pricing Load",
    Add_Pricing_Load_Success = "[PRICING] Add Pricing Load Success",
    Add_Pricing_Load_Failure = "[PRICING] Add Pricing Load Failure",
    Add_Pricing = "[PRICING] Add Pricing",
    Add_Another_Pricing = "[PRICING] Add Another Pricing",
    Add_Pricing_Success = "[PRICING] Add Pricing Success",
    Add_Pricing_Failure = "[PRICING] Add Pricing Failure",
    Edit_Pricing_Load = "[PRICING] Edit Pricing Load",
    Edit_Pricing_Load_Success = "[PRICING] Edit Pricing Load Success",
    Edit_Pricing_Load_Failure = "[PRICING] Edit Pricing Load Failure",
    Edit_Pricing = "[PRICING] Edit Pricing",
    Edit_Pricing_Success = "[PRICING] Edit Pricing Success",
    Edit_Pricing_Failure = "[PRICING] Edit Pricing Failure",
    Delete_Pricing = "[PRICING] Delete Pricing",
    Delete_Pricing_Failure = "[PRICING] Delete Pricing Failure",
    Add_Battery_Swap_Pricing = "[PRICING] Add_Battery_Swap_Pricing",
    Add_Battery_Swap_Pricing_Success = "[PRICING] Add_Battery_Swap_Pricing_Success",
    Add_Battery_Swap_Pricing_Failure = "[PRICING] Add_Battery_Swap_Pricing_Failure",
    Edit_Battery_Swap_Pricing_Load = "[PRICING] Edit_Battery_Swap_Pricing_Load",
    Edit_Battery_Swap_Pricing_Load_Success = "[PRICING] Edit_Battery_Swap_Pricing_Load_Success",
    Edit_Battery_Swap_Pricing_Load_Failure = "[PRICING] Edit_Battery_Swap_Pricing_Load_Failure",
    Edit_Battery_Swap_Pricing = "[PRICING] Edit_Battery_Swap_Pricing",
    Edit_Battery_Swap_Pricing_Success = "[PRICING] Edit_Battery_Swap_Pricing_Success",
    Edit_Battery_Swap_Pricing_Failure = "[PRICING] Edit_Battery_Swap_Pricing_Failure",
    Delete_Battery_Swap_Pricing = "[PRICING] Delete_Battery_Swap_Pricing",
    Delete_Battery_Swap_Pricing_Failure = "[PRICING] Delete_Battery_Swap_Pricing_Failure",
    Add_Battery_Swap_Pricing_Load = "[PRICING] Add_Battery_Swap_Pricing_Load",
    Add_Battery_Swap_Pricing_Load_Success = "[PRICING] Add_Battery_Swap_Pricing_Load_Success",
    Add_Battery_Swap_Pricing_Load_Failure = "[PRICING] Add_Battery_Swap_Pricing_Load_Failure",
    Add__Battery_Swap_Pricing_Load_Success = "Add__Battery_Swap_Pricing_Load_Success"
}

export class PricingManagementLoadAction implements Action {
    readonly type = PricingManagementActionTypes.Pricing_Management_Load;
}

export class PricingManagementLoadSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Pricing_Management_Load_Success;
    constructor(public payload: any) {
        
    }
}

export class PricingManagementLoadFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Pricing_Management_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export class AddPricingLoadAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Pricing_Load;
}

export class AddPricingLoadSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Pricing_Load_Success;
    constructor(public payload: any) {}
}

export class AddPricingLoadFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Pricing_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export class AddPricingAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Pricing;
    constructor(public payload: PricingItem) {}
}

export class AddAnotherPricingAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Another_Pricing;
    constructor(public payload: PricingItem) {}
}

export class AddPricingSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Pricing_Success;
}

export class AddPricingFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Pricing_Failure;
    constructor(public payload: ErrorModel) {}
}

export class EditPricingLoadAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Pricing_Load;
    constructor(public payload: number) {}
}

export class EditPricingLoadSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Pricing_Load_Success;
    constructor(public payload: any) {}
}

export class EditPricingLoadFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Pricing_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export class EditPricingAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Pricing;
    constructor(public payload: PricingItem) {}
}

export class EditPricingSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Pricing_Success;
}

export class EditPricingFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Pricing_Failure;
    constructor(public payload: ErrorModel) {}
}

export class DeletePricingAction implements Action {
    readonly type = PricingManagementActionTypes.Delete_Pricing;
    constructor(public payload: number) {}
}

export class DeletePricingFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Delete_Pricing_Failure;
    constructor(public payload: ErrorModel) {}
}
// Add Battery Swap Pricing Load
export class AddBatterySwapPricingLoadAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load;
}

export class AddBatterySwapPricingLoadSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load_Success;
    constructor(public payload: any) {}
}

export class AddBatterySwapPricingLoadFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Add Battery Swap Pricing
export class AddBatterySwapPricingAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Battery_Swap_Pricing;
    constructor(public payload: BatteryswapPricingItem) {}
}

export class AddBatterySwapPricingSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Battery_Swap_Pricing_Success;
}

export class AddBatterySwapPricingFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Add_Battery_Swap_Pricing_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Battery Swap Load Pricing
export class EditBatterySwapPricingLoadAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load;
    constructor(public payload: number) {}
}

export class EditBatterySwapPricingLoadSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load_Success;
    constructor(public payload: any) {}
}

export class EditBatterySwapPricingLoadFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Battery Swap Pricing
export class EditBatterySwapPricingAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Battery_Swap_Pricing;
    constructor(public payload: BatteryswapPricingItem) {}
}

export class EditBatterySwapPricingSuccessAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Success;
}

export class EditBatterySwapPricingFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Failure;
    constructor(public payload: ErrorModel) {}
}

// Delete Battery Swap Pricing
export class DeleteBatterySwapPricingAction implements Action {
    readonly type = PricingManagementActionTypes.Delete_Battery_Swap_Pricing;
    constructor(public payload: number) {}
}

export class DeleteBatterySwapPricingFailureAction implements Action {
    readonly type = PricingManagementActionTypes.Delete_Battery_Swap_Pricing_Failure;
    constructor(public payload: ErrorModel) {}
}

export type PricingManagementActions = PricingManagementLoadAction
| PricingManagementLoadSuccessAction
| PricingManagementLoadFailureAction
| AddPricingLoadAction
| AddPricingLoadSuccessAction
| AddPricingLoadFailureAction
| AddPricingAction
| AddAnotherPricingAction
| AddPricingSuccessAction
| AddPricingFailureAction
| EditPricingLoadAction
| EditPricingLoadSuccessAction
| EditPricingLoadFailureAction
| EditPricingAction
| EditPricingSuccessAction
| EditPricingFailureAction
| DeletePricingAction
| DeletePricingFailureAction
| AddBatterySwapPricingLoadAction
| AddBatterySwapPricingLoadSuccessAction
| AddBatterySwapPricingLoadFailureAction
| AddBatterySwapPricingAction
| AddBatterySwapPricingSuccessAction
| AddBatterySwapPricingFailureAction
| EditBatterySwapPricingLoadAction
| EditBatterySwapPricingLoadSuccessAction
| EditBatterySwapPricingLoadFailureAction
| EditBatterySwapPricingAction
| EditBatterySwapPricingSuccessAction
| EditBatterySwapPricingFailureAction
| DeleteBatterySwapPricingAction
| DeleteBatterySwapPricingFailureAction