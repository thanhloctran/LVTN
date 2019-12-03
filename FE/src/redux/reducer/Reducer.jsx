import * as CONSTANTS from "../constants/Data";
import Swal from 'sweetalert2'

const initialState = {
    showCartDialog: false,
    showMenu: true,
    loggedInUser: null,

    // data category get on firebase
    categoryData: [],
    menuItems: [],
    expandedItems: [],
    // productData: [],
    //add shopingcart
    paymentInfor: [],
    totalPrice: 0,

    //DANH SÁCH DON DAT HANG THEO TAI KHOAN NGUOI DUNG
    cartData: [],
    soLuong: 0, //soLuongTon update kiem tra sp cong hàng hay ko
    cartItems: [], //array dsSanPham trong dialog
    checkedOutItems: [], //danh sach san pham dat khi thanh toán
    cartInfor: {}, //object thông tin nguyen cai don hang (thong tin don dat hang, ds san pham)
    //custom api______________
    result: {}, //thong báo
    userInfor: sessionStorage.getItem("custommer")?JSON.parse(sessionStorage.getItem('custommer')) :{},  //thông tin người dùng
    listTypeUser: [], // danh sách loại sản phẩm;
    listNewProduct: [],
    listDiscountProduct: [],
    listProductType:[],
    listComment: [],
    listOrder: [],
    productDetail: {}, //chi tiet san pham 
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MENU_DATA:
            {
                state.categoryData = action.categoryData;
                state.expandedItems = action.categoryData.reduce((accum, current) => {
                    if (current.type === "title") {
                        accum[current.id] = true;
                    }
                    return accum;
                }, {});
                state.menuItems = action.categoryData;
                return { ...state };
            }
        //set total price
        case CONSTANTS.SET_TOTAL_PRICE:
            {
                state.totalPrice = action.price;
                return { ...state };
            }
        //clear cart 
        case CONSTANTS.CLEAR_CART: {
            return { ...state, cartItems: [], checkedOutItems: [], totalPrice:0 };
        }

        case CONSTANTS.ADD_ITEM_IN_CART:
            {
                let index = state.cartItems.findIndex(x => x.maSP === action.payload.maSP);
                let store = action.payload.soLuongTon;
                if (store < 0) {
                    console.log("ko đủ hàng");
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Sorry! Out Off Stock ...',
                    })
                    return { ...state };
                }
                // Is the item user wants to add already in the cart?
                if (index !== -1) {
                    // Yes, update the soLuong.
                    let cloneCartItems = [...state.cartItems];
                    cloneCartItems[index] = {
                        ...cloneCartItems[index],
                        soLuong: state.cartItems[index].soLuong + action.payload.soLuong,
                        soLuongTon: state.cartItems[index].soLuongTon - 1
                    };


                    // let clonepayloadSub = [...state.payloadSub];
                    // clonepayloadSub[index] = {
                    //     ...clonepayloadSub[index],
                    //     soLuong: state.payloadSub[index].soLuong + action.payload.soLuong,
                    // };


                    if (cloneCartItems[index].soLuongTon <= 0) {
                        console.log("ko đủ hàng");
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Sorry! Out Off Stock...',
                        })
                        return { ...state };
                    }
                    else {
                        Swal.fire({
                            type: 'success',
                            title: 'Add to cart !',
                            showConfirmButton: false,
                            timer: 700,
                            width: 300
                        })
                        return { ...state, cartItems: cloneCartItems };
                    }

                }
                // No, add a new item.
                Swal.fire({
                    type: 'success',
                    title: 'Add to cart !',
                    showConfirmButton: false,
                    timer: 700,
                    width: 300
                })
                return { ...state, cartItems: state.cartItems.concat(action.payload) };
            }




        case CONSTANTS.UPDATE_CART_ITEM_NUMBER:
            {
                let index = state.cartItems.findIndex(x => x.maSP === action.payload.maSP);

                if (index !== -1) {
                    // let number=0;
                    let cloneCartItems = [...state.cartItems];

                    console.log(action.payload.soLuong, cloneCartItems[index].soLuong);

                    if (action.payload.soLuong > cloneCartItems[index].soLuong) {
                        cloneCartItems[index] = {
                            ...cloneCartItems[index],
                            soLuong: action.payload.soLuong,
                            soLuongTon: state.cartItems[index].soLuongTon - 1
                        };
                    }
                    else {
                        cloneCartItems[index] = {
                            ...cloneCartItems[index],
                            soLuong: action.payload.soLuong,
                            soLuongTon: state.cartItems[index].soLuongTon + 1
                        };

                    }



                    if (cloneCartItems[index].soLuongTon <= 0) {
                        console.log("ko đủ hàng");
                        state.showCartDialog = false;
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Sorry!Out Off Stock...',
                        })
                        return { ...state };
                    }
                    else {
                        return { ...state, cartItems: cloneCartItems };
                    }
                }
                return { ...state };
            }
        //IN STATE REACT ************************************
        case CONSTANTS.SHOW_CART_DLG:
            return { ...state, showCartDialog: action.payload };

        case CONSTANTS.DELETE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.maSP !== action.payload)
            };

        case CONSTANTS.TOGGLE_MENU:
            return { ...state, showMenu: !state.showMenu };


        case CONSTANTS.SET_LOGGED_IN_USER:
            return { ...state, loginStatus: false, userInfor: {} };


        case CONSTANTS.SET_CHECKEDOUT_ITEMS:
            return { ...state, checkedOutItems: action.payload };
        //NEW GET DATAA FROM API .NET****************************

        //add new customer
        case CONSTANTS.ADD_USER: {
            // console.log(action.result);
            Swal.fire({
                title: action.result,
                showConfirmButton: true,
            })
            return { ...state };
        }
        //add order
        case CONSTANTS.ADD_ORDER: {
            if (action.result === "success") {
                Swal.fire({
                    type: 'success',
                    title: 'Your order has been save',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
            return { ...state };
        }
        //add comment
        case CONSTANTS.ADD_COMMENT: {
            if (action.result === "success") {
                Swal.fire({
                    type: 'success',
                    title: 'Pose review success',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
            Swal.fire({
                type: 'error',
                title: action.result,
                showConfirmButton: true,
                // timer: 1000
            })
            return { ...state };
        }
        //login
        case CONSTANTS.LOGIN: {
            if (typeof action.result === "object") {
                if (action.result.maLoaiND === "KH") {
                    sessionStorage.setItem("custommer", JSON.stringify(action.result))
                }
                else {
                    sessionStorage.setItem("employee", JSON.stringify(action.result))
                }
                state.loginStatus = true;
                state.userInfor = action.result;
                state.loggedInUser = action.result.taiKhoan;
                return { ...state };
            }
            else {
                Swal.fire({
                    type: "error",
                    title: action.result,
                    timer: 1000
                })
                break;
            }

        }
        //update account user 
        case CONSTANTS.UPDATE_USER: {
            if (typeof action.result === "object") {
                Swal.fire({
                    type: 'success',
                    title: 'Update infor success',
                    showConfirmButton: false,
                    timer: 1000
                })
                return { ...state };
            }
            else {
                Swal.fire({
                    type: "error",
                    title: action.result,
                    timer: 1000
                })
                break;
            }
        }
        //get deatail user 
        case CONSTANTS.GET_DETAILUSER: {
            //ok
            state.userInfor = action.result;
            return { ...state };
        }
        // case CONSTANTS.GET_PRODUCT_DATA:
        //     {
        //         state.productData = action.productData;
        //         return { ...state };
        //     }
        case CONSTANTS.GET_LISTNEWPRODUCT:
            {
                state.listNewProduct = action.listProduct;
                return { ...state };
            }
        case CONSTANTS.GET_LISTDISCOUNTPRODUCT:
            {
                state.listDiscountProduct = action.listProduct;
                return { ...state };
            }
        case CONSTANTS.GET_LISTPRODUCTBYTYPE:
            {
                state.listProductType = action.listProduct;
                return { ...state };
            }
        case CONSTANTS.GET_LISTCOMMENT:
            {
                state.listComment = action.listData;
                return { ...state };
            }
        case CONSTANTS.GET_DETAILPRODUCT:
            {
                state.productDetail = action.result;
                return { ...state };
            }
        default: return { ...state };

    }


};

export default rootReducer;
