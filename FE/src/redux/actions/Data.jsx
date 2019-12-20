import * as CONSTANTS from "../constants/Data";
import firebase from 'firebase';
import axios from 'axios';
import { domain } from './../../config/setting'


export const handleSubmitMail=(tenNguoiNhan, email, soDT, diaChi, dsSanPham, ngayTao, tongTien, tinhTrang)=> {
  const templateId = 'shopotemplate';
  const serviceId = 'ShopO_gmail_com';
  const userId = 'user_QjJ2xI8tto5p7sBwmt4Jg';
  const receiveMail = email;
  let tinhTrangThanhToan= "Paid by PayPal"
if(tinhTrang.toString()==='1'){
  tinhTrangThanhToan= "Pay in Delivery"
}
  var templateParams = {
    name: 'James',
    notes: 'Check this out!',
    from_name: 'ShopO@gmail.com',
    to_name: receiveMail,
    to_mail: 'n15dccn118@student.ptithcm.edu.vn',
    tenNguoiNhan:tenNguoiNhan,
    email:email,
    soDT:soDT,
    diaChi: diaChi,
    dsSanPham: dsSanPham,
    ngayTao: ngayTao,
    tongTien: tongTien,
    tinhTrang: tinhTrangThanhToan,

  };
  //console.log(templateParams);
  window.emailjs.send(serviceId, templateId, templateParams, userId).then(function (response) {
    console.log('SUCCESS!', response.status, response.text);
  }, function (error) {
    console.log('FAILED...', error);
  });
  return;
}


export const getMenuDataAction = () => {
  return dispatch => {
    firebase.database().ref().child("Categories").once("value").then((snapshot) => {
      dispatch({
        type: CONSTANTS.GET_MENU_DATA,
        categoryData: snapshot.val()
      })
    }).catch((error) => {
      console.log(error.massage);

    })
  }
}


// add cart into database
// export const addShoppingCartAction = (cart) => {
//   return {
//     type: CONSTANTS.ADD_SHOPPING_CART,
//     cart
//   }
// }

//dang kí thành vien khách hàng. 
export const addUserAction = (user) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyNguoiDung/DangKy`,
      method: 'POST',
      data: user
    }).then(result => {
      dispatch({
        type: CONSTANTS.ADD_USER,
        result: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//dang nhập
export const loginAction = (inforLogin) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyNguoiDung/DangNhap`,
      method: 'POST',
      data: inforLogin
    }).then(result => {
      console.log(result.data);
      
      dispatch({
        type: CONSTANTS.LOGIN,
        result: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET LIST PRODUCT ADMIN
export const getListProductAction = (trangThai) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayDanhSachSanPhamAdmin?key=${trangThai}`,
      method: 'GET'
    }).then((result) => {
      // console.log("ListProductAction", result.data);
      dispatch({
        type: CONSTANTS.GET_LISTPRODUCT_AD,
        listProduct: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//update account 
export const updateAccountAction = (user) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: 'PUT',
      data: user
    }).then(result => {
      dispatch({
        type: CONSTANTS.UPDATE_USER,
        result: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }

}
//get detail user 
export const getDetailUserAction = (id) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${id}`,
      method: 'GET'
    }).then(result => {
      dispatch({
        type: CONSTANTS.GET_DETAILUSER,
        result: result.data
      })
    }).catch(error => {
      console.log(error);

    })
  }
}

//them don dat hang
export const addOrderAction = (order) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyDatHang/ThemDonDatHang`,
      method: 'POST',
      data: order
    }).then(result => {
      if(result.data==="success"){
        // handleSubmitMail(order.tenNguoiNhan, order.email, order.soDT, order.diaChiNhan,order.dsInMail, order.ngayTao, order.tongTien, order.tinhTrang);
        clearCartAction();
      }
      dispatch({
        type: CONSTANTS.ADD_ORDER,
        result: result.data,
      })
    }).catch(error => {
      console.log(error);

    })
  }
}
//them binh luan
export const addCommentAction = (comment) => {
  return dispatch => {
    axios({
      url: `${domain}BinhLuan/ThemBinhLuan`,
      method: 'POST',
      data: comment
    }).then(result => {
      dispatch({
        type: CONSTANTS.ADD_COMMENT,
        result: result.data
      })
    }).catch(error => {
      console.log(error);

    })
  }
}

//lay danh sách sản phẩm mới
export const getListNewProductAction = () => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayDanhSachSanPhamMoi`,
      method: 'GET'
    }).then((result) => {
      dispatch({
        type: CONSTANTS.GET_LISTNEWPRODUCT,
        listProduct: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//lay danh sách sản phẩm theo loai san pham
export const getListProductByTypeAction = (loaiSP) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayDanhSachSanPhamTheoLoai?maLoaiSP=${loaiSP}`,
      method: 'GET'
    }).then((result) => {
      dispatch({
        type: CONSTANTS.GET_LISTPRODUCTBYTYPE,
        listProduct: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//lay danh sách bình luận theo mã sanp pham
export const getListCommentAction = (id) => {
  return dispatch => {
    axios({
      url: `${domain}BinhLuan/LayDanhSachBinhLuanTheoSanPham?maSP=${id}`,
      method: 'GET'
    }).then((result) => {
      dispatch({
        type: CONSTANTS.GET_LISTCOMMENT,
        listData: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//lay danh sách sản phẩm giảm giá
export const getListDiscountProductAction = () => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayDanhSachSanPhamKhuyenMai`,
      method: 'GET'
    }).then((result) => {
      dispatch({
        type: CONSTANTS.GET_LISTDISCOUNTPRODUCT,
        listProduct: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//get detail product
export const getDetailProductAction = (maSP) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayChiTietSanPhamClient?maSP=${maSP}`,
      method: 'GET',
    }).then(result => {
      dispatch({
        type: CONSTANTS.GET_DETAILPRODUCT,
        result: result.data
      })
    }).catch(error => {
      console.log(error);

    })
  }
}


//clear cart when discart or puchare success
export const clearCartAction = () => ({
  type: CONSTANTS.CLEAR_CART,
});
//set total price
export const setTotalPriceAction = (price) => {
  return {
    type: CONSTANTS.SET_TOTAL_PRICE,
    price
  }
}

//khi click vào 1 item => lay thông tin
//product add vào 1 mảng 
export const addItemInCartAction = (item) => {
  // console.log("item",  item);
  return dispatch => {
    dispatch({
      type: CONSTANTS.ADD_ITEM_IN_CART,
      payload: item,
    })
  }

};

export const showCartDlg = status => ({
  type: CONSTANTS.SHOW_CART_DLG,
  payload: status
});
export const deleteCartItem = id => ({
  type: CONSTANTS.DELETE_CART_ITEM,
  payload: id
});
export const toggleMenu = () => ({
  type: CONSTANTS.TOGGLE_MENU,
  payload: null
});
export const updateCartItemQnt = obj => (
  {
    type: CONSTANTS.UPDATE_CART_ITEM_NUMBER,
    payload: obj,

  });
export const setCheckedOutItems = items => ({
  type: CONSTANTS.SET_CHECKEDOUT_ITEMS,
  payload: items
});
export const setLoggedInUser = userName => ({
  type: CONSTANTS.SET_LOGGED_IN_USER,
  payload: userName
});




