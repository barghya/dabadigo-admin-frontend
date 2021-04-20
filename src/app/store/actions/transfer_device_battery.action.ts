import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { ItemStock, GetItemService, deployDevicebatteryRequest, DeployItemListMain, SingleRequest, getSingleRequestItem, multiTransferService, GetDeployItemListService } from 'src/app/models/transferDeviceBatteryModel';

export enum TransferDeviceBatteryActionTypes {
    Transfer_DeviceBattery_Request_Create_Load = "[TRANSFER DEVICE BATTERY] Transfer DeviceBattery Request Create Load Action",
    Transfer_DeviceBattery_Request_Create_Load_Success = "[TRANSFER DEVICE BATTERY] Transfer DeviceBattery Request Create Load Success Action",
    Transfer_DeviceBattery_Request_Create_Load_Failure = "[TRANSFER DEVICE BATTERY] Transfer DeviceBattery Request Create Load Failure Action",

    Transfer_DeviceBattery_Request_Rentalpoint_Load = "[TRANSFER DEVICE BATTERY] Transfer DeviceBattery Request Rentalpoint Load Action",
    Transfer_DeviceBattery_Request_Rentalpoint_Load_Success = "[TRANSFER DEVICE BATTERY] Transfer DeviceBattery Request Rentalpoint Load Success Action",
    Transfer_DeviceBattery_Request_Rentalpoint_Load_Failure = "[TRANSFER DEVICE BATTERY] Transfer DeviceBattery Request Rentalpoint Load Failure Action",

    DeviceBattery_Stock_Load = "[TRANSFER DEVICE BATTERY] DeviceBattery Stock Load Action",
    DeviceBattery_Stock_Load_Success = "[TRANSFER DEVICE BATTERY] DeviceBattery Stock Load Success Action",
    DeviceBattery_Stock_Load_Failure = "[TRANSFER DEVICE BATTERY] DeviceBattery Stock Load Failure Action",

    BatteryDevice_Transfer_Request_Create = "[TRANSFER DEVICE BATTERY] BatteryDevice Transfer Request Create Action",
    BatteryDevice_Transfer_Request_Create_Success = "[TRANSFER DEVICE BATTERY] BatteryDevice Transfer Request Create Success Action",
    BatteryDevice_Transfer_Request_Create_Failure = "[TRANSFER DEVICE BATTERY] BatteryDevice Transfer Request Create Failure Action",

    BatteryDevice_Transfer_Request_Load = "[TRANSFER DEVICE BATTERY] BatteryDevice Transfer Request Load Action",
    BatteryDevice_Transfer_Request_Load_Success = "[TRANSFER DEVICE BATTERY] BatteryDevice Transfer Request Load Success Action",
    BatteryDevice_Transfer_Request_Load_Failure = "[TRANSFER DEVICE BATTERY] BatteryDevice Transfer Request Load Failure Action",

    Single_BatteryDevice_Transfer_Request_Load = "[TRANSFER DEVICE BATTERY] Single BatteryDevice Transfer Request Load Action",
    Single_BatteryDevice_Transfer_Request_Load_Success = "[TRANSFER DEVICE BATTERY] Single BatteryDevice Transfer Request Load Success Action",
    Single_BatteryDevice_Transfer_Request_Load_Failure = "[TRANSFER DEVICE BATTERY] Single BatteryDevice Transfer Request Load Failure Action",

    Multi_Transfer_Action = "[TRANSFER DEVICE BATTERY] Multi Transfer Action",
    Multi_Transfer_Success_Action = "[TRANSFER DEVICE BATTERY] Multi Transfer Success Action",
    Multi_Transfer_Failure_Action = "[TRANSFER DEVICE BATTERY] Multi Transfer Failure Action",
}
//Transfer Request Create
export class TransferDeviceBatteryRequestCreateLoadAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load;
}
export class TransferDeviceBatteryRequestCreateLoadSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load_Success;
    constructor(public payload: any) { }
}
export class TransferDeviceBatteryRequestCreateLoadFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

export class TransferDeviceBatteryRequestRentalpointLoadAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load;
    constructor(public payload: number) { }
}
export class TransferDeviceBatteryRequestRentalpointLoadSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load_Success;
    constructor(public payload: RentalPoint[]) { }
}
export class TransferDeviceBatteryRequestRentalpointLoadFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class DeviceBatteryLoadAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load;
    constructor(public payload: GetItemService) { }
}
export class DeviceBatteryLoadSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load_Success;
    constructor(public payload: ItemStock[]) { }
}
export class DeviceBatteryLoadFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class BatteryDeviceTransferRequestCreateAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create;
    constructor(public payload: deployDevicebatteryRequest) { }
}
export class BatteryDeviceTransferRequestCreateSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create_Success;
}
export class BatteryDeviceTransferRequestCreateFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create_Failure;
    constructor(public payload: ErrorModel) { }
}

export class BatteryDeviceTransferRequestLoadAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load;
    constructor(public payload: GetDeployItemListService){}
}
export class BatteryDeviceTransferRequestLoadSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load_Success;
    constructor(public payload: DeployItemListMain[]) { }
}
export class BatteryDeviceTransferRequestLoadFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

export class SingleBatteryDeviceTransferRequestLoadAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load;
    constructor(public payload: SingleRequest) { }
}
export class SingleBatteryDeviceTransferRequestLoadSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load_Success;
    constructor(public payload: getSingleRequestItem[]) { }
}
export class SingleBatteryDeviceTransferRequestLoadFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load_Failure;
    constructor(public payload: ErrorModel) { }
}
export class MultiTransferAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Multi_Transfer_Action
    constructor(public payload: multiTransferService){}
}
export class MultiTransferSuccessAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Multi_Transfer_Success_Action
    constructor(){}
}
export class MultiTransferFailureAction implements Action {
    readonly type = TransferDeviceBatteryActionTypes.Multi_Transfer_Failure_Action
    constructor(public payload: ErrorModel){}
}
export type TransferDeviceBatteryAction = TransferDeviceBatteryRequestCreateLoadAction
| TransferDeviceBatteryRequestCreateLoadSuccessAction
| TransferDeviceBatteryRequestCreateLoadFailureAction
| TransferDeviceBatteryRequestRentalpointLoadAction
| TransferDeviceBatteryRequestRentalpointLoadSuccessAction
| TransferDeviceBatteryRequestRentalpointLoadFailureAction
| DeviceBatteryLoadAction
| DeviceBatteryLoadSuccessAction
| DeviceBatteryLoadFailureAction
| BatteryDeviceTransferRequestCreateAction
| BatteryDeviceTransferRequestCreateSuccessAction
| BatteryDeviceTransferRequestCreateFailureAction
| BatteryDeviceTransferRequestLoadAction
| BatteryDeviceTransferRequestLoadSuccessAction
| BatteryDeviceTransferRequestLoadFailureAction
| SingleBatteryDeviceTransferRequestLoadAction
| SingleBatteryDeviceTransferRequestLoadSuccessAction
| SingleBatteryDeviceTransferRequestLoadFailureAction
| MultiTransferAction
| MultiTransferSuccessAction
| MultiTransferFailureAction