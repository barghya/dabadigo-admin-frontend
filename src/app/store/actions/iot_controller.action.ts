import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { ActionMainDetails, moreActionDetail, TripUuid, TripStart, PauseResumeService, EndTripService, getSlotService, SlotPoint, SlotBookingService, DeviceDetails, Bypass, Bypasslist, IotControllerDetails, TripCancel, cancelSlot, DemoDeviceDetails, addDemoDevice, editDemoDevice, editDummyDevice } from 'src/app/models/iotControllereModel';

export enum IotControllerActionTypes {
    Action_Main_List_Load = "[Iot Controller] Action_Main_List_Load",
    Action_Main_List_Load_Success = "[Iot Controller] Action_Main_List_Load_Success",
    Action_Main_List_Load_Failure = "[Iot Controller] Action_Main_List_Load_Failure",
    More_Action_Detail_Action = "[Iot Controller] More_Action_Detail_Action",
    More_Action_Detail_Success_Action = "[Iot Controller] More_Action_Detail_Success_Action",
    More_Action_Detail_Failure_Action = "[Iot Controller] More_Action_Detail_Failure_Action",
    Start_Trip_Action = "[Iot Controller] Start_Trip_Action",
    Start_Trip_Success_Action = "[Iot Controller] Start_Trip_Success_Action",
    Start_Trip_failure_Action = "[Iot Controller] Start_Trip_failure_Action",
    Pause_Trip_Action = "[Iot Controller] Pause_Trip_Action",
    Pause_Trip_Success_Action = "[Iot Controller] Pause_Trip_Success_Action",
    Pause_Trip_Failure_Action = "[Iot Controller] Pause_Trip_Failure_Action",
    Resume_Trip_Action = "[Iot Controller] Resume_Trip_Action",
    Resume_Trip_Success_Action = "[Iot Controller] Resume_Trip_Success_Action",
    Resume_Trip_Failure_Action = "[Iot Controller] Resume_Trip_Failure_Action",
    End_Trip_Action = "[Iot Controller] End_Trip_Action",
    End_Trip_Success_Action = "[Iot Controller] End_Trip_Success_Action",
    End_Trip_Failure_Action = "[Iot Controller] End_Trip_Failure_Action",
    Get_Slot_Action = "[Iot Controller] Get_Slot_Action",
    Get_Slot_Success_Action = "[Iot Controller] Get_Slot_Success_Action",
    Get_Slot_Failure_Action = "[Iot Controller] Get_Slot_Failure_Action",
    Slot_Booking_Action = "[Iot Controller] Slot_Booking_Action",
    Slot_Booking_Success_Action = "[Iot Controller] Slot_Booking_Success_Action",
    Slot_Booking_Failure_Action = "[Iot Controller] Slot_Booking_Failure_Action",
    Device_List_Load = "[Iot Controller] Device_List_Load",
    Device_List_Load_Success = "[Iot Controller] Device_List_Load_Success",
    Device_List_Load_Failure = "[Iot Controller] Device_List_Load_Failure",
    Bypass_List_Load = "[Iot Controller] Bypass_List_Load",
    Bypass_List_Load_Success = "[Iot Controller] Bypass_List_Load_Success",
    Bypass_List_Load_Failure = "[Iot Controller] Bypass_List_Load_Failure",
    Add_Bypass_Action = "[Iot Controller] Add_Bypass_Action",
    Add_Bypass_Success_Action = "[Iot Controller] Add_Bypass_Success_Action",
    Add_Bypass_failure_Action = "[Iot Controller] Add_Bypass_failure_Action",
    Cancel_Trip_Action = "[Iot Controller] Cancel_Trip_Action",
    Cancel_Trip_Success_Action = "[Iot Controller] Cancel_Trip_Success_Action",
    Cancel_Trip_failure_Action = "[Iot Controller] Cancel_Trip_failure_Action",
    Cancel_Slot_Action = "[Iot Controller] Cancel_Slot_Action",
    Cancel_Slot_Success_Action = "[Iot Controller] Cancel_Slot_Success_Action",
    Cancel_Slot_failure_Action = "[Iot Controller] Cancel_Slot_failure_Action",
    Demo_Device_List_Load = "[Iot Controller] Demo_Device_List_Load",
    Demo_Device_List_Load_Success = "[Iot Controller] Demo_Device_List_Load_Success",
    Demo_Device_List_Load_Failure = "[Iot Controller] Demo_Device_List_Load_Failure",
    Add_Demo_Device_Action = "[Iot Controller] Add_Demo_Device_Action",
    Add_Demo_Device_Success_Action = "[Iot Controller] Add_Demo_Device_Success_Action",
    Add_Demo_Device_Failure_Action = "[Iot Controller] Add_Demo_Device_Failure_Action",
    Add_Demo_Device_Load_Action = "[Iot Controller] Add_Demo_Device_Load_Action",
    Add_Demo_Device_Load_Success_Action = "[Iot Controller] Add_Demo_Device_Load_Success_Action",
    Add_Demo_Device_Load_Failure_Action = "[Iot Controller] Add_Demo_Device_Load_Failure_Action",
    Edit_Demo_Device_Action = "[Iot Controller] Edit_Demo_Device_Action",
    Edit_Demo_Device_Success_Action = "[Iot Controller] Edit_Demo_Device_Success_Action",
    Edit_Demo_Device_Failure_Action = "[Iot Controller] Edit_Demo_Device_Failure_Action",
    Edit_Demo_Device_Load = "[Iot Controller] Edit_Demo_Device_Load",
    Edit_Demo_Device_Success_Load = "[Iot Controller] Edit_Demo_Device_Success_Load",
    Edit_Demo_Device_Failure_Load = "[Iot Controller] Edit_Demo_Device_Failure_Load"
}

