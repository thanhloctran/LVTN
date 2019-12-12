import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getListOrderAction, getListReviewAction, getOrderYearAction } from './../redux/actions/AdminData';
import ListOrderAD from '../components/Order/ListOrderAD'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import BackToTop from '../components/ProtectedRoute/BackToTop';
import { CircularProgress } from '@material-ui/core';
import ReviewList from '../components/List/ReviewList';
import moment from 'moment';
class Admin extends Component {
    state = {
        listOrderByYear: [],
      //  listOrderByYear:[],
    }
    matchParams={
        path: "/dashboard/admin/:status", 
        url: "/dashboard/admin/0", 
        isExact: true, 
        params: {status:"0"}
    }
    componentDidMount() {
        this.props.getListOrderAD(0);
        this.props.getListReview();
        this.props.getOrderYear(moment().year());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, listOrderByYear: nextProps.listOrderByYear
        }
    }

    render() {
        if (typeof (this.state.listOrderByYear) === "undefined") {
            return <CircularProgress className="circular" />;
        }
        const { DataView } = DataSet;
        let data = [];
        for (let i = 0; i < 12; i++) {
            let col = {
                State: i.toString(),
                "Order": 0,
                // "Invoice": this.props.listOrderByYear[i].tongDoanhThu,
            }
            if(typeof(this.state.listOrderByYear[i])!=="undefined"){
                col = {
                    State: this.state.listOrderByYear[i].thang.toString(),
                    "Order": this.state.listOrderByYear[i].tongTien,
                    //"Invoice": this.props.listOrderByYear[i].tongDoanhThu,
                }
            }
            
            data.push(col);
        }
        const types = [
            "Order",
            //"Invoice",
        ];
        const dv = new DataView();
        dv.source(data)
            .transform({
                type: "fold",
                fields: types,
                key: "age",
                value: "population",
                retains: ["State"]
            })
            .transform({
                type: "map",
                callback: obj => {
                    const key = obj.age;
                    let type;

                    if (key === "Order") {
                        type = "a";
                    } else {
                        type = "d";
                    }

                    obj.type = type;
                    return obj;
                }
            });
        const colorMap = {
            "Order": "orange",
            // "Invoice": "#1581E6",
        };
        const cols = {
            population: {
                tickInterval: 5000
            }
        };
        const retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
        return (
            <div className="m-2 " >
                <p style={{ fontSize: "32px", color: "#3D3D3D" }}>Hello there, {retrievedObject.taiKhoan}</p>
                <p style={{ color: "#504F5A" }}>Here is some information we gathered about your store</p>
                <div>
                    <div className=" d-flex justify-content-between" style={{ flexWrap: "wrap" }}>
                    <div className="admin-box-right">
                            <span><b>{this.props.listDataAD.length} Order </b>ready to fullfill</span> <i className="fas fa-angle-right" ></i>
                            <hr />
                            <span><b>37 Payment</b> to capture </span> <i className="fas fa-angle-right" ></i>
                            <hr />
                            <span>Products out of stock </span><i className="fas fa-angle-right"></i>
                        </div>
                        <div className="admin-box" >
                            <span className="admin-box-title">Sales</span>
                            <span className="admin-box-number">$62.57</span>
                            {/* <i className="fas fa-chart-line" className="admin-box-icon"/> */}
                        </div>
                        <div className="admin-box"  >
                            <span className="admin-box-title">Order</span>
        <span className="admin-box-number">{this.props.listDataAD.length}</span>
                            {/* <i  className="fas fa-file-invoice-dollar"className="admin-box-icon" /> */}
                        </div>
                        
                    </div>

                    <Chart
                        height={500}
                        data={dv}
                        scale={cols}
                        padding={[20, 160, 80, 60]}
                        forceFit
                    >
                        <Axis
                            name="population"
                            label={{
                                formatter: function (val) {
                                    return val / 1000 + "000";
                                }
                            }}
                        />
                        <Legend position="right" />
                        <Tooltip />
                        <Geom
                            type="interval"
                            position="State*population"
                            color={[
                                "age",
                                function (age) {
                                    return colorMap[age];
                                }
                            ]}
                            tooltip={[
                                "age*population",
                                (age, population) => {
                                    return {
                                        name: age,
                                        value: population
                                    };
                                }
                            ]}
                            adjust={[
                                {
                                    type: "dodge",
                                    dodgeBy: "type",
                                    // 按照 type 字段进行分组
                                    marginRatio: 0 // 分组中各个柱子之间不留空隙
                                },
                                {
                                    type: "stack"
                                }
                            ]}
                        />
                    </Chart>
                    {console.log(this.props.match)
                    }
                    <ListOrderAD history={this.props.history}
                     match={this.matchParams}
                     />

                     {/* </ListOrderAD> */}
                    <br />
                    <div className="admin-review">
                       
                        <ReviewList history={this.props.history} />

                       
                    </div>
                </div>

                <BackToTop />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listDataAD: state.rootReducerAD.listOrder,
        listReview: state.rootReducerAD.listReview,
        listOrderByYear: state.rootReducerAD.listOrderByYear
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListOrderAD: (trangThai) => {
            dispatch(getListOrderAction(trangThai))
        },
        getListReview: () => {
            dispatch(getListReviewAction())
        },
        getOrderYear: (year) => {
            dispatch(getOrderYearAction(year))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
