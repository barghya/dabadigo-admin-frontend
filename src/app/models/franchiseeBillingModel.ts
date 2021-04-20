import { ErrorModel } from './errorModel';
import { countries } from './asset-inventoryModel';
import { states, CityItem } from './regionManagement';
import { DomainData } from './domainModel';

export interface FranchiseeMain {
    error?: ErrorModel;
    loading?: false;
    franchiseeSetUps: FranchiseeSetUps[];
    franchisees: Franchisees[];
    countries?: countries[],
    states?: states[];
    cities?: CityItem[];
    paymentStatusList?: DomainData[];
    payments?: FranchiseePayments[];
    viewFranchiseePaymentDetails?: ViewFranchiseePaymentDetails;
}

export interface FranchiseeSetUps {
    admn_partner_id?: number,
    partner_code?: string,
    partner_name?: string,
    payment_start_date?: Date,
}

export interface CreateFranchiseeSetup {
    admn_partner_id?: number,
    payment_start_date?: Date,
}

export interface Franchisees {
    admn_partner_id?: number,
    partner_code?: string,
    partner_name?: string,
}

export interface FranchiseePayments {
    franchise_payment_id?: number;
    job_run_date?: string;
    amount_to_pay?: number;
    next_pay_date?: string;
    status?: number;
    pay_url?: any;
    franchise_payment_setup_id?: number;
    payment_invoice_number?: any;
    payment_file_name?: any;
    final_payment?: number;
    status_name?: string;
    partner_name?: string;
    franchise_id?: number;
}

export interface FranchiseeBillsFilterPayload {
    franchise_id?: number;
    status?: number;
    city?: number;
    state?: number;
    country?: number;
    start_date?: Date;
    end_date?: Date;
    days_pending?: string;
}

export interface getPaymentDetails {
    franchise_payment_id?: number;
}

export interface ViewFranchiseePaymentDetails {
    admn_partner_id?: number;
    partner_type?: number;
    partner_code?: string;
    partner_name?: string;
    partner_detail_id?: number;
    partner_category?: number;
    company_name?: string;
    contact_address1?: string;
    contact_address2?: any;
    city?: number;
    postal_code?: number;
    contact_phone?: string;
    country_code?: number;
    billing_name?: string;
    gst_numbers?: string;
    corporate_size?: number;
    corporate_contract?: number;
    minimum_wallet_balance: number;
    billing_type?: number;
    payment_term?: number;
    bill_generation_frequency?: number;
    updated_on?: string;
    updated_by?: number;
    partner_address_id?: number;
    pan?: string;
    ontrip_maintenance?: number;
    contact_email?: string;
    contact_person_firstname?: string;
    contact_person_lastname?: string;
    contact_person_designation?: string;
    partner_bank_id?: number;
    bank_id?: number;
    account_holder_name?: string;
    account_no?: string;
    ifsc_code?: string;
    bank_name?: string;
    branch_name?: string;
    cin_no?: string;
    bank_address?: string;
    address_id?: number;
    addressline1?: string;
    addressline2?: string;
    pin?: number;
    state?: number;
    country?: number;
    address_type?: number;
    states_name?: string;
    city_name?: string;
    country_name?: string;
    franchise_payment_setup_id?: number;
    franchise_id?: number;
    date_created?: string;
    franchise_payment_id?: number;
    job_run_date?: string;
    amount_to_pay?: number;
    next_pay_date?: string;
    status?: number;
    pay_url?: any;
    payment_reference_number?: any;
    payment_file_name?: any;
    final_payment?: number;
    payment_status_name?: string;
    upcoming_payment_date?: Date;
    to_date?: Date;
    from_date?: Date;
    next_payment_date?: Date;
    payment_details?: PaymentDetail[];
    payment_penalty?: Paymentpenalty[];
}

export interface Paymentpenalty {
    penalty_id?: number;
    franchise_payment_id?: number;
    descriptions: string;
    penalty_amount?: number;
    created_on?: string;
}
  
export interface PaymentDetail {
    franchise_paymnent_details_id?: number;
    franchise_payment_id?: number;
    franchise_name?: string;
    entry_date?: string;
    vehicle_id?: number;
    rent_type?: number;
    payable_amount?: number;
    vehicle_number?: string;
    rent_type_name?: string;
    rentalpoint_id?: number;
    rentalpoint_name: string;
}

export interface PenaltyMaintain {
    id?: number;
    descriptions?: string;
    penalty_amount?: number;
}

export interface generatePenaltyService {
    penalty?: PenaltyMaintain[],
    final_amount_payable?: number,
    franchise_payment_id?: number,
}

export interface DialogData {
    title: string;
    message: string;
}