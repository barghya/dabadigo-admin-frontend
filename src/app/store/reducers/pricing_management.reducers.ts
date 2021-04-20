import { PricingManagementMain } from "src/app/models/pricingManagement";
import { PricingManagementActions, PricingManagementActionTypes } from '../actions/pricing_management.action';

const initialState: PricingManagementMain = {
    error: undefined,
    loading: false,
    PricingList: [],
    RegionList: [],
    VehicleTypesList: [],
    SinglePricing: undefined,
    SinglebatteryswapPricing: undefined,
    PricingTypeList: [],
    BatterySwapPricingList: [],
    corporate: [],
}

export function PricingManagementReducer(state: PricingManagementMain = initialState, action: PricingManagementActions) {
    switch (action.type) {
        case PricingManagementActionTypes.Pricing_Management_Load:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Pricing_Management_Load_Success:
            return { ...state, loading: false, VehicleTypesList: action.payload[0], RegionList: action.payload[1], PricingList: action.payload[2], PricingTypeList: action.payload[3], corporate: action.payload[4], BatterySwapPricingList: action.payload[5] };
        case PricingManagementActionTypes.Pricing_Management_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Add_Pricing_Load:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Add_Pricing_Load_Success:
            return { ...state, loading: false, VehicleTypesList: action.payload[0], RegionList: action.payload[1], PricingTypeList: action.payload[2], corporate: action.payload[3] };
        case PricingManagementActionTypes.Add_Pricing_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Add_Pricing:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Add_Another_Pricing:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Add_Pricing_Success:
            return { ...state, loading: false };
        case PricingManagementActionTypes.Add_Pricing_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Edit_Pricing_Load:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Edit_Pricing_Load_Success:
            return { ...state, loading: false, VehicleTypesList: action.payload[0], RegionList: action.payload[1], SinglePricing: action.payload[2], PricingTypeList: action.payload[3], corporate: action.payload[4] };
        case PricingManagementActionTypes.Edit_Pricing_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Edit_Pricing:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Edit_Pricing_Success:
            return { ...state, loading: false };
        case PricingManagementActionTypes.Edit_Pricing_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Delete_Pricing:
            return state;
        case PricingManagementActionTypes.Delete_Pricing_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load_Success:
            return { ...state, loading: false, VehicleTypesList: action.payload[0], RegionList: action.payload[1], PricingTypeList: action.payload[2], corporate: action.payload[3] };
        case PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Add_Battery_Swap_Pricing:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Add_Battery_Swap_Pricing_Success:
            return { ...state, loading: false };
        case PricingManagementActionTypes.Add_Battery_Swap_Pricing_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load_Success:
            return { ...state, loading: false, VehicleTypesList: action.payload[0], RegionList: action.payload[1], SinglebatteryswapPricing: action.payload[2], PricingTypeList: action.payload[3], corporate: action.payload[4] };
        case PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Edit_Battery_Swap_Pricing:
            return { ...state, loading: true };
        case PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Success:
            return { ...state, loading: false };
        case PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Failure:
            return { ...state, loading: false, error: action.payload };
        case PricingManagementActionTypes.Delete_Battery_Swap_Pricing:
            return state;
        case PricingManagementActionTypes.Delete_Battery_Swap_Pricing_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}