import { CouponManagementAction, CouponManagementActiontypes } from '../actions/coupon_management.action';
import { couponManagementMain } from 'src/app/models/couponManagementModel';

const initialState: couponManagementMain = {
    loading: false,
    error: undefined,
    CouponManagement: [],
    CouponDiscountType: [],
    CouponType: [],
    CouponUsageRestriction: [],
    SingleCoupon: undefined,
    countries: [],
    states: [],
    cities: [],
    customers: [],
    usageDetail: undefined,
    referrals: [],
}

export function CouponManagementReducer(state: couponManagementMain = initialState, action: CouponManagementAction) {
    switch (action.type) {
        //All Coupon List load
        case CouponManagementActiontypes.Coupon_List_Load:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Coupon_List_Load_Success:
            return { ...state, loading: false, CouponManagement: action.payload };
        case CouponManagementActiontypes.Coupon_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };


        //Add Coupon Load
        case CouponManagementActiontypes.Add_Coupon_Load:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Add_Coupon_Load_Success:
            return { ...state, loading: false, CouponDiscountType: action.payload[0], CouponType: action.payload[1], 
                CouponUsageRestriction: action.payload[2], countries: action.payload[3], states: action.payload[4],
                cities: action.payload[5] };
        case CouponManagementActiontypes.Add_Coupon_Load_Failure:
            return { ...state, loading: false, error: action.payload };

        //Add Coupon
        case CouponManagementActiontypes.Add_Coupon:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Add_Coupon_Success:
            return { ...state, loading: false };
        case CouponManagementActiontypes.Add_Coupon_Failure:
            return { ...state, loading: false, error: action.payload };
        //Add Another Coupon
        case CouponManagementActiontypes.Add_Another_Coupon_Action:
            return { ...state, loading: true };

        //Edit Coupon Load
        case CouponManagementActiontypes.Edit_Coupon_Load_Action:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Edit_Coupon_Load_Success_Action:
            return { ...state, loading: false, CouponDiscountType: action.payload[0], CouponType: action.payload[1], 
                CouponUsageRestriction: action.payload[2], SingleCoupon: action.payload[3], countries: action.payload[4], 
                states: action.payload[5], cities: action.payload[6] };
        case CouponManagementActiontypes.Edit_Coupon_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };

        //Edit Coupon
        case CouponManagementActiontypes.Edit_Coupon:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Edit_Coupon_Success:
            return { ...state, loading: false };
        case CouponManagementActiontypes.Edit_Coupon_Failure:
            return { ...state, loading: false, error: action.payload };

        //Delete Coupon
        case CouponManagementActiontypes.Delete_Coupon:
            return { ...state };
        case CouponManagementActiontypes.Delete_Coupon_Failure:
            return { ...state, error: action.payload };

        //Assign Coupon
        case CouponManagementActiontypes.Assign_Coupon_Load:
            return { ...state, loading: true }
        case CouponManagementActiontypes.Assign_Coupon_Load_Success:
            return { ...state, loading: false, SingleCoupon: action.payload }
        case CouponManagementActiontypes.Assign_Coupon_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CouponManagementActiontypes.Assign_Coupon_Customer_Load:
            return { ...state, loading: true }
        case CouponManagementActiontypes.Assign_Coupon_Customer_Load_Success:
            return { ...state, loading: false, customers: action.payload }
        case CouponManagementActiontypes.Assign_Coupon_Customer_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case CouponManagementActiontypes.Assign_Coupon:
            return { ...state, loading: true, }
        case CouponManagementActiontypes.Assign_Coupon_Success:
            return { ...state, loading: false }
        case CouponManagementActiontypes.Assign_Coupon_Failure:
            return { ...state, loading: false, error: action.payload };

        //Usage History
        case CouponManagementActiontypes.Usage_History_Load:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Usage_History_Load_Success:
            return { ...state, loading: false, usageDetail: action.payload };
        case CouponManagementActiontypes.Usage_History_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        
        // Referral List Load
        case CouponManagementActiontypes.Referrals_List_Load_Action:
            return { ...state, loading: true };
        case CouponManagementActiontypes.Referrals_List_Load_Success_Action:
            return { ...state, loading: false, referrals: action.payload };
        case CouponManagementActiontypes.Referrals_List_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
} 