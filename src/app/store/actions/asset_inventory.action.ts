import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { assetInventory, device, battery, editDevice, Assets, batteryID, deviceStatus, deviceId, parts, AddParts, partID, AddAsset, editAsset, editAssetLoad, assetID, PartsMasterItem, PartsStockItem, PartsTransactionsFilter, PartsTransactionsItem, AddPartsStockPayload, PartsDefinitionLoadPayload, PartsDefinitionItem, PartsDefinitionUpdatePayload, getAssetDetails } from 'src/app/models/asset-inventoryModel';
import { addDevice } from 'src/app/models/asset-inventoryModel';
import { accessory } from 'src/app/models/asset-inventoryModel';
import { adminDevice } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { FSQDetails } from 'src/app/models/fsqManagement';

export enum AssetInventoryActionTypes {
    Accessories_List_Load = "[USER] Accessories List Load",
    Accessories_List_Load_Success = "[USER] Accessories List Load Success",
    Accesssories_List_Load_Failure = "[USER] Accessoriesd List Load Failure",
    //Battery
    Battery_List_Load = "[USER] Battery List Load",
    Battery_List_Load_Success = "[USER] Battery List Load Success",
    Battery_List_Load_Failure = "[USER] Battery List Failure",
    Create_Battery = "[ASSET] Create Battery Load",
    Create_Battery_Success = "[ASSET] Create Battery Load Success",
    Create_Battery_Failure = "[ASSET] Create Battery Load Failure",
    Edit_Battery_Action = "[ASSET] Edit Battery Action",
    Edit_Battery_Success_Action = "[ASSET] Edit Battery Success Action",
    Edit_Battery_Failure_Action = "[ASSET] Edit Battery Failure Action",
    Add_Another_Battery_Create = "[ASSET] Add Another Battery Create",
    Edit_Battery_Load = "[ASSET] Edit Battery Create",
    Edit_Battery_Load_Success = "[ASSET] Edit Battery Load Success",
    Edit_Battery_Load_Failure = "[ASSET] Edit Battery Load Failure",
    Battery_Load_Action = "[ASSET] Battery Load",
    Battery_Load_Success_Action = "[ASSET] Battery Load Success",
    Battery_Load_Failure_Action = "[ASSET] Battery Load Failure",
    Delete_Battery = "[ASSET] Delete Battery Action",
    Delete_Battery_Failure = "[ASSET] Delete battery Failure Action",
    //Get battery transaction
    Get_Battery_Transactions_Action = "[ASSET] Get Battery Transactions Action",
    Get_Battery_Transactions_Success_Action = "[ASSET] Get Battery Transactions Success Action",
    Get_Battery_Transactions_Failure_Action = "[ASSET] Get Battery Transactions Failure Action",
    //Asset
    Add_Asset_List_Load = "[ASSET] Add_Asset_List_Load",
    Add_Asset_List_Load_Success = "[ASSET] Add_Asset_List_Load_Success",
    Add_Asset_List_Load_Failure = "[ASSET] Add_Asset_List_Load_Failure",
    Add_Asset = "[ASSET] Add_Asset_Action",
    Add_Asset_Success = "[ASSET] Add_Asset_Success_Action",
    Add_Asset_Failure = "[ASSET] Add_Asset_Failure_Action",
    Asset_List_Load = "[ASSET] Asset_List_Load",
    Asset_List_Load_Success = "[ASSET] Asset_List_Load_Success",
    Asset_List_Load_Failure = "[ASSET] Asset_List_Load_Failure",
    Add_Another_Asset = "[ASSET] Add_Another_Asset",
    Edit_Asset_Load = "[ASSET] Edit_Asset_List_Load",
    Edit_Asset_Load_Success = "[ASSET] Edit_Asset_List_Load_Success",
    Edit_Asset_Load_Failure = "[ASSET] Edit_Asset_List_Load_Failure",
    Edit_Asset = "[ASSET] Edit_Asset_Action",
    Edit_Asset_Success = "[ASSET] Edit_Asset_Success_Action",
    Edit_Asset_Failure = "[ASSET] Edit_Asset_Failure_Action",
    Asset_Detail_Load = "[ASSET] Asset Detail Load",
    Asset_Detail_Load_Success = "[ASSET] Asset Detail Load Success",
    Asset_Detail_Load_Failure = "[ASSET] Asset Detail Load Failure",
    //Device
    Add_Device_Load_Action = "[ASSET] Add_Device_Load_Action",
    Add_Device_Load_Success_Action = "[ASSET] Add_Device_Load_Success_Action",
    Add_Device_Load_Failure_Action = "[ASSET] Add_Device_Load_Failure_Action",
    Delete_Device_Action = "[ASSET] Delete_Device_Action",
    Delete_Device_Action_Failure = "[ASSET] Delete_Device_Action_Failure",
    Add_Asset_Load = "[ASSET] Add_Asset_List_Load",
    Add_Asset_Load_Success = "[ASSET] Add_Asset_List_Load_Success",
    Add_Asset_Load_Failure = "[ASSET] Add_Asset_List_Load_Failure",
    Device_List_Load = "[ASSET] Device_List_Load",
    Device_List_Load_Success = "[ASSET] Device_List_Load_Success",
    Device_List_Load_Failure = "[ASSET] Device_List_Load_Failure",
    Add_Device_Create = "[ASSET] Add_Device_Create",
    Add_Device_Create_Success = "[ASSET] Add_Device_Create_Success",
    Add_Device_Create_Failure = "[ASSET] Add_Device_Create_Failure",
    Add_Another_Device_Create = "[ASSET] Add_Another_Device_Create",
    Edit_Device_Action = "[ASSET] Edit_Device_Action",
    Edit_Device_Success_Action = "[ASSET] Edit_Device_Success_Action",
    Edit_Device_Failure_Action = "[ASSET] Edit_Device_Failure_Action",
    Edit_Device_Load = "Edit_Device_Load",
    Edit_Device_Success_Load = "Edit_Device_Success_Load",
    Edit_Device_Failure_Load = "Edit_Device_Failure_Load",
    //Get Device transaction
    Get_Device_Transactions_Action = "[ASSET] Get Device Transactions Action",
    Get_Device_Transactions_Success_Action = "[ASSET] Get Device Transactions Success Action",
    Get_Device_Transactions_Failure_Action = "[ASSET] Get Device Transactions Failure Action",
    //Parts
    Part_List_Load = "[ASSET] Part List Load",
    Part_List_Load_Success = "[ASSET] Part List Load Success",
    Part_List_Load_Failure = "[ASSET] Part Liast Load Failure",
    Part_Load_Action = "[ASSET] Part Load",
    Part_Load_Success_Action = "[ASSET] Part Load Success",
    Part_Load_Failure_Action = "[ASSET] Part Load Failure",
    Part_Create_Action = "[ASSET] Part Create",
    Part_Create_Success_Action = "[ASSET] Part Create Success",
    Part_Create_Failure_Action = "[ASSET] Part Create Failure",
    Add_Another_Part_Action = "[ASSET] Add Another Part Create",
    Edit_Part_Load_Action = "[ASSET] Edit Part Load",
    Edit_Part_Load_Success_Action = "[ASSET] Edit Part Load Success",
    Edit_Part_Load_Failure_Action = "[ASSET] Edit Part Load Failure",
    Edit_Part_Action = "[ASSET] Edit Part Action",
    Edit_Part_Success_Action = "[ASSET] Edit Part Success Action",
    Edit_Part_Failure_Action = "[ASSET] Edit Part Failure Action",
    Delete_Part = "[ASSET] Delete Part",
    Delete_Part_Failure = "[ASSET] Delete Part Failure",
    //Countries
    // Countries_List_Load = "[ASSET] Countries List Load Action",
    // Countries_List_Load_Success = "[ASSET] Countries List Load Success Action",
    // Countries_List_Load_Failure = "[ASSET] Countries List Load Failure Action",