//ActionMainListLoadAction
export class ActionMainListLoadAction implements Action {
    readonly type = IotControllerActionTypes.Action_Main_List_Load;
}

export class ActionMainListLoadSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Action_Main_List_Load_Success;
    constructor(public payload: ActionMainDetails[]) {}
}

export class ActionMainListLoadFailureAction implements Action {
    readonly type = IotControllerActionTypes.Action_Main_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// More Action Details Action
export class MoreActionDetailAction implements Action {
    readonly type= IotControllerActionTypes.More_Action_Detail_Action
    constructor(public payload: TripUuid){}
}
export class MoreActionDetailSuccessAction implements Action {
    readonly type= IotControllerActionTypes.More_Action_Detail_Success_Action
    constructor(public payload: moreActionDetail){}
}
export class MoreActionDetailFailureAction implements Action {
    readonly type= IotControllerActionTypes.More_Action_Detail_Failure_Action
    constructor(public payload: ErrorModel){}
}

//Cancel Trip

export class CancelTripAction implements Action{
    readonly type = IotControllerActionTypes.Cancel_Trip_Action;
    constructor(public payload: TripCancel) {}
}

export class CancelTripSuccessAction implements Action{
    readonly type = IotControllerActionTypes.Cancel_Trip_Success_Action;
}

export class CancelTripFailureAction implements Action{
    readonly type = IotControllerActionTypes.Cancel_Trip_failure_Action;
    constructor(public payload: ErrorModel){}
}

//Start Trip

export class StartTripAction implements Action{
    readonly type = IotControllerActionTypes.Start_Trip_Action;
    constructor(public payload: TripStart) {}
}

export class StartTripSuccessAction implements Action{
    readonly type = IotControllerActionTypes.Start_Trip_Success_Action;
}

export class StartTripFailureAction implements Action{
    readonly type = IotControllerActionTypes.Start_Trip_failure_Action;
    constructor(public payload: ErrorModel){}
}

// Pause Trip

export class PauseTripAction implements Action {
    readonly type= IotControllerActionTypes.Pause_Trip_Action
    constructor(public payload: PauseResumeService){}
}

export class PauseTripSuccessAction implements Action {
    readonly type= IotControllerActionTypes.Pause_Trip_Success_Action
    constructor(){}
}
export class PauseTripFailureAction implements Action {
    readonly type= IotControllerActionTypes.Pause_Trip_Failure_Action
    constructor(public payload: ErrorModel){}
}

//Resume Trip

export class ResumeTripAction implements Action {
    readonly type= IotControllerActionTypes.Resume_Trip_Action
    constructor(public payload: PauseResumeService){}
}

export class ResumeTripSuccessAction implements Action {
    readonly type= IotControllerActionTypes.Resume_Trip_Success_Action
    constructor(){}
}
export class ResumeTripFailureAction implements Action {
    readonly type= IotControllerActionTypes.Resume_Trip_Failure_Action
    constructor(public payload: ErrorModel){}
}

//Get Slot 

export class GetSlotAction implements Action{
    readonly type=IotControllerActionTypes.Get_Slot_Action
    constructor(public payload: getSlotService){}
}

export class GetSlotSuccessAction implements Action{
    readonly type= IotControllerActionTypes.Get_Slot_Success_Action
    constructor(public Payload: SlotPoint){}
}

export class GetSlotFailureAction implements Action {
    readonly type= IotControllerActionTypes.Get_Slot_Failure_Action
    constructor(public payload: ErrorModel){}
}

//Slot Booking Request
export class SlotBookingAction implements Action {
    readonly type= IotControllerActionTypes.Slot_Booking_Action
    constructor(public payload: SlotBookingService){}
}
export class SlotBookingSuccessAction implements Action {
    readonly type= IotControllerActionTypes.Slot_Booking_Success_Action
    constructor(){}
}
export class SlotBookingFailureAction implements Action {
    readonly type= IotControllerActionTypes.Slot_Booking_Failure_Action
    constructor(public payload: ErrorModel){}
}

// Cancel Slot
export class CancelSlotAction implements Action{
    readonly type = IotControllerActionTypes.Cancel_Slot_Action;
    constructor(public payload: cancelSlot) {}
}

export class CancelSlotSuccessAction implements Action{
    readonly type = IotControllerActionTypes.Cancel_Slot_Success_Action;
}

export class CancelSlotFailureAction implements Action{
    readonly type = IotControllerActionTypes.Cancel_Slot_failure_Action;
    constructor(public payload: ErrorModel){}
}


//End Trip
export class EndTripAction implements Action {
    readonly type= IotControllerActionTypes.End_Trip_Action
    constructor(public payload: EndTripService){}
}

export class EndTripSuccessAction implements Action {
    readonly type= IotControllerActionTypes.End_Trip_Success_Action
    constructor(){}
}

export class EndTripActionFailure implements Action {
    readonly type= IotControllerActionTypes.End_Trip_Failure_Action
    constructor(public payload: ErrorModel){}
}

//DeviceListLoadAction
export class DeviceListLoadAction implements Action {
    readonly type = IotControllerActionTypes.Device_List_Load;
}

export class DeviceListLoadSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Device_List_Load_Success;
    constructor(public payload: DeviceDetails[]) {}
}

