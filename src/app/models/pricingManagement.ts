import { ErrorModel } from './errorModel';
import { RegionItem } from './regionManagement';
import { DomainData } from './domainModel';
import { CorporateManagement } from './corporateManagement';

export interface PricingManagementMain {
    loading?: boolean;
    error?: ErrorModel;
    PricingList?: PricingItem[];
    RegionList?: RegionItem[];
    VehicleTypesList?: DomainData[];
    SinglePricing?: PricingItem;
    SinglebatteryswapPricing?: BatteryswapPricingItem;
    PricingTypeList?: DomainData[];
    BatterySwapPricingList?:BatteryswapPricingItem[];
    corporate?: CorporateManagement[],
}
export interface BatteryswapPricingItem{
    batteryswap_price_table_id?: number;
    display_name?: string;
    vehicle_type?: number;
    price_table_type?: number;
    region?: number;
    admn_partner_id?: number;
    status?: number;
    no_of_initial_swap?: number;
    initial_swap_price?: number;
    consecutive_swap_price?: number;
    region_name?: string;
    vehicle_type_name?: string;
    price_table_type_name?: string;
    admn_partner_name?: string;
}

// export interface PricingItem{
//     pricingItem1?:PricingItem1[];
//     pricingItem2?:PricingItem2[];
// }
// export interface PricingItem2{

// }


export interface PricingItem {
    price_table_id?: number;
    display_name?: string;
    tier?: number;
    tier_min_value?: number;
    tier_max_value?: number;
    per_minute_unit?: number;
    cost?: number;
    temp_cost?: number;
    min_amount?: number;
    vehicle_unlocked_cost?: number;
    vehicle_type?: number;
    region?: number;
    region_name?: string;
    vehicle_type_name?: string;
    price_table_type?: number;
    admn_partner_id?: number;
    admn_partner_name?: string;
}
