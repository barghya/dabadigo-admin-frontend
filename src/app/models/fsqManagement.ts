import { ErrorModel } from './errorModel';
import { RegionItem } from './regionManagement';
import { DomainData } from './domainModel';
import { GetRp } from './rentalPoint';
import { BreakPoint } from '@angular/flex-layout';
import { locationPoint } from './tripManagementModel';

export interface FSQMain {
  loading?: boolean;
  error?: ErrorModel;
  fsqdetails?: FSQDetails[];
  regionItem?: RegionItem[];
  singleFSQ?: FSQDetails;
  workItemList?: WorkItem[];
  TaskDetailsList?:Taskdetails[];
  activeFsq?: FSQDetails[];
  singleWorkItem?: WorkItemInDetail;
  FSQdetails?:FSQDetail;
  region?: RegionItem[];
  rentalPoint?: GetRp[];
  FsqShiftRegion?: RegionItem[];
  rentalPointList?: RentalPoint[];
  FsqShift?: FsqShifts;
  breakPoint?: Breakpoint;
  SingleFSQShift?:FsqShift;
  incidentDetail?: IncidentDetail;
  shiftRegionRentalPoint?: RentalPoint[];
  VehicleByRentalPoint?: vehicle[];
  shift_detail?: ShiftDetails;
  fsq_level?: DomainData[];
  fsq_hub?: FsqAllHub[];
  Return_region?: ReturnRegion[],
  Return_RP?: ReturnRP[]
  // SingleFSQdetails?:FSQDetail;
}

export interface FSQDetails {
  admn_user_id?: number;
  user_type?: number;
  username?: string;
  password?: string;
  user_status?: number;
  userdetail_id?: number;
  firstname?: string;
  lastname?: string;
  contact_phone?: string;
  admn_partner_id?: number;
  updated_on?: Date;
  email_id?: string;
  region_id?: number;
  current_address?: string;
  permanent_address?: string;
  resume_url?: string;
  pan_url?: string,
  adhaar_voter_url?: string;
  photo_url?: string;
  status_name?: string;
  type_name?: string;
  Region_Name?: string;
  assigned_start?: Date;
  assigned_end?: Date;
  permanentstatename?: string;
  permanentcountryname?: string;
  currentstatename?: string;
  currentcountryname?: string;
  currentaddressline1?: string;
  currentaddressline2?: string;
  currentpin?: number;
  currentcountry?: string;
  currentstate?: number;
  permanentaddressline1?: string;
  permanentaddressline2?: string;
  permanentpin?: number;
  permanentcountry?: string;
  permanentstate?: number;
  user_status_name?: string;
  hub_id?: number;
  hub_name?: string;
  fsq_skill_level?: string;
}

export interface ApproveRequestFSQ {
  admn_user_id?: number,
}
export interface FSQDetail {
  admn_user_id?: number;
  user_type?: number;
  username?: string;
  user_status?: number;
  userdetail_id?: number;
  firstname?: string;
  lastname?: string;
  contact_phone?: string;
  admn_partner_id?: number;
  updated_on?: Date;
  email_id?: string;
  current_address?: string;
  permanent_address?: string;
  resume_url?: string;
  pan_url?: string;
  adhaar_voter_url?: string;
  photo_url?: string;
  status_name?: string;
  type_name?: string;
  Region_Name?: string;
  assigned_start?: Date;
  assigned_end?: Date;
  permanentstatename?: string;
  permanentcountryname?: string;
  currentstatename?: string;
  currentcountryname?: string;
  currentaddressline1?: string;
  currentaddressline2?: string;
  currentpin?: number;
  currentcountry?: string;
  currentcityname?: string;
  currentstate?: number;
  permanentaddressline1?: string;
  permanentaddressline2?: string;
  permanentpin?: number;
  permanentcityname?: string;
  permanentcountry?: string;
  permanentstate?: number;
  user_status_name?: string;
  hub_id?: number;
  hub_name?: string;
  fsq_skill_level?: string;
  gender?: string;
  fsq_average_rating?: number;
}

export interface WorkItemAssignmentRequest {
  work_item_id?: number,
  admn_user_id?: number,
  work_item_type?: number,
  tasks?: number[],
}

