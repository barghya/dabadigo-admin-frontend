import { ErrorModel } from './errorModel';

export interface LoginModel {
    username?: string;
    password?: string;
}

export interface UserDetails {
    loading?: boolean;
    error?: ErrorModel;
    userdetail?: Userdetail;
    permissions?: Permission[];
}

export interface LoginResponse {
    userdetail?: Userdetail;
    permissions?: Permission[];
}

export interface Permission {
    control_element_id?: number;
    control_element_name?: string;
    control_element_type?: number;
    permission_code?: number;
}

export interface Userdetail {
    admn_user_id?: number;
    user_type?: number;
    user_type_name?: string;
    username?: string;
    user_status?: number;
    login_flag?: number;
    user_status_name?: string;
    firstname?: string;
    lastname?: string;
    contact_phone?: string;
    admn_partner_id?: number;
    updated_on?: string;
    email_id?: string;
    region_id?: number;
    current_address?: string;
    permanent_address?: string;
    resume_url?: string;
    pan_url?: string;
    adhaar_voter_url?: string;
    photo_url?: string;
}

export interface firsttimepasswordchange {
    admn_user_id?: number;
    new_password?: string;
}
export interface forgetpassword {
    username?: string;
}