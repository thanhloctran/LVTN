import React, { Component } from 'react'
// import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import TableA from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
    getDetailReviewAction,
    addReplyReviewADAction,
    deleteReplyAction
} from './../redux/actions/AdminData';
import { Input, Button,
    Table,
    Popconfirm } from 'antd';
const { TextArea } = Input;
class Review extends Component {
    state = {
        item: {},
        id: this.props.match.params.id,
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        reply: "",
    }
    showModal = () => {
        this.setState({
            ...this.state,
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ...this.state,
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            ...this.state,
            visible: false,
        });
    };

    componentDidMount() {
        this.props.getReviewDetailAD(this.state.id);
        // console.log("review", this.state.item);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, item: nextProps.item
        }
    }
    addReply() {
        let  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
        let itemReply={
            maBL: this.props.match.params.id,
            noiDung: this.state.reply,
            maNV: retrievedObject.maND
        };
        
        this.props.addReplyAD(itemReply);

    }
    columns = [
        {
          title: 'Employee',
          dataIndex: 'maNV',
          width:80
        },
        {
          title: 'Content',
          dataIndex: 'noiDung',
          
        },
        {
          title: 'Created Date',
          dataIndex: 'ngayTao',
          width:180,
        },
        {
          title: "Action",
          key: "action",
          width:70,
          render: (text, record) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteReplyAD(record.maTL)} >
                <span>Delete </span>
                </Popconfirm>
        }
    ]

    render() {
        if (!this.state.item || !this.state.item.sanPham || !this.state.item.khachHang) {
            return <CircularProgress className="circular" />;
        }
        return (
            <div className="review">
                <div className="" style={{ paddingLeft: 15, backgroundColor: "#F1F5F5", height: "100%" }}>
                    <p style={{ paddingLeft: 20, paddingTop: 50, fontSize: "30px", color: "#504F5A" }}>Custommer Review</p>

                    <div className="d-flex mt-4 justify-content-between">
                        {/* div left  */}
                        <Paper className="pb-2 col-md-8 " style={{ borderRadius: "5px", backgroundColor: "white" }}>
                            <div>
                                <p style={{ fontSize: "25px", color: "#504F5A" }}>Review #id{this.state.item.maBL}</p>
                                <hr />
                                <p style={{ fontSize: "20px", color: "#504F5A" }}>Rating &nbsp;
                                <span>
                                        {function () {
                                            let row = [];
                                            for (let i = 0; i < 4; i++) {
                                                row.push(<i key={i} className="fas fa-star" style={{ color: "#F1C40F" }}></i>)
                                            }
                                            return row;
                                        }()}

                                    </span> </p>
                                {/* <Input  style={{backgroundColor: "#F1F5F5" }} defaultValue={this.state.item.noiDung} /> */}

                                <TextField
                                    style={{ width: "100%", backgroundColor: "#F1F5F5" }}
                                    id="outlined-helperText"
                                    label="Decription"
                                    value={this.state.item.noiDung}
                                    multiline
                                    margin="normal"
                                    variant="outlined"
                                />
                                

                            </div>
                            <hr />
                            <div>

                                <p style={{ fontSize: "22px", color: "#504F5A" }}>Products #{this.state.item.maSP} </p>
                                <TableA >
                                    <TableBody>
                                        <TableRow onClick={() => {
                                            this.props.history.push("/details/" + this.state.item.maSP);
                                        }}>
                                            <TableCell style={{ border: "none" }} ><img style={{ width: "50px" }} alt="Product" src={this.state.item.sanPham.hinhAnh} /></TableCell>
                                            <TableCell style={{ border: "none" }}>{this.state.item.sanPham.tenSP}</TableCell>
                                            {this.state.item.sanPham.trangThai ?
                                                <TableCell style={{ border: "none" }}>
                                                    <i className="fas fa-circle" style={{ color: "#13BEBB", fontSize: 10 }}></i>
                                                    &nbsp; Published</TableCell> :
                                                <TableCell style={{ border: "none" }}>
                                                    <i className="fas fa-circle" style={{ color: "#gray", fontSize: 10 }}></i>
                                                    &nbsp; UnPublished</TableCell>}
                                            {/*  */}
                                            <TableCell style={{ border: "none" }}>{this.state.item.sanPham.soLuongTon} </TableCell>
                                            <TableCell style={{ textAlign: "right", border: "none" }}> $ {this.state.item.sanPham.donGia} </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </TableA>

                            </div>
                        </Paper>
                        {/* div right  */}
                        <div className="col-md-4">

                            <Paper className="paper_col h-100">
                                <p style={{ fontSize: 25 }}>Customer: <span style={{ fontSize: 23, color: "gray" }}>{this.state.item.khachHang.taiKhoan}</span></p>
                                <hr />
                                <TableA className="mb-2">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ padding: "14px 6px 14px 10px" }}>Name</TableCell>
                                            <TableCell align="right">{this.state.item.khachHang.hoTen}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ padding: "14px 6px 14px 10px" }}>Email</TableCell>
                                            <TableCell align="right">{this.state.item.khachHang.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ padding: "14px 6px 14px 10px" }}>Number Phone</TableCell>
                                            <TableCell align="right">{this.state.item.khachHang.soDT}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ padding: "14px 6px 14px 10px" }}>Address</TableCell>
                                            <TableCell align="right">{this.state.item.khachHang.diaChi}</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </TableA>
                            </Paper>
                           


                        </div>

                        {/* end div right */}
                    </div>
                    <div className="d-flex mt-2 justify-content-between">
                    <Paper className="pb-2 col-md-6 ">
                    <p style={{ fontSize: "25px", color: "#504F5A" }}>Reply</p>
                                <div >
                                    <TextArea rows={3}  style={{ backgroundColor: "#F1F5F5", marginBottom:10 , color:"black", fontSize:17}}
                                        placeholder="Input reply"
                                        value={this.state.reply}
                                        onChange={(e) => {
                                            this.setState({
                                                ...this.state,
                                                reply:e.target.value
                                            })

                                        }}
                                    />
                                    <Button type="primary" onClick={() => this.addReply()}>
                                        Submit
                                    </Button>
                                </div>
                    </Paper>

                    <div className=" col-md-6">
                    <Table
                    onRow={(record, rowIndex) => {
                        return {
                          onDoubleClick: event => {this.props.history.push("/dashboard/invoice/"+record.maTL) }, // click row
                        };
                      }}
                        columns={this.columns} dataSource={this.props.item.dsHoiDap} rowKey="maTL" style={{ backgroundColor: "white" }} />
                    </div>
                                        
                    </div>
                    

                </div>
                {/* <br/> */}

                <br />
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
        getReviewDetailAD: (id) => {
            dispatch(getDetailReviewAction(id))
        },
        addReplyAD: (item) => {
            dispatch(addReplyReviewADAction(item))
        },
        deleteReplyAD:(maTL) => {
            dispatch(deleteReplyAction(maTL))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Review)