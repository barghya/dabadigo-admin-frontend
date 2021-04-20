import { ErrorModel } from './errorModel';
import { states } from './regionManagement';
import { DomainData } from './domainModel';

export interface StateTaxManagement {
    stateTaxList?: StateTaxItem[];
    singleStateTax?: StateTaxItem;
    states?: states[];
    taxTypes?: DomainData[];
    loading?: boolean;
    error?: ErrorModel;
}

export interface StateTaxItem {
    admn_state_tax_id?: number;
    state_id?: number;
    states_name?: string;
    tax_type?: number;
    tax_type_name?: string;
    tax_rate?: number;
}