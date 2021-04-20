import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { tripDetail, rentalPoint, rentalPointDetails, endTrip, tripAssociationID } from 'src/app/models/tripManagementModel';

export enum TripManagementActionTypes {
    Trip_Management_List_Load = "[Trip MANAGEMENT] Trip_Management_List_Load",
    Trip_Management_List_Load_Success = "[Trip MANAGEMENT] Trip_Management_List_Load_Success",
    Trip_Management_List_Load_Failure = "[Trip MANAGEMENT] Trip_Management_List_Load_Failure",
    Rental_Point_Load_Action = "[Trip MANAGEMENT] Rental_Point_Load_Action",
    Rental_Point_Load_Success_Action = "[Trip MANAGEMENT] Rental_Point_Load_Success_Action",
    Rental_Point_Load_Failure_Action = "[Trip MANAGEMENT] Rental_Point_Load_Failure_Action",
    End_Trip_Action = "[Trip MANAGEMENT] End_Trip_Action",
    End_Trip_Success_Action = "[Trip MANAGEMENT] End_Trip_Success_Action",
    End_Trip_Failure_Action = "[Trip MANAGEMENT] End_Trip_Failure_Action",
    Trip_Details_Load = "[Trip Management] Trip Management Details Load",
    Trip_Details_Load_Success = "[Trip Management] Trip Management Details Load Success",
    Trip_Details_Load_Failure = "[Trip Management] Trip Management Details Load Failure",
}

// Trip Load
export class TripManagementListLoadAction implements Action {
    readonly type = TripManagementActionTypes.Trip_Management_List_Load;
    constructor( public payload: number ) { }
}

export class TripManagementListLoadSuccessAction implements Action {
    readonly type = TripManagementActionTypes.Trip_Management_List_Load_Success;
    constructor(public payload: any) {}
}

export class TripManagementListLoadFailureAction implements Action {
    readonly type = TripManagementActionTypes.Trip_Management_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// rentalpoint Dropdown
export class rentalPointLoadAction implements Action {
    readonly type = TripManagementActionTypes.Rental_Point_Load_Action;
    constructor(public payload: rentalPoint) { }
}
export class rentalPointLoadSuccessAction implements Action {
    readonly type = TripManagementActionTypes.Rental_Point_Load_Success_Action;

    constructor(public payload: rentalPointDetails[]) { }
}
export class rentalPointLoadFailureAction implements Action {
    readonly type = TripManagementActionTypes.Rental_Point_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// End Trip
export class EndTripAction implements Action {
    readonly type = TripManagementActionTypes.End_Trip_Action;
     constructor(public payload: endTrip) { }
}

export class EndTripSuccessAction implements Action {
    readonly type = TripManagementActionTypes.End_Trip_Success_Action;
}

export class EndTripFailureAction implements Action {
    readonly type = TripManagementActionTypes.End_Trip_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// Trip Details
export class TripDetailsAction implements Action {
    readonly type = TripManagementActionTypes.Trip_Details_Load;
    constructor(public payload: tripAssociationID) {}
}
export class TripDetailsSuccessAction implements Action {
    readonly type = TripManagementActionTypes.Trip_Details_Load_Success
    constructor(public payload: any[]) {}
}
export class TripDetailsFailureAction implements Action {
    readonly type = TripManagementActionTypes.Trip_Details_Load_Failure
    constructor(public payload: ErrorModel) {}
}

export type TripManagementAction = TripManagementListLoadAction
| TripManagementListLoadSuccessAction
| TripManagementListLoadFailureAction
| rentalPointLoadAction
| rentalPointLoadSuccessAction
| rentalPointLoadFailureAction
| EndTripAction
| EndTripSuccessAction
| EndTripFailureAction
| TripDetailsAction
| TripDetailsSuccessAction
| TripDetailsFailureAction
