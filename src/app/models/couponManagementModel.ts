import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { countries } from './asset-inventoryModel';
import { states, CityItem } from './regionManagement';
import { customerDetails } from './customerManagementModel';

export interface couponManagementMain {
    loading: boolean;
    error: ErrorModel;
    CouponManagement: couponManagement[];
    CouponDiscountType: DomainData[];
    CouponType: DomainData[];
    CouponUsageRestriction: DomainData[];
    SingleCoupon: couponManagement;
    countries?: countries[];
    states?: states[];
    cities?: CityItem[];
    customers?: customerDetails[];
    usageDetail?: UsageDetails;
    referrals: Referrals[],
}

export interface couponManagement {
    coupon_id?: number;
    coupon_code?: string;
    coupon_name?: string;
    coupon_type?: number;
    discount_type?: number;
    usage_restriction?: number;
    value?: number;
    time?: number;
    start_date?: Date;
    end_date?: Date;
    coupon_description?: string;
    status?: number;
    region_id?: number;
    countries_id?: number;
    states_id?: number;
    city_id?: number;
    countries_name?: string;
    states_name?: string;
    city_name?: string;
    discount_type_name?: string;
    coupon_type_name?: string;
    usage_restriction_name?: string;
    status_name?: string;
    used_users?: customerDetails[],
    unused_users?: customerDetails[],
}

export interface singleCoupon {
    coupon_id?: number;
    admn_user_id?: number;
}

export interface CustomerId {
    customer_id?: number;
}

export interface UsageHistoryItem {
    trip_uuid?: string;
    trip_ref_no?: string;
    booking_time?: string;
    ontrip_start_time?: Date;
    end_time?: Date;
    total_trip_time?: number;
    total_payable?: number;
    paid_amount?: number;
    distance_travelled?: number;
    vehicle_id?: number;
    vehicle_idnumber?: string;
    start_location?: number;
    end_location?: number;
    discount?: number;
    first_name?: string;
    last_name?: string;
    email_id?: string;
    phone_no?: string;
}

export interface UsageDetails {
    coupon_id?: number;
    coupon_code?: string;
    coupon_name?: string;
    coupon_usage_history?: UsageHistoryItem[];
}

export interface Referrals {
    customer_id?: number;
    customer?: string;
    referrer_id?: number;
    referrer?: string;
    created_on?: Date;
    updated_on?: Date;
    status?: number;
    status_name?: string;
    coupon_id?: number;
    coupon_name?: string;
    coupon_code?: string;
    coupon_value?: number;
    coupon_start_date?: Date;
    coupon_end_date?: Date;
    coupon_status?: number;
    coupon_status_name?: string;
    referrer_coupon_id?: number;
    referrer_coupon_name?: string;
    referrer_coupon_code?: string;
    referrer_coupon_value?: number;
    referrer_coupon_start_date?: Date;
    referrer_coupon_end_date?: Date;
    referrer_coupon_status?: number;
    referrer_coupon_status_name?: string;
  }