export class DeviceListLoadFailureAction implements Action {
    readonly type = IotControllerActionTypes.Device_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//BypassListLoadAction
export class BypassListLoadAction implements Action {
    readonly type = IotControllerActionTypes.Bypass_List_Load;
    constructor(public payload:IotControllerDetails){}
}

export class BypassListLoadSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Bypass_List_Load_Success;
    constructor(public payload: Bypasslist) {}
}

export class BypassListLoadFailureAction implements Action {
    readonly type = IotControllerActionTypes.Bypass_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//Add Bypass

export class AddBypassAction implements Action{
    readonly type = IotControllerActionTypes.Add_Bypass_Action;
    constructor(public payload: Bypass) {}
}

export class AddBypassSuccessAction implements Action{
    readonly type = IotControllerActionTypes.Add_Bypass_Success_Action;
}

export class AddBypassFailureAction implements Action{
    readonly type = IotControllerActionTypes.Add_Bypass_failure_Action;
    constructor(public payload: ErrorModel){}
}

//DemoDeviceListLoadAction
export class DemoDeviceListLoadAction implements Action {
    readonly type = IotControllerActionTypes.Demo_Device_List_Load;
}

export class DemoDeviceListLoadSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Demo_Device_List_Load_Success;
    constructor(public payload: DemoDeviceDetails[]) {}
}

