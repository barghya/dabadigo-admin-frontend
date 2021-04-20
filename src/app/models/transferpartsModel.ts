import { ErrorModel } from './errorModel';
import { RegionItem, CityItem } from './regionManagement';
import { PartsStockItem, PartsMasterItem } from './asset-inventoryModel';
import { DomainData } from './domainModel';
import { RentalPoint } from './rentalPoint';
import { FSQDetails, FSQHubDetails } from './fsqhubModel';

export interface TransferPartsMain {
    loading?: boolean;
    error?: ErrorModel;
    partsTransferList?: PartsTransferItem[];
    regions?: RegionItem[];
    partsMasters?: PartsMasterItem[];
    partsStocks?: PartsStockItem[];
    storeTypes?: DomainData[];
    rentalPoints?: RentalPoint[];
    partsStatuses?: DomainData[];
    fsqList?: FSQDetails[];
    fsqHubs?: FSQHubDetails[];
    cities?: CityItem[];
}

export interface TransferRequestLoadPayload {
    past_flag?: boolean;
}

export interface TransferRequestCreatePayload {
    parts_master_id?: number;
    source_region_id?: number;
    source_store_type?: number;
    source_store_id?: number;
    source_part_status?: number;
    destination_region_id?: number;
    destination_store_type?: number;
    destination_store_id?: number;
    destination_part_status?: number;
    quantity?: number;
    admn_user_id?: number;
}

export interface TransferRequestActionPayload {
    parts_transfer_id?: number;
    admn_user_id?: number;
    past_flag?: boolean;
}

export interface PartsTransferItem {
    parts_transfer_id?: number;
    parts_transfer_ref?: string;
    parts_master_id?: number;
    part_name?: string,
    part_short_code?: string;
    source_region_id?: number;
    source_region?: string;
    source_store_type?: number;
    source_store_type_name?: string;
    source_store_id?: number;
    source_store_name?: string;
    destination_region_id?: number;
    destination_region?: string;
    destination_store_type?: number;
    destination_store_type_name?: string;
    destination_store_id?: number;
    destination_store_name?: string;
    updated_on?: string;
    updated_by?: number;
    updated_by_name?: string;
    source_part_status?: number;
    source_part_status_name?: string;
    destination_part_status?: number;
    destination_part_status_name?: string;
    transfer_status?: number;
    transfer_status_name?: string;
    quantity?: number;
}