import { TransferPartsMain } from "src/app/models/transferpartsModel";
import { TransferPartsActions, TransferPartsActionTypes } from '../actions/transfer_parts.action';

const initialState: TransferPartsMain = {
    error: undefined,
    loading: false,
    partsTransferList: undefined,
    fsqHubs: [],
    fsqList: [],
    partsStatuses: [],
    partsStocks: [],
    regions: [],
    rentalPoints: [],
    storeTypes: [],
    partsMasters: [],
    cities: [],
}

export function TransferPartsReducer(state: TransferPartsMain = initialState, action: TransferPartsActions) {
    switch (action.type) {
        case TransferPartsActionTypes.Transfer_Request_Load:
            return { ...state, loading: true };
        case TransferPartsActionTypes.Transfer_Request_Load_Success:
            return { ...state, loading: false, partsTransferList: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Create_Load:
            return { ...state, loading: true };
        case TransferPartsActionTypes.Transfer_Request_Create_Load_Success:
            return { ...state, loading: false, partsMasters: action.payload[0], 
                regions: action.payload[1], storeTypes: action.payload[2], 
                partsStatuses: action.payload[3], cities: action.payload[4]
            };
        case TransferPartsActionTypes.Transfer_Request_Create_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load:
            return { ...state, loading: true, rentalPoints: [] };
        case TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load_Success:
            return { ...state, loading: false, rentalPoints: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Fsq_Load:
            return { ...state, loading: true, fsqList: [] };
        case TransferPartsActionTypes.Transfer_Request_Fsq_Load_Success:
            return { ...state, loading: false, fsqList: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Fsq_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Parts_Stock_Load:
            return { ...state, loading: true, partsStocks: undefined };
        case TransferPartsActionTypes.Parts_Stock_Load_Success:
            return { ...state, loading: false, partsStocks: action.payload };
        case TransferPartsActionTypes.Parts_Stock_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Create:
            return { ...state, loading: true };
        case TransferPartsActionTypes.Transfer_Request_Create_Success:
            return { ...state, loading: false, partsStocks: undefined };
        case TransferPartsActionTypes.Transfer_Request_Create_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Approve:
            return { ...state, loading: true };
        case TransferPartsActionTypes.Transfer_Request_Approve_Success:
            return { ...state, loading: false };
        case TransferPartsActionTypes.Transfer_Request_Approve_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Reject:
            return { ...state, loading: true };
        case TransferPartsActionTypes.Transfer_Request_Reject_Success:
            return { ...state, loading: false };
        case TransferPartsActionTypes.Transfer_Request_Reject_Failure:
            return { ...state, loading: false, error: action.payload };
        case TransferPartsActionTypes.Transfer_Request_Delete:
            return { ...state, loading: true };
        case TransferPartsActionTypes.Transfer_Request_Delete_Success:
            return { ...state, loading: false };
        case TransferPartsActionTypes.Transfer_Request_Delete_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}