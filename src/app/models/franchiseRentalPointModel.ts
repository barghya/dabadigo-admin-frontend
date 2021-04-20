import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { countries } from './asset-inventoryModel';
import { RegionItem } from './regionManagement';


export interface FranchiseLoad {
    error?: ErrorModel;
    loading?: boolean;
    RentalPoints?: GetRp[];
    singleRentalPoint?: GetRp;
    rentalpoint_type?: DomainData[];
    rentalpoint_status?: DomainData[];
    countries?: countries[];
    rentalPointHistory?: RentalPoint;
    regionitem?: RegionItem[];
    // availableManagers?: managers[];
    // rentalpoint_det?: RentalPoint2;
    // States?: states[];
    // cities: CityItem[];
    available_battery?: AvailableBattery[];
    // franchise?: AvailableFranchise[];
}
export interface getRentalpoint {
    admn_user_id?: number;
}
export interface RentalPoint {
    rentalpoint_id?: number;
    rentalpoint_type?: number;
    ownership_code?: number;
    rentalpoint_shortcode?: string;
    rentalpoint_name?: string;
    status?: number;
    franchise_id?: any;
    rentalpoint_type_name?: string;
    status_name?: string;
    ownership_code_name?: string;
    rentalpoint_det?: Rentalpointdet[];
    parked_vehicle_details?: any[];
    parked_vehicle_count?: number;
    batteries?: any[];
    available_slot?: number;
    vehicle_in_out?: Vehicleinout[];
    // vehicle_out?: Vehicleout[];
}
// export interface Vehicleout {
//     trip_uuid?: string;
//     booking_time?: string;
//     trip_ref_no?: string;
//     departure_time?: string;
//     trip_status?: number;
//     vehicle_idnumber?: string;
//     chassis_number?: string;
//     model?: string;
//     trip_status_name?: string;
//     vehicle_type_name?: string;
//     vehicle_type?: number;
//   }
  
  export interface Vehicleinout {
    trip_uuid?: string;
    vehicle_in_out?:string;
    in_out_time?: string;
    ontrip_start_time?: string;
    end_time?:string;
    start_location?:number;
    end_location?:number;
    trip_ref_no?: string;
    trip_status?: number;
    trip_status_name?: string;
    vehicle_idnumber?: string;
    franchise_shared_amount:string;
    model?: string;
    vehicle_type_name?: string;
    vehicle_type?: number;
  }
  export interface Rentalpointdet {
    rentalpoint_detail_id?: number;
    commissioning_date?: string;
    termination_date?: string;
    status?: number;
    max_capacity?: number;
    available_capacity?: number;
    updated_on?: string;
    updated_by_id?: string;
    opening_hours?: string;
    closing_hours?: string;
    battery_swapping_point?: number;
    manager_id?: number;
    rentalpoint_address_id?: number;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    country_code?: string;
    postal_code?: string;
    rentalpoint?: number;
    region?: number;
    lat?: number;
    lon?: number;
    states_name?: string;
    city_name?: string;
    countries_name?: string;
    addressline1?: string;
    addressline2?: string;
    pin?: number;
    manager_name?: string;
  }
export interface AddedBatteries {
    stock_id?: number;
    item_type?: number;
    item_id?: number;
    store_type?: number;
    store_id?: number;
    status?: number;
    effective_start_date?: Date;
    effective_end_date?: any;
    battery_make?: string;
    battery_model?: string;
    battery_tag?: string;
    battery_status?: number;
    battery_power?: string;
    battery_manufacturing_date?: Date;
    warranty_period?: string;
    battery_state_name?: string;
    stock_status_name?: string;
}
// export interface Rentalpointdet {
//     city_name?: string;
//     rentalpoint_detail_id?: number;
//     address_line1?: string;
//     address_line2?: string;
//     city?: string;
//     country_code?: string;
//     country_name?: string;
//     addressline1?: string;
//     addressline2?: string;
//     states_name?: string;
//     state?: number;
//     country?: string;
//     countries_name?: string;
//     postal_code?: number;
//     pin?: number;
//     commissioning_date?: Date;
//     termination_date?: Date;
//     status?: number;
//     max_capacity?: number;
//     available_capacity?: number;
//     updated_on?: Date;
//     updated_by_id?: string;
//     lat?: number;
//     lon?: number;
//     rentalpoint?: number;
//     region_id?: number;
//     opening_hours?: string;
//     closing_hours?: string;
//     battery_swapping_point?: boolean;
//     admn_user_id?: number;
//     manager_name?: string;
//     country_id?: number;
//     state_id?: number;
//     city_id?: number;
//     rentalpoint_ownership_name?: number;
// }

export interface ParkedVehicleDetails {
    vehicle_id?: number;
    vehicle_type?: number;
    vehicledetail_id?: number;
    manufacturer?: string;
    model?: string;
    manufacture_date?: Date;
    warranty_expiry?: Date;
    warranty_terms?: string;
    vehicle_status?: number;
    QRCode?: string;
    vehicle_idnumber?: string;
    vehicle_type_name?: string;
    vehicle_status_name?: string;
}

export interface GetRp {
    rentalpoint_id?: number;
    rentalpoint_type?: string;
    ownership_code?: number;
    franchise_id?: number;
    rentalpoint_shortcode?: string;
    rentalpoint_name?: string;
    rentalpoint_type_name?: string;
    status?: number;
    rentalpoint_detail_id?: number;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    country_code?: string;
    addressline1?: string;
    addressline2?: string;
    states_name?: string;
    state?: number;
    country?: string;
    country_name?: string;
    pin?: number;
    postal_code?: number;
    commissioning_date?: Date;
    termination_date?: Date;
    max_capacity?: number;
    available_capacity?: number;
    updated_on?: string;
    updated_by_id?: string;
    rentalpoint?: number;
    opening_hours?: string;
    closing_hours?: string;
    region?: number;
    region_id?: number;
    lat?: number;
    lon?: number;
    battery_swapping_point?: boolean;
    admn_user_id?: number;
    country_id?: number;
    state_id?: number;
    city_id?: number;
}

export interface RpId {
    rentalpoint_id?: number;
}
export interface AvailableBatteryService {
    vehicle_id?: number;
}

export interface AvailableBattery {
    vehicle_battery_id?: number;
    battery_make?: string;
    battery_model?: string;
    country_of_origin?: string;
    battery_power?: string;
    warranty_period?: string;
    battery_status?: number;
    battery_manufacturing_date?: Date;
    commissioning_date?: Date;
    updated_on?: Date;
    battery_tag?: string;
    assignment_status?: string;
}