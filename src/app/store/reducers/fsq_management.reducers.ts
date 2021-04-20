import { FSQMain } from "src/app/models/fsqManagement";
import { FSQManagementAction, FSQManagementActionTypes } from '../actions/fsq_management.action';

const initialState: FSQMain = {
    error: undefined,
    loading: false,
    fsqdetails: [],
    regionItem: [],
    singleFSQ: undefined,
    workItemList: [],
    activeFsq: [],
    singleWorkItem: undefined,
    FSQdetails: undefined,
    SingleFSQShift: undefined,
    FsqShiftRegion: [],
    TaskDetailsList:[],
    FsqShift: undefined,
    incidentDetail: undefined,
    shiftRegionRentalPoint: [],
    VehicleByRentalPoint: [],
    shift_detail: undefined,
    fsq_level: [],
    fsq_hub: [],
    Return_RP: [],
    Return_region: [],
    rentalPointList: [],
}

export function FSQManagementReducer(state: FSQMain = initialState, action: FSQManagementAction) {
    switch (action.type) {
        case FSQManagementActionTypes.FSQ_Management_List_Load:
            return { ...state, loading: true };
        case FSQManagementActionTypes.FSQ_Management_List_Load_Success:
            return { ...state, loading: false, fsqdetails: action.payload };
        case FSQManagementActionTypes.FSQ_Management_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Approve_Request:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Approve_Request_Success:
            return { ...state, loading: false };
        case FSQManagementActionTypes.Approve_Request_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.FSQ_Region_Load:
            return { ...state, loading: true, singleFSQ: undefined };
        case FSQManagementActionTypes.FSQ_Region_Load_Success:
            return { ...state, loading: false, regionItem: action.payload[0], singleFSQ: action.payload[1] };
        case FSQManagementActionTypes.FSQ_Region_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.FSQ_Region_Update_Action:
            return { ...state, loading: true };
        case FSQManagementActionTypes.FSQ_Region_Update_Success_Action:
            return { ...state, loading: false };
        case FSQManagementActionTypes.FSQ_Region_Update_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Edit_Shift_Action:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Edit_Shift_Success_Action:
            return { ...state, loading: false };
        case FSQManagementActionTypes.Edit_Shift_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        //Work Flow Assignment
        case FSQManagementActionTypes.Work_Item_List_Load:
            return { ...state, loading: true, singleWorkItem: undefined };
        case FSQManagementActionTypes.Work_Item_List_Load_Success:
            return { ...state, loading: false, workItemList: action.payload };
        case FSQManagementActionTypes.Work_Item_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Work_Item_Assign_Load:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Work_Item_Assign_Load_Success:
            return { ...state, loading: false, activeFsq: action.payload[0], singleWorkItem: action.payload[1] };
        case FSQManagementActionTypes.Work_Item_Assign_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Work_Item_Assign:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Work_Item_Assign_Success:
            return { ...state, loading: false };
        case FSQManagementActionTypes.Work_Item_Assign_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Verify_Document_Action:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Verify_Document_Success_Action:
            return { ...state, loading: false, fsq_hub: action.payload[2], fsq_level: action.payload[1], FSQdetails: action.payload[0] };
        case FSQManagementActionTypes.Verify_Document_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Get_All_region_Action:
            return { ...state, loading: true, FsqShiftRegion: [] }
        case FSQManagementActionTypes.Get_All_region_Success_Action:
            return { ...state, loading: false, FsqShiftRegion: action.payload }
        case FSQManagementActionTypes.Get_All_region_Success_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Add_Fsq_Shift_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Add_Fsq_Shift_Success_Action:
            return { ...state, loading: false }
        case FSQManagementActionTypes.Add_Fsq_Shift_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Get_All_Shift_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Get_All_Shift_Success_Action:
            return { ...state, loading: false, FsqShift: action.payload[0], breakPoint: action.payload[1] }
        case FSQManagementActionTypes.Get_All_Shift_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Edit_Shift_Load:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Edit_Shift_Success_Load:
            return { ...state, loading: false, vehicle_parts_state: action.payload[0], Countries: action.payload[1], singlePart: action.payload[2] };
        case FSQManagementActionTypes.Edit_Shift_Success_Load:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Delete_FSQ_Shift:
            return { ...state };
        case FSQManagementActionTypes.Delete_FSQ_Shift_Failure:
            return { ...state, error: action.payload };
        //get incident Detail
        case FSQManagementActionTypes.Get_Incident_Detail_Action:
            return { ...state, incidentDetail: undefined, loading: true }
        case FSQManagementActionTypes.Get_Incident_Detail_Success_Action:
            return { ...state, incidentDetail: action.payload, loading: false }
        case FSQManagementActionTypes.Get_Incident_Detail_Failure_Action:
            return { ...state, error: action.payload, loading: false }
        //get fsq taged region
        case FSQManagementActionTypes.Get_FSQ_Taged_Region_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Get_FSQ_Taged_Region_Success_Action:
            return { ...state, loading: false, FsqShiftRegion: action.payload }
        case FSQManagementActionTypes.Get_FSQ_Taged_Region_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Fsq_Active_Inactive_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Fsq_Active_Inactive_Success_Action:
            return { ...state, loading: false }
        case FSQManagementActionTypes.Fsq_Active_Inactive_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Action:
            return { ...state, loading: true, shiftRegionRentalPoint: [] }
        case FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Success_Action:
            return { ...state, loading: false, shiftRegionRentalPoint: action.payload }
        case FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Get_All_Vehicle_Load_Action:
            return { ...state, loading: true, VehicleByRentalPoint: [] }
        case FSQManagementActionTypes.Get_All_Vehicle_Load_Success_Action:
            return { ...state, loading: false, VehicleByRentalPoint: action.payload }
        case FSQManagementActionTypes.Get_All_Vehicle_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Get_All_RentalPoint_Load_Action:
            return { ...state, loading: true, shiftRegionRentalPoint: [] }
        case FSQManagementActionTypes.Get_All_RentalPoint_Load_Success_Action:
            return { ...state, loading: false, shiftRegionRentalPoint: action.payload }
        case FSQManagementActionTypes.Get_All_RentalPoint_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Book_vehicle_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Book_vehicle_Success_Action:
            return { ...state, loading: false }
        case FSQManagementActionTypes.Book_vehicle_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Get_Assign_vehicle_Action:
            return { ...state, loading: true, shift_detail: undefined }
        case FSQManagementActionTypes.Get_Assign_vehicle_Success_Action:
            return { ...state, loading: false, shift_detail: action.payload }
        case FSQManagementActionTypes.Get_Assign_vehicle_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.Fsq_Start_Shift_Action:
            return { ...state }
        case FSQManagementActionTypes.Fsq_Start_Shift_Failure_Action:
            return { ...state, error: action.payload }
        case FSQManagementActionTypes.Fsq_Pause_Shift_Action:
            return { ...state }
        case FSQManagementActionTypes.Fsq_Pause_Shift_Failure_Action:
            return { ...state, error: action.payload }
        case FSQManagementActionTypes.Fsq_Resume_Shift_Action:
            return { ...state }
        case FSQManagementActionTypes.Fsq_Resume_Shift_Failure_Action:
            return { ...state, error: action.payload }
        case FSQManagementActionTypes.Fsq_End_Shift_Action:
            return { ...state }
        case FSQManagementActionTypes.Fsq_End_Shift_Failure_Action:
            return { ...state, error: action.payload }
        case FSQManagementActionTypes.Update_Fsq_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Update_Fsq_Success_Action:
            return { ...state, loading: false, FSQdetails: action.payload }
        case FSQManagementActionTypes.Update_Fsq_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        //fsq start job
        case FSQManagementActionTypes.Start_Job_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Start_Job_Success_Action:
            return { ...state, loading: false }
        case FSQManagementActionTypes.Start_Job_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case FSQManagementActionTypes.FSQ_Return_Vehicle_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.FSQ_Return_Vehicle_Success_Action:
            return { ...state, loading: false }
        case FSQManagementActionTypes.FSQ_Return_Vehicle_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        //return region
        case FSQManagementActionTypes.Get_Return_Region_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Get_Return_Region_Success_Action:
            return { ...state, loading: false, Return_region: action.payload }
        case FSQManagementActionTypes.Get_Return_Region_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        //return region
        case FSQManagementActionTypes.Get_Return_RP_Action:
            return { ...state, loading: true }
        case FSQManagementActionTypes.Get_Return_RP_Success_Action:
            return { ...state, loading: false, Return_RP: action.payload }
        case FSQManagementActionTypes.Get_Return_RP_Failure_Action:
            return { ...state, loading: false, error: action.payload }

        case FSQManagementActionTypes.Fsq_Search_Load:
            return { ...state, loading: true };
        case FSQManagementActionTypes.Fsq_Search_Load_Success:
            return { ...state, loading: false, activeFsq: action.payload };
        case FSQManagementActionTypes.Fsq_Search_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Fsq_Rentalpoint_Load:
            return { ...state, loading: true, rentalPointList: [] };
        case FSQManagementActionTypes.Fsq_Rentalpoint_Load_Success:
            return { ...state, loading: false, rentalPointList: action.payload };
        case FSQManagementActionTypes.Fsq_Rentalpoint_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        // Get Region By City
        case FSQManagementActionTypes.Get_Fsq_Region_By_City_Action:
            return { ...state, loading: true, }
        case FSQManagementActionTypes.Get_Fsq_Region_By_City_Success_Action:
            return { ...state, loading: false, FsqShiftRegion: action.payload }
        case FSQManagementActionTypes.Get_Fsq_Region_By_City_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case FSQManagementActionTypes.Task_Details_List_Action:
            return { ...state, loading: true, }
        case FSQManagementActionTypes.Task_Details_List_Success_Action:
            return { ...state, loading: false, TaskDetailsList: action.payload }
        case FSQManagementActionTypes.Task_Details_List_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }

}