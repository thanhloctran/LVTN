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
class Admin extends Component {
    state = {
        listOrderByYear: [],
    }
    componentDidMount() {
        this.props.getListOrderAD("0");
        this.props.getListReview();
        this.props.getOrderYear();
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
        for (let i = 0; i < this.state.listOrderByYear.length; i++) {
            let col = {
                State: this.state.listOrderByYear[i].thang.toString(),
                "Order": this.state.listOrderByYear[i].tongDoanhThu,
                // "Invoice": this.props.listOrderByYear[i].tongDoanhThu,
            }
            data.push(col);
        }
        const types = [
            "Order",
            // "Invoice",
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
                tickInterval: 10000
            }
        };
        const retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
        return (
            <div className="m-2 " >
                <p style={{ fontSize: "32px", color: "#3D3D3D" }}>Hello there, {retrievedObject.taiKhoan}</p>
                <p style={{ color: "#504F5A" }}>Here is some information we gathered about your store</p>
                <div>
                    {/* <div className=" d-flex justify-content-between" style={{ flexWrap: "wrap" }}>
                        <div className="admin-box" >
                            <span className="admin-box-title">Sales</span>
                            <span className="admin-box-number">$62.57</span>
                            <i className="fas fa-chart-line" className="admin-box-icon"/>
                        </div>
                        <div className="admin-box"  >
                            <span className="admin-box-title">Order</span>
                            <span className="admin-box-number">5</span>
                            <i  className="fas fa-file-invoice-dollar"className="admin-box-icon" />
                        </div>
                        <div className="admin-box-right">
                            <span><b>37 Order </b>ready to fullfill</span> <i className="fas fa-angle-right" ></i>
                            <hr />
                            <span><b>37 Payment</b> to capture </span> <i className="fas fa-angle-right" ></i>
                            <hr />
                            <span>Products out of stock </span><i className="fas fa-angle-right"></i>
                        </div>
                    </div> */}

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
                    {/* <ListDataAdmin history={this.props.history}  listDataAD = {this.props.listDataAD} /> */}
                    <ListOrderAD history={this.props.history} ></ListOrderAD>
                    <br />
                    <div className="admin-review">
                        <p className="admin-box-title">New Review</p>
                        <hr />
                        {this.props.listReview.map((item, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    this.props.history.push(`reviews/${item.maBL}`)
                                }}>
                                    <span><i style={{ fontSize: 22, color: "#13BEC0" }}>#{item.taiKhoan}</i> rating <span>
                                        {function () {
                                            let row = [];
                                            for (let i = 0; i < item.danhGia; i++) {
                                                row.push(<i key={i} className="fas fa-star" style={{ color: "#F1C40F" }}></i>)
                                            }
                                            return row;
                                        }()}
                                    </span>  &nbsp;
                        <span style={{ color: "orange", float: "right" }}>[{item.tenSP}]</span>
                                    </span>
                                    <p>Decription: {item.noiDung}</p>
                                    <hr />
                                </div>
                            )
                        })}

                        <div onClick={() => { this.props.history.push("/dashboard/listReview") }} style={{ fontSize: 22, color: "#EF5832" }}>See all Review</div>
                    </div>
                </div>

                <BackToTop />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listDataAD: state.rootReducerAD.listDataAD,
        listReview: state.rootReducerAD.listReview,
        listOrderByYear: state.rootReducerAD.listOrderByYear
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListOrderAD: () => {
            dispatch(getListOrderAction())
        },
        getListReview: () => {
            dispatch(getListReviewAction())
        },
        getOrderYear: () => {
            dispatch(getOrderYearAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
