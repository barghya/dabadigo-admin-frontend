import { assetInventoryAdmin } from 'src/app/models/asset-inventoryModel';
import { AssetInventoryAction, AssetInventoryActionTypes } from '../actions/asset_inventory.action';

const initialState: assetInventoryAdmin = {
    error: undefined,
    loading: false,
    Assetinventory: [],
    Accessory: [],
    Countries: [],
    vehicle_parts_state: [],
    singleBattery: undefined,
    Battery: [],
    batteryTransactions: [],
    deviceTransactions: [],
    battery_state: [],
    Assets: [],
    Parts: [],
    singlePart: undefined,
    Vehicle_Types: [],
    Ownership_Types: [],
    Vehicle_Status: [],
    availableBatteries: [],
    availableDevices: [],
    availableParts: [],
    assetDetail: undefined,
    partsMasterList: [],
    singlePartsMaster: undefined,
    partsStockList: undefined,
    partsTransactionsList: undefined,
    fsqHubs: [],
    fsqList: [],
    regions: [],
    storeTypes: [],
    rentalPoints: [],
    partsStatuses: [],
    partsDefinitions: [],
    city: [],
    Region: [],
    countries: [],
    States: [],
    cities: [],
    singleFsq: undefined,
    franchise: [],
    deviceModels: []
}
export function AssetInventoryReducer(state: assetInventoryAdmin = initialState, action: AssetInventoryAction) {
    switch (action.type) {
        case AssetInventoryActionTypes.Accessories_List_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Accessories_List_Load_Success:
            return { ...state, loading: false, Accessory: action.payload };
        case AssetInventoryActionTypes.Accesssories_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        // Asset
        case AssetInventoryActionTypes.Asset_List_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Asset_List_Load_Success:
            return { ...state, loading: false, Assets: action.payload[0], Ownership_Types: action.payload[1]};
        case AssetInventoryActionTypes.Asset_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Add_Asset_Load:
            return { ...state, loading: true, availableBatteries: undefined, availableDevices: undefined, availableParts: undefined }
        case AssetInventoryActionTypes.Add_Asset_Load_Success:
            return { ...state, loading: false, Vehicle_Types: action.payload[0], Vehicle_Status: action.payload[1], availableBatteries: action.payload[2], availableDevices: action.payload[3], availableParts: action.payload[4], Ownership_Types: action.payload[5], Region: action.payload[6], countries: action.payload[7], States: action.payload[8], cities: action.payload[9]}
        case AssetInventoryActionTypes.Add_Asset_Load_Failure:
            return { ...state, loading: false }


        case AssetInventoryActionTypes.Add_Asset:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Add_Asset_Success:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Add_Asset_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Add_Another_Asset:
            return { ...state, loading: true };

        case AssetInventoryActionTypes.Edit_Asset_Load:
            return { ...state, loading: true, availableBatteries: undefined, availableDevices: undefined, availableParts: undefined, singleAsset: undefined };
        case AssetInventoryActionTypes.Edit_Asset_Load_Success:
            return { ...state, loading: false, Vehicle_Types: action.payload[0], Vehicle_Status: action.payload[1], availableBatteries: action.payload[2], availableDevices: action.payload[3], availableParts: action.payload[4], singleAsset: action.payload[5], Ownership_Types: action.payload[6], Region: action.payload[7], countries: action.payload[8], States: action.payload[9], cities: action.payload[10] };
        case AssetInventoryActionTypes.Edit_Asset_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Edit_Asset:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Asset_Success:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Edit_Asset_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Asset_Detail_Load:
            return { ...state, loading: true, assetDetail: undefined };
        case AssetInventoryActionTypes.Asset_Detail_Load_Success:
            return { ...state, loading: false, assetDetail: action.payload };
        case AssetInventoryActionTypes.Asset_Detail_Load_Failure:
            return { ...state, loading: false };
        // Device
        case AssetInventoryActionTypes.Device_List_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Device_List_Load_Success:
            return { ...state, loading: false, Admindevice: action.payload };
        case AssetInventoryActionTypes.Device_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Add_Device_Create:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Add_Device_Create_Success:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Add_Device_Create_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Add_Another_Device_Create:
            return { ...state, loading: true };

        case AssetInventoryActionTypes.Edit_Device_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Device_Success_Action:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Edit_Device_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Edit_Device_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Device_Success_Load:
            return { ...state, loading: false, device_status: action.payload[0], Countries: action.payload[1], singleDevice: action.payload[2], regions: action.payload[3], cities: action.payload[4],
                deviceModels: action.payload[5] };
        case AssetInventoryActionTypes.Edit_Device_Failure_Load:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Add_Device_Load_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Add_Device_Load_Success_Action:
            return { ...state, loading: false, device_status: action.payload[0], Countries: action.payload[1],regions: action.payload[2], cities: action.payload[3],
                deviceModels: action.payload[4] }
        case AssetInventoryActionTypes.Add_Device_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Delete_Device_Action:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Delete_Device_Action_Failure:
            return { ...state, loading: false, error: action.payload };

        //Get Device Transaction
        case AssetInventoryActionTypes.Get_Device_Transactions_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Get_Device_Transactions_Success_Action:
            return { ...state, loading: false, deviceTransactions: action.payload };
        case AssetInventoryActionTypes.Get_Device_Transactions_Failure_Action:
            return { ...state, loading: false, error: action.payload }; 

        //Battery Reducer

        case AssetInventoryActionTypes.Edit_Battery_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Battery_Load_Success:
            return { ...state, loading: false, Countries: action.payload[0], battery_state: action.payload[1], singleBattery: action.payload[2], regions: action.payload[3], cities: action.payload[4] };
        case AssetInventoryActionTypes.Edit_Battery_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Edit_Battery_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Battery_Success_Action:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Edit_Battery_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Create_Battery:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Create_Battery_Success:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Create_Battery_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Add_Another_Battery_Create:
            return { ...state, loading: true };

        case AssetInventoryActionTypes.Battery_List_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Battery_List_Load_Success:
            return { ...state, loading: false, Battery: action.payload };
        case AssetInventoryActionTypes.Battery_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Delete_Battery:
            return { ...state };
        case AssetInventoryActionTypes.Delete_Battery_Failure:
            return { ...state, loading: false, error: action.payload };

        //Get battery Transaction
        case AssetInventoryActionTypes.Get_Battery_Transactions_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Get_Battery_Transactions_Success_Action:
            return { ...state, loading: false, batteryTransactions: action.payload };
        case AssetInventoryActionTypes.Get_Battery_Transactions_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        //Part Reducer
        case AssetInventoryActionTypes.Part_List_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Part_List_Load_Success:
            return { ...state, loading: false, Parts: action.payload };
        case AssetInventoryActionTypes.Part_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Part_Load_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Part_Load_Success_Action:
            return { ...state, loading: false, Countries: action.payload[0], vehicle_parts_state: action.payload[1] }
        case AssetInventoryActionTypes.Part_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Part_Create_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Part_Create_Success_Action:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Part_Create_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Add_Another_Part_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Part_Load_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Part_Load_Success_Action:
            return { ...state, loading: false, vehicle_parts_state: action.payload[0], Countries: action.payload[1], singlePart: action.payload[2] };
        case AssetInventoryActionTypes.Edit_Part_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Edit_Part_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Edit_Part_Success_Action:
            return { ...state, loading: false };
        case AssetInventoryActionTypes.Edit_Part_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Delete_Part:
            return { ...state };
        case AssetInventoryActionTypes.Delete_Part_Failure:
            return { ...state, error: action.payload };
        case AssetInventoryActionTypes.Battery_Load_Action:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Battery_Load_Success_Action:
            return { ...state, loading: false, Countries: action.payload[0], battery_state: action.payload[1],regions: action.payload[2], cities: action.payload[3]}
        case AssetInventoryActionTypes.Battery_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        //Parts Master Section
        case AssetInventoryActionTypes.Parts_Master_Load:
            return {...state, loading: true }
        case AssetInventoryActionTypes.Parts_Master_Load_Success:
            return {...state, loading: false, partsMasterList: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Load_Failure:
            return {...state, loading: false, error: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Create_Load:
            return {...state, loading: true }
        case AssetInventoryActionTypes.Parts_Master_Create_Load_Success:
            return {...state, loading: false, Countries: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Create_Load_Failure:
            return {...state, loading: false, error: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Create:
            return {...state, loading: true }
        case AssetInventoryActionTypes.Parts_Master_Create_Success:
            return {...state, loading: false }
        case AssetInventoryActionTypes.Parts_Master_Create_Failure:
            return {...state, loading: false, error: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Update_Load:
            return {...state, loading: true, singlePartsMaster: undefined }
        case AssetInventoryActionTypes.Parts_Master_Update_Load_Success:
            return {...state, loading: false, Countries: action.payload[0], singlePartsMaster: action.payload[1] }
        case AssetInventoryActionTypes.Parts_Master_Update_Load_Failure:
            return {...state, loading: false, error: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Update:
            return {...state, loading: true }
        case AssetInventoryActionTypes.Parts_Master_Update_Success:
            return {...state, loading: false, singlePartsMaster: undefined }
        case AssetInventoryActionTypes.Parts_Master_Update_Failure:
            return {...state, loading: false, error: action.payload }
        case AssetInventoryActionTypes.Parts_Master_Delete:
            return {...state, loading: true }
        case AssetInventoryActionTypes.Parts_Master_Delete_Success:
            return {...state, loading: false }
        case AssetInventoryActionTypes.Parts_Master_Delete_Failure:
            return {...state, loading: false, error: action.payload }

        //Parts Stock Section
        case AssetInventoryActionTypes.Parts_Stock_Load:
            return {...state, loading: true, partsStockList: undefined };
        case AssetInventoryActionTypes.Parts_Stock_Load_Success:
            return {...state, loading: false, partsStockList: action.payload };
        case AssetInventoryActionTypes.Parts_Stock_Load_Failure:
            return {...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Parts_Stock_Add_Load:
            return {...state, loading: true, partsMasterList: undefined };
        case AssetInventoryActionTypes.Parts_Stock_Add_Load_Success:
            return {...state, loading: false, partsMasterList: action.payload[0], 
                regions: action.payload[1], storeTypes: action.payload[2], 
                partsStatuses: action.payload[3], city: action.payload[4] };
        case AssetInventoryActionTypes.Parts_Stock_Add_Load_Failure:
            return {...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Parts_Stock_Add:
            return {...state, loading: true };
        case AssetInventoryActionTypes.Parts_Stock_Add_Success:
            return {...state, loading: false };
        case AssetInventoryActionTypes.Parts_Stock_Add_Failure:
            return {...state, loading: false, error: action.payload };

        //Parts Transactions
        case AssetInventoryActionTypes.Parts_Transactions_Load:
            return {...state, loading: true, partsTransactionsList: undefined };
        case AssetInventoryActionTypes.Parts_Transactions_Load_Success:
            return {...state, loading: false, partsTransactionsList: action.payload };
        case AssetInventoryActionTypes.Parts_Transactions_Load_Failure:
            return {...state, loading: false, error: action.payload };

        case AssetInventoryActionTypes.Parts_Rentalpoint_Load:
            return {...state, loading: true };
        case AssetInventoryActionTypes.Parts_Rentalpoint_Load_Success:
            return {...state, loading: false, rentalPoints: action.payload };
        case AssetInventoryActionTypes.Parts_Rentalpoint_Load_Failure:
            return {...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Parts_Fsq_Load:
            return {...state, loading: true };
        case AssetInventoryActionTypes.Parts_Fsq_Load_Success:
            return {...state, loading: false, fsqList: action.payload };
        case AssetInventoryActionTypes.Parts_Fsq_Load_Failure:
            return {...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Parts_Fsq_Load_ById:
            return {...state, loading: true, singleFsq: undefined };
        case AssetInventoryActionTypes.Parts_Fsq_Load_ById_Success:
            return {...state, loading: false, singleFsq: action.payload };
        case AssetInventoryActionTypes.Parts_Fsq_Load_ById_Failure:
            return {...state, loading: false, error: action.payload };

        //Parts Types Load
        case AssetInventoryActionTypes.Vehicle_Types_Load:
            return {...state, loading: true, partsDefinitions: [] };
        case AssetInventoryActionTypes.Vehicle_Types_Load_Success:
            return {...state, loading: false, Vehicle_Types: action.payload[0], partsMasterList: action.payload[1] };
        case AssetInventoryActionTypes.Vehicle_Types_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case AssetInventoryActionTypes.Parts_Definition_Load:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Parts_Definition_Load_Success:
            return { ...state, loading: false, partsDefinitions: action.payload };
        case AssetInventoryActionTypes.Parts_Definition_Load_Failure:
            return { ...state, loading: false, error: action.payload }; 
        case AssetInventoryActionTypes.Parts_Definition_Update:
            return { ...state, loading: true };
        case AssetInventoryActionTypes.Parts_Definition_Update_Success:
            return { ...state, loading: false, partsDefinitions: [] };
        case AssetInventoryActionTypes.Parts_Definition_Update_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}