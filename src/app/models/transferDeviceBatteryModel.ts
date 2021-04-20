import { ErrorModel } from './errorModel';
import { RegionItem, CityItem } from './regionManagement';
import { DomainData } from './domainModel';
import { RentalPoint } from './rentalPoint';

export interface TransferDeviceBatteryMain {
    loading?: boolean;
    error?: ErrorModel;
    regions?: RegionItem[];
    storeTypes?: DomainData[];
    cities?: CityItem[];
    itemType?: DomainData[];
    rentalPoints?: RentalPoint[];
    ItemStock?: ItemStock[];
    transferListMain?: DeployItemListMain[];
    singleItem?: getSingleRequestItem[];
}

export interface ItemStock {
    item_id?: number;
    item_make?: string;
    item_model?: string;
    commissioning_date?: Date;
    item_status?: number;
    item_status_name?: string;
    store?: string;
    store_type?: string;
    item_tag?: string;
}

export interface GetItemService{
    item_type?: number;
    city?: number;
}

export interface deployDevicebatteryRequest {
    item_type?: number;
    destination_store_type?: number;
    destination_store_id?: number;
    destination_region_id?: number;
    updated_by: number;
    items?: number[];
}
export interface DeployItemListMain {
    transfer_id?: number;
    transfer_ref_no?: string;
    updated_on?: Date;
    updated_by?: number;
    transfer_status?: number;
    destination_store_type?: number;
    destination_store_id?: number;
    destination_region_id?: number;
    item_type: string;
    store_type_name?: string;
    item_type_name?: string;
    region_name?: string;
    transfer_status_name?: string;
    destination_store_name?: string;
}
export interface GetDeployItemListService {
    active_flag?: number;
}
export interface getSingleRequestItem {
    transfer_item_id?: number;
    item_id?: number;
    transfer_id?: number;
    source_store_type?: number;
    source_store_id?: number;
    source_region_id?: number;
    status?: any;
    source_region_name?: string;
    source_store_type_name?: string;
    source_store_name?: string;
    item_make?: string;
    item_model?: string;
    commissioning_date?: Date;
    item_status?: number;
    item_status_name?: string;
}

export interface SingleRequest {
    transfer_id?: number;
}

export interface multiTransferService {
    transfer_id?: number;
    action_type?: number;
    updated_by?: number;
    active_flag?: number;
}