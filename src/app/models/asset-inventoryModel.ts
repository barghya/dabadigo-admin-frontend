import { ErrorModel } from './errorModel';
import { DomainData } from './domainModel';
import { RentalPoint, AvailableFranchise } from './rentalPoint';
import { RegionItem, CityItem, states } from './regionManagement';
import { FSQDetails } from './fsqManagement';
import { FSQHubDetails } from './fsqhubModel';
import { regionId, region } from './userManagement';

export interface assetInventory {

    Accessory?: accessory[];
    loading?: boolean;
    error?: ErrorModel;
    Battery?: battery;
}

export interface accessory {
    accessories?: string;
    code?: string;
    location?: string;
    status?: string;
    action?: string;
}

export interface battery {
    vehicle_battery_id?: number;
    battery_tag?: string;
    battery_make?: string;
    battery_model?: string;
    country_of_origin?: string;
    country_of_origin_name?: string;
    battery_power?: string;
    battery_manufacturing_date?: Date;
    commissioning_date?: Date;
    warranty_period?: string;
    battery_status?: number;
    battery_state?: string;
    updated_on?: Date;
    city?: number;
    region?: number;
    assignment_status?: number;
    city_name?: string;
    region_name?: string;
    assignment_name?: string;
    store_type?: string;
    store_name?: string;
}

export interface BatteryTransactions {
    battery_make: string;
    battery_model: string;
    battery_tag: string;
    effective_end_date?: any;
    effective_start_date: string;
    item_id: number;
    item_type: number;
    status: number;
    stock_id: number;
    stock_status_name: string;
    store_id: number;
    store_name: string;
    store_type: number;
    store_type_name: string;
}

export interface DeviceTransactions {
    stock_id: number;
    item_type: number;
    item_id: number;
    store_type: number;
    store_id: number;
    status: number;
    effective_start_date: string;
    effective_end_date?: any;
    store_name: string;
    store_type_name: string;
    device_make: string;
    device_model: string;
    device_name: string;
    stock_status_name: string;
}

export interface batteryID {
    vehicle_battery_id?: number;
}

export interface device {
    device_name?: string;
    device_make?: string;
    device_model?: string;
    device_imei?: number;
}

export interface parts {
    part_code?: string;
    vehicle_part_id?: number;
    part_name?: string;
    part_manufacturer?: string;
    part_source_country?: string;
    part_image?: string;
    part_price?: number;
    status?: number;
    vehicle_part_state?: string;
    warranty_period?: string;
    manufacturing_date?: Date;
    commissioning_date?: Date;
    last_updated_on?: Date;
}

export interface AddParts {
    part_code?: string;
    part_name?: string;
    part_manufacturer?: string;
    part_source_country?: string;
    part_price?: number;
    status?: number;
    warranty_period?: string;
    manufacturing_date?: Date;
    commissioning_date?: Date;
}
export interface NavLinks {
    label: string;
    link: string;
}

export interface assetInventoryAdmin {
    Assetinventory?: assetInventory[];
    Assets?: Assets[];
    loading?: boolean;
    error?: ErrorModel
    Accessory?: accessory[];
    singleBattery?: battery;
    Battery?: battery[];
    batteryTransactions?: BatteryTransactions[];
    Device?: device[];
    Admindevice?: adminDevice[];
    deviceTransactions?: DeviceTransactions[];
    BatteryID?: battery;
    singleDevice?: adminDevice;
    Parts?: parts[];
    device_status?: DomainData[];
    Countries?: countries[];
    vehicle_parts_state?: DomainData[];
    singlePart?: parts;
    battery_state?: DomainData[];
    Vehicle_Types?: DomainData[];
    Ownership_Types?: DomainData[];
    Vehicle_Status?: DomainData[];
    singleAsset?: AddAsset;
    assetDetail?: VehicleInDetail;
    availableDevices?: adminDevice[];
    availableParts?: parts[];
    availableBatteries?: battery[];
    partsMasterList?: PartsMasterItem[];
    singlePartsMaster?: PartsMasterItem;
    partsStockList?: PartsStockItem[];
    partsTransactionsList?: PartsTransactionsItem[];
    regions?: RegionItem[];
    storeTypes?: DomainData[];
    rentalPoints?: RentalPoint[];
    partsStatuses?: DomainData[];
    fsqList?: FSQDetails[];
    singleFsq?: FSQDetails;
    city?: CityItem[];
    fsqHubs?: FSQHubDetails[];
    partsDefinitions?: PartsDefinitionItem[];
    Region?: region[];
    countries?: countries[];
    States?: states[];
    cities: CityItem[];
    franchise?: AvailableFranchise[];
    deviceModels?: DomainData[];
}