export class DemoDeviceListLoadFailureAction implements Action {
    readonly type = IotControllerActionTypes.Demo_Device_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Add Demo Device Load
export class AddDemoDeviceLoadAction implements Action {
    readonly type = IotControllerActionTypes.Add_Demo_Device_Load_Action;
    
}

export class AddDemoDeviceLoadSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Add_Demo_Device_Load_Success_Action;
    constructor(public payload: any) { }
}

export class AddDemoDeviceLoadFailureAction implements Action {
    readonly type = IotControllerActionTypes.Add_Demo_Device_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}


// Add Demo Device
export class AddDemoDeviceAction implements Action {
    readonly type = IotControllerActionTypes.Add_Demo_Device_Action;
    constructor(public payload: addDemoDevice) { }
}

export class AddDemoDeviceSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Add_Demo_Device_Success_Action;
}

export class AddDemoDeviceFailureAction implements Action {
    readonly type = IotControllerActionTypes.Add_Demo_Device_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// Edit Demo Device
export class EditDemoDeviceAction implements Action {
    readonly type = IotControllerActionTypes.Edit_Demo_Device_Action;
    constructor(public payload: editDummyDevice) { }
}

export class EditDemoDeviceSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Edit_Demo_Device_Success_Action;

}
export class EditDemoDeviceFailureAction implements Action {
    readonly type = IotControllerActionTypes.Edit_Demo_Device_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// Edit Demo Device Load
export class EditDemoDeviceLoadAction implements Action {
    readonly type = IotControllerActionTypes.Edit_Demo_Device_Load;
    constructor(public payload: editDemoDevice) { }
}

export class EditDemoDeviceLoadSuccessAction implements Action {
    readonly type = IotControllerActionTypes.Edit_Demo_Device_Success_Load;
    constructor(public payload: DemoDeviceDetails) { }
}
export class EditDemoDeviceLoadFailureAction implements Action {
    readonly type = IotControllerActionTypes.Edit_Demo_Device_Failure_Load;

    constructor(public payload: ErrorModel) { }
}



export type IotControllerAction = ActionMainListLoadAction
| ActionMainListLoadSuccessAction
| ActionMainListLoadFailureAction
| MoreActionDetailAction
| MoreActionDetailSuccessAction
| MoreActionDetailFailureAction
| CancelTripAction
| CancelTripSuccessAction
| CancelTripFailureAction
| StartTripAction
| StartTripSuccessAction
| StartTripFailureAction
| PauseTripAction
| PauseTripSuccessAction
| PauseTripFailureAction
| ResumeTripAction
| ResumeTripSuccessAction
| ResumeTripFailureAction
| GetSlotAction
| GetSlotSuccessAction
| GetSlotFailureAction
| SlotBookingAction
| SlotBookingSuccessAction
| SlotBookingFailureAction
| CancelSlotAction
| CancelSlotSuccessAction
| CancelSlotFailureAction
| EndTripAction
| EndTripSuccessAction
| EndTripActionFailure
| DeviceListLoadAction
| DeviceListLoadSuccessAction
| DeviceListLoadFailureAction
| BypassListLoadAction
| BypassListLoadSuccessAction
| BypassListLoadFailureAction
| AddBypassAction
| AddBypassSuccessAction
| AddBypassFailureAction
| DemoDeviceListLoadAction
| DemoDeviceListLoadSuccessAction
| DemoDeviceListLoadFailureAction
| AddDemoDeviceAction
| AddDemoDeviceSuccessAction
| AddDemoDeviceFailureAction
| AddDemoDeviceLoadAction
| AddDemoDeviceLoadSuccessAction
| AddDemoDeviceLoadFailureAction
| EditDemoDeviceAction
| EditDemoDeviceSuccessAction
| EditDemoDeviceFailureAction
| EditDemoDeviceLoadAction
| EditDemoDeviceLoadSuccessAction
| EditDemoDeviceLoadFailureAction