import { FranchiseVehicle } from "src/app/models/franchiseVehicleModel";
import { FranchiseVehicles, FranchiseVehicleAction } from '../actions/franchise_vehicle.action';

const initialState: FranchiseVehicle = {
    error: undefined,
    loading: false,
    Assets: [],
}

export function FranchiseVehicleReducer(state: FranchiseVehicle = initialState, action: FranchiseVehicles) {
    switch (action.type) {
        case FranchiseVehicleAction.Franchise_Vehicle_Load:
            return { ...state, loading: true };
        case FranchiseVehicleAction.Franchise_Vehicle_Load_Success:
            return { ...state, loading: false, error: undefined, Assets: action.payload };
        case FranchiseVehicleAction.Franchise_Vehicle_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

