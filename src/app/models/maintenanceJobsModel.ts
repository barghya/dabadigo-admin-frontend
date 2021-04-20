import { ErrorModel } from './errorModel';
import { countries, Assets } from './asset-inventoryModel';
import { states, RegionItem, CityItem } from './regionManagement';
import { FSQDetails } from './fsqManagement';
import { GetRp } from './rentalPoint';
import { DomainData } from './domainModel';
import { users } from './userManagement';

export interface MaintenanceJobsMain {
    error?: ErrorModel;
    loading?: boolean;
    maintenanceJobs?: MaintenanceJobItem[];
    countries?: countries[];
    states?: states[];
    regions?: RegionItem[];
    fsqList?: FSQDetails[];
    vehicles?: Assets[];
    rentalPointList?: GetRp[];
    problemStatusList?: DomainData[];
    fsqLevelList?: DomainData[];
    maintenanceJobDetail?: MaintenanceJobItemDetail;
    vehicleTypes?: DomainData[];
    maintenanceSchedules?: MaintenanceScheduleItem[];
    cities?: CityItem[];
    activeBeus?: users[];
}

export interface MaintenanceJobItem {
    work_item_id?: number;
    reported_timestamp?: string;
    days_under_maintenance?: number;
    work_item_detail_id?: number;
    vehicle_id?: number;
    vehicle_idnumber?: string;
    region_id?: number;
    region_name?: string;
    region_code?: string;
    country_id?: number;
    countries_name?: string;
    state_id?: number;
    states_name?: string;
    city_id?: number;
    city_name?: string;
    rentalpoint_id?: number;
    rentalpoint_name?: string;
    problem_status?: number;
    problem_status_name?: string;
    work_item_ref_no?: string;
    work_item_priority?: number;
    assigned_to_id?: number;
    assigned_on?: Date;
    assigned_fsq?: string;
    beu_name?: string;
}

export interface MaintenanceJobsFilterPayload {
    past_flag?: boolean;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    region_id?: number;
    fsq_id?: number;
    fsq_level?: number;
    vehicle_id?: number;
    rentalpoint_id?: number;
    franchisee_id?: number;
    problem_status?: number;
    days_under_maintenance?: string;
    managing_beu?: number;
    start_date?: Date;
    end_date?: Date;
}

export interface MaintenanceJobItemDetail {
    work_item_id?: number;
    reported_timestamp?: string;
    days_under_maintenance?: number;
    work_item_detail_id?: number;
    vehicle_id?: number;
    vehicle_idnumber?: string;
    region_id?: number;
    region_name?: string;
    region_code?: string;
    country_id?: number;
    countries_name?: string;
    state_id?: number;
    states_name?: string;
    city_id?: number;
    city_name?: string;
    rentalpoint_id?: number;
    rentalpoint_name?: string;
    problem_status?: number;
    problem_status_name?: string;
    work_item_ref_no?: string;
    work_item_priority?: number;
    assigned_to_id?: number;
    assigned_on?: Date;
    days_assigned?: number;
    assigned_fsq?: string;
    fsq_skill_level?: number;
    fsq_skill_name?: string;
    fsq_phone?: string;
    total_distance?: number;
    additional_details?: AdditionalDetails;
    parts_changed?: PartsChanged[];
    resolutions?: TaskResolution[];
    beu_data?: ManagingBeuItem[];
}

export interface TaskResolution {
    task_resolution_id?: number;
    comments?: string;
    task_actions?: string;
    task_status?: number;
    work_item_task_id?: number;
    task_name?: string;

}

export interface PartsChanged {
    work_item_id?: number;
    work_item_task_id?: number;
    parts_id?: number;
    parts_status?: number;
    parts_quantity?: number;
    part_name?: string;
    part_short_code?: string;
    task_name?: string;
}

export interface AdditionalDetails {
    days_since_last_maintenance?: number;
    total_no_of_maintenance?: number;
    distance_since_maintenance?: number;
    work_item_id?: number;
}

export interface MaintenanceJobResolvePayload {
    work_item_id?: number;
    admn_user_id?: number;
    resolutions?: TaskResolution[];
}

export interface MaintenanceJobAssignPayload {
    work_item_id?: number;
    admn_user_id?: number;
    fsq_id?: number;
}

export interface MaintenanceJobCreatePayload {
    vehicle_id?: number;
    admn_user_id?: number;
    problem_code?: number;
}

export interface MaintenanceScheduleItem {
    vehicle_type?: number;
    vehicle_type_name?: string;
    vehicle_age?: number;
    vehicle_age_name?: string;
    distance_limit?: number;
    days_limit?: number;
}

export interface ManagingBeuItem {
    beu_name?: string;
    beu_phone?: string;
}