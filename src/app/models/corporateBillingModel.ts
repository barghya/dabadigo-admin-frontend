import { ErrorModel } from './errorModel';
import { CityItem, states } from './regionManagement';
import { countries } from './asset-inventoryModel';
import { DomainData } from './domainModel';

export interface CorporateBillingMain {
    loading?: boolean;
    error?: ErrorModel;
    bills?: BillsTableModel[];
    legalEntityDetails?: CorporateDetails[];
    corporateDetails?: CorporateDetails[];
    billsSetupModel?: BillsSetupModel[],
    legalEntity?: CorporateDetails;
    corporate?: CorporateDetails;
    states?: states[];
    countries?: countries[];
    billDetailsModel?: BillDetailsModel;
    cities?: CityItem[];
    billStatusList?: DomainData[];
    pdfData?: PDFData;
    emailDetails?: EmailDetails;
    adjustments?: Adjustments;
}

export interface PDFData {
    encoded_pdf?: string;
}

export interface BillsbyCorporateId {
    corporate_id?: number;
}

export interface corporateDetailsByBillid {
    corporate_billing_id?: number;
}

export interface CorporateBillsFilterPayload {
    corporate_id?: number;
    status?: number;
    city?: number;
    state?: number;
    country?: number;
    start_date?: Date;
    end_date?: Date;
    days_pending?: string;
}

export interface BillsTableModel {
    billing_name?: string;
    corporate_billing_id?: number;
    job_run_date?: string;
    last_bill_amount?: number;
    due_date?: string;
    last_payment_received?: number;
    amount_due?: number;
    next_bill_date?: string;
    unbilled_amount?: number;
    status?: number;
    status_name?: string;
    invoice_number?: string;
    corporate_bill_setup_id?: number;
    corporate_id?: number;
    corporate_name?: string;
    legal_entity_id?: number;
    state?: number;
    city?: number;
    country?: number;
    bill_file_name?: string;
    bill_url?: string;
    total_adjusted_amount?: number;
}

export interface BillsSetupModel {
    corporate_billing_setup_id?: number;
    corporate_id?: number;
    legal_entity_id?: number;
    bill_start_date?: Date;
    created_on?: Date;
    legal_entity_name?: string;
    corporate_name?: string;
    corporate_billing_name?: string;
    legal_entity_billing_name?: string;
}

export interface CreateBillSetupModel {
    corporate_id?: number;
    legal_entity_id?: number;
    bill_start_date?: Date;
}

export interface CorporateDetails {
    addressline1?: string,
    addressline2?: string,
    admn_partner_id?: number;
    partner_type?: number;
    partner_code?: string;
    partner_name?: string;
    partner_detail_id?: number;
    partner_category?: number;
    company_name?: string;
    contact_address1?: string;
    contact_address2?: any;
    city?: any;
    city_name?: string;
    postal_code?: any;
    pin?: number;
    contact_phone?: string;
    contact_person?: string;
    country_code?: any;
    state_name?: string,
    billing_name?: string;
    gst_numbers?: string;
    corporate_size?: number;
    corporate_contract?: number;
    minimum_wallet_balance?: number;
    billing_type?: number;
    payment_term?: number;
    bill_generation_frequency?: number;
    updated_on?: Date;
    updated_by?: number;
    partner_address_id?: number;
    pan?: string;
    ontrip_maintenance?: number;
    contact_email?: string;
}

export interface TripDetailsModel {
    corporate_billing_trip_detail_id?: number;
    bill_id?: number;
    ride_id?: number;
    trip_ref_no?: string;
    customer_name?: string;
    booking_time?: Date;
    ride_end_time?: Date;
    basic?: string;
    cgst?: string;
    sgst?: string;
    total_payabale?: string;
}

export interface BillDetailsModel {
    corporate_details?: CorporateDetails;
    corporate_bill?: BillsTableModel;
    legal_entity_details?: CorporateDetails;
    bank_details?: BankDetails;
    bill_trip_details?: TripDetailsModel[];
    adjustment_details?: Adjustments[];
    bill_from_date?: Date;
    bill_to_date?: Date;
}

export interface BankDetails {
    account_holder_name: string;
    bank_name: string;
    branch_name: string;
    ifsc_code: string;
    account_number: string;
    branch_address: string;
}

export interface EmailDetails {
    communication_history?: CommunicationDetails[];
    current_email?: CurrentEmail;
}

export interface CurrentEmail {
    email_body?: string;
    email_subject?: string;
    email_date?: string;
    notes?: string;
}

export interface SendEmailModel {
    email_body?: string;
    email_subject?: string;
    email_date?: string;
    notes?: string;
    corporate_billing_id?: number;
}

export interface CommunicationDetails {
    corp_communication_id?: number;
    corp_communication_subject?: string;
    corp_communication_body?: string;
    corp_communication_notes?: string;
    corp_communication_type?: number;
    corp_communication_date?: Date;
    corporate_billing_id?: number;
}

export interface Adjustments {
    adjusted_amount?: number;
    //created_on: Date;
    descriptions?: string;
    //ride_id?: string;
    trip_ref_no?: string;
    rider_name?: number;
    booking_time?: Date;
}


export interface AdjustmentsMaintain {
    id?: number;
    adjusted_amount?: number;
    //created_on: Date;
    descriptions?: string;
    //ride_id?: string;
    trip_ref_no?: string;
    rider_name?: number;
    booking_time?: Date;
}

export interface MiscellaneousAdjustmentsModel {
    corporate_billing_id?: number;
    rider_name?: number;
    booking_time?: Date;
    ride_id?: string;
    descriptions?: number;
    adjusted_amount?: number;
}

export interface generateAdjustmentService {
    corporate_billing_id?: number;
    final_adjusted_amount?: number;
    adjustments?: Adjustments[];
}

export interface generatePdfExcelService {
    corporate_billing_id?: number;
    doc_type?: string;
}

export interface DialogData {
    title: string;
    message: string;
}