import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of ,forkJoin} from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomainService } from 'src/app/service/domain/domain.service';
import { RegionService } from 'src/app/service/region/region.service';
import { CorporateManagementService } from 'src/app/service/corporate-management/corporate-management.service';
import { FranchisePricingService } from 'src/app/service/franchise-pricing/franchise-pricing.service';
import { FranchisePricingActionTypes, FranchisePricingLoadAction, FranchisePricingLoadSuccessAction, FranchisePricingLoadFailureAction } from '../actions/franchise_pricing.action';

@Injectable()
export class FranchisePricingEffects {
    constructor(private actions$: Actions, private franchisepricingService: FranchisePricingService, private router: Router, private domainService: DomainService, private regionService: RegionService,private corporateManagementService: CorporateManagementService) {}

    franchisepricingMainLoad$ = createEffect(() => this.actions$.pipe(
        ofType(FranchisePricingActionTypes.Franchise_Pricing_Load),
        mergeMap((action: FranchisePricingLoadAction) =>
            forkJoin([
                this.regionService.getRegionList(),
                this.franchisepricingService.getFranchisePricingList(),
                
            ]).pipe(
                map((response) => {
                    console.log(response); 
                    
                        return new FranchisePricingLoadSuccessAction(response);
                  
                }),
                catchError(error => of(new FranchisePricingLoadFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );



}