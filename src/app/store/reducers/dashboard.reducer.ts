import { DashboardLoad } from "src/app/models/dashboard-model";
import { DashboardActions, DashboardActionTypes } from '../actions/dashboard.action';

const initialState: DashboardLoad = {
    error: undefined,
    loading: false,
    regions: [],
    userDetail: undefined,
    cities: [],
    states: []
}

export function DashboardReducer(state: DashboardLoad = initialState, action: DashboardActions) {
    switch (action.type) {
        case DashboardActionTypes.Dashboard_Load:
            return { ...state, loading: true, regions: undefined, userDetail: undefined };
        case DashboardActionTypes.Dashboard_Load_Success:
            return {
                ...state, loading: false, regions: action.payload[0], userDetail: action.payload[1],
                cities: action.payload[2], states: action.payload[3]
            };
        case DashboardActionTypes.Dashboard_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}