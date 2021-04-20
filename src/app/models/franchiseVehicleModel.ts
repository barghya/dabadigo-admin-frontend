import { ErrorModel } from './errorModel';
export interface FranchiseVehicle {
    Assets?: FranchiseAssets[];
    loading?: boolean;
    error?: ErrorModel
}

export interface FranchiseAssets {
    vehicle_id?: number;
    vehicle_type?: number;
    vehicledetail_id?: number;
    manufacturer?: string;
    model?: string;
    manufacture_date?: Date;
    warranty_expiry?: Date;
    warranty_terms?: string;
    vehicle_status?: number;
    qrcode?: string;
    vehicle_idnumber?: string;
    chassis_number?: string;
    ownership_type?: number;
    ownership_type_name?: string;
    franchise_id?: number;
}