import { ErrorModel } from './errorModel';
import { RegionItem, states, CityItem } from './regionManagement';
import { users } from './userManagement';


export interface DashboardLoad {
    regions?: RegionItem[];
    userDetail?: users;
    states?: states[];
    cities?: CityItem[];
    error?: ErrorModel;
    loading?: boolean;
}

export interface admnId {
    admn_user_id?: number;
}

export interface DashboardModel {
    accident_count?: number;
    problem_count?: number;
    shift_count?: number;
    locations?: LocationData[];
    payment?: PaymentItem;
    maintenance?: MaintenanceCountItem;
    franchisee_payment?: PaymentItem;
}

export interface LocationData {
    imei?: string;
    latitude?: string;
    longitude?: string;
    response_datetime?: string;
    vehicle_id?: number;
    vehicle_number?: string;
    vehicle_current_status?: number;
    geofence_violation?: boolean;
    time_threshold_exceeded?: boolean;
    severity?: number;
    battery_status?: number;
}

export interface PaymentItem {
    payment_total: number;
    payment_due: number;
}

export interface MaintenanceCountItem {
    logged: number;
    assigned: number;
}