// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { MapmyindiaService } from 'src/app/service/mapmyIndiaService/mapmyindia.service';
// import { MapmyIndiaAction, GetTokenFailureAction, GetTokenSuccessAction, GetTokenAction } from '../actions/mapmy_india.action';
// import { mergeMap, map, catchError } from 'rxjs/operators';
// import { of, forkJoin } from 'rxjs';
// import { RegionService } from 'src/app/service/region/region.service';

// @Injectable()
// export class MapmyIndiaEffects {
//     constructor(private action$: Actions, private mapmyIndiaService: MapmyindiaService, private regionService: RegionService) { }

//     token$ = createEffect(() => this.action$
//         .pipe(
//             ofType(MapmyIndiaAction.Get_Token),
//             mergeMap((action: GetTokenAction) =>
//                 forkJoin([
//                     //this.mapmyIndiaService.getToken(),
//                     this.mapmyIndiaService.getRentalpointType(),
//                     this.mapmyIndiaService.getOwnershipCode(),
//                     this.mapmyIndiaService.getRentalPointStatus(),
//                     this.mapmyIndiaService.GetCountries(),
//                     this.regionService.getRegionList()
//                 ]).pipe(
//                     map((responce) => {
//                         console.log(responce);
//                         return new GetTokenSuccessAction(responce)
//                     }),
//                     catchError(error => of(new GetTokenFailureAction(error)))
//                 )
//             )
//         )
//     );

    // geocoding$ = createEffect(() => this.action$
    //     .pipe(
    //         ofType(MapmyIndiaAction.Reverse_Geocoding_Load),
    //         mergeMap((action: ReverseGeocodingLoadAction) =>
    //             this.mapmyIndiaService.reversegeocoding(action.payload).pipe(
    //                 map((responce) => {
    //                     console.log(responce);
    //                     return new ReverseGeocodingSuccessAction(responce)
    //                 }),
    //                 catchError(error => of(new ReverseGeocodingFailureAction(error)))
    //             )
    //         )
    //     )
    // );
// }