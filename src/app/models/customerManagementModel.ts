import { ErrorModel } from './errorModel';

export interface customerManagementMain {
    loading?: boolean;
    error?: ErrorModel;
    CustomerDetails?: customerDetails[];
    SingleCustomer?: SingleCustomerInDetail;
}

export interface customerDetails {
    customer_id?: number;
    login_type?: number;
    primary_login?: string;
    corporate_enabled?: number;
    corporate_enabled_name?: string;
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
    status?: number;
    status_name?: string;
    action_code?: number;
    action_code_name?: number;
    wallet_balance?: number;
}

export interface ActiveInactiveRequest {
    customer_id?: number,
    admn_user_id?: number;
}

export interface SingleCustomerInDetail {
    customer_details: customerDetails;
    txn_details: TxnDetail[];
    trip_details: TripDetail[];
    contact_details: ContactDetail[];
}

export interface TripDetail {
    customer_trip_association_id?: number;
    trip_uuid?: string;
    booking_time?: string;
    corporate_enabled?: number;
    coupon_code?: string;
    customer_id?: number;
    distance_travelled?: number;
    end_location?: number;
    end_location_name?: string;
    end_time?: string;
    ontrip_start_time?: string;
    paid_amount?: number;
    pause_time?: number;
    rental_plan?: number;
    riding_time?: number;
    start_location?: number;
    start_location_name?: string;
    total_payable?: number;
    total_trip_time?: number;
    trip_ref_no?: string;
    trip_status?: number;
    trip_status_name?: string;
    vehicle_id?: number;
    vehicle_idnumber?: string;
}

export interface TxnDetail {
    customer_txn_id: number;
    bank_txn_id?: string;
    gateway_txn_id?: string;
    txn_refid: string;
    txn_status: number;
    txn_status_name: string;
    update_timestamp: string;
    txn_amount: number;
    transaction_type: number;
    transaction_type_name: string;
}

export interface ContactDetail {
    customer_contact_id?: number;
    contact_name?: string;
    contact_phone?: string;
}