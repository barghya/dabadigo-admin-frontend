// import { MapmyIndiaMain } from "src/app/models/mapMyIndiaModel";
// import { MapmyIndia, MapmyIndiaAction } from '../actions/mapmy_india.action';

// const initialState: MapmyIndiaMain = {
//     error: undefined,
//     loading: false,
//     token: null,
//     geocoding: {},
//     ownership_code: [],
//     rentalpoint_type: [],
//     rentalpoint_status: [],
//     countries:[],
//     regionitem: []
// }

// export function MapmyIndiaReducer(state: MapmyIndiaMain = initialState, action: MapmyIndia) {
//     switch (action.type) {
//         case MapmyIndiaAction.Get_Token:
//             return { ...state, loading: true };
//         case MapmyIndiaAction.Get_Token_Success:
//             return { ...state, loading: false, error: undefined, rentalpoint_type: action.payload[0], ownership_code: action.payload[1], rentalpoint_status: action.payload[2], countries: action.payload[3], regionitem: action.payload[4] }
//         case MapmyIndiaAction.Get_Token_Failure:
//             return { ...state, loading: false, error: action.payload }
//         // case MapmyIndiaAction.Reverse_Geocoding_Load:
//         //     return { ...state, loading: true };
//         // case MapmyIndiaAction.Reverse_Geocoding_Success:
//         //     return { ...state, loading: false, error: undefined, geocoding: action.payload };
//         // case MapmyIndiaAction.Reverse_Geocoding_Load:
//         //     return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// }