import { ErrorModel } from './errorModel';
import { RegionItem, CityItem } from './regionManagement';

export interface TripMain{
    loading?: boolean;
    error?: ErrorModel;
    TripDetail?:tripDetail[];
    RegionList?: RegionItem[];
    CityList?: CityItem[];
    RentalPointDetails?:rentalPointDetails[];
    singletripdetails?: singleTripDetails;
    // TripassociationID?: tripAssociationID;
}
export interface tripDetail {
    customer_trip_association_id?: number,
    region?: number;
    region_name?:string;
    city_name?:string;
    city_id?:number;
    trip_uuid?: string,
    riding_time?: number,
    pause_time?: number,
    total_trip_time?: number,
    total_payable?: number,
    trip_status?: number,
    paid_amount?: number,
    booking_time?: string,
    end_time?: string,
    start_location?: number,
    end_location?: number,
    distance_travelled?: any,
    customer_id?: number,
    vehicle_id?: number,
    corporate_enabled?: number,
    coupon_code?: string,
    rental_plan?: number,
    trip_ref_no?: string,
    ontrip_start_time?: string,
    start_location_name?: string,
    end_location_name?: string,
    Trip_Status_Name?: string,
    company_name?: string;
  }

  export interface Location {
    charge_status?: string;
    lock_status?: string;
    battery_status?: string;
    imei?: string;
    longitude?: string;
    status?: string;
    plug_status?: string;
    speed?: string;
    latitude?: string;
    response_datetime?: string;
}


  export interface rentalPoint {
    latitude?: number;
    longitude?: number;
  }

  export interface rentalPointDetails{
    status?: number,
    rentalpoint_name?: string,
    latitude?: number,
    longitude?: number,
    rentalpoint_id?: number,
    address_line1?: string,
    address_line2?: string,
    city?: string,
    country_code?: string,
    postal_code?: number,
    commissioning_date?: Date,
    termination_date?: Date,
    max_capacity?: number,
    available_capacity?: number,
    region_id?: number,
    distance?: number,
    available_slot?: number,
  }

  export interface endTrip{
    rentalpoint_id?: number,
    customer_id?: number,
    // vehicle_id?: number,
    trip_uuid?: string,
    latitude?: number,
    longitude?: number,
  }

  export interface tripAssociationID {
    customer_trip_association_id?: number,
    start_date?: Date,
    end_date?: Date,
  }

  export interface singleTripDetails {
    customer_trip_association_id?: number,
    flag?:number,
    start_date?: Date,
    end_date?: Date,
    trip_uuid?: string,
    riding_time?: Date,
    pause_time?: Date,
    total_trip_time?: Date,
    total_payable?: number,
    trip_status?: number,
    paid_amount?: number,
    booking_time?: Date,
    end_time?: Date,
    start_location?: number,
    end_location?: number,
    distance_travelled?: number,
    customer_id?: number,
    vehicle_id?: number,
    corporate_enabled?: number,
    coupon_code?: string,
    rental_plan_name?: string,
    cost?: number;
    rental_plan?: number,
    trip_ref_no?: string,
    ontrip_start_time?: Date,
    state_id?: number,
    trip_status_name?: string,
    customer_name?: string,
    vehicle_distance_traveled_id?: number,
    trip_rating?: number;
    updated_on?: Date,
    state_name?: string,
    start_location_name?: string,
    end_location_name?: string,
    vehicle_idnumber?: string,
    vehicle_current_status?: number;
    vehicle_problem_body?: ProblemItem[];
    trip_main?: tripEvent[],
    price_breakup?: priceBreakup[],
    locations?: Location[];
    company_name?: string;
    ownership_type?: number;
  }

  export interface ProblemItem {
    problem_codes_id?: number;
    problem_code?: number;
    display_desc?: string;
    severity?: number;
    severity_name?: string;
}

  export interface priceBreakup {
    breakup_amount?: number;
    breakup_item?: number;
    breakup_item_name?: string;
    customer_trip_association_id?: number;
    price_breakup_details_id?: number;
  }

  export interface tripEvent {
    trip_main_id?: number,
    event_name?: string,
    event_version?: number,
    lat?: number,
    long?: number,
    trip_main_details: tripMainDetails,
    created_at?: Date,
    event_details?: string;
  }

  export interface tripMainDetails {
    location_point?: locationPoint,
  }

  export interface locationPoint {
    lat?: number,
    long?: number,
  }