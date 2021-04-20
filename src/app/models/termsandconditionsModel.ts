import { ErrorModel } from './errorModel';

export interface TermsandConditionsMain {
    loading?: boolean,
    error?: ErrorModel,
    getTermsandConditions?: GetTermsandConditions[];
    singleTandC?: GetTermsandConditions;
}

export interface GetTermsandConditions {
    tandcid?: number;
    tandctext?: string;
    tandctype?: number;
    updated_by_id?: number;
    updated_on?: Date;
}

export interface AddTandC {
    tandctext?: string;
    tandctype?: number;
    updated_by_id?: number;
}

export interface UpdateTandC {
    tandcid?: number,
    tandctext?: string
    tandctype?: number,
    updated_by_id?: number,
}