import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { IotControllerService } from 'src/app/service/iot-controller/iot-controller.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { IotControllerActionTypes, ActionMainListLoadAction, ActionMainListLoadSuccessAction, ActionMainListLoadFailureAction, MoreActionDetailAction, MoreActionDetailSuccessAction, MoreActionDetailFailureAction, StartTripAction, StartTripSuccessAction, StartTripFailureAction, PauseTripAction, PauseTripSuccessAction, PauseTripFailureAction, ResumeTripAction, ResumeTripSuccessAction, ResumeTripFailureAction, EndTripAction, EndTripSuccessAction, GetSlotAction, GetSlotSuccessAction, GetSlotFailureAction, SlotBookingAction, SlotBookingSuccessAction, SlotBookingFailureAction, DeviceListLoadAction, DeviceListLoadSuccessAction, DeviceListLoadFailureAction, BypassListLoadAction, BypassListLoadSuccessAction, BypassListLoadFailureAction, AddBypassAction, AddBypassFailureAction, AddBypassSuccessAction, CancelTripAction, CancelTripSuccessAction, CancelTripFailureAction, CancelSlotAction, CancelSlotSuccessAction, CancelSlotFailureAction, DemoDeviceListLoadAction, DemoDeviceListLoadSuccessAction, DemoDeviceListLoadFailureAction, AddDemoDeviceAction, AddDemoDeviceSuccessAction, AddDemoDeviceFailureAction, AddDemoDeviceLoadAction, AddDemoDeviceLoadSuccessAction, AddDemoDeviceLoadFailureAction, EditDemoDeviceLoadAction, EditDemoDeviceLoadFailureAction, EditDemoDeviceLoadSuccessAction, EditDemoDeviceAction, EditDemoDeviceSuccessAction, EditDemoDeviceFailureAction } from '../actions/iot_controller.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { EndTripFailureAction } from '../actions/trip_management.action';
import { MatSnackBar } from '@angular/material';
import { DomainService } from 'src/app/service/domain/domain.service';

@Injectable()
export class IotControllerEffects {
    constructor(private actions$: Actions, private iotcontrollerService: IotControllerService, private router: Router, private store: Store<AppState>, private _snackBar: MatSnackBar, private domainService: DomainService, ) { }


    iotControllerListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Action_Main_List_Load),
            mergeMap((action: ActionMainListLoadAction) =>
                this.iotcontrollerService.getActionMainList().pipe(
                    map((response) => {
                        console.log(response);
                        return new ActionMainListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new ActionMainListLoadFailureAction({
                        Info: [],
                        Business_Errors: [{
                            Code: "SE001"
                        }],
                        Warnings: [],
                        System_Errors: []
                    })))
                )
            )
        )
    );

    // More Action Details

    getMoreActionDetails$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.More_Action_Detail_Action),
            mergeMap((action: MoreActionDetailAction) =>
                this.iotcontrollerService.GetMoreActionDetails(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new MoreActionDetailFailureAction(response.Errors)
                        }
                        else {
                            return new MoreActionDetailSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MoreActionDetailFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    // Trip Cancel

    cancelRide$ = createEffect(() => this.actions$
    .pipe(
        ofType(IotControllerActionTypes.Cancel_Trip_Action),
        mergeMap((action: CancelTripAction) =>
            this.iotcontrollerService.CancelTrip(action.payload).pipe(
                map((Response) => {
                    console.log(Response);
                    if (!!(<ErrorModel>Response.Errors)) {
                        return new CancelTripFailureAction(Response.Errors);
                    }
                    else {
                        this.store.dispatch(new MoreActionDetailAction(
                            {
                                trip_uuid: action.payload.trip_uuid
                            }
                        ));
                        const snackbar = this._snackBar.open("Booking Cancel", "DISMISS", {
                            panelClass: ["info-snackbar"],
                            duration: 3000
                        });
                        return new CancelTripSuccessAction();
                    }
                }),
                catchError(() => of(new CancelTripFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                })))
            ))))



    //Trip Start

    startTrip$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Start_Trip_Action),
            mergeMap((action: StartTripAction) =>
                this.iotcontrollerService.tripStart(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new StartTripFailureAction(response.Errors);
                        }
                        else if (response.code == "001") {
                            const snackbar = this._snackBar.open("Trip Started", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.store.dispatch(new MoreActionDetailAction(
                                {
                                    trip_uuid: action.payload.trip_uuid
                                }
                            ));
                            return new StartTripSuccessAction();
                        } else if (response.code == "002") {
                            
                            this.router.navigate(['booking', 'vehicles-unplugin-conform'])
                            return new StartTripFailureAction({
                                Info: [{
                                    Code: "IN016"
                                }],
                                Business_Errors: [],
                                Warnings: [],
                                System_Errors: []
                            })
                        }
                    }),
                    catchError(() => of(new StartTripFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))

                )
            )
        )
    );

    // Pause Ride

    PauseRide$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Pause_Trip_Action),
            mergeMap((action: PauseTripAction) =>
                this.iotcontrollerService.PauseTrip(action.payload).pipe(
                    map((Response) => {
                        console.log(Response);
                        if (!!(<ErrorModel>Response.Errors)) {
                            return new PauseTripFailureAction(Response.Errors);
                        }
                        else {
                            this.store.dispatch(new MoreActionDetailAction(
                                {
                                    trip_uuid: action.payload.trip_uuid
                                }
                            ));
                            const snackbar = this._snackBar.open("Trip Pause", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new PauseTripSuccessAction();
                        }
                    }),
                    catchError(() => of(new PauseTripFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                ))))

    // Resume Ride

    resumeRide$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Resume_Trip_Action),
            mergeMap((action: ResumeTripAction) =>
                this.iotcontrollerService.ResumeTrip(action.payload).pipe(
                    map((Response) => {
                        console.log(Response);
                        if (!!(<ErrorModel>Response.Errors)) {
                            return new ResumeTripFailureAction(Response.Errors);
                        }
                        else {
                            this.store.dispatch(new MoreActionDetailAction(
                                {
                                    trip_uuid: action.payload.trip_uuid
                                }
                            ));
                            const snackbar = this._snackBar.open("Trip Resume", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new ResumeTripSuccessAction();
                        }
                    }),
                    catchError(() => of(new ResumeTripFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                ))))

    // get all slot point

    getAllSlot$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Get_Slot_Action),
            mergeMap((action: GetSlotAction) =>
                this.iotcontrollerService.GetSlot(action.payload).pipe(
                    map((Response) => {
                        console.log(Response);
                        if (!!(<ErrorModel>Response.Errors)) {
                            return new GetSlotFailureAction(Response.Errors);
                        }
                        else {
                            return new GetSlotSuccessAction(Response);
                        }
                    }),
                    catchError(() => of(new GetSlotFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                ))
        )
    )


    //Slot Booking Request
    slotbookingRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Slot_Booking_Action),
            mergeMap((action: SlotBookingAction) =>
                this.iotcontrollerService.SlotBookingRequest(action.payload).pipe(
                    map((Response) => {
                        console.log(Response);
                        if (!!(<ErrorModel>Response.Errors)) {
                            return new SlotBookingFailureAction(Response.Errors);
                        }
                        else {
                            this.store.dispatch(new MoreActionDetailAction(
                                {
                                    trip_uuid: action.payload.trip_uuid
                                }
                            ));
                            const snackbar = this._snackBar.open("Slot Booked", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });

                            return new SlotBookingSuccessAction();
                        }
                    }),
                    catchError(() => of(new SlotBookingFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                ))
        )
    )

    //Cancel Slot

    cancelSlot$ = createEffect(() => this.actions$
    .pipe(
        ofType(IotControllerActionTypes.Cancel_Slot_Action),
        mergeMap((action: CancelSlotAction) =>
            this.iotcontrollerService.Cancelslot(action.payload).pipe(
                map((Response) => {
                    console.log(Response);
                    if (!!(<ErrorModel>Response.Errors)) {
                        return new CancelSlotFailureAction(Response.Errors);
                    }
                    else {
                        this.store.dispatch(new MoreActionDetailAction(
                            {
                                trip_uuid: action.payload.trip_uuid
                            }
                        ));
                        const snackbar = this._snackBar.open("Slot Cancel", "DISMISS", {
                            panelClass: ["info-snackbar"],
                            duration: 3000
                        });
                        return new CancelSlotSuccessAction();
                    }
                }),
                catchError(() => of(new CancelSlotFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                })))
            ))))


    // End Trip

    EndTrip$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.End_Trip_Action),
            mergeMap((action: EndTripAction) =>
                this.iotcontrollerService.EndTrip(action.payload).pipe(
                    map((Response) => {
                        console.log(Response);
                        if (!!(<ErrorModel>Response.Errors)) {
                            return new EndTripFailureAction(Response.Errors);
                        }
                        else if (Response.code == "001") {
                            const snackbar = this._snackBar.open("Trip End", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.store.dispatch(new MoreActionDetailAction(
                                {
                                    trip_uuid: action.payload.trip_uuid
                                }
                            ));
                            return new EndTripSuccessAction();
                        } else if (Response.code == "002") {

                            return new EndTripFailureAction({
                                Info: [{
                                    Code: "IN018"
                                }],
                                Business_Errors: [],
                                Warnings: [],
                                System_Errors: []
                            })
                        }
                    }),
                    catchError(() => of(new EndTripFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                ))))


    // Device List Load

    ActiveDeviceListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Device_List_Load),
            mergeMap((action: DeviceListLoadAction) =>
                this.iotcontrollerService.getActiveDeviceList().pipe(
                    map((response) => {
                        console.log(response);
                        return new DeviceListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new DeviceListLoadFailureAction({
                        Info: [],
                        Business_Errors: [{
                            Code: "SE001"
                        }],
                        Warnings: [],
                        System_Errors: []
                    })))
                )
            )
        )
    );


    // Bypass List Load

    BypassListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Bypass_List_Load),
            mergeMap((action: BypassListLoadAction) =>
                this.iotcontrollerService.GetBypassDetails(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new BypassListLoadFailureAction(response.Errors)
                        }
                        else {
                            return new BypassListLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new BypassListLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );


    
    // Add Bypass 

    addBypass$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Add_Bypass_Action),
            mergeMap((action: AddBypassAction) =>
                this.iotcontrollerService.addBypass(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddBypassFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['iot-controller-bypass','device-bypass']);
                            return new AddBypassSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddBypassFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    // DemoDevice List Load

    DemoDeviceListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Demo_Device_List_Load),
            mergeMap((action: DemoDeviceListLoadAction) =>
                this.iotcontrollerService.getdemoDeviceList().pipe(
                    map((response) => {
                        console.log(response);
                        return new DemoDeviceListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new DemoDeviceListLoadFailureAction({
                        Info: [],
                        Business_Errors: [{
                            Code: "SE001"
                        }],
                        Warnings: [],
                        System_Errors: []
                    })))
                )
            )
        )
    );


