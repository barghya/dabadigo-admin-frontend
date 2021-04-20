// import { Action } from '@ngrx/store';
// import { LatLng, Geocoding } from 'src/app/models/mapMyIndiaModel';

// export enum MapmyIndiaAction {
//     Get_Token = "[MAPMYINDIA] Get Token",
//     Get_Token_Success = "[MAPMYINDIA] Get Token Success",
//     Get_Token_Failure = "[MAPMYINDIA] Get Token Failure",
//     // Reverse_Geocoding_Load = "[MAPMYINDIA] Reverse Geocoding Load",
//     // Reverse_Geocoding_Success = "[MAPMYINDIA] Reverse Geocoding Success",
//     // Reverse_Geocoding_Failure = "[MAPMYINDIA] Reverse Geocoding Failure",
// }

// export class GetTokenAction implements Action {
//     readonly type = MapmyIndiaAction.Get_Token;
// }

// export class GetTokenSuccessAction implements Action {
//     readonly type = MapmyIndiaAction.Get_Token_Success;
//     constructor(public payload: any[]) { }
// }

// export class GetTokenFailureAction implements Action {
//     readonly type = MapmyIndiaAction.Get_Token_Failure;
//     constructor(public payload: any) { }
// }

// export class ReverseGeocodingLoadAction implements Action {
//     readonly type = MapmyIndiaAction.Reverse_Geocoding_Load;
//     constructor(public payload: LatLng) { }
// }

// export class ReverseGeocodingSuccessAction implements Action {
//     readonly type = MapmyIndiaAction.Reverse_Geocoding_Success;
//     constructor(public payload: Geocoding) { }
// }

// export class ReverseGeocodingFailureAction implements Action {
//     readonly type = MapmyIndiaAction.Reverse_Geocoding_Failure;
//     constructor(public payload: any) { }
// }

// export type MapmyIndia = GetTokenAction
//     | GetTokenSuccessAction
//     | GetTokenFailureAction
    // | ReverseGeocodingLoadAction
    // | ReverseGeocodingSuccessAction
    // | ReverseGeocodingFailureAction