import { ErrorModel } from './errorModel';
import { users } from './userManagement';
import { RegionItem, states, CityItem } from './regionManagement';
import { GetRp } from './rentalPoint';

export interface DeployVehicle {
    loading?: boolean;
    error?: ErrorModel;
    users?: users[];
    region?: RegionItem[];
    rentalPoint?: GetRp[];
    deployRequestVehicle?: DeployRequestVehicle[];
    vehicleDetails?: VehicleDetails[];
    singleDeployVehicle?: any;
    RegionList?: RegionItem[];
    CityList?: CityItem[];
    StateList?: states[];
}

export interface DeployRequestVehicle {
    deployment_request_id?: number;
    deployment_request_status?: number;
    rentalpoint?: number;
    assigned_user?: number;
    region?: number;
    city_name?:string;
    city_id?:number;
    state_name?:string;
    state_id?:number;
    deployment_request_status_name?: string;
    rentalpoint_name?: string;
    region_name?: string;
    assigned_user_name?: string;
    drlineitems?: drlineitems[];
    admn_user_id?: number;
}
 
export interface drlineitems {
    vehicle?: number,
}

export interface DeployRequestVehicleInDetail {
    deployment_request_id?: number;
    deployment_request_status?: number;
    rentalpoint?: number;
    assigned_user?: number;
    region?: number;
    deployment_request_status_name?: string;
    rentalpoint_name?: string;
    region_name?: string;
    assigned_user_name?: string;
    deploymentRequestID?:deploymentRequestID;
    drlineitems?: VehicleDetails[];
}

export interface VehicleDetails {
    vehicle_id?: number;
    vehicle_type?: number;
    vehicle_assetcode?: string;
    vehicledetail_id?: number;
    manufacturer?: string;
    model?: string;
    manufacture_date?: Date;
    warranty_expiry?: Date;
    warranty_terms?: string;
    QRCode?: string;
    imei_number?: string;
    vehicle_idnumber?: string;
    vehicle_current_status?: number;
    vehicle_type_name?: string;
    vehicle_current_status_name?: string
}

export interface deploymentRequestID {
    deployment_request_id?: number;
}
