import { ErrorModel } from './errorModel';
import { states, CityItem } from './regionManagement';
import { DomainData } from './domainModel';
import { countries } from './asset-inventoryModel';
import { region } from './userManagement';

export interface FSQhubMain {
    loading?: boolean;
    error?: ErrorModel;
    fsqHubDetails?: FSQHubDetails[];
    States?: states[];
    Countries?: countries[];
    hubstatus?: DomainData[];
    availableRegions?: Region[];
    availableManagers?: managers[];
    SingleHub?: editFSQHub;
    singlehub?: singleFSQHub;
    cities: CityItem[];
}

// export interface FSQHubDetails {
//     hub_id?: number,
//     status?: number,
//     created_by?: number,
//     created_on?: Date,
//     hub_detail_id?: number,
//     hub_short_code?: string,
//     hub_name?: string,
//     hub_addressline1?: string,
//     hub_addressline2?: string,
//     hub_state?: string,
//     hub_pin_no?: number,
//     hub_region_id?: number,
//     region_id?: number,
//     start_date?: Date,
//     end_date?: Date,
//     status_name?: string,
//     hub_region_status_name?: string,
//     region_name?: string,
//     created_by_name?: string,
// }

export interface FSQHubDetails {
    admn_user_id?: number;
    hub_id?: number;
    hub_manager?: HubManager[];
    hub_region?: HubRegion[];
    hub_status?: number;
    created_by?: any;
    created_on?: string;
    hub_detail_id?: number;
    hub_short_code?: string;
    hub_name?: string;
    hub_addressline1?: string;
    hub_addressline2?: string;
    hub_state?: string;
    hub_pin_no?: number;
    hub_country?: string;
    hub?: number;
    status_name?: string;
    country_name?: string;
    state_name?: string;
    addressline1?: string;
    addressline2?: string;
    country?: string;
    state?: number;
    city?: string;
    pin?: number;
    countries_name?: string;
    states_name?: string;
}

export interface HubRegion {
    hub_region_id?: number;
    region_id?: number;
    start_date?: any;
    end_date?: any;
    hub_region_status?: any;
    hub?: number;
    region_name?:string;
    hub_id?: number;
}

export interface HubManager {
    hub_manager_id?: number;
    admn_user_id?: number;
    role_type?: string;
    hub_manager_status?: number;
    hub?: number;
    role?: number;
    manager_name?:string;
    hub_id?: number;
}
export interface managers {
    admn_user_id?: number,
    manager_name?: string,
}
export interface FSQDetails {
    hub_manager_id?: number;
    hub_id?: number;
    role_id?: number;
    admn_user_id?: number;
    role_type?: string;
    hub_manager_status?: number;
    start_date?: Date;
    end_date?: Date;
    fsq_status_name?:string;
    fsq_name?: string;
    user_status?: number;
}

export interface AddFSQHub {
    hub_short_code?: string;
    hub_name?: string;
    hub_addressline1?: string;
    hub_addressline2?: string;
    hub_status?: number;
    hub_state?: string;
    hub_pin_no?: number;
    hub_country?: string;
    addressline1?: string;
    addressline2?: string;
    country?: string;
    state?: number;
    city?: string;
    pin?: number;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    hub_region?: regions[];
    hub_manager?: managers[];
}

export interface Hubmanager {
    admn_user_id: number;
}

export interface Hubregion {
    region_id: number;

}
export interface editHub {
    hub_id?: number;
}
export interface editFSQHub {
    hub_id?: number;
    hub_status?: number;
    created_by?: any;
    created_on?: string;
    hub_detail_id?: number;
    hub_short_code?: string;
    hub_name?: string;
    hub_addressline1?: string;
    hub_addressline2?: string;
    hub_state?: string;
    hub_pin_no?: number;
    hub_country?: string;
    addressline1?: string;
    addressline2?: string;
    country?: string;
    state?: number;
    pin?: number;
    hub_manager?: HubManager[];
    hub_region?: HubRegion[];
    hub_fsq?:FSQDetails[];
}
export interface Region {
    region_id?: number;
    region_name?: string;
}
export interface hubmanager{
    hub_id?: number;
    admn_user_id: number;
}
export interface hubregion{
    hub_id?: number;
    hub_region_id?: number;
}

export interface singleFSQHub {
    hub_id?: number;
    hub_status?: number;
    created_by?: any;
    created_on?: string;
    hub_detail_id?: number;
    hub_short_code?: string;
    hub_name?: string;
    hub_addressline1?: string;
    hub_addressline2?: string;
    hub_state?: string;
    hub_pin_no?: number;
    hub_country?: string;
    addressline1?: string;
    addressline2?: string;
    country?: string;
    state?: number;
    city?: string;
    pin?: number;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    hub_manager?: Hubmanager[];
    hub_region?: regions[];
    hub_fsq?:number[];
}
 export interface regions {
     region_id?:number;
 }

 export interface managers {
    admn_user_id?:number;
}