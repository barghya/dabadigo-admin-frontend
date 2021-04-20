import { RentalPointMain } from "src/app/models/rentalPoint";
import { RentalPoints, RentalPointAction } from '../actions/rental_point.action';


const initialState: RentalPointMain = {
    error: undefined,
    loading: false,
    RentalPoints: [],
    singleRentalPoint: {},
    ownership_code: [],
    rentalpoint_status: [],
    rentalpoint_type: [],
    countries: [],
    rentalPointHistory: undefined,
    regionitem: [],
    availableManagers: [],
    States: [],
    cities: [],
    available_battery: [],
    franchise: []
}

export function RentalpointReducer(state: RentalPointMain = initialState, action: RentalPoints) {
    switch (action.type) {
        case RentalPointAction.Rental_Point_Load:
            return { ...state, loading: true };
        case RentalPointAction.Rental_Point_Load_Success:
            return { ...state, loading: false, error: undefined, RentalPoints: action.payload[0], ownership_code: action.payload[1], franchise: action.payload[2]};
        case RentalPointAction.Rental_Point_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        // Add Rental Point
        case RentalPointAction.Add_Rental_Point:
            return { ...state, loading: true };
        case RentalPointAction.Add_Rental_Point_Success:
            return { ...state, loading: false, error: undefined };
        case RentalPointAction.Add_Rental_Point_Failure:
            return { ...state, loading: false, error: action.payload };
        // Add another Rental Point
        case RentalPointAction.Add_Another_Rental_Point:
            return { ...state, loading: true };
        // Delete Rental Point
        case RentalPointAction.Delete_Rental_Point:
            return { ...state, loading: true };
        case RentalPointAction.Delete_Rental_Point_Failure:
            return { ...state, error: action.payload, loading: false };
        // Edit Rental point Load Action
        case RentalPointAction.Edit_Rental_Point_Load:
            return { ...state, loading: true };
        case RentalPointAction.Edit_Rental_Point_Load_Success:
            return { ...state, loading: false, error: undefined, rentalpoint_type: action.payload[0], ownership_code: action.payload[1], rentalpoint_status: action.payload[2], singleRentalPoint: action.payload[3], countries: action.payload[4], regionitem: action.payload[5], availableManagers: action.payload[6], States: action.payload[7], cities: action.payload[8], franchise: action.payload[9]};
        case RentalPointAction.Edit_Rental_Point_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        // Add Rental Point Load
        case RentalPointAction.Add_Rental_Point_Load:
            return { ...state, loading: true };
        case RentalPointAction.Add_Rental_Point_Load_Success:
            return { ...state, loading: false, rentalpoint_type: action.payload[0], ownership_code: action.payload[1], rentalpoint_status: action.payload[2], countries: action.payload[3], regionitem: action.payload[4], availableManagers: action.payload[5], States: action.payload[6], cities: action.payload[7], franchise: action.payload[8]}
        case RentalPointAction.Add_Rental_Point_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        // Edit Rental Point
        case RentalPointAction.Edit_Rental_Point:
            return { ...state, loading: true };
        case RentalPointAction.Edit_Rental_Point_Success:
            return { ...state, loading: false, error: undefined };
        case RentalPointAction.Edit_Rental_Point_Failure:
            return { ...action, loading: false, error: action.payload };
        // Get Rental Point History 
        case RentalPointAction.Get_Rental_Point_History:
            return { ...state, loading: true, available_battery: []};
        case RentalPointAction.Get_Rental_Point_History_Success:
            return { ...state, loading: false,  error: undefined, rentalPointHistory: action.payload[0], available_battery: action.payload[1]};
        case RentalPointAction.Get_Rental_Point_History_Failure:
            return { ...state, loading: false, error: action.payload };
        // Move Rental Point
        case RentalPointAction.Move_Rental_Point:
            return { ...state, loading: true };
        case RentalPointAction.Move_Rental_Point_Success:
            return { ...state, loading: false, error: undefined };
        case RentalPointAction.Move_Rental_Point_Failure:
            return { ...state, loading: false, error: action.payload };
        // Add Battery Rp
        case RentalPointAction.Add_Battery_RP_Action:
            return {...state, loading: true }
        case RentalPointAction.Add_Battery_RP_Success_Action:
            return {...state, loading: false }
        case RentalPointAction.Add_Battery_RP_Failure_Action:
            return {...state, loading: false, error: action.payload}
        // Remove Battery Rp
        case RentalPointAction.Remove_Battery_RP_Action:
            return {...state, loading: true }
        case RentalPointAction.Remove_Battery_RP_Success_Action:
            return {...state, loading: false }
        case RentalPointAction.Remove_Battery_RP_Failure_Action:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }

}