    //Parts Master
    Parts_Master_Load = "[ASSET] Parts Master Load Action",
    Parts_Master_Load_Success = "[ASSET] Parts Master Load Success Action",
    Parts_Master_Load_Failure = "[ASSET] Parts Master Load Failure Action",

    Parts_Master_Create_Load = "[ASSET] Parts Master Create Load Action",
    Parts_Master_Create_Load_Success = "[ASSET] Parts Master Create Load Success Action",
    Parts_Master_Create_Load_Failure = "[ASSET] Parts Master Create Load Failure Action",

    Parts_Master_Create = "[ASSET] Parts Master Create Action",
    Parts_Master_Create_Success = "[ASSET] Parts Master Create Success Action",
    Parts_Master_Create_Failure = "[ASSET] Parts Master Create Failure Action",

    Parts_Master_Update_Load = "[ASSET] Parts Master Update Load Action",
    Parts_Master_Update_Load_Success = "[ASSET] Parts Master Update Load Success Action",
    Parts_Master_Update_Load_Failure = "[ASSET] Parts Master Update Load Failure Action",

    Parts_Master_Update = "[ASSET] Parts Master Update Action",
    Parts_Master_Update_Success = "[ASSET] Parts Master Update Success Action",
    Parts_Master_Update_Failure = "[ASSET] Parts Master Update Failure Action",

    Parts_Master_Delete = "[ASSET] Parts Master Delete Action",
    Parts_Master_Delete_Success = "[ASSET] Parts Master Delete Success Action",
    Parts_Master_Delete_Failure = "[ASSET] Parts Master Delete Failure Action",

    //Parts Stock
    Parts_Stock_Load = "[ASSET] Parts Stock Load Action",
    Parts_Stock_Load_Success = "[ASSET] Parts Stock Load Success Action",
    Parts_Stock_Load_Failure = "[ASSET] Parts Stock Load Failure Action",

    Parts_Stock_Add_Load = "[ASSET] Parts Stock Add Load Action",
    Parts_Stock_Add_Load_Success = "[ASSET] Parts Stock Add Load Success Action",
    Parts_Stock_Add_Load_Failure = "[ASSET] Parts Stock Add Load Failure Action",

    Parts_Stock_Add = "[ASSET] Parts Stock Add Action",
    Parts_Stock_Add_Success = "[ASSET] Parts Stock Add Success Action",
    Parts_Stock_Add_Failure = "[ASSET] Parts Stock Add Failure Action",

    //Parts Transactions
    Parts_Transactions_Load = "[ASSET] Parts Transactions Load Action",
    Parts_Transactions_Load_Success = "[ASSET] Parts Transactions Load Success Action",
    Parts_Transactions_Load_Failure = "[ASSET] Parts Transactions Load Failure Action",

    Parts_Rentalpoint_Load = "[ASSET] Parts Rentalpoint Load Action",
    Parts_Rentalpoint_Load_Success = "[ASSET] Parts Rentalpoint Load Success Action",
    Parts_Rentalpoint_Load_Failure = "[ASSET] Parts Rentalpoint Load Failure Action",
    Parts_Fsq_Load = "[ASSET] Parts Fsq Load Action",
    Parts_Fsq_Load_Success = "[ASSET] Parts Fsq Load Success Action",
    Parts_Fsq_Load_Failure = "[ASSET] Parts Fsq Load Failure Action",
    Parts_Fsq_Load_ById = "[ASSET] Parts Fsq Load ById Action",
    Parts_Fsq_Load_ById_Success = "[ASSET] Parts Fsq Load ById Success Action",
    Parts_Fsq_Load_ById_Failure = "[ASSET] Parts Fsq Load ById Failure Action",

    //Parts Definitions
    Vehicle_Types_Load = "[ASSET] Vehicle Types Load",
    Vehicle_Types_Load_Success = "[ASSET] Vehicle Types Load Success",
    Vehicle_Types_Load_Failure = "[ASSET] Vehicle Types Load Failure",
    Parts_Definition_Load = "[ASSET] Parts Definition Load",
    Parts_Definition_Load_Success = "[ASSET] Parts Definition Load Success",
    Parts_Definition_Load_Failure = "[ASSET] Parts Definition Load Failure",
    Parts_Definition_Update = "[ASSET] Parts Definition Update",
    Parts_Definition_Update_Success = "[ASSET] Parts Definition Update Success",
    Parts_Definition_Update_Failure = "[ASSET] Parts Definition Update Failure",
}

//Asset list load
export class AssetListLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Asset_List_Load;
}

export class AssetListLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Asset_List_Load_Success;

    constructor(public payload: any[]) { }
}

export class AssetListLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Asset_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Add Asset Load
export class AddAssetLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Asset_Load;
    
}

export class AddAssetLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Asset_Load_Success;

    constructor(public payload: any) { }
}

