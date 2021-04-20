import { RegionManagementMain } from "src/app/models/regionManagement";
import { RegionManagementActions, RegionManagementActionTypes } from '../actions/region_management.action';

const initialState: RegionManagementMain = {
    error: undefined,
    loading: false,
    RegionList: [],
    Countries: [],
    States: [],
    singleRegion: undefined,
    cities: []
}
export function RegionManagementReducer(state: RegionManagementMain = initialState, action: RegionManagementActions) {
    switch (action.type) {
        case RegionManagementActionTypes.Region_Management_Load:
            return { ...state, loading: true, RegionList: [] };
        case RegionManagementActionTypes.Region_Management_Load_Success:
            return { ...state, loading: false, RegionList: action.payload, singleRegion: undefined };
        case RegionManagementActionTypes.Region_Management_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case RegionManagementActionTypes.Add_region_Load:
            return { ...state, loading: true, RegionList: undefined };
        case RegionManagementActionTypes.Add_Region_Load_Success:
            return { ...state, loading: false, RegionList: action.payload[0], Countries: action.payload[1], States: action.payload[2], cities: action.payload[3]};
        case RegionManagementActionTypes.Add_Region_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case RegionManagementActionTypes.Add_region_action:
            return { ...state, loading: true };
        case RegionManagementActionTypes.Add_Region_Success:
            return { ...state, loading: false };
        case RegionManagementActionTypes.Add_Region_Failure:
            return { ...state, loading: false, error: action.payload };
        case RegionManagementActionTypes.Edit_region_Load:
            return { ...state, loading: true, RegionList: undefined };
        case RegionManagementActionTypes.Edit_Region_Load_Success:
            return { ...state, loading: false, RegionList: action.payload[0], singleRegion: action.payload[1], Countries: action.payload[2], States: action.payload[3], cities: action.payload[4]};
        case RegionManagementActionTypes.Edit_Region_Load_Failure:
            return { ...state, loading: false, error: action.payload };
            case RegionManagementActionTypes.Edit_Region:
            return { ...state, loading: true };
        case RegionManagementActionTypes.Edit_Region_Success:
            return { ...state, loading: false };
        case RegionManagementActionTypes.Edit_Region_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}