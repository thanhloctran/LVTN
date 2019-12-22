import * as CONSTANTS from "../constants/Data";
import axios from 'axios';
import { domain } from './../../config/setting';
export const handleSubmitMailUpdate=(email)=> {
  const templateId = 'deliveryTempale';
  const serviceId = 'ShopO_gmail_com';
  const userId = 'user_QjJ2xI8tto5p7sBwmt4Jg';
  const receiveMail = email;
  var templateParams = {
    to_name: receiveMail,
    to_mail: 'n15dccn118@student.ptithcm.edu.vn',
    content: "<div style='width: max-content; margin: 0 auto;''><img src='https://lh5.googleusercontent.com/ijnBHpDpbDzh8WnmaZ6m2Jk6gcJS3dV29Zo9IFoMMdZdYhvJ4JPQjSBzWE10s4dpvfoIiUwdI94EEdTChi9Cu9pj0J7lgWpL-3yEtVTMO83wHxAfiCBx3PjGdxcNkKEXOirLxS35' alt='' /></div>"
  };
  //console.log(templateParams);
  window.emailjs.send(serviceId, templateId, templateParams, userId).then(function (response) {
    console.log('SUCCESS!', response.status, response.text);
  }, function (error) {
    console.log('FAILED...', error);
  });
  return;
}


