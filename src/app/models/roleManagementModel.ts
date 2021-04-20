import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';

export interface roleMain {
    loading?: boolean;
    error?: ErrorModel;
    UserRole?: userRole[];
    SingleRole?: userRole;
    permissionDetails?: PermissionDetails;
    permission_code?: DomainData[];
    user_type?:DomainData[];
    usertype?:UserType;

}
export interface userRole {
    role_name?: string;
    admn_role_id?: number;

}
export interface userrole {
    role_name?: string;
    admn_role_id?: number;
    user_type?: number;
    
}
export interface userRoleId {
   
    admn_role_id?: number;
    
}

export interface UserType {
    user_type?: number;
    user_type_name?: string;
    roles?: userRole[];
    unused_roles?: userRole[];
}
export interface EditUserType {
    user_type?: number;
}


export interface Controlelement {
    control_element_id?: number;
    control_element_name?: string;
    control_element_type?: number;
}
export interface NavLinks {
    label: string;
    link: string;
}
export interface EditRole {
    admn_role_id?: number;
}

export interface PermissionDetails {
    admn_role_id?: number;
    role_name?: string;
    role_permission?: Rolepermission[];
    unused_control_elements?: Unusedcontrolelement[];
}

export interface Unusedcontrolelement {
    control_element_id?: number;
    control_element_name?: string;
}

export interface Rolepermission {
    control_element_id?: number;
    control_element_name?: string;
    permission_code?: number;
    permission?: string;

}

export interface permission {

    control_element_name?: string;

}

export interface domainData {
    domain_id?: number;
    domain_type?: string;
    domain_code?: number;
    domain_value?: string;
    domain_text?: string;
    domain_data_type?: string;
    control_element_id?: number;
    control_element_name?: string;
}

