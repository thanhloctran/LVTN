import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Style.css";
// import axios from 'axios';
// import firebase from 'firebase';
// import { Timeline } from 'antd';
// import Swal from 'sweetalert2';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
    // getDetailOrderAction,
    getDetailInvoiceAction,
    // updateOrderStatusAction
} from './../../redux/actions/AdminData';

// import nodemailer from 'nodemailer'
//var nodemailer = require('nodemailer');

class DetailInvoiceAD extends Component {
    state = {
        item: {},
        itemCopy:{}
    }

    componentDidMount() {
        this.props.getInvoiceDetailAD(this.props.match.params.id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, item: nextProps.item
        }
    }
    checkOrderOnclick = (trangThai) => {
        this.setState({
            itemCopy :{
                maPN: this.props.item.maPN,
                maNV: 1,
                trangThai: trangThai
            }
        })
        
    }



    render() {
        if (!this.state.item || !this.state.item.dsSanPhamNhap) {
            return <CircularProgress className="circular" />;
        }
        return (
            <div className="m-2 invoiceDetail">
                <p className="detail-title">DETAIL INVOICE </p>
                {/* div left  */}
                <div className="d-flex">
                    <div className="col-md-8 " >
                        <div className=" d-flex justify-content-between detail-title-head">
                            <p style={{ fontSize: 23 }}>INVOICE #{this.state.item.maPN} <br /> <span style={{ fontSize: 15, color: "gray" }}>Placed on {this.state.item.ngayDat}</span></p>
                            <p style={{ fontSize: 15, color: "gray", paddingTop: 10 }}>FULFILLED</p>
                        </div>

                        <Paper>
                            <Table className="mb-2 " style={{ height: "215px !important" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.item.dsSanPhamNhap.map((item, index) => {
                                        return <TableRow key={item.maSP}>
                                            <TableCell style={{ color: "#2EA5D4" }}>{item.tenSP}</TableCell>
                                            <TableCell align="right"> {item.donGia.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD"
                                            })}</TableCell>
                                            <TableCell align="right">{item.soLuong}</TableCell>
                                            <TableCell align="right"> {(item.donGia * item.soLuong).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD"
                                            })}</TableCell>
                                        </TableRow>
                                    })}
                                    
                                    <TableRow>
                                        <TableCell className="row-border" rowSpan={4} />
                                        <TableCell className="row-border" colSpan={2} style={{fontSize:18}} >Grand Total</TableCell>
                                        <TableCell className="row-border" style={{fontSize:18}} >{this.state.item.tongTien.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD"
                                        })}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <hr/>
                            <p style={{marginLeft:10, fontSize:20}}>Product</p>
                            {this.state.item.dsSanPhamNhap.map((item, index)=>{
                            return(
                                <div style={{margin:"10px 3px"}}>
                                   <span className="productName" key={index}>{item.tenSP}</span>
                                   <span style={{float:"right"}}>
                                   {
                                       item.dsSeriSanPham.map((itemsub, indexsub)=>{
                                    console.log(itemsub);
                                    return <span style={{ margin: 5}} key={indexsub}>[{itemsub}]&nbsp; </span>
                                        
                                } )
                                   }
                                   </span>
                                  
                                </div>
                            )  
                            })}
                            {/* <hr/> */}
                            {!this.state.adminAccess ?
                                (<button className=" w-100 btn" style={{ backgroundColor: "orange", color: "white" }} onClick={() => this.props.history.push('/dashboard/admin')}>Back Monitor Order Page</button>) : (<button className=" w-100 btn btn-dark" onClick={() => this.props.history.push('/admin')}>Back Admin Page</button>)}

                        </Paper>

                    </div> {/* end div left  */}
                    {/* div right  */}
                    <div className="col-md-4">
                        <p style={{ fontSize: 23 }}>Employee <br /> <span style={{ fontSize: 15, color: "gray" }}> {(this.state.item.nhanVien.taiKhoan)}</span></p>
                        <Paper>
                            <Table className="mb-2">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">{this.state.item.nhanVien.hoTen}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{this.state.item.nhanVien.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping address</TableCell>
                                        <TableCell align="right">{this.state.item.nhanVien.diaChi}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Number Phone</TableCell>
                                        <TableCell align="right">{this.state.item.nhanVien.soDT}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </Paper>
                        <Paper style={{ padding: 15 }}>
                            {/* <div style={{backgroundColor:"white", padding:"15px" , borderRadius:5}}> */}
                            <p style={{ fontSize: "22px", color: "#504F5A", marginBottom: "0px !important" }}>Order Status</p>
                            <TextField
                                label="Handling Status"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={(() => {
                                    switch (this.state.item.trangThai) {
                                        case 1: return "FullFill";
                                        default: return "UnFullFill";
                                    }
                                })()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                           
                            {/* </div> */}
                        </Paper>


                    </div>
                    
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        item: state.rootReducerAD.detail,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInvoiceDetailAD: (id) => {
            dispatch(getDetailInvoiceAction(id))
        },
        // updateOrderAD: (orderInfor) => {
        //     dispatch(updateOrderStatusAction(orderInfor))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailInvoiceAD)