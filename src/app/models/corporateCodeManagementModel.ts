import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { CorporateManagement } from './corporateManagement';

export interface CorporateCodeMain {
    loading?: boolean,
    error?: ErrorModel,
    CorporateCodeList?: corporateCodeList[],
    CodeTypes?: DomainData[],
    CodeStatus?: DomainData[],
    singleCode?: corporateCodeList;
    CorporateList?: CorporateManagement[],
}

export interface corporateCodeList {
    admn_corporatecode_id?: number,
    code_type?: number,
    corporate_code?: string,
    status?: number,
    created_by?: string,
    created_on?: Date,
    updated_by?: string,
    updated_on?: Date,
    admn_partner_id?: number,
    code_type_name?: string,
    code_status_name?: string,
    partner_name?: string,
}

export interface corporateCodeID {
    admn_corporatecode_id?: number,
}

