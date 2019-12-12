import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from 'redux';
import {
  clearCartAction,
  addOrderAction,
} from "./../../redux/actions/Data"
import Swal from 'sweetalert2'
// import AssignmentIcon from "@material-ui/icons/Assignment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Form,
  Input,
  Button,
  // Modal
} from 'antd';
import moment from "moment";

class payment extends Component {
  state = {
    detailUser: {},
    listProduct: [],
  }
  cartInfor = {}
  checkEmty=()=>{
    if (this.props.checkedOutItems.length === 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: "You don't have any item in Cart! Go shopping",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Start Shoping!'
      }).then((result) => {
        if (result.value) {
          this.props.history.push("/search");
        }
      })
      return false;
    }
    return true;

  }
  //handel when click pay pal button
  handleSubmitPaypal=()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let idKH = 0;
        if (typeof (this.props.userInfor.maND) !== "undefined") {
          idKH = this.props.userInfor.maND
        }
        const fieldsValue = {...values, }
        this.cartInfor = {
          dsSanPham: this.props.checkedOutItems,
          tenNguoiNhan: fieldsValue.tenNguoiNhan,
          ngayDat: moment().format("MM/DD/YYYY HH:mm:ss"),
          ngayXuLy: null,
          maKH: idKH,
          maNV: 0,
          trangThai: 0,
          tinhTrang:1,
          diaChiNhan: fieldsValue.diaChiNhan,
          soDT: fieldsValue.soDT,
          email: fieldsValue.email,
          dsInMail:"",
          tongTien: (this.props.totalPrice).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })

        }
        let dsach= "";
        this.props.checkedOutItems.map((item)=>{
        dsach = dsach + `<div style=" width: 100%;display:flex ;margin: 0">
          <p style="width: 45%; text-align: left; border-bottom: 1px solid lightgray; padding: 9px 0px; font-size:14px" >${item.tenSP}</p> 
          <p style="text-align: left ; border-bottom: 1px solid lightgray; width: 18%;  padding: 9px 0px;  font-size:14px">
          ${(item.donGia).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",})
          }
          </p>
          <p style="text-align: left ; border-bottom: 1px solid lightgray; width: 12%;  padding: 9px 0px;  font-size:14px">
          ${item.soLuong}</p>
          <p style="text-align: right; border-bottom: 1px solid lightgray; width: 25%;  padding: 9px 0px;  font-size:14px">
          ${(item.donGia * item.soLuong).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"})
          }
          </p>
          </div> `
        });
    this.cartInfor.dsInMail= dsach;
        setTimeout(() => {
          this.props.addOrder(this.cartInfor);
        }, 1000)
      }
    });
  }
	
  //submit form when click check out
  handleSubmit = e => {
    e.preventDefault();
    if(!this.checkEmty()){
      return ;
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let idKH = 0;
        if (typeof (this.props.userInfor.maND) !== "undefined") {
          idKH = this.props.userInfor.maND
        }
        const fieldsValue = {
          ...values,
        }
        this.cartInfor = {
          dsSanPham: this.props.checkedOutItems,
          tenNguoiNhan: fieldsValue.tenNguoiNhan,
          ngayDat: moment().format("MM/DD/YYYY HH:mm:ss"),
          ngayXuLy: null,
          maKH: idKH,
          maNV: 0,
          trangThai: 0,
          tinhTrang:0,
          diaChiNhan: fieldsValue.diaChiNhan,
          soDT: fieldsValue.soDT,
          email: fieldsValue.email,
          dsInMail:"",
          tongTien: (this.props.totalPrice).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            // maximumFractionDigits: 4
          })

        }
        let dsach= "";
        this.props.checkedOutItems.map((item)=>{
        
        dsach = dsach + `<div style=" width: 100%;display:flex ;margin: 0">
          <p style="width: 45%; text-align: left; border-bottom: 1px solid lightgray; padding: 9px 0px; font-size:14px" >${item.tenSP}</p> 
          <p style="text-align: left ; border-bottom: 1px solid lightgray; width: 18%;  padding: 9px 0px;  font-size:14px">
          ${(item.donGia).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",})
          }
          </p>
          <p style="text-align: left ; border-bottom: 1px solid lightgray; width: 12%;  padding: 9px 0px;  font-size:14px">
          ${item.soLuong}</p>
          <p style="text-align: right; border-bottom: 1px solid lightgray; width: 25%;  padding: 9px 0px;  font-size:14px">
          ${(item.donGia * item.soLuong).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"})
          }
          </p>
          </div> `
    });
    this.cartInfor.dsInMail= dsach;
        setTimeout(() => {
          this.props.addOrder(this.cartInfor);
        }, 1000)
       


      }
    });
  }
  //create Order item in paypal button
  createOrder(data, actions) {
   if(!this.checkEmty()){
     return;
   }
    let listProduct = [];
    this.props.checkedOutItems.map((item, index) => {
      let productItem = {
        name: item.tenSP,
        unit_amount: { 
          value: item.donGia, 
          currency_code: 'USD' },
        quantity: item.soLuong,
        sku: item.maSP
      }
      listProduct.push(productItem);
    });

    return actions.order.create({
      purchase_units: [{
        amount: {
          value: this.props.totalPrice,
          currency_code: 'USD',
          breakdown: {
            item_total: { value: this.props.totalPrice, currency_code: 'USD' }
          }
        },
        invoice_id: moment().format("DD/MM/YYYY-HH:mm:ss").toString(),
        items: listProduct,
      }]
    });
  }
  onApprove(data, actions) {
    return actions.order.capture();
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="payment-container">
        <div >
          <div className=" d-flex justify-content-between">
            <p style={{ fontSize: 23 }}>YOUR ORDER< br /> <span style={{ fontSize: 15, color: "gray" }}>Placed on {moment().format("MM/DD/YYYY HH:mm:ss")}</span></p>
            <p style={{ fontSize: 15, color: "gray", paddingTop: 10 }}>FULFILLED</p>
          </div>

          <Paper>
            <Table className="mb-5 ">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.checkedOutItems.map((item, index) => {
                  return <TableRow key={index}>
                    <TableCell style={{ color: "#2EA5D4" }}>{item.tenSP}</TableCell>
                    <TableCell align="right">{(item.donGia).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      // maximumFractionDigits: 4
                    })
                    }</TableCell>
                    <TableCell align="right">{item.soLuong}</TableCell>
                    <TableCell align="right">{(item.soLuong * item.donGia).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      // maximumFractionDigits: 4
                    })
                    }</TableCell>
                  </TableRow>

                })}
                <TableRow>
                  <TableCell className="row-border" rowSpan={4} />
                  <TableCell className="row-border" colSpan={2} >Subtotal</TableCell>
                  <TableCell className="row-border"  >
                    {(this.props.totalPrice * 1.0).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      // maximumFractionDigits: 4
                    })}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="row-border" colSpan={2} >Shipping</TableCell>
                  <TableCell className="row-border"  >$ 0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="row-border" colSpan={2} >Taxes</TableCell>
                  <TableCell className="row-border"   >$ 0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="row-border" style={{ fontSize: 17, color: "#2EA5D4" }} colSpan={2}>Grand total</TableCell>
                  <TableCell className="row-border" style={{ fontSize: 15, color: "#2EA5D4" }} >
                    {(this.props.totalPrice * 1.0).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      // maximumFractionDigits: 4
                    })}
                  </TableCell>
                </TableRow >

              </TableBody>
            </Table>
          </Paper>
        </div>
        <Form onSubmit={this.handleSubmit}>
        <div className="d-flex pb-5">
          <div className="col-md-6" >
            <div
              style={{
                border: "1px solid #FF6D47",
                fontSize: 24,
                textAlign: "center",
                borderRadius: 5,
                color: "#FF6D47",
                // marginBottom: 20
              }}
            >
              PayMent{" "}
            </div>
            <br />
           
              <Form.Item label="Full Name">
                {getFieldDecorator('tenNguoiNhan', {
                  rules: [{ required: true, message: 'Please input Full Name!' }], initialValue: this.props.userInfor.hoTen
                })(<Input />)}

              </Form.Item>

              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [{ type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', },], initialValue: this.props.userInfor.email
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Address">
                {getFieldDecorator('diaChiNhan', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Address!',
                    },
                  ], initialValue: this.props.userInfor.diaChi
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Phone Number">
                {getFieldDecorator('soDT', {
                  rules: [{ required: true, message: 'Please input your phone number!' }], initialValue: this.props.userInfor.soDT
                })(<Input style={{ width: '100%' }} />)}
              </Form.Item>
              
           

          </div>
          <div className="col-md-6" >
          
            <Form.Item >
                <Button className="button-checkout"  type="danger" htmlType="submit">
                Payment on Delivery
          </Button>
              </Form.Item>
              <hr />
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
              onSuccess={(details, data) => {
                this.handleSubmitPaypal();
              }}
              

            />
            

          </div>
          </div>
          </Form>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    paymentInfor: state.rootReducer.paymentInfor,
    checkedOutItems: state.rootReducer.checkedOutItems,
    totalPrice: state.rootReducer.totalPrice,
    userInfor: state.rootReducer.userInfor,


  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {
      dispatch(clearCartAction());
    },
    addOrder: (orderInfor) => {
      dispatch(addOrderAction(orderInfor));
    }
  }
}
const Payment = withRouter(compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(payment))));

export default Payment;
