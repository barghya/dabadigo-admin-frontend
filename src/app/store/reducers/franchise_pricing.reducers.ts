import { FranchisePricingMain } from "src/app/models/franchisePricingModel";
import { FranchisePricingActions, FranchisePricingActionTypes } from '../actions/franchise_pricing.action';

const initialState: FranchisePricingMain = {
    error: undefined,
    loading: false,
    franchisePricingList: [],
    RegionList: [],
}
export function FranchisePricingReducer(state: FranchisePricingMain = initialState, action: FranchisePricingActions) {
    switch (action.type) {
        case FranchisePricingActionTypes.Franchise_Pricing_Load:
            return { ...state, loading: true };
        case FranchisePricingActionTypes.Franchise_Pricing_Load_Success:
            return { ...state, loading: false, RegionList: action.payload[0], franchisePricingList: action.payload[1] };
        case FranchisePricingActionTypes.Franchise_Pricing_Load_Failure:
            return { ...state, loading: false, error: action.payload };
       
        default:
            return state;
    }
}