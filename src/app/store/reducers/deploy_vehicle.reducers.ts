import { DeployVehicleAction, DeployVehicleActionTypes } from '../actions/deploy_vehicle.action';
import { DeployVehicle } from 'src/app/models/deployVehicleModel';

const initialState: DeployVehicle = {
    error: undefined,
    loading: false,
    region: [],
    rentalPoint: [],
    users: [],
    deployRequestVehicle: [],
    vehicleDetails: [],
    RegionList:[],
    CityList:[],
    StateList:[],
    singleDeployVehicle: {}

}
export function DeployVehicleReducer(state: DeployVehicle = initialState, action: DeployVehicleAction) {
    switch (action.type) {
        case DeployVehicleActionTypes.Add_Deploy_vehicle_load:
            return { ...state, loading: true, error: undefined };
        case DeployVehicleActionTypes.Add_Deploy_vehicle_Load_Success:
            return { ...state, loading: false, rentalPoint: action.payload[1], region: action.payload[0], users: action.payload[2], error: undefined };
        case DeployVehicleActionTypes.Add_Deploy_vehicle_Load_Failure:
            return { ...state, loading: false, error: action.payload }
        case DeployVehicleActionTypes.Vehicle_Request_List_Load:
            return { ...state, loading: true };
        case DeployVehicleActionTypes.Vehicle_Request_List_Load_Success:
            return { ...state, loading: false, deployRequestVehicle: action.payload[0], RegionList: action.payload[1], CityList: action.payload[2],StateList:action.payload[3] };
        case DeployVehicleActionTypes.Vehicle_Request_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case DeployVehicleActionTypes.Vehicle_Deploy_List_Load:
            return { ...state, loading: true };
        case DeployVehicleActionTypes.Vehicle_Deploy_List_Load_Success:
            return { ...state, loading: false, vehicleDetails: action.payload };
        case DeployVehicleActionTypes.Vehicle_Deploy_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case DeployVehicleActionTypes.Create_Request_Vehicle:
            return { ...state, loading: true };
        case DeployVehicleActionTypes.Create_Request_Vehicle_Success:
            return { ...state, loading: false, error: undefined };
        case DeployVehicleActionTypes.Create_Request_Vehicle_Failure:
            return { ...state, loading: false, error: action.payload };
        case DeployVehicleActionTypes.Deploy_Vehicle_Load_Action:
            return { ...state, loading: true };
        case DeployVehicleActionTypes.Deploy_Vehicle_Load_Success_Action:
            return { ...state, loading: false, singleDeployVehicle: action.payload };
        case DeployVehicleActionTypes.Deploy_Vehicle_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case DeployVehicleActionTypes.Deploy_Vehicle_Action:
            return { ...state, loading: true };
        case DeployVehicleActionTypes.Deploy_Vehicle_Success_Action:
            return { ...state, loading: false };
        case DeployVehicleActionTypes.Deploy_Vehicle_Failure_Action:
            return { ...state, loading: false, error: action.payload };
            case DeployVehicleActionTypes.Delete_Deploy_Vehicle_Action:
            return { ...state, loading: false };
        case DeployVehicleActionTypes.Delete_Deploy_Vehicle_Action_Failure:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}