import * as types from "../constants/Data";
import Swal from 'sweetalert2'
// If multiple components need access to some data, in that case we store such data in redux.
const stateDefault = {
    listDataAD: [],
    listOrder: [],
    listReview: [],
    detail: {},
    //reviewDetail:{},
    orderDetail: {},
    listProvider: [],
    listProducer: [],
    listTypeProduct: [],
    result: "",
    deleteResult: "",
    statisticData: {},
    listOrderByYear: [],
    listInvoiceYear: [],
    // resultDelete: "",
};

function showMassage(type, mesage) {
    Swal.fire({
        type: type,
        title: mesage,
        timer: 1500,
        showConfirmButton: false
    });
}
const rootReducerAD = (state = stateDefault, action) => {
    switch (action.type) {
        //get List data

        case types.GET_LISTORDER_AD:  //order 
            {
                state.listOrder = action.listOrderAD;
                return { ...state }
            }
        case types.GET_LISTORDER_CLIENT:  //order client 
            {
                state.listOrder = action.listOrder;
                return { ...state };
            }
        case types.GET_LISTPRODUCT_AD: //product
            {
                state.listDataAD = action.listProductAD;
                return { ...state }
            }
        case types.GET_LISTREVIEW_AD:  //review
            {
                state.listReview = action.listReviewAD;
                state.deleteResult = "";
                return { ...state }
            }
        case types.GET_LISTCUSTOMER_AD:  //customer
            {
                state.listDataAD = action.listCustomerAD;
                return { ...state }
            }
        case types.GET_LISTCATEGORY_AD:  //category
            {
                state.listDataAD = action.listCategoryAD;
                return { ...state }
            }
        case types.GET_LISTDISCOUNT_AD:  //discount
            {
                state.listDataAD = action.listDiscountAD;
                return { ...state }
            }
        case types.GET_LISTINVOIE_AD:  //invoice
            {
                state.listDataAD = action.listInvoiceAD;
                return { ...state }
            }

        case types.GET_LISTPROVIDER_AD: //provider
            {
                state.listProvider = action.listProvider;
                return { ...state }
            }

        case types.GET_LISTPRODUCER_AD:  //producer
            {
                state.listDataAD = action.listProducer;
                return { ...state }
            }

        case types.GET_LISTTYPEPRODUCT_AD: //type product
            {
                state.listTypeProduct = action.listTypeProduct;
                return { ...state }
            }
        case types.STATISTIC_AD:  //doanh thu ban hang
            {
                state.statisticData = action.statisticData;
                return { ...state }
            }
        case types.GETORDERYEAR:  //doanh so ban ra the nam
            {
                state.listOrderByYear = action.result;
                return { ...state }
            }
        case types.GETINVOICEYEAR:  //doanh so ban ra the nam
            {
                state.listInvoiceYear = action.result;
                return { ...state }
            }

        //get detail data
        case types.GET_DETAILPRODUCT_AD://get product
            {
                state.detail = action.productDetail;
                return { ...state }
            }
        case types.GET_DETAILORDER_AD://get order
            {
                state.orderDetail = action.orderDetail;
                //  console.log(state.orderDetail);
                return { ...state }
            }
        case types.GET_DETAILREVIEW_AD://get review
            {
                state.detail = action.reviewDetail;
                return { ...state }
            }
        case types.GET_DETAILDISCOUNT_AD://get discount
            {
                state.detail = action.discountDetail;
                return { ...state }
            }
        case types.GET_DETAILINVOICE_AD://get INVOICE 
            {
                state.detail = action.invoiceDetail;
                return { ...state };

            }

        //update product
        case types.UPDATEPRODUCT_AD:
            {
                // console.log("update", action.result);
                if (typeof action.result == "object") {
                    showMassage("success", "Update Successfull")
                }
                else {
                    showMassage("error", action.result);
                    break;
                }

                state.result = action.result;
                return { ...state }
            }
        case types.UPDATEORDERSTATUS_AD:  //cap nhat trang thai don hang      
            {
                if (typeof (action.result) === "object") {
                    showMassage("success", "Update order Successfull")
                    state.orderDetail = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        case types.UPDATEDISCOUNT_AD://cap nhat khuyen mai           
            {
                if (typeof(action.result) !== "string") {
                    showMassage("success", "Update discount Successfull")
                    state.detail = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        case types.DELETE_PRODUCT: //delete product
            {
                if (action.result === "success") {
                    showMassage("success", "Delete product Successfull")
                    state.result = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }

        case types.DELETE_ORDER: //delete order 
            {

                if (action.result === "success") {
                    showMassage("success", "Delete order Successfull")
                    state.result = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        case types.DELETE_DISCOUNT://delete discount
            {
                if (typeof(action.result) === "string") {
                    showMassage("error", action.result);
                    break;
                }
                showMassage("success", "Delete discount Successfull")
                state.listDataAD = action.result;
                return { ...state }

            }
        //delete invoice
        case types.DELETE_INVOICE:
            {
                if (action.result === "success") {
                    showMassage("success", "Delete invoice Successfull")
                    state.result = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        //delete review
        case types.DELETE_REVIEW:
            {
                // console.log(typeof(action.result));
                if (typeof (action.result) === "string") {
                    showMassage("error", action.result);
                    break;

                }
                showMassage("success", "Update order Successfull")
                state.listReview = action.result;
                return { ...state }

            }
        //delete reply review
        case types.DELETE_REPLYREVIEW:
            {
                // console.log(typeof(action.result));
                if (typeof (action.result) === "string") {
                    showMassage("error", action.result);
                    break;

                }
                state.detail = action.result;
                return { ...state }

            }
        //delete user
        case types.DELETE_USER: {
            if (typeof (action.result) === "string") {
                showMassage("error", action.result);
                break;

            }
            state.listDataAD = action.result;
            return { ...state }
        }
        //add repply    
        case types.ADD_REPLY_AD:
            {
                // console.log(typeof(action.result));
                if (typeof (action.result) === "string") {
                    showMassage("error", action.result);
                    break;
                }
                state.detail = action.result;
                return { ...state }

            }
        //add product
        case types.ADD_PRODUCT:
            {
                if (action.result === "success") {
                    showMassage("success", "Add product Successfull")
                    state.result = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        //add inovice
        case types.ADD_INVOICE:
            {
                if (action.result === "success") {
                    showMassage("success", "Insert Invoice Successfull")
                    state.result = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        //add discount
        case types.ADD_DISCOUNT:
            {
                if (action.result === "success") {
                    showMassage("success", "Create Discount Successfull")
                    state.result = action.result;
                    return { ...state }
                }
                showMassage("error", action.result);
                break;
            }
        case types.ADD_USER: {
            if (action.result === "success") {
                showMassage("success", "Successfull")
                state.result = action.result;
                return { ...state }
            }
            showMassage("error", action.result);
            break;
        }
        default:
            return { ...state }
    }
}

export default rootReducerAD;
