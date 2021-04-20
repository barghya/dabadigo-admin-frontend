import { TripMain } from "src/app/models/tripManagementModel";
import { TripManagementAction, TripManagementActionTypes } from '../actions/trip_management.action';

const initialState: TripMain = {
    error: undefined,
    loading: false,
    TripDetail: [],
    RentalPointDetails: [],
    RegionList:[],
    CityList:[],
    singletripdetails: undefined,    
}

export function TripManagementReducer(state: TripMain = initialState, action: TripManagementAction) {
    switch (action.type) {
        case TripManagementActionTypes.Trip_Management_List_Load:
            return { ...state, loading: true };
        case TripManagementActionTypes.Trip_Management_List_Load_Success:
            return { ...state, loading: false, TripDetail: action.payload[0] , RegionList: action.payload[1], CityList: action.payload[2],};
        case TripManagementActionTypes.Trip_Management_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case TripManagementActionTypes.Rental_Point_Load_Action:
            return { ...state, loading: true };
        case TripManagementActionTypes.Rental_Point_Load_Success_Action:
            return { ...state, loading: false, RentalPointDetails: action.payload }
        case TripManagementActionTypes.Rental_Point_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case TripManagementActionTypes.End_Trip_Action:
            return { ...state, loading: false };
        case TripManagementActionTypes.End_Trip_Success_Action:
            return { ...state, loading: false };
        case TripManagementActionTypes.End_Trip_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case TripManagementActionTypes.Trip_Details_Load:
            return { ...state, loading: true, singletripdetails: undefined};
        case TripManagementActionTypes.Trip_Details_Load_Success:
            return { ...state, loading: false, singletripdetails: action.payload };
        case TripManagementActionTypes.Trip_Details_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}