export class AddAssetLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Asset_Load_Failure;

    constructor(public payload: ErrorModel) { }
}
// Add Asset
export class AddAssetAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Asset;

    constructor(public payload: AddAsset) { }
}

export class AddAssetSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Asset_Success;
}

export class AddAssetFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Asset_Failure;

    constructor(public payload: ErrorModel) { }
}

// Add Another Asset

export class AddAnotherAssetAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Another_Asset;
    constructor(public payload: AddAsset) { }
}


//Edit Asset Load
export class EditAssetLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Asset_Load;

    constructor(public payload: editAsset) { }
}

export class EditAssetLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Asset_Load_Success;

    constructor(public payload: any[]) { }
}

export class EditAssetLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Asset_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

// Edit Asset
export class EditAssetAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Asset;

    constructor(public payload: AddAsset) { }
}

export class EditAssetSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Asset_Success;
}

export class EditAssetFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Asset_Failure;

    constructor(public payload: ErrorModel) { }
}


//Asset Detail
export class AssetDetailLoad implements Action {
    readonly type = AssetInventoryActionTypes.Asset_Detail_Load;

    constructor(public payload: getAssetDetails) { }
}

export class AssetDetailLoadSuccess implements Action {
    readonly type = AssetInventoryActionTypes.Asset_Detail_Load_Success;

    constructor(public payload: any) { }
}

export class AssetDetailLoadFailure implements Action {
    readonly type = AssetInventoryActionTypes.Asset_Detail_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//End Assets

//Accessories List Load
export class AccessoriesListLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Accessories_List_Load;
}

export class AccessoriesListLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Accessories_List_Load_Success;

    constructor(public payload: accessory[]) { }
}

export class AccessoriesListLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Accesssories_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

// Device Load Action
export class DeviceLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Device_List_Load;
}

export class DeviceLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Device_List_Load_Success;

    constructor(public payload: adminDevice[]) { }
}

export class DeviceLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Device_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

// Add Device
export class AddDeviceAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Device_Create;
    constructor(public payload: addDevice) { }
}

export class AddDeviceSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Device_Create_Success;
}

export class AddDeviceFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Device_Create_Failure;

    constructor(public payload: ErrorModel) { }
}


// Add Another Device

export class AddAnotherDeviceAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Another_Device_Create;
    constructor(public payload: addDevice) { }
}

// Edit Device
export class EditDeviceAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Device_Action;
    constructor(public payload: adminDevice) { }
}

export class EditDeviceSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Device_Success_Action;

}
export class EditDeviceFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Device_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// Edit Device Load
export class EditDeviceLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Device_Load;
    constructor(public payload: editDevice) { }
}

export class EditDeviceLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Device_Success_Load;
    constructor(public payload: any[]) { }
}
export class EditDeviceLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Device_Failure_Load;

    constructor(public payload: ErrorModel) { }
}

//Add Device Dropdown
export class AddDeviceLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Device_Load_Action;
}
export class AddDeviceLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Device_Load_Success_Action;

    constructor(public payload: any[]) { }
}
export class AddDeviceLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Device_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

//Delete Device
export class DeleteDeviceAction implements Action {
    readonly type = AssetInventoryActionTypes.Delete_Device_Action;

    constructor(public payload: deviceId) { }
}

export class DeleteDeviceFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Delete_Device_Action_Failure;

    constructor(public payload: ErrorModel) { }
}

//Get Device Tarnsaction Action
export class GetDeviceTransactionAction implements Action {
    readonly type = AssetInventoryActionTypes.Get_Device_Transactions_Action;
    constructor(public payload: number) {}
}

export class GetDeviceTransactionSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Get_Device_Transactions_Success_Action;
    constructor(public payload: any[]) {}
}

export class GetDeviceTransactionFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Get_Device_Transactions_Failure_Action;
    constructor(public payload: ErrorModel) {}
}



//Part:-
//Parts List Load
export class PartListLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_List_Load;
}
export class PartListLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_List_Load_Success;

    constructor(public payload: parts[]) { }
}
export class PartListLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Add Part Dropdown
export class PartLoad implements Action {
    readonly type = AssetInventoryActionTypes.Part_Load_Action;
}
export class PartLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_Load_Success_Action;

    constructor(public payload: any[]) { }
}
export class PartLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

//Add Parts
export class AddPartAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_Create_Action;

    constructor(public payload: AddParts) { }
}
export class AddPartSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_Create_Success_Action;
}
export class AddPartFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Part_Create_Failure_Action;

    constructor(public payload: ErrorModel) { }
}
//Add Another Parts
export class AddAnotherPartsAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Another_Part_Action;

    constructor(public payload: AddParts) { }
}

//Edit Parts Load
export class EditPartLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Part_Load_Action;

    constructor(public payload: partID) { }
}
export class EditPartLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Part_Load_Success_Action;

    constructor(public payload: any[]) { }
}
export class EditPartLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Part_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

//Edit Parts
export class EditPartAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Part_Action;

    constructor(public Payload: parts) { }
}
export class EditPartSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Part_Success_Action;
}
export class EditPartFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Part_Failure_Action

    constructor(public payload: ErrorModel) { }
}

// Delete part
export class DeletePartAction implements Action {
    readonly type = AssetInventoryActionTypes.Delete_Part;

    constructor(public payload: partID) { }
}

export class DeletePartFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Delete_Part_Failure;

    constructor(public payload: ErrorModel) { }
}

//Battery
//Batteries list Load
export class BatteryListLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Battery_List_Load;
}

export class BatteryListLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Battery_List_Load_Success;

    constructor(public payload: battery[]) { }
}

export class BatteryListLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Battery_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Edit Battery Load
export class EditBatteryLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Battery_Load;

    constructor(public payload: batteryID) { }
}

export class EditBatteryLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Battery_Load_Success;

    constructor(public payload: any[]) { }
}

export class EditBatteryLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Battery_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Add  Another Battery
export class AddAnotherBatteryAction implements Action {
    readonly type = AssetInventoryActionTypes.Add_Another_Battery_Create;

    constructor(public payload: battery) { }
}

//Create Battery
export class CreateBatteryAction implements Action {
    readonly type = AssetInventoryActionTypes.Create_Battery;
    constructor(public payload: battery) { }
}

export class CreateBatterySuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Create_Battery_Success;
}

export class CreateBatteryFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Create_Battery_Failure;

    constructor(public payload: ErrorModel) { }
}

//Edit Battery 
export class EditBatteryAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Battery_Action ;

    constructor(public payload: battery) { }
}

export class EditBatterySuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Battery_Success_Action ;
}

export class EditBatteryFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Edit_Battery_Failure_Action ;

    constructor(public payload: ErrorModel) { }
}

//Battery Dropdown
export class BatteryLoad implements Action {
    readonly type = AssetInventoryActionTypes.Battery_Load_Action;
}
export class BatteryLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Battery_Load_Success_Action;

    constructor(public payload: any[]) { }
}
export class BatteryLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Battery_Load_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

//Delete Battery
export class DeleteBatteryAction implements Action {
    readonly type = AssetInventoryActionTypes.Delete_Battery;

    constructor(public payload: batteryID) { }
}

export class DeleteBattteryFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Delete_Battery_Failure;

    constructor (public payload: ErrorModel) { }
}

//Get Battery Transaction
export class GetBatteryTransactionAction implements Action {
    readonly type = AssetInventoryActionTypes.Get_Battery_Transactions_Action;
    constructor(public payload: number) {}
}

export class GetBatteryTransactionSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Get_Battery_Transactions_Success_Action;
    constructor(public payload: any[]) {}
}

export class GetBatteryTransactionFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Get_Battery_Transactions_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Parts Master Section
export class PartsMasterLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Load;
}
export class PartsMasterLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Load_Success;
    constructor(public payload: PartsMasterItem[]) { }
}
export class PartsMasterLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Load_Failure;
    constructor (public payload: ErrorModel) { }
}

//Parts Master Create
export class PartsMasterCreateLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Create_Load;
}
export class PartsMasterCreateLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Create_Load_Success;
    constructor(public payload: any[]) { }
}
export class PartsMasterCreateLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Create_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsMasterCreateAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Create;
    constructor(public payload: PartsMasterItem) { }
}
export class PartsMasterCreateSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Create_Success;
}
export class PartsMasterCreateFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Create_Failure;
    constructor (public payload: ErrorModel) { }
}

