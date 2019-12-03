import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Style.css";
// import { Timeline } from 'antd';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
    getDetailOrderAction,
    updateOrderStatusAction
} from './../../redux/actions/AdminData';
import moment from 'moment';

class DetailOrderCL extends Component {
    state = {
        item: {},
        itemCopy:{},
        result: ""
    }
    
    componentDidMount() {
        this.props.getOrderDetailAD(this.props.match.params.id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, item: nextProps.item, result: nextProps.result
        }
    }
    checkOrderOnclick = (trangThai) => {
        let  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
        this.setState({
            itemCopy :{
                maDDH: this.props.item.maDDH,
                maNV: retrievedObject.maND ,
                ngayXuLy: moment().format('MM/DD/YYYY HH:mm:ss') ,
                trangThai: trangThai
            }
        });
        setTimeout(()=>{
            this.props.updateOrderAD(this.state.itemCopy);
            console.log(this.state.itemCopy);
            
        },1000)
    
    }


    render() {
        if (!this.state.item || !this.state.item.dsSanPhamDDH) {
            return <p style={{ margin: "20px" }}>NO VALUE </p>;
        }
        return (
            <div className="m-2 ">
                <p className="detail-title">DETAIL ORDER </p>
                {/* div left  */}
                <div className="d-flex">
                    <div className="col-md-8 " >
                        <div className=" d-flex justify-content-between detail-title-head">
                            <p style={{ fontSize: 23 }}>Order #{this.props.item.maDDH + 4900} <br /> <span style={{ fontSize: 15, color: "gray" }}>Placed on {this.props.item.ngayDat}</span></p>
                            <p style={{ fontSize: 15, color: "gray", paddingTop: 10 }}>FULFILLED</p>
                        </div>

                        <Paper>
                            <Table className="mb-2 " style={{ height: "215px !important" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">soLuong</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.item.dsSanPhamDDH.map((item, index) => {
                                        return <TableRow key={item.maDDH}>
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
                                        <TableCell className="row-border" colSpan={2} >Subtotal</TableCell>
                                        <TableCell className="row-border"  >{this.props.item.tongTien.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD"
                                        })}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="row-border" colSpan={2} >Shipping</TableCell>
                                        <TableCell className="row-border"  > 0.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="row-border" colSpan={2} >Taxes</TableCell>
                                        <TableCell className="row-border"> 0.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="row-border" style={{ fontSize: 17, color: "#2EA5D4" }} colSpan={2}>Grand total</TableCell>
                                        <TableCell className="row-border" style={{ fontSize: 15, color: "#2EA5D4" }} > {this.state.item.tongTien.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD"
                                        })}</TableCell>
                                    </TableRow >

                                </TableBody>
                            </Table>
                            {/* <hr/> */}
                            {!this.state.adminAccess ?
                                (<button className=" w-100 btn" style={{ backgroundColor: "orange", color: "white" }} onClick={() => this.props.history.push('/dashboard/admin')}>Back Monitor Order Page</button>) : (<button className=" w-100 btn btn-dark" onClick={() => this.props.history.push('/admin')}>Back Admin Page</button>)}
                            {/* <div className="pl-2">
                                <p style={{ fontSize: "23px" }}>Order History</p>
                                <Timeline>
                                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                </Timeline>
                            </div> */}

                            <div className="action-group" >

                                <Button
                                    className="buton-orderAction"
                                    variant="outlined"
                                    color="primary"
                                    disabled={this.state.item.trangThai}
                                    onClick={(e) => {
                                        this.checkOrderOnclick("2");
                                    }}>
                                    Check Order
                                </Button>
                                <Button
                                    className="buton-orderAction"
                                    variant="outlined"
                                    color="primary"
                                    disabled={this.state.item.trangThai===2? false:true }
                                    onClick={() => {
                                        this.checkOrderOnclick("1");
                                    }}>
                                    Delivery Package
                                </Button>
                                <Button
                                    className="buton-orderAction"
                                    variant="outlined"
                                    color="primary"
                                    disabled={this.state.item.trangThai===2 || this.state.item.trangThai===0 ? false:true}
                                    onClick={() => {
                                        this.checkOrderOnclick("-1");
                                    }}
                                >
                                    Cancel Order
                                </Button>
                                <Button
                                    className="buton-orderAction"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() =>
                                        Swal.fire({
                                            type: 'success',
                                            title: 'Sended mail to Customer !',
                                            showConfirmButton: false,
                                            timer: 700,
                                            width: 300
                                        })}
                                >
                                    Send Notification
                            </Button>
                            </div>

                        </Paper>
                    </div> {/* end div left  */}
                    {/* div right  */}
                    <div className="col-md-4">
                        <p style={{ fontSize: 23 }}>Customer <br /> <span style={{ fontSize: 15, color: "gray" }}>{this.props.item.khachHang === null ? ("NO ACCOUNT") : (this.props.item.khachHang.taiKhoan)}</span></p>
                        <Paper>
                            <Table className="mb-2">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name Customer</TableCell>
                                        <TableCell align="right">{this.state.item.tenNguoiNhan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{this.state.item.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping address</TableCell>
                                        <TableCell align="right">{this.state.item.diaChiNhan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Number Phone</TableCell>
                                        <TableCell align="right">{this.state.item.soDT}</TableCell>
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
                                        case 2: return "Checked";
                                        case 1: return "Deliverid";
                                        case -1: return "Cancled";
                                        default: return "UnChecked";
                                    }
                                })()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Paying Status"
                                fullWidth
                                value={(() => {
                                    switch (this.state.item.tinhTrang) {
                                        case 1: return "Paided";
                                        case -1: return "ReFund";
                                        default: return "UnPaid";
                                    }
                                })()}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
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
        item: state.rootReducerAD.orderDetail,
        result: state.rootReducerAD.result
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderDetailAD: (idOrder) => {
            dispatch(getDetailOrderAction(idOrder))
        },
        updateOrderAD: (orderInfor) => {
            dispatch(updateOrderStatusAction(orderInfor))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderCL)