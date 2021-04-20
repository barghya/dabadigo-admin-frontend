import { ErrorModel, error_repo } from './errorModel';

export interface DomainData {
    domain_id?: number;
    domain_type?: string;
    domain_code?: number;
    domain_value?: string;
    domain_text?: string;
    domain_data_type?: string;
}
export interface DomainDataState {
    error_framework?: error_repo[];
    error?: ErrorModel;
    loading?: boolean;
    battery_status?: DomainData[];
    device_status?: DomainData[];
    code_type?: DomainData[],
    code_status?: DomainData[]
}