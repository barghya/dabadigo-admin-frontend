import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { MaintenanceJobItem, MaintenanceJobsFilterPayload, MaintenanceJobItemDetail, MaintenanceJobResolvePayload, MaintenanceJobCreatePayload, MaintenanceJobAssignPayload, MaintenanceScheduleItem } from 'src/app/models/maintenanceJobsModel';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { Assets } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';

export enum MaintenanceJobsActionTypes {
    Maintenance_Jobs_Load = "[MAINTENANCE_JOBS] Maintenance Jobs Load Action",
    Maintenance_Jobs_Load_Success = "[MAINTENANCE_JOBS] Maintenance Jobs Load Success Action",
    Maintenance_Jobs_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Jobs Load Failure Action",

    Maintenance_Jobs_Filter = "[MAINTENANCE_JOBS] Maintenance Jobs Filter Action",
    Maintenance_Jobs_Filter_Success = "[MAINTENANCE_JOBS] Maintenance Jobs Filter Success Action",
    Maintenance_Jobs_Filter_Failure = "[MAINTENANCE_JOBS] Maintenance Jobs Filter Failure Action",

    Maintenance_Job_Detail_Load = "[MAINTENANCE_JOBS] Maintenance Job Detail Load Action",
    Maintenance_Job_Detail_Load_Success = "[MAINTENANCE_JOBS] Maintenance Job Detail Load Success Action",
    Maintenance_Job_Detail_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Job Detail Load Failure Action",

    Maintenance_Job_Resolve = "[MAINTENANCE_JOBS] Maintenance Job Resolve Action",
    Maintenance_Job_Resolve_Success = "[MAINTENANCE_JOBS] Maintenance Job Resolve Success Action",
    Maintenance_Job_Resolve_Failure = "[MAINTENANCE_JOBS] Maintenance Job Resolve Failure Action",

    Maintenance_Job_Create_Load = "[MAINTENANCE_JOBS] Maintenance Job Create Load Action",
    Maintenance_Job_Create_Load_Success = "[MAINTENANCE_JOBS] Maintenance Job Create Load Success Action",
    Maintenance_Job_Create_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Job Create Load Failure Action",
    Maintenance_Job_Create = "[MAINTENANCE_JOBS] Maintenance Job Create Action",
    Maintenance_Job_Create_Success = "[MAINTENANCE_JOBS] Maintenance Job Create Success Action",
    Maintenance_Job_Create_Failure = "[MAINTENANCE_JOBS] Maintenance Job Create Failure Action",

    Maintenance_Job_Assign_Load = "[MAINTENANCE_JOBS] Maintenance Job Assign Load Action",
    Maintenance_Job_Assign_Load_Success = "[MAINTENANCE_JOBS] Maintenance Job Assign Load Success Action",
    Maintenance_Job_Assign_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Job Assign Load Failure Action",
    Maintenance_Job_Assign = "[MAINTENANCE_JOBS] Maintenance Job Assign Action",
    Maintenance_Job_Assign_Success = "[MAINTENANCE_JOBS] Maintenance Job Assign Success Action",
    Maintenance_Job_Assign_Failure = "[MAINTENANCE_JOBS] Maintenance Job Assign Failure Action",

    Maintenance_Schedule_Load = "[MAINTENANCE_JOBS] Maintenance Schedule Load Action",
    Maintenance_Schedule_Load_Success = "[MAINTENANCE_JOBS] Maintenance Schedule Load Success Action",
    Maintenance_Schedule_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Schedule Load Failure Action",

    Maintenance_Schedule_Update_Load = "[MAINTENANCE_JOBS] Maintenance Schedule Update Load Action",
    Maintenance_Schedule_Update_Load_Success = "[MAINTENANCE_JOBS] Maintenance Schedule Update Load Success Action",
    Maintenance_Schedule_Update_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Schedule Update Load Failure Action",
    Maintenance_Schedule_Update = "[MAINTENANCE_JOBS] Maintenance Schedule Update Action",
    Maintenance_Schedule_Update_Success = "[MAINTENANCE_JOBS] Maintenance Schedule Update Success Action",
    Maintenance_Schedule_Update_Failure = "[MAINTENANCE_JOBS] Maintenance Schedule Update Failure Action",

    Maintenance_Fsq_Load = "[MAINTENANCE_JOBS] Maintenance Fsq Load Action",
    Maintenance_Fsq_Load_Success = "[MAINTENANCE_JOBS] Maintenance Fsq Load Success Action",
    Maintenance_Fsq_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Fsq Load Failure Action",
    Maintenance_Rentalpoint_Load = "[MAINTENANCE_JOBS] Maintenance Rentalpoint Load Action",
    Maintenance_Rentalpoint_Load_Success = "[MAINTENANCE_JOBS] Maintenance Rentalpoint Load Success Action",
    Maintenance_Rentalpoint_Load_Failure = "[MAINTENANCE_JOBS] Maintenance Rentalpoint Load Failure Action",
    
}

