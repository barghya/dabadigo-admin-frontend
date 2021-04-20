import { DomainDataState } from "src/app/models/domainModel";
import { DomainAction, DomainActionTypes } from '../actions/domain.action';

const initialState: DomainDataState = {
    error: undefined,
    battery_status: [],
    loading: false,
    error_framework: [],
}

export function DomainReducer(state: DomainDataState = initialState, action: DomainAction) {
    switch (action.type) {
        case DomainActionTypes.Battery_Status_Load:
            return { ...state, loading: true };
        case DomainActionTypes.Battery_Status_Load_Success:
            return { ...state, loading: false, battery_status: action.payload[0], countries: action.payload[1] };
        case DomainActionTypes.Battery_Status_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case DomainActionTypes.Error_Framework_Load:
            return { ...state };
        case DomainActionTypes.Error_Framework_Load_Success:
            return { ...state, error_framework: action.payload };
        case DomainActionTypes.Error_Framework_Load_Failure:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}