import React, { Component } from 'react'
import {connect} from "react-redux"
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { DatePicker } from 'antd';
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from 'moment';

import {
    getDetailDiscountAction,
} from './../redux/actions/AdminData';

 class Disccount extends Component {
    state = {
        disscountInfor:{},
        danhSachSP:[],
        percnetDC:0,
       
    }
    componentDidMount() {   
        this.props.getDetailDiscountAD(this.props.match.params.id);
        setTimeout(()=>{
            console.log(this.state.disscountInfor.dsSanPhamKM);
        },2000)
        
        
}
    static getDerivedStateFromProps(nextProps, prevState){
        return{
            ...prevState, disscountInfor: nextProps.item
        }
    }

    render() {
        if (!this.state.disscountInfor || !this.state.disscountInfor.dsSanPhamKM) {
            return <CircularProgress className="circular" />;
        }
        const { RangePicker } = DatePicker;
        const dateFormat = "MM/DD/YYYY HH:mm:ss";
        return (
            <div>
                <div className="discount" style={{ paddingLeft: 15, backgroundColor: "#F1F5F5", height: "100%" }}>
                    <p style={{ paddingLeft: 20, paddingTop: 50, fontSize: "30px", color: "#504F5A" }}>Discount</p>

                    <div className="d-flex mt-4 justify-content-between">
                        {/* div left  */}
                        <Paper className="pb-2 col-md-8 " style={{ borderRadius: "5px", backgroundColor: "white" }}>
                            <div>
                                <p style={{ fontSize: "25px", color: "#504F5A" }}>General information</p>
                                <hr />
                                <TextField
                                    style={{ width: "100%", backgroundColor: "#F1F5F5" }}
                                    id="outlined-helperText"
                                    label="Discount Code"
                                    value={this.state.disscountInfor.code}
                                    margin="normal"
                                    variant="outlined"

                                />
                                <TextField
                                    style={{ width: "100%", backgroundColor: "#F1F5F5" }}
                                    id="outlined-helperText"
                                    label="Decription"
                                    value= {this.state.disscountInfor.moTa}
                                    multiline
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                             <hr />
                            <div>

                                <p style={{ fontSize: "22px", color: "#504F5A" }}>Products</p>
                                <Table >
                                    <TableBody>
                                    {this.state.disscountInfor.dsSanPhamKM.map((item, index)=>{
                                        return(
                                            <TableRow onClick={() => {
                                                this.props.history.push("/details/" + item.maSP);
                                            }}>
                                                <TableCell ><img style={{ width: "50px" }} alt="Product" src={item.hinhAnh} /></TableCell>
                                                <TableCell  >{item.tenSP}</TableCell>
                                                <TableCell style={{textAlign:"right"}}>{item.maSP}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                       
                                    </TableBody>
                                </Table>

                            </div>
                        </Paper>
                        {/* div right  */}
                        <div className=" col-md-4 ">
                            <Paper style={{ borderRadius: "5px", backgroundColor: "white", padding: 15, height: "100%  " }}>
                                <p style={{ fontSize: "25px", color: "#504F5A" }}>Organize Discount</p>
                                <hr />
                                <p style={{ fontSize: "22px", color: "#504F5A" }}>Attributes</p>
                                <TextField
                                    id="outlined-number"
                                    label="Discount value (%)"
                                    fullWidth
                                    value={this.state.disscountInfor.dsSanPhamKM[0].giamGia}
                                    type="number"
                                    margin="normal"
                                    variant="outlined"
                                />
                                {/* <hr/> */}
                                <p style={{ fontSize: "22px", color: "#504F5A" }}>Active Day</p>
                                <RangePicker
                                    defaultValue={[moment(this.state.disscountInfor.ngayBD, dateFormat), moment(this.state.disscountInfor.ngayKT, dateFormat)]}
                                    format={dateFormat}
                                    showTime
                                />
                                <div style={{
                                    display: 'flex',

                                    justifyContent: 'space-between',
                                    position: 'absolute',

                                    bottom: '10px',

                                    width: '86%',
                                }} >
                                    <Button
                                        style={{ width: '45%' }}
                                        variant="outlined"
                                        color="secondary">
                                        Save
                                    </Button>
                                    <Button
                                        style={{ width: '45%' }}
                                        variant="outlined"
                                        color="primary">
                                        Cancel
                                    </Button>
                                </div>
                            </Paper>


                        </div>

                        {/* end div right */}
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
        getDetailDiscountAD: (maKM) => {
            dispatch(getDetailDiscountAction(maKM))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Disccount)

