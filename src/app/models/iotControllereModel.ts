import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';

export interface IotControllerMain {
    loading?: boolean;
    error?: ErrorModel;
    actionMainDetails?: ActionMainDetails[];
    iotControllerDetails?: IotControllerDetails[];
    MoreActionDetail?: moreActionDetail;
    SlotPoints?: SlotPoint[];
    SlotBooking?: SlotBooking;
    deviceDetails?: DeviceDetails[];
    demodeviceDetails?: DemoDeviceDetails[];
    bypass?: Bypass;
    device_status?: DomainData[];
    Countries?: countries[];
    singleDevice?: addDemoDevice;
}

export interface ActionMainDetails {
    customer_trip_association_id?: number;
    trip_uuid?: string;
    riding_time?: any;
    pause_time?: any;
    total_trip_time?: any;
    total_payable?: any;
    trip_status?: number;
    paid_amount?: any;
    booking_time?: Date;
    end_time?: any;
    start_location: number;
    end_location?: any;
    distance_travelled?: any;
    customer_id?: number;
    vehicle_id?: number;
    corporate_enabled?: number;
    coupon_code?: string;
    rental_plan?: number;
    trip_ref_no?: string;
    ontrip_start_time?: Date;
    state_id?: number;
    customer_name?: string;
    start_location_name?: string;
    end_location_name?: any;
    trip_status_name?: string;
    vehicle_number?: string;
    device_imei?: string;
}

export interface LoaderState {
    show: boolean;
}

export interface moreActionDetail {
    customer_trip_association_id?: number;
    customer_state?: string;
    trip_type?: string;
    corporate_code?: string;
    trip_uuid?: string;
    riding_time?: any;
    pause_time?: any;
    total_trip_time?: any;
    token_id?: any;
    token_rentalpoint_id?: any;
    total_payable?: any;
    trip_status?: number;
    paid_amount?: any;
    booking_time?: string;
    end_time?: any;
    start_location?: number;
    end_location?: any;
    distance_travelled?: any;
    customer_id?: number;
    vehicle_id?: number;
    corporate_enabled?: number;
    coupon_code?: string;
    rental_plan?: number;
    trip_ref_no?: string;
    ontrip_start_time?: string;
    state_id?: number;
    vehicle_type?: number;
    vehicle_type_name?: string;
    vehicle_number?: string;
    device_imei?: string;
    vehicle_current_status?: number;
    vehicle_current_status_name?: string;
    start_location_name?: string;
    end_location_name?: any;
    trip_status_name?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    customer_booking_pin?: number;
}

export interface TripUuid {
    trip_uuid?: string,
}

export interface TripStart {
    customer_id?: number;
    dpin?: number;
    admin_flag?: number;
    trip_uuid?: string;
}

export interface TripCancel {
    customer_id?: number;
    vehicle_id?: number;
    trip_uuid?: string;
    admin_flag?: number;
}

export interface countries {
    countries_id?: number;
    countries_name?: string;
    countries_code?: string;
}


export interface PauseResumeService {
    customer_id?: number;
    trip_uuid?: string;
    latitude?: number;
    longitude?: number;
    bluetooth_success?: boolean;
    admin_flag?: number;
}

export interface SlotBookingService {
    customer_id?: number;
    trip_uuid?: string;
    rentalpoint_id?: number;
    vehicle_id?: number;
    admin_flag?: number;

}

export interface getSlotService {
    latitude?: number;
    longitude?: number;
    area?: number;
    admin_flag?: number;
}

export interface SlotPoint {
    latitude?: number;
    longitude?: number;
    rentalpoint_id?: number;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    country_code?: number;
    postal_code?: number;
    commissioning_date?: Date;
    max_capacity?: number;
    available_capacity?: number;
    region_id?: number;
    available_slot?: number;
}


export interface EndTripService {
    customer_id?: number;
    trip_uuid?: string;
    vehicle_id?: number;
    rentalpoint_id?: number;
    token?: string;
    latitude?: number;
    longitude?: number;
    admin_flag?: number;
}

export interface RentalPoint {
    latitude?: number;
    longitude?: number;
}

export interface SlotBooking {
    code?: string;
    slot_details?: SlotDetails;
    rentalpoint_details?: SlotPoint;
    start_time?: boolean;
    remaining_time?: number;
    trip_uuid?: string;
    admin_flag?: number;
}

export interface SlotDetails {
    retalpoint_request_id?: number;
    token_id?: string;
    request_status?: number;
    rentalpoint_id?: number;
    customer_id?: number;
    request_time?: Date;

}

export interface DemoDeviceDetails {
    device_imei?: string;
    device_data?: string;
    vehicle_number?: string;
    dummy_device_status?:number;
    dummy_device_status_name?:string;
}
export interface editDummyDevice {
    device_imei?: string;
    device_data?: string;
}

export interface addDemoDevice {
    device_name?: string;
    device_make?: string;
    device_code?: string;
    device_model?: string;
    country_of_origin?: string;
    manufacturing_date?: Date;
    commissioning_date?: Date;
    device_imei?: string;
    device_id?: number;
    device_status?: number;
    device_data?: string;
}
export interface dummydeviceStatus {
    domain_type?: string;
}
export interface editDemoDevice{
    device_imei: string;
}

export interface DeviceDetails {
    vehicle_id?: number;
    vehicle_type?: number;
    vehicle_type_name?: string;
    vehicle_number?: string;
    device_imei?: string;
}

export interface Bypass {
    vehicle_type_name?: string;
    vehicle_number?: string;
    device_imei?: string;
    vehicle_id: number;
    bypass_list: Bypasslist[];
}

export interface Bypasslist {
    bypass_id: number;
    bypass_name: string;
    bypass_status: number;
}

export interface IotControllerDetails {
    vehicle_id?: number,
}

export interface cancelSlot {
    customer_id?: number;
    trip_uuid?: string;
    admin_flag?: number;
}
