import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { FSQDetails, ApproveRequestFSQ, FSQRegionUpdate, WorkItem, WorkItemAssignmentRequest, createShiftService, FsqShift, FSQShiftManagementId, WorkItemId, IncidentDetail, FsqShifts, FsqTagedRegion, UserActiveInactive, editShiftService, RentalPoint, GetREntalPointService, vehicle, BookVehicleService, startShiftService, EndShiftService, EditHubLevel, FSQDetail, ShiftDetails, AcceptJob, FsqReturnVehicleService, ReturnRegion, ReturnVehicleService, ReturnRP, PauseShiftService, FsqRegionByCity, Taskdetails } from 'src/app/models/fsqManagement';
import { RegionItem } from 'src/app/models/regionManagement';
import { RentalPoints } from './rental_point.action';

export enum FSQManagementActionTypes {
    FSQ_Management_List_Load = "[FSQ MANAGEMENT] FSQ Management List Load",
    FSQ_Management_List_Load_Success = "[FSQ MANAGEMENT] FSQ Management List Load Success",
    FSQ_Management_List_Load_Failure = "[FSQ MANAGEMENT] FSQ Management List Load Failure",
    Approve_Request = "[FSQ MANAGEMENT] Approve Request Load",
    Approve_Request_Success = "[FSQ MANAGEMENT] Approve_Request_Success",
    Approve_Request_Failure = "[FSQ MANAGEMENT] Approve Request Failure",
    FSQ_Region_Load = "[FSQ MANAGEMENT] FSQ Region Load",
    FSQ_Region_Load_Success = "[FSQ MANAGEMENT] FSQ Region Load Success",
    FSQ_Region_Load_Failure = "[FSQ MANAGEMENT] FSQ Region Load Failure",
    FSQ_Region_Update_Action = "[FSQ MANAGEMENT] FSQ Region Update",
    FSQ_Region_Update_Success_Action = "[FSQ MANAGEMENT] FSQ Region Update Success",
    FSQ_Region_Update_Failure_Action = "[FSQ MANAGEMENT] FSQ Region Update Failure",
    //Work Flow Assignment
    Work_Item_List_Load = "[FSQ MANAGEMENT] Work Item List Load",
    Work_Item_List_Load_Success = "[FSQ MANAGEMENT] Work Item List Load Success",
    Work_Item_List_Load_Failure = "[FSQ MANAGEMENT] Work Item List Load Failure",
    Work_Item_Assign_Load = "[FSQ MANAGEMENT] Work Item Assign Load",
    Work_Item_Assign_Load_Success = "[FSQ MANAGEMENT] Work Item Assign Load Success",
    Work_Item_Assign_Load_Failure = "[FSQ MANAGEMENT] Work Item Assign Load Failure",
    Work_Item_Assign = "[FSQ MANAGEMENT] Work Item Assign",
    Work_Item_Assign_Success = "[FSQ MANAGEMENT] Work Item Assign Success",
    Work_Item_Assign_Failure = "[FSQ MANAGEMENT] Work Item Assign Failure",
    Verify_Document_Action = "[FSQ MANAGEMENT] Verify_Document_Action",
    Verify_Document_Success_Action = "[FSQ MANAGEMENT] Verify_Document_Success_Action",
    Verify_Document_Failure_Action = "[FSQ MANAGEMENT] Verify_Document_Failure_Action",
    Get_All_region_Action = '[FSQ MANAGEMENT] Get_All_region_Action',
    Get_All_region_Success_Action = '[FSQ MANAGEMENT] Get_All_region_Success_Action',
    Get_All_region_Failure_Action = '[FSQ MANAGEMENT] Get_All_region_Failure_Action',
    Add_Fsq_Shift_Action = '[FSQ MANAGEMENT] Add Fsq Shift Action',
    Add_Fsq_Shift_Success_Action = '[FSQ MANAGEMENT] Add Fsq Shift Success Action',
    Add_Fsq_Shift_Failure_Action = '[FSQ MANAGEMENT] Add Fsq Shift Failure Action',
    Get_All_Shift_Action = '[FSQ MANAGEMENT] Get All Shift Action',
    Get_All_Shift_Success_Action = '[FSQ MANAGEMENT] Get All Shift Success Action',
    Get_All_Shift_Failure_Action = '[FSQ MANAGEMENT] Get All Shift Failure Action',
    Edit_Shift_Load = '[FSQ MANAGEMENT] Edit Shift Load',
    Edit_Shift_Success_Load = '[FSQ MANAGEMENT] Edit Shift Load Success',
    Edit_Shift_Failure_Load = '[FSQ MANAGEMENT] Edit Shift Load Failure',
    Delete_FSQ_Shift = "[FSQ MANAGEMENT] Delete FSQ Shift",
    Delete_FSQ_Shift_Failure = "[FSQ MANAGEMENT] Delete FSQ Shift Failure",
    Edit_Shift_Action = "[FSQ MANAGEMENT] Edit_Shift_Action",
    Edit_Shift_Success_Action = "[FSQ MANAGEMENT] Edit_Shift_Success_Action",
    Edit_Shift_Failure_Action = "[FSQ MANAGEMENT] Edit_Shift_Failure_Action",
    //get incident detail
    Get_Incident_Detail_Action = "[FSQ MANAGEMENT] Get Incident Detail Action",
    Get_Incident_Detail_Success_Action = "[FSQ MANAGEMENT] Get Incident Detail Success Action",
    Get_Incident_Detail_Failure_Action = "[FSQ MANAGEMENT] Get Incident Detail Failure Action",
    //get FSQ Tages Region
    Get_FSQ_Taged_Region_Action = '[FSQ MANAGEMENT] Get FSQ Taged Region Action',
    Get_FSQ_Taged_Region_Success_Action = '[FSQ MANAGEMENT] Get FSQ Taged Region Succerss Action',
    Get_FSQ_Taged_Region_Failure_Action = '[FSQ MANAGEMENT] Get FSQ Taged Region Failure Action',
    //Fsq Active Inactive
    Fsq_Active_Inactive_Action = '[FSQ MANAGEMENT] Fsq Active Inactive Action',
    Fsq_Active_Inactive_Success_Action = '[FSQ MANAGEMENT] Fsq Active Inactive Success Action',
    Fsq_Active_Inactive_Failure_Action = '[FSQ MANAGEMENT] Fsq Active Inactive Failure Action',
    //get Fsq Shift region rental point
    Get_Fsq_Shift_Region_Rental_Point_Action = '[FSQ MANAGEMENT] Get Fsq Shift Region Rental Point Action',
    Get_Fsq_Shift_Region_Rental_Point_Success_Action = '[FSQ MANAGEMENT] Get Fsq Shift Region Rental Point Success Action',
    Get_Fsq_Shift_Region_Rental_Point_Failure_Action = '[FSQ MANAGEMENT] Get Fsq Shift Region Rental Point Failure Action',
    //get vehicle by rental point
    Get_All_Vehicle_Load_Action = '[FSQ MANAGEMENT] Get All Vehicle Load Action',
    Get_All_Vehicle_Load_Success_Action = '[FSQ MANAGEMENT] Get All Vehicle Load Success Action',
    Get_All_Vehicle_Load_Failure_Action = '[FSQ MANAGEMENT] Get All Vehicle Load Failure Action',
    //book vehicle
    Book_vehicle_Action = '[FSQ MANAGEMENT] Book vehicle Action',
    Book_vehicle_Success_Action = '[FSQ MANAGEMENT] Book vehicle Success Action',
    Book_vehicle_Failure_Action = '[FSQ MANAGEMENT] Book vehicle Failure Action',
    //get Assign Vehicle
    Get_Assign_vehicle_Action = '[FSQ MANAGEMENT] Get Assign Vehicle Action',
    Get_Assign_vehicle_Success_Action = '[FSQ MANAGEMENT] Get Assign Vehicle Success Action',
    Get_Assign_vehicle_Failure_Action = '[FSQ MANAGEMENT] Get Assign Vehicle Failure Action',
    //fsq Start Shift
    Fsq_Start_Shift_Action = '[FSQ MANAGEMENT] Fsq Start Shift Action',
    Fsq_Start_Shift_Failure_Action = '[FSQ MANAGEMENT] Fsq Start Shift Failure Action',
    //fsq end shift
    Fsq_End_Shift_Action = '[FSQ MANAGEMENT] Fsq End Shift Action',
    Fsq_End_Shift_Failure_Action = '[FSQ MANAGEMENT] Fsq End Shift Failure Action',
    //Update Fsq Detail
    Update_Fsq_Action = '[FSQ MANAGEMENT] Update Fsq Action',
    Update_Fsq_Success_Action = '[FSQ MANAGEMENT] Update Fsq Success Action',
    Update_Fsq_Failure_Action = '[FSQ MANAGEMENT] Update Fsq Failure Action',
    //Accept Task
    Start_Job_Action = "[WORKDETAIL] Start Job Action",
    Start_Job_Success_Action = "[WORKDETAIL] Start Job Success Action",
    Start_Job_Failure_Action = "[WORKDETAIL] Start Job Failure Action",
    //Fsq Return Vehicle
    FSQ_Return_Vehicle_Action = '[WORKDETAIL] FSQ Return Vehicle Action',
    FSQ_Return_Vehicle_Success_Action = '[WORKDETAIL] FSQ Return Vehicle Success Action',
    FSQ_Return_Vehicle_Failure_Action = '[WORKDETAIL] FSQ Return Vehicle Failure Action',
    //get return Region
    Get_Return_Region_Action = '[WORKDETAIL] Get Return Region Action',
    Get_Return_Region_Success_Action = '[WORKDETAIL] Get Return Region Success Action',
    Get_Return_Region_Failure_Action = '[WORKDETAIL] Get Return Region Failure Action',
    //get return RP
    Get_Return_RP_Action = '[WORKDETAIL] Get Return RP Action',
    Get_Return_RP_Success_Action = '[WORKDETAIL] Get Return RP Success Action',
    Get_Return_RP_Failure_Action = '[WORKDETAIL] Get Return RP Failure Action',
    // FSQ Search
    Fsq_Search_Load = "[FSQ MANAGEMENT] Fsq_Search_Load",
    Fsq_Search_Load_Success = "[FSQ MANAGEMENT] Fsq_Search_Load_Success",
    Fsq_Search_Load_Failure = "[FSQ MANAGEMENT] Fsq_Search_Load_Failure",
    // FSQ Pause Shift
    Fsq_Pause_Shift_Action = "[FSQ MANAGEMENT] Fsq_Pause_Shift_Action",
    Fsq_Pause_Shift_Failure_Action = "[FSQ MANAGEMENT] Fsq_Pause_Shift_Failure_Action",
    Fsq_Resume_Shift_Action = "[FSQ MANAGEMENT] Fsq_Resume_Shift_Action",
    Fsq_Resume_Shift_Failure_Action = "[FSQ MANAGEMENT] Fsq_Resume_Shift_Failure_Action",
    Fsq_Rentalpoint_Load = "[FSQ MANAGEMENT] Fsq_Rentalpoint_Load",
    Fsq_Rentalpoint_Load_Success = "[FSQ MANAGEMENT] Fsq_Rentalpoint_Load_Success",
    Fsq_Rentalpoint_Load_Failure = "[FSQ MANAGEMENT] Fsq_Rentalpoint_Load_Failure",
    Get_Fsq_Region_By_City_Action = "[FSQ MANAGEMENT] Get_Fsq_Region_By_City_Action",
    Get_Fsq_Region_By_City_Success_Action = "[FSQ MANAGEMENT] Get_Fsq_Region_By_City_Success_Action",
    Get_Fsq_Region_By_City_Failure_Action = "[FSQ MANAGEMENT] Get_Fsq_Region_By_City_Failure_Action",
    Get_All_RentalPoint_Load_Action = "[FSQ MANAGEMENT] Get_All_RentalPoint_Load_Action",
    Get_All_RentalPoint_Load_Success_Action = "[FSQ MANAGEMENT] Get_All_RentalPoint_Load_Success_Action",
    Get_All_RentalPoint_Load_Failure_Action = "[FSQ MANAGEMENT] Get_All_RentalPoint_Load_Failure_Action",
    Task_Details_List_Action = "[FSQ MANAGEMENT] Task_Details_List_Action",
    Task_Details_List_Success_Action = "[FSQ MANAGEMENT] Task_Details_List_Success_Action",
    Task_Details_List_Failure_Action = "[FSQ MANAGEMENT] Task_Details_List_Failure_Action"
}