export interface assetInventoryUser {
    vehicle_asset_id?: number;
    asset_name?: string;
    asset_imei?: string;
    status?: number;
    current_state_name?: string;

}


export interface deviceStatus {
    domain_type?: string;
}


export interface adminDevice {
    device_id?: number;
    device_make?: string;
    device_model?: number;
    device_model_name?: string;
    device_code?: string;
    country_of_origin?: string;
    country_of_origin_name?: string;
    manufacturing_date?: Date;
    commissioning_date?: Date;
    device_imei?: string;
    device_name?: string;
    device_status?: number;
    last_updated_on?: Date;
    device_status_name?: string;
    city?: number;
    region?: number;
    city_name?: string;
    region_name?: string;
}

export interface addDevice {
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
    city?: number;
    region?: number;
}
export interface editAsset {
    vehicle_id?: number;
}
export interface editAssetLoad {
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
    franchise_id?: number;
    ownership_type?: number;
    batterydetails?: battery[];
    devicedetails?: adminDevice[];
    partsdetails?: parts[];
    last_updated_on?: Date;
    insurance_no?: string;
    insurance_career?: string;
    insurance_upto?: Date;
}
export interface editDevice {
    device_id?: number;
}
export interface Assets {
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
export interface AddAsset {
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
    country_id?: number;
    state_id?: number;
    city_id?: number;
    franchise_id?: number;
    region_id?:regionId[];
    batterydetails?: batteryID[];
    devicedetails?: deviceId[];
    partsdetails?: partID[];
    insurance_no?: string;
    insurance_career?: string;
    insurance_upto?: Date;
}

export interface assetType {
    domain_type?: string;
}

export interface countries {
    countries_id?: number;
    countries_name?: string;
    countries_code?: string;
}


export interface deviceId {
    device_id?: number;
}

export interface partID {
    vehicle_part_id?: number;
}

export interface assetID {
    vehicle_idnumber?: number;
}

export interface VehicleInDetail {
    vehicle_id?: number;
    vehicle_type?: number;
    vehicle_type_name?: string;
    vehicledetail_id?: number;
    manufacturer?: string;
    model?: string;
    manufacture_date?: Date;
    warranty_expiry?: Date;
    warranty_terms?: string;
    vehicle_status?: number;
    vehicle_status_name?: string;
    qrcode?: string;
    vehicle_idnumber?: string;
    vehicle_current_status?: number;
    vehicle_current_status_name?: string;
    vehicle_problem_body?: ProblemItem[];
    status?: number;
    locked_at?: Date;
    rentalpoint_id?: number;
    updated_at?: Date;
    rentalpoint_name?: string;
    vehicle_distance_travelled?: string;
    chassis_number?: string;
    city_name?: string;
    countries_name?: string;
    states_name?: string;
    region_name?: string;
    ownership_type_name?: string;
    batterydetails?: Batterydetail[];
    devicedetails?: Devicedetail[];
    partsdetails?: Partsdetail[];
    trip_info?: TripInfo[];
    work_item_details?: WorkItemDetails[];
    locations?: Location[];
    insurance_no?: string;
    insurance_career?: string;
    insurance_upto?: Date;
    deployed_on?: Date;
    franchise_name?: string;
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

export interface Partsdetail {
    parts_assoc_id?: number;
    parts_id?: number;
    vehicle_id?: number;
    commissioning_date?: string;
    last_updated_on?: string;
    manufacturing_date?: string;
    part_code?: string;
    part_image?: any;
    part_manufacturer?: string;
    part_name?: string;
    part_price?: number;
    part_source_country?: string;
    part_source_country_name?: string;
    status?: number;
    status_name?: string;
    warranty_period?: string;
}

export interface TripInfo {
    customer_trip_association_id?: number
    trip_uuid?: string;
    riding_time?: number;
    pause_time?: number;
    total_trip_time?: number;
    total_payable?: number;
    trip_status?: number;
    paid_amount?: number;
    franchise_shared_amount?: number;
    booking_time?: Date;
    end_time?: Date;
    start_location?: number;
    end_location?: number;
    distance_travelled?: number;
    customer_id?: number;
    vehicle_id?: number;
    corporate_enabled?: number;
    coupon_code?: string;
    rental_plan?: number
    trip_ref_no?: string;
    ontrip_start_time?: Date;
    customer_name?: string;
    trip_status_name?: string;
    start_location_name?: string;
    end_location_name?: string;
    deployed_on?: Date;
}

export interface WorkItemDetails {
    work_item_id?: number;
    work_item_type?: number;
    raised_by?: number;
    raised_by_role?: string;
    reported_timestamp?: Date;
    work_item_detail_id?: number
    vehicle_id?: number;
    trip_uuid?: string;
    problem_codes?: string;
    problem_description?: string;
    problem_status?: number
    updated_by?: number
    updated_on?: Date;
    problem_image_url?: string;
    vehicle_currentstate?: number;
    work_item_ref_no?: string;
    work_item_priority?: number;
    workitem_assignment_id?: number;
    assigned_to_id?: number;
    assigned_on?: Date;
    work_item_queue_id?: number;
    queue_type?: number;
    created_on?: Date;
    action_type?: number;
    reported_location_latitude?: number;
    reported_location_longitude?: number;
    vehicle_currentstate_name?: string;
    queue_type_name?: string;
    action_type_name?: string;
    assigned_to_name?: string;
    raised_by_name?: string;
    problem_status_name?: string;
}

export interface Devicedetail {
    device_assoc_id?: number;
    device_id?: number;
    vehicle_id?: number;
    device_code?: string;
    commissioning_date?: string;
    country_of_origin?: string;
    country_of_origin_name?: string;
    device_imei?: string;
    device_make?: string;
    device_model?: string;
    device_name?: string;
    device_status?: number;
    device_status_name?: string;
    last_updated_on?: string;
    manufacturing_date?: string;
}

export interface Batterydetail {
    battery_association_id?: number;
    battery_id?: number;
    vehicle_id?: number;
    battery_make?: string;
    battery_manufacturing_date?: string;
    battery_model?: string;
    battery_power?: string;
    battery_status?: number;
    battery_status_name?: string;
    battery_tag?: string;
    commissioning_date?: string;
    country_of_origin?: string;
    country_of_origin_name?: string;
    updated_on?: string;
    warranty_period?: string;
}

export interface ProblemItem {
    problem_codes_id?: number;
    problem_code?: number;
    display_desc?: string;
    severity?: number;
    severity_name?: string;
}

export interface PartsMasterItem {
    parts_master_id?: number;
    part_name?: string;
    part_short_code?: string;
    part_tag?: string;
    part_manufacturer?: string;
    part_source_country?: string;
    part_source_country_name?: string;
    part_price?: number;
    in_stock?: number;
    damaged?: number;
    in_use?: number;
    scrap?: number;
}

export interface PartsStockItem {
    parts_master_id?: number;
    part_name?: string;
    part_short_code?: string;
    region_id?: number;
    region_name?: string;
    store_type?: number;
    store_type_name?: string;
    store_id?: number;
    store_name?: string;
    quantity?: number;
    status?: number;
    status_name?: string;
}

export interface PartsTransactionsFilter {
    parts_master_id?: number;
    region_id?: number;
    store_type?: number;
    store_id?: number;
    status?: number;
}

export interface PartsTransactionsItem {
    parts_master_id?: number;
    part_name?: string;
    part_short_code?: string;
    region_id?: number;
    region_name?: string;
    store_type?: number;
    store_type_name?: string;
    store_id?: number;
    store_name?: string;
    quantity?: number;
    status?: number;
    status_name?: string;
    txn_date?: string;
    txn_reference?: string;
    parts_stock_id?: number;
    created_by?: number;
    created_by_name?: string;
}

export interface AddPartsStockPayload {
    parts_master_id?: number,
    region_id?: number,
    store_type?: number,
    store_id?: number,
    quantity?: number,
    status?: number,
    admn_user_id?: number,
    txn_reference?: string,
}

export interface PartsDefinitionLoadPayload {
    vehicle_type_id?: number;
}

export interface PartsDefinitionItem {
    vehicle_parts_definition_id?: number;
    vehicle_type_id?: number;
    vehicle_type?: string;
    parts_master_id?: number;
    part_name?: string;
    part_short_code?: string;
    count?: number;
}

export interface PartsDefinitionUpdatePayload {
    vehicle_type_id?: number;
    parts_definitions?: PartsDefinitionItem[];
}

export interface getAssetDetails {
    vehicle_id?: number;
    admn_user_id?: number;
}