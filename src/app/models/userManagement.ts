import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { CorporateManagement } from './corporateManagement';
import { countries } from './asset-inventoryModel';
import { states, CityItem } from './regionManagement';

export interface adminMain {
    Users?: users[];
    loading?: boolean;
    error?: ErrorModel;
    user_type?: DomainData[];
    user_status?: DomainData[];
    Role?: role[];
    singleUser?: users;
    username?: userName[];
    Region?: region[];
    corporate?: CorporateManagement[],
    countries?: countries[];
    States?: states[];
    cities: CityItem[];
}

export interface users {
    admn_user_id?: number;
    userdetail_id?: number;
    firstname?: string;
    lastname?: string;
    contact_phone?: string;
    admn_partner_id?: number;
    admn_user?: number;
    user_type?: number;
    username?: string;
    role_id?: number;
    role_name?: string;
    user_type_name?: string;
    password?: string;
    confirmpassword?: string;
    updated_on?:Date;
    user_status_name?:string;
    user_status?:number;
    email_id?:number;
    regions?:regionId[];
    region_name?: string;
    poc_designation?: string;
    corporate_id?: number;
    poc_name?: string;
    poc_email?: string;
    poc_phone?: string;
    poc_office_add?: string;
    addressline1?: string;
    addressline2?: string;
    states_name?: string;
    country?: string;
    countries_name?: string;
    city?: string;
    state?: number;
    pin?: number;
    country_id?: number;
    state_id?: number;
    city_id?: number;
}

export interface role {
    admn_role_id?: number;
    role_name?: string;
}
export interface userType {
    domain_type?: string;
}

export interface Admindetails {
    userdetail_id?: number;
    firstname?: string;
    lastname?: string;
    contact_phone?: string;
    admn_partner_id?: number;
    admn_user?: number;
}

export interface AddUser {
    username?:string;
    password?:string;
    firstname?:string;
    lastname?:string;
    contact_phone?:string;
    email_id?:string;
    role_id?: number;
    role_name?:string;
    user_type?:number;
    user_status?:number;
    regions?:regionId[];
    poc_designation?: string;
    corporate_id?: number;
    poc_name?: string;
    poc_email?: string;
    poc_phone?: string;
    poc_office_add?: string;
    addressline1?: string;
    addressline2?: string;
    states_name?: string;
    countries_name?: string;
    pin?: number;
    country_id?: number;
    state_id?: number;
    city_id?: number;
}

// export interface AddUser {
//   user_type?: number;
//   username?: string;
//   user_status?: number;
//   role_id?: number;
//   firstname?: string;
//   lastname?: string;
//   contact_phone?: string;
//   admn_partner_id?: number;
//   updated_on?: string;
//   email_id?: string;
//   region?: number;
//   poc_designation?: string;
//   corporate_id?: number;
//   poc_name?: string;
//   poc_email?: string;
//   poc_phone?: string;
//   poc_office_add?: string;
// }
export interface regionId {
    region_id?: number;
}


export interface userId {
    admn_user_id?: number;
}

export interface EditUserLoad {
    admn_user_id?: number;
    current_user?: number;
}

export interface userName {
    username?:string;
}

export interface region {
    region_id?: number;
    region_code?: string;
    region_name?: string;
    country_code?: number;
    state_code?: number;
    created_by_id?: number;
    created_on?: Date;
}