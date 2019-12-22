
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./Style.css";
import moment from "moment";
import {
    Modal, Button, Input, Timeline
} from 'antd';
import {
    getDetailWarantyAction,
    getDetailSeriAction,
    addWarrantyAction,
    updateWarrantyAction
} from './../redux/actions/AdminData';
import Swal from 'sweetalert2';
// import { swalError } from '../components/Dialog/Swal';

const { TextArea } = Input;


class waranty extends Component {
    state = {
        contentWarany: "",
        detailWarranty: {},
        seri: "",
        visible: (this.props.match.params.id) !== "undefined" ? false : true,
        detailSeri: {},
        userInfor: this.props.userInfor,
    }
    warantyTime="";
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        this.props.getDetailSeri(this.state.seri);
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
    
    addWarranty() {
        let item = {
            maSeri: this.state.seri,
            ngayTao: moment().format('MM/DD/YYYY HH:mm:ss'),
            noiDung: this.state.contentWarany,
        }
        const a = moment().format('MM/DD/YYYY')
        const b = moment(this.warantyTime, 'MM/DD/YYYY')
// Tính khoảng cách giữa hai ngày theo phút
        if(b.diff(a, 'days')>=0){
            this.props.addWarranty(item);
            // console.log(b.diff(a, 'days'));
            
        }
        else{
            Swal.fire({
                type: 'error',
                title: 'Warranty expires',
                text: "Oops...",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
        })
    }
        
    }
    updateWarranty(trangThai, maNV) {
        let item = {
            maBH: parseInt(this.props.match.params.key),
            maSeri: this.props.detailWarranty.maSeri,
            ngayTao: this.props.detailWarranty.ngayTao,
            noiDung: this.state.contentWarany,
            trangThai: trangThai,
            ngayXuLy: moment().format("MM/DD/YYYY HH:mm:ss"),
            maNV: maNV,
        }
        console.log(item);

        this.props.updateWarranty(item);
    }
    componentDidMount() {
        // this.getPeriodWarranrty(12);
        if (typeof (this.props.match.params.id) !== "undefined") {
            this.setState({
                maSeri: this.props.match.params.id,
            })
            this.props.getDetailSeri(this.props.match.params.id);
            this.props.getDetailWaranty(this.props.match.params.key);
            setTimeout(() => {
                this.setState({
                    contentWarany: this.props.detailWarranty.noiDung
                })
            }, 500);
        }
        //console.log(this.state.userInfor)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, detailSeri: nextProps.detailSeri, detailWarranty: nextProps.detailWarranty
        }
    }


    render() {
      const  getPeriodWarranrty=(date, month)=>{
            var currentDate = moment(date);
            var futureMonth = moment(currentDate).add(month, 'M');
            this.warantyTime= futureMonth.format('MM/DD/YYYY');
            return futureMonth.format('MM/DD/YYYY')
        }
        
        if (this.state.visible || typeof (this.state.detailSeri.sp) === "undefined" || typeof (this.state.detailSeri.pn) === "undefined" ) {
            return <div style={{ margin: "8px" }}><Button  type="primary" onClick={this.showModal}>
                Input Product Seri
        </Button>
                <Modal
                    title="INPUT SERI PRODUCT"
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
        
        // if(!this.props.detailSeri.dhh !== null){
        //     return  Swal.fire({
        //         type: 'error',
        //         title: 'Warranty expires',
        //         text: "Oops...",
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        // })
    
        // }
        // console.log(this.state.item);
        // this.getPeriodWarranrty(this.props.detailSeri.sp.thoiGianBH);
        return (
            <div className="m-2 ">
                <Button  hidden={typeof(this.props.match.params.key)!=="undefined"} type="primary" onClick={this.showModal}>
                    Input Product Seri
            </Button>
            <div className="d-flex justify-content-between mr-3 ">
            <p className="detail-title">Product Seri #{this.props.detailSeri.sp.maSeri}</p>
    <p> EXP Waranty: {getPeriodWarranrty(this.props.detailSeri.ddh.ngayXuLy, this.props.detailSeri.sp.thoiGianBH)}</p>
            </div>
               
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

                        {this.props.userInfor.maLoaiND==="NV"?
                            <div>
                                <div className=" d-flex justify-content-between detail-title-head">
                                    <p style={{ fontSize: 23 }}>Inoivce #{this.props.detailSeri.pn.maPN} <br /> <span style={{ fontSize: 15, color: "gray" }}>Created on {this.props.detailSeri.pn.ngayTao}</span></p>
                                    <p style={{ fontSize: 15, color: "gray", paddingTop: 10, lineHeight: "31px" }}>FULFILLED  <br /> </p>
                                </div>
                                <Paper style={{ minHeight: 190 }}>

                                    <Table className="mb-2 ">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >Seri</TableCell>
                                                <TableCell >Provider</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* MAP O DAY NE MOI NGUOI */}
                                            <TableRow >
                                                <TableCell style={{ color: "#2EA5D4" }}>SRSP0201</TableCell>
                                                <TableCell >NCC02</TableCell>
                                                <TableCell align="right">$800.00</TableCell>

                                            </TableRow>
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
                            </div>
                            : <span></span>
                        }
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
                        <Timeline>
                            {this.props.detailSeri.dsBH.map((item, index) => {
                                return <Timeline.Item key={index}>Waranty time:  {item.ngayTao} <span style={{float:"right"}}>FullFill Time: {!item.ngayXuLy?"Not Handel" :item.ngayXuLy } &nbsp; </span> </Timeline.Item>
                            })}
                        </Timeline>
                        <TextArea rows={4} placeholder="Inout note " value={this.state.contentWarany} onChange={(e) => {
                            this.setState({ contentWarany: e.target.value })
                        }} />

                        <div className="d-flex">
                            <Button hidden={typeof(this.props.match.params.key)!=="undefined"} title="You only can wanrranty 3 time" disabled={this.props.detailSeri.dsBH.length === 3 ? true : false} style={{ backgroundColor: "#009aff", marginTop: 7, color: "white" }}
                                onClick={() => {
                                    console.log(this.props.userInfor);
                                    
                                    this.addWarranty();
                                }}          >
                                Create Waranty Sheducle
                                </Button>
                            <Button  hidden={typeof(this.props.match.params.key)!=="undefined" && this.props.userInfor.maLoaiND==="NV" ? false : true} style={{ backgroundColor: "red", marginTop: 7, color: "white" }}
                                onClick={() => {
                                    this.updateWarranty(1, this.props.userInfor.maND);
                                }}          >
                                Check
                                </Button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        detailWarranty: state.rootReducerAD.detailWarranty,
        detailSeri: state.rootReducerAD.detail,
        userInfor: state.rootReducerAD.userInfor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailSeri: (id) => {
            dispatch(getDetailSeriAction(id))
        },
        addWarranty: (item) => {
            dispatch(addWarrantyAction(item))
        },
        getDetailWaranty: (id) => {
            dispatch(getDetailWarantyAction(id))
        },
        updateWarranty: (item) => {
            dispatch(updateWarrantyAction(item))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(waranty)