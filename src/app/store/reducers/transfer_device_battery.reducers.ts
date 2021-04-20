import { TransferDeviceBatteryMain } from "src/app/models/transferDeviceBatteryModel";
import { TransferDeviceBatteryAction, TransferDeviceBatteryActionTypes } from '../actions/transfer_device_battery.action';

const initialState: TransferDeviceBatteryMain = {
    error: undefined,
    loading: false,
    cities: [],
    itemType: [],
    regions: [],
    storeTypes: [],
    rentalPoints: [],
    ItemStock: [],
    transferListMain: [],
    singleItem: []
}
export function TransferDeviceBatteryReducer(state: TransferDeviceBatteryMain = initialState, action: TransferDeviceBatteryAction) {
    switch (action.type) {
        case TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load:
            return {...state, loading: true }
        case TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load_Success:
            return {...state, loading: false, itemType: action.payload[0],regions: action.payload[1], storeTypes: action.payload[2], cities: action.payload[3]}
        case TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load_Failure:
            return {...state, loading: false, error: action.payload}
        case TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load:
            return {...state, loading: true }
        case TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load_Success:
            return {...state, loading: false, rentalPoints: action.payload}
        case TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load_Failure:
            return {...state, loading: false, error: action.payload}
        case TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load:
            return {...state, loading: true }
        case TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load_Success:
            return {...state, loading: false , ItemStock: action.payload }
        case TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load_Failure:
            return {...state, loading: false, error: action.payload }
        case TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create:
            return {...state, loading: true}
        case TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create_Success:
            return {...state, loading: false }
        case TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create_Failure:
            return {...state, error: action.payload , loading: false}
        case TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load:
            return {...state, loading: true }
        case TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load_Success:
            return {...state, transferListMain: action.payload, loading: false}
        case TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load_Failure:
            return { ...state, error: action.payload, loading: false }
        case TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load:
            return { ...state, loading: true }
        case TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load_Success:
            return { ...state, singleItem: action.payload, loading: false }
        case TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load_Failure:
            return { ...state, error: action.payload, loading: false }
        case TransferDeviceBatteryActionTypes.Multi_Transfer_Action:
            return {...state, loading: true}
        case TransferDeviceBatteryActionTypes.Multi_Transfer_Success_Action:
            return {...state, loading: false }
        case TransferDeviceBatteryActionTypes.Multi_Transfer_Failure_Action:
            return {...state, error: action.payload, loading: false}
        default:
            return state;
    }
}