//FSQ Management Load
export class FSQManagementListLoadAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Management_List_Load;
    constructor(public payload: number) {}
}

export class FSQManagementListLoadSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Management_List_Load_Success;
    constructor(public payload: FSQDetails[]) {}
}

export class FSQManagementListLoadFailureAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Management_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//Approve Request
export class ApproveRequestAction implements Action {
    readonly type = FSQManagementActionTypes.Approve_Request;
    constructor(public payload: ApproveRequestFSQ) {}
}
export class ApproveRequestSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Approve_Request_Success;
    
}
export class ApproveRequestFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Approve_Request_Failure
    constructor(public payload: ErrorModel) {}
}

//FSQ Region Load
export class FSQRegionLoad implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Region_Load
    constructor(public payload: ApproveRequestFSQ){}
}

export class FSQRegionLoadSuccess implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Region_Load_Success
    constructor(public payload: any[]){}
}

export class FSQRegionLoadFailure implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Region_Load_Failure
    constructor(public payload: ErrorModel){}
}

//FSQ Region Update
export class UpdateRegionAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Region_Update_Action
    constructor(public payload: FSQRegionUpdate){}
}

export class UpdateRegionSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Region_Update_Success_Action
}

export class UpdateRegionFailureAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Region_Update_Failure_Action
    constructor(public payload: ErrorModel) {}
}


