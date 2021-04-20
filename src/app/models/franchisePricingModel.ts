import { ErrorModel } from './errorModel';
import { RegionItem } from './regionManagement';

export interface FranchisePricingMain {
    loading?: boolean;
    error?: ErrorModel;
    franchisePricingList?: FranchisePricingItem[];
    RegionList?: RegionItem[];
}  

export interface FranchisePricingItem {
    franchise_price_table_id: number;
    franchise_id: number;
    region_id: number;
    start_rentalpoint_rate: number;
    start_rentalpoint_max_cost: number;
    end_rentalpoint_rate: number;
    end_rentalpoint_max_cost: number;
    vehicle_owner_rate: number;
    vehicle_owner_max_cost: number;
    partner_name: string;
    region_name: string;
  }