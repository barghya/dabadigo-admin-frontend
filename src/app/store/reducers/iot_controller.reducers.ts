import { IotControllerMain } from 'src/app/models/iotControllereModel';
import { IotControllerAction, IotControllerActionTypes } from '../actions/iot_controller.action';


const initialState: IotControllerMain = {
    error: undefined,
    loading: false,
    actionMainDetails: [],
    deviceDetails: [],
    demodeviceDetails: [],
    bypass: undefined,
    MoreActionDetail: undefined,
    SlotPoints: [],
    SlotBooking: undefined,
    device_status: [],
    Countries: [],
    singleDevice: undefined,

}

export function IotControllerReducer(state: IotControllerMain = initialState, action: IotControllerAction) {
    switch (action.type) {
        case IotControllerActionTypes.Action_Main_List_Load:
            return { ...state, loading: true };
        case IotControllerActionTypes.Action_Main_List_Load_Success:
            return { ...state, loading: false, actionMainDetails: action.payload };
        case IotControllerActionTypes.Action_Main_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case IotControllerActionTypes.More_Action_Detail_Action:
            return { ...state, loading: true }
        case IotControllerActionTypes.More_Action_Detail_Success_Action:
            return { ...state, MoreActionDetail: action.payload, loading: false }
        case IotControllerActionTypes.More_Action_Detail_Failure_Action:
            return { ...state, error: action.payload, loading: false }

        // cancel ride
        case IotControllerActionTypes.Cancel_Trip_Action:
            return { ...state, loading: true };
        case IotControllerActionTypes.Cancel_Trip_Success_Action:
            return { ...state, loading: false, error: undefined };
        case IotControllerActionTypes.Cancel_Trip_failure_Action:
            return { ...state, loading: false, error: action.payload };

        // start ride
        case IotControllerActionTypes.Start_Trip_Action:
            return { ...state, loading: true };
        case IotControllerActionTypes.Start_Trip_Success_Action:
            return { ...state, loading: false, error: undefined };
        case IotControllerActionTypes.Start_Trip_failure_Action:
            return { ...state, loading: false, error: action.payload };
        //pause ride
        case IotControllerActionTypes.Pause_Trip_Action:
            return { ...state, loading: true, error: undefined }
        case IotControllerActionTypes.Pause_Trip_Success_Action:
            return { ...state, loading: false, error: undefined }
        case IotControllerActionTypes.Pause_Trip_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        //Resume ride
        case IotControllerActionTypes.Resume_Trip_Action:
            return { ...state, loading: true, error: undefined }
        case IotControllerActionTypes.Resume_Trip_Success_Action:
            return { ...state, loading: false, error: undefined }
        case IotControllerActionTypes.Resume_Trip_Failure_Action:
            return { ...state, loading: false, error: action.payload }

        //Cancel Slot
        case IotControllerActionTypes.Cancel_Slot_Action:
            return { ...state, loading: true };
        case IotControllerActionTypes.Cancel_Slot_Success_Action:
            return { ...state, loading: false, error: undefined };
        case IotControllerActionTypes.Cancel_Slot_failure_Action:
            return { ...state, loading: false, error: action.payload };

        //end Trip
        case IotControllerActionTypes.End_Trip_Action:
            return { ...state, loading: true, error: undefined }
        case IotControllerActionTypes.End_Trip_Success_Action:
            return { ...state, loading: false, error: undefined, SlotBooking: undefined }
        case IotControllerActionTypes.End_Trip_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        // get all slot
        case IotControllerActionTypes.Get_Slot_Action:
            return { ...state, loading: true }
        case IotControllerActionTypes.Get_Slot_Success_Action:
            return { ...state, loading: false, SlotPoints: action.Payload, error: undefined }
        case IotControllerActionTypes.Get_Slot_Failure_Action:
            return { ...state, loading: false, error: action.payload }

        //Slot Booking Request
        case IotControllerActionTypes.Slot_Booking_Action:
            return { ...state, loading: true }
        case IotControllerActionTypes.Slot_Booking_Success_Action:
            return { ...state, loading: false, error: undefined }
        case IotControllerActionTypes.Slot_Booking_Failure_Action:
            return { ...state, loading: false, error: action.payload }

        // Device List Load
        case IotControllerActionTypes.Device_List_Load:
            return { ...state, loading: true };
        case IotControllerActionTypes.Device_List_Load_Success:
            return { ...state, loading: false, deviceDetails: action.payload };
        case IotControllerActionTypes.Device_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };


        // Bypass List Load
        case IotControllerActionTypes.Bypass_List_Load:
            return { ...state, loading: true };
        case IotControllerActionTypes.Bypass_List_Load_Success:
            return { ...state, loading: false, bypass: action.payload };
        case IotControllerActionTypes.Bypass_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        // Add Bypass
        case IotControllerActionTypes.Add_Bypass_Action:
            return { ...state, loading: true, bypass: undefined };
        case IotControllerActionTypes.Add_Bypass_Success_Action:
            return { ...state, loading: false };
        case IotControllerActionTypes.Add_Bypass_failure_Action:
            return { ...state, loading: false, error: action.payload };

        // DemoDevice List Load
        case IotControllerActionTypes.Demo_Device_List_Load:
            return { ...state, loading: true };
        case IotControllerActionTypes.Demo_Device_List_Load_Success:
            return { ...state, loading: false, demodeviceDetails: action.payload };
        case IotControllerActionTypes.Demo_Device_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        // Add Demo Device Load
        case IotControllerActionTypes.Add_Demo_Device_Load_Action:
            return { ...state, loading: true };
        case IotControllerActionTypes.Add_Demo_Device_Load_Success_Action:
            return { ...state, loading: false, Countries: action.payload }
        case IotControllerActionTypes.Add_Demo_Device_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        // Add Demo Device
        case IotControllerActionTypes.Add_Demo_Device_Action:
            return { ...state, loading: true };
        case IotControllerActionTypes.Add_Demo_Device_Success_Action:
            return { ...state, loading: false };
        case IotControllerActionTypes.Add_Demo_Device_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        // Edit  Demo Device Load
        case IotControllerActionTypes.Edit_Demo_Device_Load:
            return { ...state, loading: true };
        case IotControllerActionTypes.Edit_Demo_Device_Success_Load:
            return { ...state, loading: false, singleDevice: action.payload };
        case IotControllerActionTypes.Edit_Demo_Device_Failure_Load:
            return { ...state, loading: false, error: action.payload };

        // Edit Demo Device
        case IotControllerActionTypes.Edit_Demo_Device_Action:
            return { ...state, loading: true };
        case IotControllerActionTypes.Edit_Demo_Device_Success_Action:
            return { ...state, loading: false };
        case IotControllerActionTypes.Edit_Demo_Device_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}