//Work Flow Assignment
export class WorkItemListLoadAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_List_Load;
}

export class WorkItemListLoadSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_List_Load_Success;
    constructor(public payload: WorkItem[]) {}
}

export class WorkItemListLoadFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Work assign load
export class WorkItemAssignLoadAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_Assign_Load;

    constructor(public payload: number) { }   
}

export class WorkItemAssignLoadSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_Assign_Load_Success;

    constructor(public payload: any[]) { }
}

export class WorkItemAssignLoadFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_Assign_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Work item assignment submit action
export class WorkItemAssignAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_Assign;
    constructor(public payload: WorkItemAssignmentRequest) { }
}

export class WorkItemAssignSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_Assign_Success;
}

export class WorkItemAssignFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Work_Item_Assign_Failure;

    constructor(public payload: ErrorModel) { }
}

// Verify Document
export class VerifyDocumentAction implements Action {
    readonly type = FSQManagementActionTypes.Verify_Document_Action;

    constructor(public payload: ApproveRequestFSQ) { }
}
export class VerifyDocumentSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Verify_Document_Success_Action;

    constructor(public payload: any[]) { }
}
export class VerifyDocumentFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Verify_Document_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

export class GetAllRegionAction implements Action {
    readonly type= FSQManagementActionTypes.Get_All_region_Action;
}
export class GetAllRegionSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Get_All_region_Success_Action;
    constructor(public payload: RegionItem[]){}
}
export class GetAllRegionFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Get_All_region_Failure_Action;
    constructor(public payload: ErrorModel){}
}