//GET LIST ORDER ADMIN
export const getListOrderAction = (trangThai) => {
  return dispatch => {
    axios({
      url:  `${domain}QuanLyDatHang/LayDanhSachDonDatHang?trangThai=${trangThai}`,
      method: 'GET'
    }).then(result => {
     // console.log("ListOrderAction", result.data);
      dispatch({
        type: CONSTANTS.GET_LISTORDER_AD,
        listOrderAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//lay danh sach dơn dat hang theo taiKhoan nguoi dung
export const getListOrderClientAction = (taiKhoan, trangThai) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyDatHang/LayDanhSachDonDatHangTheoND?taiKhoan=${taiKhoan}&trangThai=${trangThai}`,
      method: 'GET',
    }).then(result => {
      // console.log(result.data);
      
      dispatch({
        type: CONSTANTS.GET_LISTORDER_CLIENT,
        listOrder: result.data
      })
    }).catch(error => {
      console.log(error);

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
        listProductAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//GET LIST SP KM INSERT 
export const getListProductDiscountAction = (trangThai) => {
  return dispatch => {
    axios({
      url: `${domain}KhuyenMai/DanhSachSanPhamInsertKM`,
      method: 'GET'
    }).then((result) => {
      // console.log("ListProductAction", result.data);
      dispatch({
        type: CONSTANTS.GET_LISTPRODUCT_AD,
        listProductAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET LIST REVIEW ADMIN
export const getListReviewAction = () => {
  return dispatch => {
    axios({
      url: `${domain}BinhLuan/LayDanhSachBinhLuan`,
      method: 'GET'
    }).then((result) => {
      console.log("review",result.data);
      dispatch({
        type: CONSTANTS.GET_LISTREVIEW_AD,
        listReviewAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET LIST DISCOUNT ADMIN
export const getListDiscountAction = () => {
  return dispatch => {
    axios({
      url: `${domain}KhuyenMai/LayDanhSachKhuyenMai`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTDISCOUNT_AD,
        listDiscountAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}


//GET LIST CUSTOMER ADMIN
export const getListCustomerAction = (key) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyNguoiDung/LayDanhSachNguoiDung?loaiND=${key}`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTCUSTOMER_AD,
        listCustomerAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//GET LIST CATEGORY
export const getListCategoryAction = () => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayDanhSachLoaiSanPham`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTCATEGORY_AD,
        listCategoryAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//GET LIST INVOICE //PHIEU NHAP
export const getListInvoiceAction = () => {
  const  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
  const token = retrievedObject.accessToken;
  return dispatch => {
    axios({
      url: `${domain}QuanLyNhapHang/LayDanhSachPhieuNhap`,
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTINVOIE_AD,
        listInvoiceAD: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//GET LIST PRODUCER

export const getListProducerAction = () => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyThongTinDT/LayDanhSachNhaSanXuat`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTPRODUCER_AD,
        listProducer: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//GET LIST PROVIDER
export const getListProviderAction = () => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyThongTinDT/LayDanhSachNhaCungCap`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTPROVIDER_AD,
        listProvider: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//GET WARRANTY
export const getListWarrantyAction = (key) => {
  return dispatch => {
    axios({
      url: `${domain}ThongKeBanHang/LayDanhSachBaoHanh?trangThai=${key}`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTWARRANTY_AD,
        result : result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}



//GET LIST TYPE PRODUCT
export const getListTypeProductAction = () => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayDanhSachLoaiSanPham`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_LISTTYPEPRODUCT_AD,
        listTypeProduct: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET THONG KE
export const statisticAction = (ngayBD, ngayKT) => {
  // console.log(ngayBD, ngayKT);
  return dispatch => {
    axios({
      url: `${domain}ThongKeBanHang/ThongKeDoanhThu?ngayBD=${ngayBD}&ngayKT=${ngayKT}`,
      method: 'GET'
    }).then((result) => {
      // console.log(result.data);
      dispatch({
        type: CONSTANTS.STATISTIC_AD,
        statisticData : result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET THONG KE BAN RA THEO NAM
export const getOrderYearAction = (year) => {
  // console.log(ngayBD, ngayKT);
  return dispatch => {
    axios({
      url: `${domain}ThongKeBanHang/ThongKeBanHang?nam=${year}`,
      method: 'GET'
    }).then((result) => {
   //  console.log(result.data);
      
      dispatch({
        type: CONSTANTS.GETORDERYEAR,
        result : result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET THONG KE BAN RA THEO NAM
export const getInvoiceYearAction = (year) => {
  return dispatch => {
    axios({
      url: `${domain}ThongKeBanHang/ThongKeNhapHang?nam=${year}`,
      method: 'GET'
    }).then((result) => {
     // console.log(result.data);
      dispatch({
        type: CONSTANTS.GETINVOICEYEAR,
        result : result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
/*GET DEAIL*****************************************************/



// GET ORDER DEAIL
export const getDetailOrderAction = (maDDH) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLyDatHang/LayChiTietDonDatHang?MaDDH=${maDDH}`,
      method: 'GET'
    }).then((result) => {
      //console.log(result.data);
      
      dispatch({
        type: CONSTANTS.GET_DETAILORDER_AD,
        orderDetail: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET PRODUCT DETAIL

export const getDetailProductAction = (maSP) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayChiTietSanPhamAdmin?maSP=${maSP}`,
      method: 'GET'
    }).then((result) => {
      //console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_DETAILPRODUCT_AD,
        productDetail: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}

//GET REVIREVIEW DETAIL 
export const getDetailReviewAction = (id) => {

  return dispatch => {
    axios({
      url: `${domain}BinhLuan/LayChiTietBinhLuanAD?MaBL=${id}`,
      method: 'GET'
    }).then(result => {
      dispatch({
        type: CONSTANTS.GET_DETAILREVIEW_AD,
        reviewDetail : result.data
      })
    }).catch(error => {
      console.log(error.data);
  
    })
  }
}
//GET DISCOUNT DETAIL
export const getDetailDiscountAction=(id)=>{
  return dispatch => {
    axios({
      url: `${domain}KhuyenMai/LayThongTinChiTietKhuyenMai?MaKM=${id}`,
      method: 'GET'
    }).then(result => {
      dispatch({
        type: CONSTANTS.GET_DETAILDISCOUNT_AD,
        discountDetail : result.data
      })
    }).catch(error => {
      console.log(error.data);
  
    })
  }
}

//GET INVOICE DETAIL 
export const getDetailInvoiceAction =(id)=>{
  return dispatch => {
    axios({
      url: `${domain}QuanLyNhapHang/LayChiTietPhieuNhapAD?maPN=${id}`,
      method: 'GET'
    }).then(result => {
      console.log(result.data);
      
      dispatch({
        type: CONSTANTS.GET_DETAILINVOICE_AD,
        invoiceDetail : result.data
      })
    }).catch(error => {
      console.log(error.data);
  
    })
  }
}
//GET PRODUCT SERI DETAIL 
export const getDetailSeriAction =(id)=>{
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/LayChiTietSeri?maSeri=${id}`,
      method: 'GET'
    }).then(result => {
      console.log(result.data);
      
      dispatch({
        type: CONSTANTS.GET_DETAILSERI_AD,
        result : result.data
      })
    }).catch(error => {
      console.log(error.data);
  
    })
  }
}

//GET PRODUCT SERI DETAIL 
export const getDetailWarantyAction =(id)=>{
  return dispatch => {
    axios({
      url: `${domain}ThongKeBanHang/LayChiTietBaoHanh?maBH=${id}`,
      method: 'GET'
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: CONSTANTS.GET_DETAILWARRANTY_AD,
        result : result.data
      })
    }).catch(error => {
      console.log(error.data);
  
    })
  }
}
/***************************************************** ACTION*/

//UPDATE PRODUCT 
export const updateProductAction = (product) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/SuaThongTinSanPham`,
      method: 'PUT',
      data: product
    }).then((result) => {
     // console.log("infor", product);
      dispatch({
        type: CONSTANTS.UPDATEPRODUCT_AD,
        result: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//UPDATE PRODUCT 
export const upLoadImageAction = (fileHinhAnh) => {
  return dispatch => {
    axios({
      url: `${domain}QuanLySanPham/UploadHinhAnhSanPham`,
      method: 'POST',
      data: fileHinhAnh,
    }).then((result) => {
      dispatch({
        type: CONSTANTS.UPLOADIMAGE_AD,
        result: result.data
      })
    }).catch(error => {
      console.log(error);

    })
  }
}
export const updateDiscountAction = (discount) => {
  return dispatch => {
    axios({
      url: `${domain}KhuyenMai/SuaKhuyenMai`,
      method: 'PUT',
      data: discount
    }).then((result) => {
     // console.log("infor", product);
      dispatch({
        type: CONSTANTS.UPDATEDISCOUNT_AD,
        result: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
export const updateOrderStatusAction = (order) => {
  return dispatch => {
    axios({
      url: `${domain}/QuanLyDatHang/CapNhatTrangThaiDonHang`,
      method: 'PUT',
      data: order
    }).then((result) => {
    //  console.log("infor", result.data);
     handleSubmitMailUpdate(result.email);
      dispatch({
        type: CONSTANTS.UPDATEORDERSTATUS_AD,
        result: result.data
      })
    }).catch(error => {
      console.log(error.data);

    })
  }
}
//UPADTE WARRANTY
export const updateWarrantyAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}ThongKeBanHang/CapNhatThongTinBaoHanh`,
    method: 'PUT',
    data: item
  }).then(result => {
    
    dispatch({
      type: CONSTANTS.UPADTE_WARANTY,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}



//DELETE PRODUCT ACTION
export const deleteProductAction = (maSP, trangThai) => {
  const  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
  const token = retrievedObject.accessToken;
  return dispatch => {
  axios({
    url: `${domain}QuanLySanPham/XoaSanPham?MaSP=${maSP}&trangThai=${trangThai}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(result => {
    console.log(result.data);
    
    dispatch({
      type: CONSTANTS.DELETE_PRODUCT,
      result : result.data
    })
  }).catch(error => {
    console.log(error.data);

  })
}
}


/************************************************ACTION*/
//ADD PRODUCT

export const addProductAction = (product) => {
  return dispatch => {
  axios({
    url: `${domain}QuanLySanPham/ThemSanPham`,
    method: 'POST',
    data: product
  }).then(result => {
    console.log(result.data);
    
    dispatch({
      type: CONSTANTS.ADD_PRODUCT,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}

//ADD INVOICE
export const addInvoiceAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}QuanLyNhapHang/ThemPhieuNhap`,
    method: 'POST',
    data: item
  }).then(result => {
    console.log(result.data);
    
    dispatch({
      type: CONSTANTS.ADD_INVOICE,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}

//ADD INVOICE
export const addDiscountAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}KhuyenMai/ThemKhuyenMai`,
    method: 'POST',
    data: item
  }).then(result => {
    console.log(result.data);
    
    dispatch({
      type: CONSTANTS.ADD_DISCOUNT,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}
//ADD INVOICE
export const addReplyReviewADAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}BinhLuan/ThemTraLoiBinhLuan`,
    method: 'POST',
    data: item
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.ADD_REPLY_AD,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}

//ADD PRODUCER
export const addProducerAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}QuanLyThongTinDT/ThemNhaSanXuat`,
    method: 'POST',
    data: item
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.ADD_REPLY_AD,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}


//ADD PROVIDER
export const addProviderAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}QuanLyThongTinDT/ThemNhaCungCap`,
    method: 'POST',
    data: item
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.ADD_REPLY_AD,
      result : result.data
    })
  }).catch(error => {
    console.log(error);
  })
}
}
//ADD WARRANTY
export const addWarrantyAction = (item) => {
  return dispatch => {
  axios({
    url: `${domain}ThongKeBanHang/ThemBaoHanh`,
    method: 'POST',
    data: item
  }).then(result => {
    
    dispatch({
      type: CONSTANTS.ADD_WARANTY,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}

//DELETE REVIEW 
export const deleteReviewAction = (maBL) => {
  return dispatch => {
  axios({
    url: `${domain}BinhLuan/XoaBinhLuan?MaBL=${maBL}`,
    method: 'DELETE',
  }).then(result => {
    dispatch({
      type: CONSTANTS.DELETE_REVIEW,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}
//DELETE USER 
export const deleteUserAction = (maND, loaiND) => {
  const  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
  const token = retrievedObject.accessToken;
  return dispatch => {
  axios({
    url: `${domain}QuanLyNguoiDung/XoaNguoiDung?maND=${maND}&loaiND=${loaiND}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(result => {
    //console.log(result.data);
    dispatch({
      type: CONSTANTS.DELETE_USER,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}
//DELETE ORDER 
export const deleteOrderAction = (maDDH) => {
  return dispatch => {
  axios({
    url: `${domain}QuanLyDatHang/XoaDonDatHang?MaDDH=${maDDH}`,
    method: 'DELETE',
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.DELETE_ORDER,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}
//DELETE DISCOUNT
export const deleteDiscountAction = (maKM) => {
  return dispatch => {
  axios({
    url: `${domain}KhuyenMai/XoaKhuyenMai?MaKM=${maKM}`,
    method: 'DELETE',
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.DELETE_DISCOUNT,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}

//DELETE INVOICE
export const deleteInvoiceAction = (maPN) => {
  return dispatch => {
  axios({
    url: `${domain}QuanLyNhapHang/XoaPhieuNhap?maPN=${maPN}`,
    method: 'DELETE',
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.DELETE_INVOICE,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}
//DELETE INVOICE
export const deleteReplyAction = (maPN) => {
  return dispatch => {
  axios({
    url: `${domain}BinhLuan/XoaTraLoiBinhLuan?MaCauTraLoi=${maPN}`,
    method: 'DELETE',
  }).then(result => {
    console.log(result.data);
    dispatch({
      type: CONSTANTS.DELETE_REPLYREVIEW,
      result : result.data
    })
  }).catch(error => {
    console.log(error);

  })
}
}