//Parts Master Update
export class PartsMasterUpdateLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Update_Load;
    constructor(public payload: number) { }
}
export class PartsMasterUpdateLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Update_Load_Success;
    constructor(public payload: any[]) { }
}
export class PartsMasterUpdateLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Update_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsMasterUpdateAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Update;
    constructor(public payload: PartsMasterItem) { }
}
export class PartsMasterUpdateSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Update_Success;
}
export class PartsMasterUpdateFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Update_Failure;
    constructor (public payload: ErrorModel) { }
}

//Parts Master Delete
export class PartsMasterDeleteAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Delete;
    constructor(public payload: number) { }
}
export class PartsMasterDeleteSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Delete_Success;
}
export class PartsMasterDeleteFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Master_Delete_Failure;
    constructor (public payload: ErrorModel) { }
}

//Parts Stock Load
export class PartsStockLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Load;
    constructor(public payload?: number) { }
}
export class PartsStockLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Load_Success;
    constructor(public payload: PartsStockItem[]) { }
}
export class PartsStockLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsStockAddLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Add_Load;
}
export class PartsStockAddLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Add_Load_Success;
    constructor (public payload: any) { }
}
export class PartsStockAddLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Add_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsRentalpointLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Rentalpoint_Load;
    constructor (public payload: number) { }
}
export class PartsRentalpointLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Rentalpoint_Load_Success;
    constructor (public payload: any) { }
}
export class PartsRentalpointLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Rentalpoint_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsFsqLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Fsq_Load;
    constructor (public payload: string) { }
}
export class PartsFsqLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Fsq_Load_Success;
    constructor (public payload: FSQDetails[]) { }
}
export class PartsFsqLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Fsq_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsFsqLoadByIdAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Fsq_Load_ById;
    constructor (public payload: number) { }
}
export class PartsFsqLoadByIdSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Fsq_Load_ById_Success;
    constructor (public payload: FSQDetails) { }
}
export class PartsFsqLoadByIdFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Fsq_Load_ById_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsStockAddAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Add;
    constructor (public payload: AddPartsStockPayload) { }
}
export class PartsStockAddSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Add_Success;
}
export class PartsStockAddFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Stock_Add_Failure;
    constructor (public payload: ErrorModel) { }
}

//Parts Transactions Load
export class PartsTransactionsLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Transactions_Load;
    constructor(public payload: PartsTransactionsFilter) { }
}
export class PartsTransactionsLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Transactions_Load_Success;
    constructor(public payload: PartsTransactionsItem[]) { }
}
export class PartsTransactionsLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Transactions_Load_Failure;
    constructor (public payload: ErrorModel) { }
}

//Parts Definitions
export class VehicleTypesLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Vehicle_Types_Load;
}
export class VehicleTypesLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Vehicle_Types_Load_Success;
    constructor(public payload: DomainData[]) { }
}
export class VehicleTypesLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Vehicle_Types_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsDefinitionLoadAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Definition_Load;
    constructor(public payload: PartsDefinitionLoadPayload) { }
}
export class PartsDefinitionLoadSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Definition_Load_Success;
    constructor(public payload: PartsDefinitionItem[]) { }
}
export class PartsDefinitionLoadFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Definition_Load_Failure;
    constructor (public payload: ErrorModel) { }
}
export class PartsDefinitionUpdateAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Definition_Update;
    constructor(public payload: PartsDefinitionUpdatePayload) { }
}
export class PartsDefinitionUpdateSuccessAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Definition_Update_Success;
}
export class PartsDefinitionUpdateFailureAction implements Action {
    readonly type = AssetInventoryActionTypes.Parts_Definition_Update_Failure;
    constructor (public payload: ErrorModel) { }
}