export class AddFsqShiftAction implements Action {
    readonly type= FSQManagementActionTypes.Add_Fsq_Shift_Action;
    constructor(public payload: createShiftService){}
}
export class AddFsqShiftSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Add_Fsq_Shift_Success_Action;
    constructor(){}
}
export class AddFsqShiftFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Add_Fsq_Shift_Failure_Action;
    constructor(public payload: ErrorModel){}
}

export class GetAllShiftAction implements Action {
    readonly type= FSQManagementActionTypes.Get_All_Shift_Action;
    constructor(){}
}
export class GetAllShiftSuccessAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_Shift_Success_Action;
    constructor(public payload: any){}
}
export class GetAllShiftFaliureAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_Shift_Failure_Action;
    constructor(public payload: ErrorModel){}
}

//Edit Shift Load
export class EditShiftLoadAction implements Action {
    readonly type = FSQManagementActionTypes.Edit_Shift_Load;
    constructor(public payload:FSQShiftManagementId) {}
}

export class EditShiftLoadSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Edit_Shift_Success_Load;
    constructor(public payload: any[]) {}
}

export class EditShiftLoadFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Edit_Shift_Failure_Load;
    constructor(public payload: ErrorModel) {}
}
// Edit Shift

export class EditShiftAction implements Action {
    readonly type = FSQManagementActionTypes.Edit_Shift_Action;

