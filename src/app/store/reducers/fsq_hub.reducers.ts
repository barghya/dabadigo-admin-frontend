import { FSQhubMain } from "src/app/models/fsqhubModel";
import { FSQHubAction, FSQHubActionTypes } from '../actions/fsq_hub.action';


const initialState: FSQhubMain = {
    error: undefined,
    loading: false,
    fsqHubDetails: [],
    availableRegions: [],
    availableManagers: [],
    Countries: [],
    States: [],
    hubstatus: [],
    SingleHub: undefined,
    cities: []
}

export function FSQHubReducer(state: FSQhubMain = initialState, action: FSQHubAction) {
    switch (action.type) {
        case FSQHubActionTypes.FSQ_Hub_List_Load:
            return { ...state, loading: true };
        case FSQHubActionTypes.FSQ_Hub_List_Load_Success:
            return { ...state, loading: false, fsqHubDetails: action.payload };
        case FSQHubActionTypes.FSQ_Hub_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case FSQHubActionTypes.Admin_FSQ_Hub_List_Load:
            return { ...state, loading: true };
        case FSQHubActionTypes.Admin_FSQ_Hub_List_Load_Success:
            return { ...state, loading: false, fsqHubDetails: action.payload };
        case FSQHubActionTypes.Admin_FSQ_Hub_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case FSQHubActionTypes.Add_FSQ_Hub:
            return { ...state, loading: true };
        case FSQHubActionTypes.Add_FSQ_Hub_Success:
            return { ...state, loading: false };
        case FSQHubActionTypes.Add_FSQ_Hub_Failure:
            return { ...state, loading: false, error: action.payload };

        case FSQHubActionTypes.Add_FSQ_Hub_Load_Action:
            return { ...state, loading: true, availableRegions: undefined, availableManagers: undefined }
        case FSQHubActionTypes.Add_FSQ_Hub_Load_Success_Action:
            return { ...state, loading: false, availableRegions: action.payload[0], availableManagers: action.payload[1], Countries: action.payload[2], States: action.payload[3], hubstatus: action.payload[4], cities: action.payload[5]}
        case FSQHubActionTypes.Add_FSQ_Hub_Load_Failure_Action:
            return { ...state, loading: false }

        case FSQHubActionTypes.Edit_FSQ_Hub_Load:
            return { ...state, loading: true, availableRegions: undefined, availableManagers: undefined }
        case FSQHubActionTypes.Edit_FSQ_Hub_Load_Success:
            return { ...state, loading: false, availableRegions: action.payload[0], availableManagers: action.payload[1], Countries: action.payload[2], States: action.payload[3], hubstatus: action.payload[4], SingleHub: action.payload[5], cities: action.payload[6] }
        case FSQHubActionTypes.Edit_FSQ_Hub_Load_Failure:
            return { ...state, loading: false }

        case FSQHubActionTypes.Edit_FSQ_Hub:
            return { ...state, loading: true };
        case FSQHubActionTypes.Edit_FSQ_Hub_Success:
            return { ...state, loading: false };
        case FSQHubActionTypes.Edit_FSQ_Hub_Failure:
            return { ...state, loading: false, error: action.payload };

        case FSQHubActionTypes.Remove_Region_Action:
            return { ...state, loading: false };
        case FSQHubActionTypes.Remove_Region_Action_Failure:
            return { ...state, loading: false, error: action.payload };

        case FSQHubActionTypes.Remove_Manager_Action:
            return { ...state, loading: false };
        case FSQHubActionTypes.Remove_Manager_Action_Failure:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}