import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { countries } from './asset-inventoryModel';

export interface RegionManagementMain {
    loading?: boolean;
    error?: ErrorModel;
    RegionList?: RegionItem[];
    Countries?: countries[];
    States?: states[];
    singleRegion?:RegionItem;
    cities: CityItem[];
}
export interface RegionItem {
    region_id?: number;
    region_code?: string;
    region_name?: string;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    countries_name?: string;
    states_name?: string;
    center_latitude?: number;
    center_longitude?: number;
    radius?: number;
    created_by_id?: number;
    created_on?: Date;
    admn_user_id?: number;
    region_phone_no?: number;
}
export interface EditRegion{
    region_id?: number;
}
export interface states {
    states_id?:number;
    states_name?:string;
    states_code?:string;
}

export interface CityItem {
    city_id?: number;
    city_code?: string;
    city_name?: string;
}