    constructor(public payload: editShiftService) { }
}

export class EditShiftSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Edit_Shift_Success_Action;
}

export class EditShiftFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Edit_Shift_Failure_Action;

    constructor(public payload: ErrorModel) { }
}

// Delete FSQ Shift
export class DeleteFSQShiftAction implements Action {
    readonly type = FSQManagementActionTypes.Delete_FSQ_Shift;
    constructor(public payload: FSQShiftManagementId){}
}

export class DeleteFSQShiftFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Delete_FSQ_Shift_Failure;
    constructor(public payload: ErrorModel){}
}
//Get Incident Detail
export class GetIncidentDetailAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Incident_Detail_Action
    constructor(public payload: WorkItemId){}
}
export class GetIncidentDetailSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Incident_Detail_Success_Action
    constructor(public payload: IncidentDetail){}
}
export class GetIncidentDetailFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Incident_Detail_Failure_Action
    constructor(public payload: ErrorModel){}
}
//get fsq taged region
export class GetFSQTagedRegionAction implements Action {
    readonly type= FSQManagementActionTypes.Get_FSQ_Taged_Region_Action
    constructor(public payload: FsqTagedRegion){}
}
export class GetFSQTagedRegionSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Get_FSQ_Taged_Region_Success_Action
    constructor(public payload: RegionItem[]){}
}
export class GetFSQTagedRegionfailureAction implements Action {
    readonly type= FSQManagementActionTypes.Get_FSQ_Taged_Region_Failure_Action
    constructor(public payload: ErrorModel){}
}
//Fsq Active inactive
export class FsqActiveInactiveAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Active_Inactive_Action
    constructor(public payload: UserActiveInactive){}
}
export class FsqActiveInactiveSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Active_Inactive_Success_Action
    constructor(){}
}
export class FsqActiveInactiveFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Active_Inactive_Failure_Action
    constructor(public payload: ErrorModel){}
}
//get fsq shift region rental Point 
export class GetFsqShiftRegionRentalPointAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Action
    constructor(public payload: FSQShiftManagementId){}
}
export class GetFsqShiftRegionRentalPointSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Success_Action
    constructor(public payload: RentalPoint[]){}
}
export class GetFsqShiftRegionRentalPointFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Failure_Action
    constructor(public payload: ErrorModel){}
}
//get All vehicle
export class GetAllVehicleLoadAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_Vehicle_Load_Action
    constructor(public payload: GetREntalPointService){}
}
export class GetAllVehicleLoadSuccessAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_Vehicle_Load_Success_Action
    constructor(public payload: vehicle[]){}
}
export class GetAllVehicleLoadFailureAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_Vehicle_Load_Failure_Action
    constructor(public payload: ErrorModel){}
}

//get All rentalpoint
export class GetAllRentalPointLoadAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_RentalPoint_Load_Action
    constructor(public payload: ReturnVehicleService){}
}
export class GetAllRentalPointLoadSuccessAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_RentalPoint_Load_Success_Action
    constructor(public payload: RentalPoint[]){}
}
export class GetAllRentalPointLoadFailureAction implements Action{
    readonly type= FSQManagementActionTypes.Get_All_RentalPoint_Load_Failure_Action
    constructor(public payload: ErrorModel){}
}
//book vehicle
export class BookvehicleAction implements Action {
    readonly type= FSQManagementActionTypes.Book_vehicle_Action;
    constructor(public payload: BookVehicleService){}
}
export class BookvehicleSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Book_vehicle_Success_Action;
    constructor(){}
}
export class BookvehicleFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Book_vehicle_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//Get Assign Vehicle
export class GetAssignvehicleAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Assign_vehicle_Action;
    constructor(public payload: FSQShiftManagementId){}
}
export class GetAssignvehicleSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Assign_vehicle_Success_Action;
    constructor(public payload: ShiftDetails){}
}
export class GetAssignvehicleFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Assign_vehicle_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//Fsq Start Shift
export class FsqStartShiftAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Start_Shift_Action;
    constructor(public payload: startShiftService){}
}
export class FsqStartShiftFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Start_Shift_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//Fsq Pause Shift
export class FsqPauseShiftAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Pause_Shift_Action;
    constructor(public payload: PauseShiftService){}
}
export class FsqPauseShiftFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Pause_Shift_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//Fsq Pause Shift
export class FsqResumeShiftAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Resume_Shift_Action;
    constructor(public payload: PauseShiftService){}
}
export class FsqResumeShiftFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_Resume_Shift_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//fsq end shift
export class FsqEndShiftAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_End_Shift_Action;
    constructor(public payload: EndShiftService){}
}
export class FsqEndShiftFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Fsq_End_Shift_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//Update Fsq Detail
export class UpdateFsqAction implements Action {
    readonly type= FSQManagementActionTypes.Update_Fsq_Action;
    constructor(public payload: EditHubLevel){}
}
export class UpdateFsqSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Update_Fsq_Success_Action;
    constructor(public payload: FSQDetail){}
}
export class UpdateFsqFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Update_Fsq_Failure_Action;
    constructor(public payload: ErrorModel){}
}
//Start Job
export class StartJobAction implements Action {
    readonly type = FSQManagementActionTypes.Start_Job_Action
    constructor(public payload: AcceptJob) {}
}

