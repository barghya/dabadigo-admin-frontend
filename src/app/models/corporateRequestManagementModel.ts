import { ErrorModel } from './errorModel';

export interface CorporateRequestManagementMain {
    loading?: boolean;
    error?: ErrorModel;
    CorporateRequestList?: pendingRequest[];
    singleCorporateRequest?: CorporateRequestDetail;
}

export interface adminUserID {
    // admn_partner_id?: number
    admn_user_id?: number;
}

export interface pendingRequest {
    corporate_customer_id?: number;
    customer_id?: number;
    status?: number;
    requested_on?: Date;
    updated_by?: string;
    updated_on?: Date;
    admn_partner_id?: number;
    domain_value?: string;
    first_name?: string;
    last_name?: string;
    company_name?:string;
    phone_no?: number;
    AdminUserId?: adminUserID;
}

export interface ApproveRequestPayload {
    corporate_customer_id?: number;
    // admn_partner_id?: number;
    admn_user_id?: number;
}

export interface LoadRequestsPayload {
    admn_user_id?: number;
    past_flag?: boolean;
}

export interface CorporateRequestDetail {
    corporate_customer_id?: number;
    admn_partner_id?: number;
    customer_id?: number;
    requested_on?: string;
    status?: number;
    updated_by?: number;
    updated_on?: string;
    login_type?: number;
    primary_login?: string;
    secondary_login?: string;
    address_line1?: any;
    address_line2?: any;
    city?: any;
    country_code?: any;
    customer_detail_id?: number;
    dpin_status?: number;
    dpin_status_name?: string;
    email_id?: string;
    email_verify_status?: number;
    email_verify_status_name?: string;
    first_name?: string;
    kyc_status?: number;
    kyc_status_name?: string;
    last_name?: string;
    phone_no?: string;
    postal_code?: any;
    status_name?: string;
}

