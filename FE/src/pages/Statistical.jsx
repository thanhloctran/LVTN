import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Table,
  // Input
} from 'antd';
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { DatePicker } from 'antd';
import moment from 'moment';


import {
  getOrderYearAction,
  statisticAction,
  getInvoiceYearAction
} from './../redux/actions/AdminData';
import { ExportCSV } from '../components/ProtectedRoute/ExportCSV';
import { CircularProgress } from '@material-ui/core';

const { RangePicker , MonthPicker} = DatePicker;
const dateFormat = 'MM-DD-YYYY';
class Statistical extends Component {

  state = {
    listItem: [],
    data : [],
    listOrderByYear:[],
    listInvoiceYear:[]
    
  }
  columnInvoice = [
    {
      title: 'ID',
      dataIndex: 'maPN',
    },
    {
      title: 'Code Text',
      dataIndex: 'maCode',
    },
    {
      title: 'Created Date',
      dataIndex: 'ngayTao',
    },
    {
      title: 'Provider',
      dataIndex: 'maNCC',
    },
    {
      title: 'Total Cost',
      dataIndex: 'tongTien',
      render(dataIndex) {
        return (
          <p style={{ marginBottom: 0 }}> {(dataIndex * 1).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}</p>
        )
      }

    }
  ];
  columnOrder = [
    {
      title: '#',
      dataIndex: 'maDDH',
    },
    {
      title: 'Placed On',
      dataIndex: 'ngayDat',
    },
    {
      title: 'Customer',
      dataIndex: 'tenNguoiNhan',
    },
    {
      title: 'Delivery Date',
      dataIndex: 'ngayXuLy',
    },
    {
      title: 'Total Price',
      dataIndex: 'tongTien',
      render(dataIndex) {
        return (
          <p style={{ marginBottom: "0" }}>  {(dataIndex * 1).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })} </p>
        )
      }
    },
  ];
  componentDidMount() {
    const startOfMonth = moment().startOf('month').format('MM-DD-YYYY HH:mm:ss');
    const endOfMonth = moment().endOf('month').format('MM-DD-YYYY HH:mm:ss');
    this.props.statistic(startOfMonth, endOfMonth);
    this.props.getOrderYear( moment().year());
    this.props.getInvoiceYear(moment().year());
    // if(typeof(this.props.statisticData.thongKeBanHang)!=="undefined"){
    //   // this.getProfit();
    // }
   
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, 
      item: nextProps.statisticData,
      listOrderByYear :nextProps.listOrderByYear, 
      listInvoiceYear:nextProps.listInvoiceYear
    }
  }

  onChangeRange = (date, dateStrings) => {
    this.props.statistic(dateStrings[0], dateStrings[1]);
  }
  onChangeYear = (date, dateStrings) => {
  //  console.log(date, dateStrings);
    
   this.props.getOrderYear(dateStrings);
   this.props.getInvoiceYear(dateStrings);
  }
  
  render() {
    if (!this.state.item || !this.state.item.thongKeBanHang || !this.state.item.thongKeNhapHang  ) {
      return <CircularProgress className="circular"/>;
    }
    const { DataView } = DataSet;
    let data = [];
     for (let i = 1; i <= 12; i++) {
                let col = {
                    State: (i).toString(),
                    "Revenue":  this.state.listOrderByYear[i-1].tongTien,
                    "Invoice":  this.state.listInvoiceYear[i-1].tongTien,
                }
                data.push(col);
        }
    const types = [
      "Revenue",
      "Invoice",
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

          if (key === "Revenue") {
            type = "a";
          } else {
            type = "b";
          }

          obj.type = type;
          return obj;
        }
      });
    const colorMap = {
      "Revenue": "orange",
      "Cost": "#1581E6",
    };
    const cols = {
      population: {
        tickInterval: 5000
      }
    };
    return (
      <div style={{ padding: 10 }}>
        <div className="online-shop-title"> STATISTICAL &nbsp; <RangePicker 
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={this.onChangeRange}
          format={dateFormat}
          defaultValue={[moment().startOf('month'), moment().endOf('month')]}
        /> <MonthPicker onChange={this.onChangeYear} placeholder="Select Year" format="YYYY"  /></div>
        <div>
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
                  marginRatio: 0
                },
                {
                  type: "stack"
                }
              ]}
            />
          </Chart>
          <div className="d-flex justify-content-around">
            <p style={{ textAlign: "center" }}>
              <span>Total Revenue </span><br />
              <span style={{fontSize:20, fontWeight:"bold"}}>{this.state.item.thongKeBanHang.tongTien.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}</span>
            </p>
            <p style={{ textAlign: "center" }}>
              <span>Total Cost </span><br />
              <span style={{fontSize:20, fontWeight:"bold"}} >{this.props.statisticData.thongKeNhapHang.tongTien.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}</span>
            </p>
            <p style={{ textAlign: "center" }}>
              <span>Total Profit </span><br />
              <span style={{fontSize:20, fontWeight:"bold"}}>{this.props.statisticData.tongDoanhThu.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <span className="online-shop-title"> ORDER LIST </span>
          <ExportCSV csvData={this.state.item.thongKeBanHang.dsDonDatHang} fileName={this.state.fileName} />
          <Table className="mt-2"
            onRow={(record, rowIndex) => {

              return {
                onDoubleClick: event => { this.props.history.push('/dashboard/detailorderAD/' + record.maDDH) }, // click row
              };
            }}
            columns={this.columnOrder} dataSource={this.state.item.thongKeBanHang.dsDonDatHang} rowKey='maDDH' style={{ backgroundColor: "white" }} />
        </div>
        <div className="mt-4">

          <span className="online-shop-title"> INVOICE LIST </span>
          <ExportCSV csvData={this.state.item.thongKeNhapHang.dsNhapHang} fileName={this.state.fileName} />
          <Table className="mt-2"
            onRow={(record, rowIndex) => {

              return {
                onDoubleClick: event => { this.props.history.push("/dashboard/invoice/" + record.maPN) }, // click row
              };
            }}
            columns={this.columnInvoice} dataSource={this.state.item.thongKeNhapHang.dsNhapHang} rowKey='maPN' style={{ backgroundColor: "white" }} />
        </div>


        <p></p>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    statisticData: state.rootReducerAD.statisticData,
    listOrderByYear: state.rootReducerAD.listOrderByYear,
    listInvoiceYear: state.rootReducerAD.listInvoiceYear
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    statistic: (ngayBD, ngayKT) => {
      dispatch(statisticAction(ngayBD, ngayKT))
    },
    getOrderYear:(year)=>{
      dispatch(getOrderYearAction(year))
    },
    getInvoiceYear:(year)=>{
      dispatch(getInvoiceYearAction(year))
    }

  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Statistical))