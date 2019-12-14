
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import TextField from "@material-ui/core/TextField";
import "./Style.css";

import {
    Modal, Button, Input
} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
    getDetailOrderAction,
    getDetailSeriAction
} from './../redux/actions/AdminData';
// import moment from 'moment';
// import SendingMail from '../ProtectedRoute/SendingMail';

class waranty extends Component {
    state = {
        item: {},
        itemCopy: {},
        result: this.props.result,
        userInfor: this.props.userInfor,
        visible: true,
        detailSeri: {}
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        this.props.getDetailSeri('SRSP1002');
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    inputOnchange = (value) => {
        this.setState({
            seri: value
        });
    }
    componentDidMount() {
        this.props.getOrderDetailAD(207);
        console.log(this.state.item);


    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, item: nextProps.item, detailSeri: nextProps.detailSeri, userInfor: nextProps.userInfor
        }
    }


    render() {
        if (this.state.visible || typeof (this.state.detailSeri.sp) === "undefined" || typeof (this.state.detailSeri.pn) === "undefined") {
            return <div style={{ margin: "8px" }}><Button type="primary" onClick={this.showModal}>
                Input Product Seri
        </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="Input Product Seri" onChange={(e) => {
                        this.inputOnchange(e.target.value)
                    }} />
                </Modal>

            </div>;
        }
        // console.log(this.state.item);
        // 
        return (
            <div className="m-2 ">
                <Button type="primary" onClick={this.showModal}>
                    Input Product Seri
            </Button>
                <p className="detail-title">Product Seri #{this.props.detailSeri.sp.maSeri}</p>
                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Input placeholder="Input Product Seri" onChange={(e) => {
                            this.inputOnchange(e.target.value)
                        }} />
                    </Modal>
                </div>
                {/* div left  */}
                <div className="d-flex">
                    <div className="col-md-6" >
                        <div className=" d-flex justify-content-between detail-title-head">
                            <p style={{ fontSize: 23 }}>Order #{this.props.detailSeri.ddh.maDDH} <br /> <span style={{ fontSize: 15, color: "gray" }}>Placed on {this.props.detailSeri.ddh.ngayDat}</span></p>
                            <p style={{ fontSize: 15, color: "gray", paddingTop: 10, lineHeight: "31px" }}>FULFILLED  <br /> <span style={{ fontSize: 15, color: "gray" }}>Time checked:  {this.props.detailSeri.ddh.ngayXuLy}</span></p>
                        </div>

                        <Paper style={{ minHeight: 190 }}>
                            <Table className="mb-2 ">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Product</TableCell>
                                        <TableCell align="right" >Price Sell</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.detailSeri.ddh.dsSanPhamDDH.map((item, index) => {
                                        if (item.maSP === this.props.detailSeri.sp.maSP) {
                                            return <TableRow key={index}>
                                                <TableCell style={{ color: "#2EA5D4" }}>{item.tenSP}</TableCell>
                                                <TableCell align="right"> {item.donGia.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD"
                                                })}</TableCell>

                                            </TableRow>
                                        }

                                    })}

                                </TableBody>
                            </Table>
                            <p style={{ fontSize: 19, marginLeft: 15 }}>Employee sell </p>
                            <Table className="mb-2">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Account</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.nhanVien.taiKhoan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.nhanVien.hoTen}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.nhanVien.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                        <div className=" d-flex justify-content-between detail-title-head">
                            <p style={{ fontSize: 23 }}>Inoivce #{this.props.detailSeri.pn.maPN} <br /> <span style={{ fontSize: 15, color: "gray" }}>Created on {this.props.detailSeri.pn.ngayTao}</span></p>
                            <p style={{ fontSize: 15, color: "gray", paddingTop: 10, lineHeight: "31px" }}>FULFILLED  <br /> </p>
                        </div>
                        <Paper style={{ minHeight: 190 }}>

                            <Table className="mb-2 ">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Seri</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.detailSeri.pn.dsSanPhamNhap.map((item, index) => {
                                        console.log("item",item);
                                        item.dsSeriSanPham.map((item2, index2) => {
                                            if (item2 === this.props.detailSeri.sp.maSeri) {
                                                return <TableRow key={index2}>
                                                    <TableCell style={{ color: "#2EA5D4" }}>{item2}</TableCell>
                                                    <TableCell align="right"> {item.donGia.toLocaleString("en-US", {
                                                        style: "currency",
                                                        currency: "USD"
                                                    })}</TableCell>
    
                                                </TableRow>
                                            }
    
                                        })
                                       
                                    })
                                    }

                                </TableBody>
                            </Table>
                            <p style={{ fontSize: 19, marginLeft: 15 }}>Employee Create Invoice </p>
                            <Table className="mb-2">
                            <TableBody>
                                    <TableRow>
                                        <TableCell>Account</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.pn.nhanVien.taiKhoan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.pn.nhanVien.hoTen}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.pn.nhanVien.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>



                        </Paper>
                    </div> {/* end div left  */}
                    {/* div right  */}
                    <div className="col-md-6">
                        <p style={{ fontSize: 23 }}>Customer <br /> <span style={{ fontSize: 15, color: "gray" }}>{this.props.detailSeri.ddh.khachHang === null ? ("NO ACCOUNT") : (this.props.detailSeri.ddh.khachHang.taiKhoan)}</span></p>
                        <Paper>
                            <Table className="mb-2">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name Customer</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.tenNguoiNhan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping address</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.diaChiNhan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Number Phone</TableCell>
                                        <TableCell align="right">{this.props.detailSeri.ddh.soDT}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </Paper>



                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        item: state.rootReducerAD.orderDetail,
        detailSeri: state.rootReducerAD.detail,
        userInfor: state.rootReducer.userInfor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderDetailAD: (idOrder) => {
            dispatch(getDetailOrderAction(idOrder))
        },
        getDetailSeri: (id) => {
            dispatch(getDetailSeriAction(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(waranty)