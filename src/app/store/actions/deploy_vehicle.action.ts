import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { DeployRequestVehicle, VehicleDetails, deploymentRequestID } from 'src/app/models/deployVehicleModel';


export enum DeployVehicleActionTypes {
    Add_Deploy_vehicle_load = "[Deploy_Vehicle] Add Deploy Vehicle Load",
    Add_Deploy_vehicle_Load_Success = "[Deploy_Vehicle] Add Deploy Vehicle Load Success",
    Add_Deploy_vehicle_Load_Failure = "[Deploy_Vehicle] Add Deploy Vehicle Load Failure",

    Vehicle_Request_List_Load = "[Deploy Vehicle] Vehicle Request List Load",
    Vehicle_Request_List_Load_Success = "[Deploy Vehicle] Vehicle Request List Load Success",
    Vehicle_Request_List_Load_Failure = "[Deploy Vehicle] Vehicle Request List Load Failure",

    Vehicle_Deploy_List_Load = "[Deploy Vehicle] Vehicle Deploy List Load",
    Vehicle_Deploy_List_Load_Success = "[Deploy Vehicle] Vehicle Deploy List Load Success",
    Vehicle_Deploy_List_Load_Failure = "[Deploy Vehicle] Vehicle Deploy List Load Failure",

    Create_Request_Vehicle = "[Deploy Request Vehicle] Request Vehicle Create",
    Create_Request_Vehicle_Success = "[Deploy Request Vehicle] Request Vehicle Create Success",
    Create_Request_Vehicle_Failure = "[Deploy Request Vehicle] Request Vehicle Create Failure",

    Deploy_Vehicle_Load_Action = "[Deploy Request Vehicle] Deploy Vehicle Load",
    Deploy_Vehicle_Load_Success_Action = "[Deploy Request Vehicle] Deploy Vehicle Load Success",
    Deploy_Vehicle_Load_Failure_Action = "[Deploy Request Vehicle] Deploy Vehicle Load Failure",

    Deploy_Vehicle_Action = "[Deploy Request Vehicle] Deploy Vehicle",
    Deploy_Vehicle_Success_Action = "[Deploy Request Vehicle] Deploy Vehicle Success",
    Deploy_Vehicle_Failure_Action = "[Deploy Request Vehicle] Deploy Vehicle Failure",
    Delete_Deploy_Vehicle_Action = "Delete_Deploy_Vehicle_Action",
    Delete_Deploy_Vehicle_Action_Failure = "Delete_Deploy_Vehicle_Action_Failure"
}

export class AddDeployVehicleLoad implements Action{
    readonly type= DeployVehicleActionTypes.Add_Deploy_vehicle_load
    constructor(public payload: number){}
}
export class AddDeployvehicleLoadSuccess implements Action{
    readonly type= DeployVehicleActionTypes.Add_Deploy_vehicle_Load_Success
    constructor(public payload: any[]){}
}
export class AddDeployvehicleLoadFailure implements Action{
    readonly type= DeployVehicleActionTypes.Add_Deploy_vehicle_Load_Failure
    constructor(public payload: ErrorModel){}
}
// Vehicle List By Request
export class VehicleRequestListLoadAction implements Action {
    readonly type = DeployVehicleActionTypes.Vehicle_Request_List_Load
}
export class VehicleRequestListLoadSuccessAction implements Action {
    readonly type = DeployVehicleActionTypes.Vehicle_Request_List_Load_Success
    constructor(public payload: any[]) { }
}
export class VehicleRequestListLoadFailureAction implements Action {
    readonly type = DeployVehicleActionTypes.Vehicle_Request_List_Load_Failure
    constructor(public payload: ErrorModel) { }
}
// Deploy Vehicle List
export class VehicleDeployListLoadAction implements Action {
    readonly type = DeployVehicleActionTypes.Vehicle_Deploy_List_Load
} 
export class VehicleDeployListLoadSuccessAction implements Action {
    readonly type = DeployVehicleActionTypes.Vehicle_Deploy_List_Load_Success
    constructor(public payload: VehicleDetails[]) { }
}
export class VehicleDeployListLoadFailureAction implements Action {
    readonly type = DeployVehicleActionTypes.Vehicle_Deploy_List_Load_Failure
    constructor(public payload: ErrorModel) { }
}

//Add Request Vehicle
export class AddRequestVehicleAction implements Action {
    readonly type = DeployVehicleActionTypes.Create_Request_Vehicle
    constructor(public payload: DeployRequestVehicle){}
}
export class AddRequestVehicleSuccessAction implements Action {
    readonly type = DeployVehicleActionTypes.Create_Request_Vehicle_Success
}
export class AddRequestVehicleFailureAction implements Action {
    readonly type = DeployVehicleActionTypes.Create_Request_Vehicle_Failure
    constructor(public payload: ErrorModel) {}
}

//Deploy Vehicle Load
export class DeployVehicleLoadAction implements Action {
    readonly type = DeployVehicleActionTypes.Deploy_Vehicle_Load_Action
    constructor(public  payload:deploymentRequestID) { }
}
export class DeployVehicleLoadSuccessAction implements Action {
    readonly type = DeployVehicleActionTypes.Deploy_Vehicle_Load_Success_Action
    constructor(public payload: any) {}
}
export class DeployVehicleLoadFailureAction implements Action {
    readonly type = DeployVehicleActionTypes.Deploy_Vehicle_Load_Failure_Action
    constructor(public payload: ErrorModel) { }
}

//Deploy Vehicle
export class DeployvehicleAction implements Action {
    readonly type = DeployVehicleActionTypes.Deploy_Vehicle_Action
    constructor(public payload: DeployRequestVehicle){}
}
export class DeployvehicleSuccessAction implements Action {
    readonly type = DeployVehicleActionTypes.Deploy_Vehicle_Success_Action
}
export class DeployvehicleFailureAction implements Action {
    readonly type = DeployVehicleActionTypes.Deploy_Vehicle_Failure_Action
    constructor(public payload: ErrorModel) {}
}

//Delete Deployvehicle
export class DeleteDeployVehicleAction implements Action {
    readonly type = DeployVehicleActionTypes.Delete_Deploy_Vehicle_Action;

    constructor(public payload: deploymentRequestID) { }
}

export class DeleteDeployVehicleFailureAction implements Action {
    readonly type = DeployVehicleActionTypes.Delete_Deploy_Vehicle_Action_Failure;

    constructor(public payload: ErrorModel) { }
}

export type  DeployVehicleAction = AddDeployVehicleLoad 
| AddDeployvehicleLoadSuccess
| AddDeployvehicleLoadFailure
| VehicleRequestListLoadAction
| VehicleRequestListLoadSuccessAction
| VehicleRequestListLoadFailureAction
| VehicleDeployListLoadAction
| VehicleDeployListLoadSuccessAction
| VehicleDeployListLoadFailureAction
| AddRequestVehicleAction
| AddRequestVehicleSuccessAction
| AddRequestVehicleFailureAction
| DeployVehicleLoadAction
| DeployVehicleLoadSuccessAction
| DeployVehicleLoadFailureAction
| DeployvehicleAction
| DeployvehicleSuccessAction
| DeployvehicleFailureAction
| DeleteDeployVehicleAction
| DeleteDeployVehicleFailureAction