export class StartJobSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Start_Job_Success_Action;
}

export class StartJobFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Start_Job_Failure_Action;
    constructor(public payload: ErrorModel) {}
}
//Return Vehicle
export class FSQReturnVehicleAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Return_Vehicle_Action
    constructor(public payload: FsqReturnVehicleService){}
}
export class FSQReturnVehicleSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Return_Vehicle_Success_Action
}
export class FSQReturnVehicleFailureAction implements Action {
    readonly type = FSQManagementActionTypes.FSQ_Return_Vehicle_Failure_Action
    constructor(public payload: ErrorModel){}
}
//Get Return Region
export class GetReturnRegionAction implements Action {
    readonly type = FSQManagementActionTypes.Get_Return_Region_Action
    constructor(public payload: ReturnVehicleService){}
}
export class GetReturnRegionSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Get_Return_Region_Success_Action
    constructor(public payload: ReturnRegion[]){}
}
export class GetReturnRegionFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Get_Return_Region_Failure_Action
    constructor(public payload: ErrorModel){}
}
//Get Return RP
export class GetReturnRPAction implements Action {
    readonly type = FSQManagementActionTypes.Get_Return_RP_Action
    constructor(public payload: ReturnVehicleService){}
}
export class GetReturnRPSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Get_Return_RP_Success_Action
    constructor(public payload: ReturnRP[]){}
}
export class GetReturnRPFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Get_Return_RP_Failure_Action
    constructor(public payload: ErrorModel){}
}

// FSQ search
export class FsqSearchLoadAction implements Action {
    readonly type = FSQManagementActionTypes.Fsq_Search_Load;
    constructor(public payload: string) { }
}
export class FsqSearchLoadSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Fsq_Search_Load_Success;
    constructor(public payload: FSQDetails[]) { }
}
export class FsqSearchLoadFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Fsq_Search_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

// Rentalpoint by region
export class FsqRentalpointLoadAction implements Action {
    readonly type = FSQManagementActionTypes.Fsq_Rentalpoint_Load;
    constructor(public payload: ReturnVehicleService) { }
}
export class FsqRentalpointLoadSuccessAction implements Action {
    readonly type = FSQManagementActionTypes.Fsq_Rentalpoint_Load_Success;
    constructor(public payload: RentalPoint[]) { }
}
export class FsqRentalpointLoadFailureAction implements Action {
    readonly type = FSQManagementActionTypes.Fsq_Rentalpoint_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

//get fsq  region by city
export class GetFsqRegionByCityAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Fsq_Region_By_City_Action
    constructor(public payload: FsqRegionByCity){}
}
export class GetFsqRegionByCitySuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Fsq_Region_By_City_Success_Action
    constructor(public payload: RegionItem[]){}
}
export class GetFsqRegionByCityFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Get_Fsq_Region_By_City_Failure_Action
    constructor(public payload: ErrorModel){}
}
// Task Details List