export class MaintenanceJobsLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Jobs_Load;
    constructor(public payload: MaintenanceJobsFilterPayload) { }
}
export class MaintenanceJobsLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Jobs_Load_Success;
    constructor(public payload: MaintenanceJobItem[]) { }
}
export class MaintenanceJobsLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Jobs_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceJobsFilterAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Jobs_Filter;
    constructor(public payload: MaintenanceJobsFilterPayload) { }
}
export class MaintenanceJobsFilterSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Jobs_Filter_Success;
    constructor(public payload: MaintenanceJobItem[]) { }
}
export class MaintenanceJobsFilterFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Jobs_Filter_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceJobDetailLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load;
    constructor(public payload: number) { }
}
export class MaintenanceJobDetailLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load_Success;
    constructor(public payload: MaintenanceJobItemDetail) { }
}
export class MaintenanceJobDetailLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceJobResolveAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Resolve;
    constructor(public payload: MaintenanceJobResolvePayload) { }
}
export class MaintenanceJobResolveSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Resolve_Success;
}
export class MaintenanceJobResolveFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Resolve_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceJobCreateLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Create_Load;
}
export class MaintenanceJobCreateLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Create_Load_Success;
    constructor(public payload: Assets[]) { }
}
export class MaintenanceJobCreateLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Create_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class MaintenanceJobCreateAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Create;
    constructor(public payload: MaintenanceJobCreatePayload) { }
}
export class MaintenanceJobCreateSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Create_Success;
}
export class MaintenanceJobCreateFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Create_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceJobAssignLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load;
}
export class MaintenanceJobAssignLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load_Success;
    constructor(public payload: FSQDetails[]) { }
}
export class MaintenanceJobAssignLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class MaintenanceJobAssignAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Assign;
    constructor(public payload: MaintenanceJobAssignPayload) { }
}
export class MaintenanceJobAssignSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Assign_Success;
}
export class MaintenanceJobAssignFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Job_Assign_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceScheduleLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Load;
}
export class MaintenanceScheduleLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Load_Success;
    constructor(public payload: DomainData[]) { }
}
export class MaintenanceScheduleLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Load_Failure;
    constructor(public payload: ErrorModel) { }
}


export class MaintenanceScheduleUpdateLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load;
    constructor(public payload: number) { }
}
export class MaintenanceScheduleUpdateLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load_Success;
    constructor(public payload: MaintenanceScheduleItem[]) { }
}
export class MaintenanceScheduleUpdateLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class MaintenanceScheduleUpdateAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Update;
    constructor(public payload: MaintenanceScheduleItem[]) { }
}
export class MaintenanceScheduleUpdateSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Success;
}
export class MaintenanceScheduleUpdateFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Failure;
    constructor(public payload: ErrorModel) { }
}

export class MaintenanceFsqLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Fsq_Load;
    constructor(public payload: string) { }
}
export class MaintenanceFsqLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Fsq_Load_Success;
    constructor(public payload: FSQDetails[]) { }
}
export class MaintenanceFsqLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Fsq_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class MaintenanceRentalpointLoadAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load;
    constructor(public payload: number) { }
}
export class MaintenanceRentalpointLoadSuccessAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load_Success;
    constructor(public payload: RentalPoint[]) { }
}
export class MaintenanceRentalpointLoadFailureAction implements Action {
    readonly type = MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load_Failure;
    constructor(public payload: ErrorModel) { }
}


export type MaintenanceJobsActions = MaintenanceJobsLoadAction
| MaintenanceJobsLoadFailureAction
| MaintenanceJobsLoadSuccessAction
| MaintenanceJobsFilterAction
| MaintenanceJobsFilterSuccessAction
| MaintenanceJobsFilterFailureAction
| MaintenanceJobDetailLoadAction
| MaintenanceJobDetailLoadSuccessAction
| MaintenanceJobDetailLoadFailureAction
| MaintenanceJobResolveAction
| MaintenanceJobResolveSuccessAction
| MaintenanceJobResolveFailureAction
| MaintenanceJobCreateLoadAction
| MaintenanceJobCreateLoadSuccessAction
| MaintenanceJobCreateLoadFailureAction
| MaintenanceJobCreateAction
| MaintenanceJobCreateSuccessAction
| MaintenanceJobCreateFailureAction
| MaintenanceJobAssignLoadAction
| MaintenanceJobAssignLoadSuccessAction
| MaintenanceJobAssignLoadFailureAction
| MaintenanceJobAssignAction
| MaintenanceJobAssignSuccessAction
| MaintenanceJobAssignFailureAction
| MaintenanceScheduleLoadAction
| MaintenanceScheduleLoadSuccessAction
| MaintenanceScheduleLoadFailureAction
| MaintenanceScheduleUpdateLoadAction
| MaintenanceScheduleUpdateLoadSuccessAction
| MaintenanceScheduleUpdateLoadFailureAction
| MaintenanceScheduleUpdateAction
| MaintenanceScheduleUpdateSuccessAction
| MaintenanceScheduleUpdateFailureAction
| MaintenanceFsqLoadAction
| MaintenanceFsqLoadSuccessAction
| MaintenanceFsqLoadFailureAction
| MaintenanceRentalpointLoadAction
| MaintenanceRentalpointLoadSuccessAction
| MaintenanceRentalpointLoadFailureAction