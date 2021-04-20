import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { RegionItem, EditRegion } from 'src/app/models/regionManagement';

export enum RegionManagementActionTypes {
    Region_Management_Load = "[REGION] Region Management Load",
    Region_Management_Load_Success = "[REGION] Region Management Load Success",
    Region_Management_Load_Failure = "[REGION] Region Management Load Failure",
    Add_region_Load = "[REGION] Add_region_Load",
    Add_Region_Load_Success = "[REGION] Add_Region_Load_Success",
    Add_Region_Load_Failure = "[REGION] Add_Region_Load_Failure",
    Add_region_action = "[REGION] Add_region_action",
    Add_Region_Success = "[REGION] Add_Region_Success",
    Add_Region_Failure = "[REGION] Add_Region_Failure",
    Edit_region_Load = "[REGION] Edit_region_Load",
    Edit_Region_Load_Success = "[REGION] Edit_Region_Load_Success",
    Edit_Region_Load_Failure = "[REGION] Edit_Region_Load_Failure",
    Edit_Region = "[REGION] Edit_Region",
    Edit_Region_Success = "[REGION] Edit_Region_Success",
    Edit_Region_Failure = "[REGION] Edit_Region_Failure",
}

export class RegionManagementLoadAction implements Action {
    readonly type = RegionManagementActionTypes.Region_Management_Load;
}
export class RegionManagementLoadSuccessAction implements Action {
    readonly type = RegionManagementActionTypes.Region_Management_Load_Success;
    constructor(public payload: RegionItem[]) {}
}
export class RegionManagementLoadFailureAction implements Action {
    readonly type = RegionManagementActionTypes.Region_Management_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export class AddRegionLoadAction implements Action {
    readonly type = RegionManagementActionTypes.Add_region_Load;
}

export class AddRegionLoadSuccessAction implements Action {
    readonly type = RegionManagementActionTypes.Add_Region_Load_Success;
    constructor(public payload: any) {}
}

export class AddRegionLoadFailureAction implements Action {
    readonly type = RegionManagementActionTypes.Add_Region_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export class AddRegionAction implements Action {
    readonly type = RegionManagementActionTypes.Add_region_action;
    constructor(public payload: RegionItem) {}
}

export class AddRegionSuccessAction implements Action {
    readonly type = RegionManagementActionTypes.Add_Region_Success;
  
}

export class AddRegionFailureAction implements Action {
    readonly type = RegionManagementActionTypes.Add_Region_Failure;
    constructor(public payload: ErrorModel) {}
}

export class EditRegionLoadAction implements Action {
    readonly type = RegionManagementActionTypes.Edit_region_Load;
    constructor(public payload: EditRegion) {}
}

export class EditRegionLoadSuccessAction implements Action {
    readonly type = RegionManagementActionTypes.Edit_Region_Load_Success;
    constructor(public payload: any) {}
}

export class EditRegionLoadFailureAction implements Action {
    readonly type = RegionManagementActionTypes.Edit_Region_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export class EditRegionAction implements Action {
    readonly type = RegionManagementActionTypes.Edit_Region;
    constructor(public payload: RegionItem) {}
}

export class EditRegionSuccessAction implements Action {
    readonly type = RegionManagementActionTypes.Edit_Region_Success;
}

export class EditRegionFailureAction implements Action {
    readonly type = RegionManagementActionTypes.Edit_Region_Failure;
    constructor(public payload: ErrorModel) {}
}

export type RegionManagementActions = RegionManagementLoadAction
| RegionManagementLoadSuccessAction
| RegionManagementLoadFailureAction
| AddRegionLoadAction
| AddRegionLoadSuccessAction
| AddRegionLoadFailureAction
| AddRegionAction
| AddRegionSuccessAction
| AddRegionFailureAction
| EditRegionLoadAction
| EditRegionLoadSuccessAction
| EditRegionLoadFailureAction
| EditRegionAction
| EditRegionSuccessAction
| EditRegionFailureAction