export class TaskdetailsListAction implements Action {
    readonly type= FSQManagementActionTypes.Task_Details_List_Action
    constructor(public payload:number){}
}
export class TaskdetailsListSuccessAction implements Action {
    readonly type= FSQManagementActionTypes.Task_Details_List_Success_Action
    constructor(public payload: Taskdetails[]){}
}
export class TaskdetailsListFailureAction implements Action {
    readonly type= FSQManagementActionTypes.Task_Details_List_Failure_Action
    constructor(public payload: ErrorModel){}
}

export type FSQManagementAction = FSQManagementListLoadAction
| FSQManagementListLoadSuccessAction
| FSQManagementListLoadFailureAction
| TaskdetailsListAction
| TaskdetailsListSuccessAction
| TaskdetailsListFailureAction
| ApproveRequestAction
| ApproveRequestSuccessAction
| ApproveRequestFailureAction
| FSQRegionLoad
| FSQRegionLoadSuccess
| FSQRegionLoadFailure
| UpdateRegionAction
| UpdateRegionSuccessAction
| UpdateRegionFailureAction
| WorkItemListLoadAction
| WorkItemListLoadSuccessAction
| WorkItemListLoadFailureAction
| WorkItemAssignLoadAction
| WorkItemAssignLoadSuccessAction
| WorkItemAssignLoadFailureAction
| WorkItemAssignAction
| WorkItemAssignSuccessAction
| WorkItemAssignFailureAction
| VerifyDocumentAction
| VerifyDocumentSuccessAction
| VerifyDocumentFailureAction
| GetAllRegionAction
| GetAllRegionSuccessAction
| GetAllRegionFailureAction
| AddFsqShiftAction
| AddFsqShiftSuccessAction
| AddFsqShiftFailureAction
| GetAllShiftAction
| GetAllShiftSuccessAction
| GetAllShiftFaliureAction
| EditShiftLoadAction
| EditShiftLoadSuccessAction
| EditShiftLoadFailureAction
| DeleteFSQShiftAction
| DeleteFSQShiftFailureAction
| EditShiftAction
| EditShiftSuccessAction
| EditShiftFailureAction
| GetIncidentDetailAction
| GetIncidentDetailSuccessAction
| GetIncidentDetailFailureAction
| GetFSQTagedRegionAction
| GetFSQTagedRegionSuccessAction
| GetFSQTagedRegionfailureAction
| FsqActiveInactiveAction
| FsqActiveInactiveFailureAction
| FsqActiveInactiveSuccessAction
| GetFsqShiftRegionRentalPointAction
| GetFsqShiftRegionRentalPointSuccessAction
| GetFsqShiftRegionRentalPointFailureAction
| GetAllVehicleLoadAction
| GetAllVehicleLoadSuccessAction
| GetAllVehicleLoadFailureAction
| BookvehicleAction
| BookvehicleSuccessAction
| BookvehicleFailureAction
| GetAssignvehicleAction
| GetAssignvehicleSuccessAction
| GetAssignvehicleFailureAction
| FsqStartShiftAction
| FsqStartShiftFailureAction
| FsqPauseShiftAction
| FsqPauseShiftFailureAction
| FsqResumeShiftAction
| FsqResumeShiftFailureAction
| FsqEndShiftAction
| FsqEndShiftFailureAction
| UpdateFsqAction
| UpdateFsqSuccessAction
| UpdateFsqFailureAction
| StartJobAction
| StartJobSuccessAction
| StartJobFailureAction
| FSQReturnVehicleAction
| FSQReturnVehicleSuccessAction
| FSQReturnVehicleFailureAction
| GetReturnRegionAction
| GetReturnRegionSuccessAction
| GetReturnRegionFailureAction
| GetReturnRPAction
| GetReturnRPSuccessAction
| GetReturnRPFailureAction
| FsqSearchLoadAction
| FsqSearchLoadSuccessAction
| FsqSearchLoadFailureAction
| FsqRentalpointLoadAction
| FsqRentalpointLoadSuccessAction
| FsqRentalpointLoadFailureAction
| GetFsqRegionByCityAction
| GetFsqRegionByCitySuccessAction
| GetFsqRegionByCityFailureAction
| GetAllRentalPointLoadAction
| GetAllRentalPointLoadSuccessAction
| GetAllRentalPointLoadFailureAction