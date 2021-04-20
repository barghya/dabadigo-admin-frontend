import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { FSQHubDetails, editHub, AddFSQHub, editFSQHub, HubRegion, hubregion, hubmanager } from 'src/app/models/fsqhubModel';

export enum FSQHubActionTypes {
    FSQ_Hub_List_Load = "[FSQ Hub] FSQ Hub List Load",
    FSQ_Hub_List_Load_Success = "[FSQ Hub] FSQ_Hub_List_Load_Success",
    FSQ_Hub_List_Load_Failure = "[FSQ Hub] FSQ_Hub_List_Load_Failure",
    Admin_FSQ_Hub_List_Load = "[FSQ Hub] Admin FSQ Hub List Load",
    Admin_FSQ_Hub_List_Load_Success = "[FSQ Hub] Admin FSQ Hub List Load Success",
    Admin_FSQ_Hub_List_Load_Failure = "[FSQ Hub] Admin FSQ Hub List Load Failure",
    Add_FSQ_Hub_Load_Action = "[FSQ Hub] Add_FSQ_Hub_Load_Action",
    Add_FSQ_Hub_Load_Success_Action = "[FSQ Hub] Add_FSQ_Hub_Load_Success_Action",
    Add_FSQ_Hub_Load_Failure_Action = "[FSQ Hub] Add_FSQ_Hub_Load_Failure_Action",
    Edit_FSQ_Hub_Load = "[FSQ Hub] Edit_FSQ_Hub_Load",
    Edit_FSQ_Hub_Load_Success = "[FSQ Hub] Edit_FSQ_Hub_Load_Success",
    Edit_FSQ_Hub_Load_Failure = "[FSQ Hub] Edit_FSQ_Hub_Load_Failure",
    Add_FSQ_Hub = "[FSQ Hub] Add_FSQ_Hub",
    Add_FSQ_Hub_Success = "[FSQ Hub] Add_FSQ_Hub_Success",
    Add_FSQ_Hub_Failure = "[FSQ Hub] Add_FSQ_Hub_Failure",
    Edit_FSQ_Hub = "[FSQ Hub] Edit_FSQ_Hub",
    Edit_FSQ_Hub_Success = "[FSQ Hub] Edit_FSQ_Hub_Success",
    Edit_FSQ_Hub_Failure = "[FSQ Hub] Edit_FSQ_Hub_Failure",
    Remove_Region_Action = "[FSQ Hub] Remove_Region_Action",
    Remove_Region_Action_Failure = "[FSQ Hub] Remove_Region_Action_Failure",
    Remove_Manager_Action = "[FSQ Hub] Remove_Manager_Action",
    Remove_Manager_Action_Failure = "[FSQ Hub] Remove_Manager_Action_Failure"
}

//FSQ Hub List Load
export class FSQHubListLoadAction implements Action {
    readonly type = FSQHubActionTypes.FSQ_Hub_List_Load;
    constructor(public payload: number) {}
}

export class FSQHubListLoadSuccessAction implements Action {
    readonly type = FSQHubActionTypes.FSQ_Hub_List_Load_Success;
    constructor(public payload: FSQHubDetails[]) {}
}

export class FSQHubListLoadFailureAction implements Action {
    readonly type = FSQHubActionTypes.FSQ_Hub_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//Admin FSQ Hub List Load
export class AdminFSQHubListLoadAction implements Action {
    readonly type = FSQHubActionTypes.Admin_FSQ_Hub_List_Load;
}

export class AdminFSQHubListLoadSuccessAction implements Action {
    readonly type = FSQHubActionTypes.Admin_FSQ_Hub_List_Load_Success;
    constructor(public payload: FSQHubDetails[]) {}
}

export class AdminFSQHubListLoadFailureAction implements Action {
    readonly type = FSQHubActionTypes.Admin_FSQ_Hub_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// ADD FSQ Load 

export class AddFSQHubLoadAction implements Action {
    readonly type = FSQHubActionTypes.Add_FSQ_Hub_Load_Action;
    
}

export class AddFSQHubLoadSuccessAction implements Action {
    readonly type = FSQHubActionTypes.Add_FSQ_Hub_Load_Success_Action;

    constructor(public payload: any) { }
}

export class AddFSQHubLoadFailureAction implements Action {
    readonly type = FSQHubActionTypes.Add_FSQ_Hub_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// Add FSQ Hub

export class AddFSQHubAction implements Action {
    readonly type = FSQHubActionTypes.Add_FSQ_Hub;

    constructor(public payload: AddFSQHub) { }
}

export class AddFSQHubSuccessAction implements Action {
    readonly type = FSQHubActionTypes.Add_FSQ_Hub_Success;
}

export class AddFSQHubFailureAction implements Action {
    readonly type = FSQHubActionTypes.Add_FSQ_Hub_Failure;

    constructor(public payload: ErrorModel) { }
}

// Edit FSQ Hub Load

export class EditFSQHubLoadAction implements Action {
    readonly type = FSQHubActionTypes.Edit_FSQ_Hub_Load;

    constructor(public payload: editHub) { }
}

export class EditFSQHubLoadSuccessAction implements Action {
    readonly type = FSQHubActionTypes.Edit_FSQ_Hub_Load_Success;

    constructor(public payload: any[]) { }
}

export class EditFSQHubLoadFailureAction implements Action {
    readonly type = FSQHubActionTypes.Edit_FSQ_Hub_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

// Edit FSQ Hub

export class EditFSQHubAction implements Action {
    readonly type = FSQHubActionTypes.Edit_FSQ_Hub;

    constructor(public payload: AddFSQHub) { }
}

export class EditFSQHubSuccessAction implements Action {
    readonly type = FSQHubActionTypes.Edit_FSQ_Hub_Success;
}

export class EditFSQHubFailureAction implements Action {
    readonly type = FSQHubActionTypes.Edit_FSQ_Hub_Failure;

    constructor(public payload: ErrorModel) { }
}

// Remove Region
export class RemoveRegionAction implements Action {
    readonly type = FSQHubActionTypes.Remove_Region_Action;

    constructor(public payload: hubregion) { }
}

export class RemoveRegionFailureAction implements Action {
    readonly type = FSQHubActionTypes.Remove_Region_Action_Failure;

    constructor(public payload: ErrorModel) { }
}

// Remove Manager
export class RemoveManagerAction implements Action {
    readonly type = FSQHubActionTypes.Remove_Manager_Action;

    constructor(public payload: hubmanager) { }
}

export class RemoveManagerFailureAction implements Action {
    readonly type = FSQHubActionTypes.Remove_Manager_Action_Failure;

    constructor(public payload: ErrorModel) { }
}


export type FSQHubAction = FSQHubListLoadAction
| FSQHubListLoadSuccessAction
| FSQHubListLoadFailureAction
| AddFSQHubLoadAction
| AddFSQHubLoadSuccessAction
| AddFSQHubLoadFailureAction
| AddFSQHubAction
| AddFSQHubSuccessAction
| AddFSQHubFailureAction
| EditFSQHubLoadAction
| EditFSQHubLoadSuccessAction
| EditFSQHubLoadFailureAction
| EditFSQHubAction
| EditFSQHubSuccessAction
| EditFSQHubFailureAction
| RemoveRegionAction
| RemoveRegionFailureAction
| RemoveManagerAction
| RemoveManagerFailureAction
| AdminFSQHubListLoadAction
| AdminFSQHubListLoadSuccessAction
| AdminFSQHubListLoadFailureAction