export type AssetInventoryAction = AssetListLoadAction
    | AssetListLoadSuccessAction
    | AssetListLoadFailureAction
    | AddAssetLoadAction
    | AddAssetLoadSuccessAction
    | AddAssetLoadFailureAction
    | AddAssetAction
    | AddAssetSuccessAction
    | AddAssetFailureAction
    | EditAssetLoadAction
    | EditAssetLoadSuccessAction
    | EditAssetLoadFailureAction
    | EditAssetAction
    | EditAssetSuccessAction
    | EditAssetFailureAction
    | AssetDetailLoad
    | AssetDetailLoadSuccess
    | AssetDetailLoadFailure
    | AccessoriesListLoadAction
    | AccessoriesListLoadSuccessAction
    | AccessoriesListLoadFailureAction
    | BatteryListLoadAction
    | BatteryListLoadSuccessAction
    | BatteryListLoadFailureAction
    | DeviceLoadAction
    | DeviceLoadSuccessAction
    | DeviceLoadFailureAction
    | CreateBatteryAction
    | CreateBatterySuccessAction
    | CreateBatteryFailureAction
    | AddDeviceAction
    | AddDeviceSuccessAction
    | AddDeviceFailureAction
    | AddAnotherDeviceAction
    | EditDeviceAction
    | EditDeviceSuccessAction
    | EditDeviceFailureAction
    | EditDeviceLoadAction
    | EditDeviceLoadSuccessAction
    | EditDeviceLoadFailureAction
    | AddAnotherBatteryAction
    | EditBatteryLoadAction
    | EditBatteryLoadSuccessAction
    | EditBatteryLoadFailureAction
    | EditBatteryAction
    | EditBatterySuccessAction
    | EditBatteryFailureAction
    | PartListLoadAction
    | PartListLoadSuccessAction
    | PartListLoadFailureAction
    | PartLoad
    | PartLoadSuccessAction
    | PartLoadFailureAction
    | AddPartAction
    | AddPartSuccessAction
    | AddPartFailureAction
    | AddAnotherPartsAction
    | EditPartLoadAction
    | EditPartLoadSuccessAction
    | EditPartLoadFailureAction
    | EditPartAction
    | EditPartSuccessAction
    | EditPartFailureAction
    | DeletePartAction
    | DeletePartFailureAction
    | AddDeviceLoadAction
    | AddDeviceLoadSuccessAction
    | AddDeviceLoadFailureAction
    | DeleteDeviceAction
    | DeleteDeviceFailureAction
    | BatteryLoad
    | BatteryLoadSuccessAction
    | BatteryLoadFailureAction
    | DeleteBatteryAction
    | DeleteBattteryFailureAction
    | AddAnotherAssetAction
    | PartsMasterLoadAction
    | PartsMasterLoadSuccessAction
    | PartsMasterLoadFailureAction
    | PartsMasterCreateLoadAction
    | PartsMasterCreateLoadSuccessAction
    | PartsMasterCreateLoadFailureAction
    | PartsMasterCreateAction
    | PartsMasterCreateSuccessAction
    | PartsMasterCreateFailureAction
    | PartsMasterUpdateLoadAction
    | PartsMasterUpdateLoadSuccessAction
    | PartsMasterUpdateLoadFailureAction
    | PartsMasterUpdateAction
    | PartsMasterUpdateSuccessAction
    | PartsMasterUpdateFailureAction
    | PartsMasterDeleteAction
    | PartsMasterDeleteSuccessAction
    | PartsMasterDeleteFailureAction
    | PartsStockLoadAction
    | PartsStockLoadFailureAction
    | PartsStockLoadSuccessAction
    | PartsTransactionsLoadAction
    | PartsTransactionsLoadSuccessAction
    | PartsTransactionsLoadFailureAction
    | PartsStockAddLoadAction
    | PartsStockAddLoadFailureAction
    | PartsStockAddLoadSuccessAction
    | PartsStockAddAction
    | PartsStockAddSuccessAction
    | PartsStockAddFailureAction
    | VehicleTypesLoadAction
    | VehicleTypesLoadSuccessAction
    | VehicleTypesLoadFailureAction
    | PartsDefinitionLoadAction
    | PartsDefinitionLoadSuccessAction
    | PartsDefinitionLoadFailureAction
    | PartsDefinitionUpdateAction
    | PartsDefinitionUpdateSuccessAction
    | PartsDefinitionUpdateFailureAction
    | PartsRentalpointLoadAction
    | PartsRentalpointLoadSuccessAction
    | PartsRentalpointLoadFailureAction
    | PartsFsqLoadAction
    | PartsFsqLoadSuccessAction
    | PartsFsqLoadFailureAction
    | PartsFsqLoadByIdAction
    | PartsFsqLoadByIdSuccessAction
    | PartsFsqLoadByIdFailureAction
    | GetBatteryTransactionAction
    | GetBatteryTransactionSuccessAction
    | GetBatteryTransactionFailureAction
    | GetDeviceTransactionAction
    | GetDeviceTransactionSuccessAction
    | GetDeviceTransactionFailureAction