// Add Demo Device Load
addDemoDeviceLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Add_Demo_Device_Load_Action),
            mergeMap((action: AddDemoDeviceLoadAction) =>
                // forkJoin([
                //     this.domainService.GetdemoDeviceStatus(),
                //     this.iotcontrollerService.GetCountries()
                // ]).pipe(
                    this.iotcontrollerService.GetCountries().pipe(
                    map((response) => {
                        console.log(response)
                            return new AddDemoDeviceLoadSuccessAction(response);
                        
                    }),
                    catchError(error => of(new AddDemoDeviceLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );


// Add Demo Device
    addDemoDevice$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Add_Demo_Device_Action),
            mergeMap((action: AddDemoDeviceAction) =>
                this.iotcontrollerService.AddDemoDeviceList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddDemoDeviceFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['iot-controller-bypass', 'demo-device']);
                            return new AddDemoDeviceSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddDemoDeviceFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    // Edit demo device load
    editDemoDeviceLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(IotControllerActionTypes.Edit_Demo_Device_Load),
        mergeMap((action: EditDemoDeviceLoadAction) =>
            this.iotcontrollerService.getByIdDemoDevice(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    if (!!(<ErrorModel>response.Errors)) {
                        return new EditDemoDeviceLoadFailureAction(response.Errors);
                    }
                    else {
                        
                        return new EditDemoDeviceLoadSuccessAction(response);
                    }
                }),
                catchError(error => of(new EditDemoDeviceLoadFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                })))
            )
        )
    )
);

// Edit Demo Device

editDemoDevice$ = createEffect(() => this.actions$
        .pipe(
            ofType(IotControllerActionTypes.Edit_Demo_Device_Action),
            mergeMap((action: EditDemoDeviceAction) =>
                this.iotcontrollerService.EditDemoDeviceList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditDemoDeviceFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['iot-controller-bypass', 'demo-device']);
                            return new EditDemoDeviceSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditDemoDeviceFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

}