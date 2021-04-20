import { FranchiseLoad } from "src/app/models/franchiseRentalPointModel";
import { FranchiseRentalPoints, FranchiseManagementAction } from '../actions/franchise_management.action';


const initialState: FranchiseLoad = {
    error: undefined,
    loading: false,
    RentalPoints: [],
    rentalPointHistory: undefined,
    available_battery: [],
}

export function FranchiseReducer(state: FranchiseLoad = initialState, action: FranchiseRentalPoints) {
    switch (action.type) {
        case FranchiseManagementAction.Franchise_Rental_Point_Load:
            return { ...state, loading: true };
        case FranchiseManagementAction.Franchise_Rental_Point_Load_Success:
            return { ...state, loading: false, error: undefined, RentalPoints: action.payload };
        case FranchiseManagementAction.Franchise_Rental_Point_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case FranchiseManagementAction.Get_Franchise_Rental_Point_History:
            return { ...state, loading: true };
        case FranchiseManagementAction.Get_Franchise_Rental_Point_History_Success:
            return { ...state, loading: false, error: undefined, rentalPointHistory: action.payload[0], available_battery: action.payload[1] };
        case FranchiseManagementAction.Get_Franchise_Rental_Point_History_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}