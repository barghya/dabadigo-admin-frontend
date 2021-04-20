import { MaintenanceJobsMain } from 'src/app/models/maintenanceJobsModel';
import { MaintenanceJobsActions, MaintenanceJobsActionTypes } from '../actions/maintenance_jobs.action';

const initialState: MaintenanceJobsMain = {
    error: undefined,
    loading: false,
    maintenanceJobs: [],
    countries: [],
    fsqList: [],
    problemStatusList: [],
    regions: [],
    rentalPointList: [],
    states: [],
    vehicles: [],
    fsqLevelList: [],
    maintenanceJobDetail: undefined,
    vehicleTypes: [],
    maintenanceSchedules: [],
    cities: [],
    activeBeus: [],
}

export function MaintenanceJobsReducer(state: MaintenanceJobsMain = initialState, action: MaintenanceJobsActions) {
    switch (action.type) {
        case MaintenanceJobsActionTypes.Maintenance_Jobs_Load:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Jobs_Load_Success:
            return { ...state, loading: false, maintenanceJobs: action.payload[0],
                countries: action.payload[1],
                states: action.payload[2],
                regions: action.payload[3],
                vehicles: action.payload[4],
                problemStatusList: action.payload[5],
                fsqLevelList: action.payload[6],
                cities: action.payload[7],
                activeBeus: action.payload[8] };
        case MaintenanceJobsActionTypes.Maintenance_Jobs_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load_Success:
            return { ...state, loading: false, rentalPointList: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Fsq_Load:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Fsq_Load_Success:
            return { ...state, loading: false, fsqList: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Fsq_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Jobs_Filter:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Jobs_Filter_Success:
            return { ...state, loading: false, maintenanceJobs: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Jobs_Filter_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load:
            return { ...state, loading: true, maintenanceJobDetail: undefined };
        case MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load_Success:
            return { ...state, loading: false, maintenanceJobDetail: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Resolve:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Job_Resolve_Success:
            return { ...state, loading: false };
        case MaintenanceJobsActionTypes.Maintenance_Job_Resolve_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load:
            return { ...state, loading: true, fsqList: [] };
        case MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load_Success:
            return { ...state, loading: false, fsqList: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Assign:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Job_Assign_Success:
            return { ...state, loading: false };
        case MaintenanceJobsActionTypes.Maintenance_Job_Assign_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Create_Load:
            return { ...state, loading: true, vehicles: [] };
        case MaintenanceJobsActionTypes.Maintenance_Job_Create_Load_Success:
            return { ...state, loading: false, vehicles: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Create_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Job_Create:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Job_Create_Success:
            return { ...state, loading: false };
        case MaintenanceJobsActionTypes.Maintenance_Job_Create_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Load:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Load_Success:
            return { ...state, loading: false, vehicleTypes: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load:
            return { ...state, loading: true, maintenanceSchedules: [] };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load_Success:
            return { ...state, loading: false, maintenanceSchedules: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Update:
            return { ...state, loading: true };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Success:
            return { ...state, loading: false };
        case MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }

}