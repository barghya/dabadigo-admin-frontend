import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { countries } from './asset-inventoryModel';
import { states, CityItem } from './regionManagement';

export interface CorporateManagementMain {
  loading?: boolean;
  error?: ErrorModel;
  corporateManagement?: CorporateManagement[],
  partner_type?: DomainData[],
  partner_category?: DomainData[],
  countries?: countries[];
  corporate_size?: DomainData[],
  corporate_contract?: DomainData[],
  billing_type?: DomainData[],
  payment_term?: DomainData[],
  singleCorporate?: CorporateManagement;
  States?: states[];
  cities: CityItem[];
}

export interface CorporateManagement {
  admn_partner_id?: number;
  partner_type?: number;
  partner_code?: string;
  partner_name?: string;
  partner_detail_id?: number;
  partner_category?: number;
  company_name?: string;
  contact_address1?: string;
  contact_address2?: string;
  pin?: number;
  postal_code?: number;
  contact_phone?: string;
  contact_person_firstname?: string;
  contact_person_lastname?: string;
  contact_email?: string;
  contact_person_designation?:string;
  partner_type_name?: string;
  partner_category_name?: string;
  country_code?: string;
  billing_name?: string;
  gst_numbers?: string;
  pan?: string;
  corporate_size?: number;
  corporate_contract?: number;
  minimum_wallet_balance?: number;
  billing_type?: number;
  payment_term?: number;
  bill_generation_frequency?: number;
  updated_on?: Date;
  updated_by?: number;
  updated_by_name?: string; 
  addressline1?: string;
  addressline2?: string;
  states_name?: string;
  countries_name?: string;
  ontrip_maintenance?: number;
  country_id?: number;
  state_id?: number;
  city_id?: number;
  city?: string;
  state?: string;
  country?: string;
  account_holder_name?: string;
  account_no?: string;
  ifsc_code?: string;
  cin_no?: string;
  bank_name?: string;
  branch_name?: string;
  bank_address?:string;
}

export interface AdmnPartnerId {
  admn_partner_id?: number;
}
export interface domainType {
  domain_type?: string;
}

export interface AddUserService {
  corporate_id?: number;
  partner_type?: number;
}