export interface FSQRegionUpdate {
  admn_user_id?: number,
  region_id?: number,
  assigned_start?: Date,
  assigned_end?: Date,
}

export interface WorkItem {
  work_item_id?: number;
  work_item_type?: number;
  work_item_type_name?: string;
  raised_by?: number;
  raised_by_role?: string;
  reported_timestamp?: string;
  problem_status?: number;
  problem_status_name?: string;
  work_item_detail_id?: number;
  vehicle_id?: number,
  vehicle_number: number;
  trip_uuid?: string;
  problem_codes?: string;
  problem_description?: string;
  updated_by?: number;
  updated_on?: any;
  problem_image_url?: string;
  vehicle_currentstate?: number;
  work_item?: number;
  customer?: string;
  fsq_user?: string;
  assigned_to_id?: number;
  vehicle_currentstate_name?: string,
  trip_ref_no?: string;
  work_item_ref_no?: string;
  first_name?: string;
  last_name?: string;
  trip_status_name?: string;
  vehicle_idnumber?: string;
  trip_rating?: number;
}

export interface WorkItemInDetail {
  work_item_id: number;
  workitem_queue?: WorkItemQueue,
  workitem_task?: WorkItemTask[],
  work_item_type_name: string;
  work_item_type: number;
  raised_by: number;
  raised_by_role: string;
  reported_timestamp: string;
  problem_status: number;
  problem_status_name: string;
  work_item_detail_id: number;
  vehicle_id: number;
  trip_uuid: string;
  problem_codes: string;
  problem_description?: any;
  latitude: number;
  longitude: number;
  vehicle_currentstate?: number,
  updated_on: string;
  updated_by: number;
  problem_image_url: string;
  vehicle_currentstate_name?: string,
  customer?: string;
}

export interface WorkItemTask {
  work_item_task_id?: number,
  task_name?: string,
  task_description?: any,
  create_at?: string,
  task_status_name?: string,
  task_code?: number,
  task_severity_name?: string,
  work_item?: number,
  task_status?: number,
  task_severity?: number,
}
export interface WorkItemQueue {
  work_item_queue_id?: number,
  queue_type?: number,
  created_on?: string,
  action_type?: number,
  work_item?: number,
  queue_type_name?: string,
  action_type_name?: string,
}

export interface WorkItemId {
  work_item_id?: number,
}

export interface createShiftService {
  fsq_id?: number;
  region_id?: number;
  shift_start_datetime?: Date;
  shift_end_datetime?: Date;
  created_by?: number;
  rentalpoint_id?: number;
  break_time?:number;
}
export interface editShiftService {
  fsq_id?: number;
  fsq_shift_management_id?: number;
  shift_start_datetime?: Date;
  shift_end_datetime?: Date;
  region_id?: number;
  rentalpoint_id?: number;
  break_time?:string;
}
export interface FsqShifts{
  past?: FsqShift[];
  current?: FsqShift[];
}

export interface FsqShift {
  fsq_shift_management_id?: number;
  fsq_id?: number;
  region_id?: number;
  rentalpoint_id?: number;
  rentalpoint_name?:string;
  break_time?:string;
  city_id?:number;
  city_name?:string;
  shift_start_datetime?: Date;
  shift_as?:number;
  shift_as_name?:string;
  shift_end_datetime?: Date;
  shift_status?: number;
  created_on?: Date;
  created_by?: number;
  fsq_name?: string;
  region_name?: string;
  created_by_name?: string;
  shift_status_name?: string;
  assigned_to_name?: string;
  vehicle_assignment_status?: number;
}

export interface Breakpoint {
  admn_parameters_id: number;
  parameter_key: string;
  parameter_value: string;
  parameter_desc: string;
}

export interface FSQShiftManagementId {
  fsq_shift_management_id?: number;
}

export interface ParameterKey {
  parameter_key?: string;
}
export interface Taskdetails {
  parts_id?: number;
  task_code?: number;
  task_name?: string;
  part_name?: string;
  parts_status?: number;
  parts_quantity?: number;
  parts_status_name?: string;
}
export interface Task1 {
  work_item_task_id: number;
}
export interface Task {
  work_item_task_id: number;
  task_name: string;
  task_description?: any;
  create_at: Date;
  work_item_id: number;
  task_status: number;
  task_code: number;
  task_severity: number;
  task_priority: number;
  task_status_name: string;
  priority: string;
}
export interface FsqTagedRegion {
  admn_user_id?: number;
}

