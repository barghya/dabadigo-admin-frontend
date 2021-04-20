import { ErrorModel } from './errorModel';

export interface profileMain {
    loading?: boolean;
    error?: ErrorModel;
    singleProfile?: usersProfile;
}

export interface usersProfile {
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
    old_password?: string;
    new_password?: string;
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
    corporate_name?: string;
    corporate_code?: string;
}

export interface regionId {
    region_id?: number;
}

export interface changePassword {
    admn_user_id?: number;
    old_password?: string;
    new_password?: string;
}

export interface changeMobile {
    admn_user_id?: number;
    password?: string;
    contact_phone?: number;
}