export interface FsqRegionByCity {
  city_id?: number;
}

export interface Fsq {
  work_item_id: number;
  work_item_type: number;
  raised_by: number;
  raised_by_role: string;
  reported_timestamp: Date;
  assigned_to_id: number;
  assigned_on: Date;
  work_item_assignment_status: number;
  work_assignment_status_name: string;
  username: string;
  firstname?: string,
  lastname?: string,
  contact_phone?: string
}

export interface IncidentDetail {
  work_item?: WorkItem;
  tasks?: Task[];
  fsqs?: Fsq[];
  emergency_contact?: emergencyContact[];
  customer_location?: LocationItem;
  fsq_location?: LocationItem;
  reported_location?: LocationItem;
  accepted_location?: LocationItem;
}

export interface LocationItem {
  latitude: number;
  longitude: number;
}

export interface emergencyContact {
  customer_contact_id: number;
  contact_name: string;
  contact_phone: string;
  customer_id: number;
}
export interface UserActiveInactive {
  admn_user_id?: number;
  active?: boolean;
  fsq_id?:number;
}
export interface RentalPoint {
  rentalpoint_id?: number;
  rentalpoint_name?: string;
  rentalpoint_shortcode?: string;
}
export interface GetREntalPointService {
  rentalpoint_id?: number;
}
export interface vehicle {
  status?: number;
  rentalpoint_id?: number;
  vehicle_idnumber?: string;
  vehicle_id?: number;
}

export interface BookVehicleService {
  vehicle_id?: number;
  admn_user_id?: number;
  fsq_shift_management_id?: number;
  region_id?:number;
  rentalpoint_id?: number;
}
export interface ShiftDetails {
  vehicle_details?: VehicleDetail[];
  jobs?: Job[];
  region_id?: number;
  city_id?:number;
}

export interface startShiftService {
  admn_user_id?: number;
  fsq_shift_management_id?: number;
  region_id?: number;
  latitude?: number;
  longitude?: number;
  admin_flag?: number;
}

export interface PauseShiftService {
  fsq_id?: number;
  fsq_shift_management_id?: number;
  region_id?: number;
  latitude?: number;
  longitude?: number;
  admin_flag?: number;
}

export interface EndShiftService {
  fsq_id?: number;
  fsq_shift_management_id?: number;
  admin_flag?: number;
  latitude?: number;
  longitude?: number;
}
export interface FsqAllHub {
    hub_id?: number;
    hub_name?: string;
}
export interface EditHubLevel {
  admn_user_id?: number;
  hub_id?: number;
  fsq_skill_level?: number;
}
export interface Job {
  work_item_id?: number;
  fsq_id?: number;
  job_status?: number;
  job_start_time?: Date;
  job_end_time?: Date;
  trip_uuid?: string;
  job_status_name?: string;
  work_item_type?: number;
  work_item_type_name?: string;
  work_item_ref_no?: string;
}
export interface VehicleDetail {
  vehicle_id?: number;
  status?: number;
  allocated_by?: number;
  allocation_time?: Date;
  vehicle_idnumber?: string;
  status_name?: string;
  allocated_by_name?: string;
  vehicle_current_status?: number;
  vehicle_current_status_name?: string;
  rentalpoint_name?: string;
  fsq_vehicle_association_id?: number;
}
export interface AcceptJob {
  fsq_id?: number;
  latitude?: number;
  longitude?: number;
  admin_flag?: boolean;
  fsq_shift_management_id?: number;
}
export interface FsqReturnVehicleService {
  fsq_vehicle_association_id?: number;
  rentalpoint_id?: number;
  fsq_shift_management_id?: number;
}
export interface ReturnVehicleService {
  region_id?: number;
}
export interface ReturnRegion {
  region_code?: string;
  region_name?: string;
  region_id?: number;
}
export interface ReturnRP {
  rentalpoint_id?: number;
  region_id?: number;
  rentalpoint_name?: string;
  rentalpoint_shortcode?: string;
  rentalpoint_type?: number;
}
