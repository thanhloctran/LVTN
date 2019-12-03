import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./listStyle.css";
// import Button from "@material-ui/core/Button";
// import SearchIcon from "@material-ui/icons/Search";
// import TextField from "@material-ui/core/TextField";
import { 
  Divider, 
  Table, 
  Button, 
  // message, 
  Tabs , 
  Popconfirm} from 'antd';
import {
  getListProductAction,
  deleteProductAction
} from './../../redux/actions/AdminData';
import BackToTop from "../ProtectedRoute/BackToTop";
// import Swal from 'sweetalert2'

// function confirm(e) {
//   console.log(e);
//   message.success('Click on Yes');
// }

// function cancel(e) {
//   console.log(e);
//   message.error('Click on No');
// }


class ProductListAdmin extends Component {

  state= {
    resultDelete : this.props.resultDelete,
  }
  columns = [
    {
      title: 'Image',
      dataIndex: 'hinhAnh',
      className: "colImage",
      render(dataIndex) {
        return (
          <img style={{ width: 130}} alt="Product" src={dataIndex} />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'tenSP',
    },
    {
      title: 'Price',
      dataIndex: 'donGia',
      render(dataIndex) {
        return (
          <p> {(dataIndex*1).toLocaleString("en-US", { 
            style: "currency", 
            currency: "USD"
          })} </p>
        )
      }
    },
    {
      title: 'In Stock',
      dataIndex: 'soLuongTon',
    },
    {
      title: 'Status',
      dataIndex: 'trangThai',
      render: (dataIndex) =>
      <div>
          {(() => {
              switch (dataIndex) {
                case 1: return "Publish";
                case 2: return "UnPublish";
                default: return "Deleted Product";
            }
          })()}
      </div>
    },
    {
      title: "Action",
      rowIndex: "maSP" ,
      render:(text, record) =>
          <span key={record.maSP}>
            <span>Edit</span>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteProductAD(record.maSP)}>
            <span>Delete</span>
            </Popconfirm>
       </span>
    }
  
  ];

  deleteProduct=maSP=> {
    this.props.deleteProductAD(maSP);
  }
  componentDidMount() {
    this.props.getListProductAD("1");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, resultDelete: nextProps.resultDelete
    }
  }

  callback = (key) => {
    this.props.getListProductAD(key);
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> Products </div>
          <div>
            <Button
              style={{ margin: 5, backgroundColor: "#2BD5C5", color: "white" }}
              onClick={() => {
                this.props.history.push("/dashboard/productCRUD")
              }}
            >
              ADD PRODUCT &nbsp; <i className="fas fa-plus"></i>
            </Button>
          </div>
        </div>
        <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Publish Product" key="1">
            <div>
            <Table
            onRow={(record, rowIndex) => {
              return {
                rowKey: 'maSP',
                onDoubleClick: event => { this.props.history.push("/dashboard/productCRUD/" + record.maSP) }, // click row
              };
            }}
            columns={this.columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          <TabPane tab="UnPublish Product" key="2">
            <div>
            <Table
            onRow={(record, rowIndex) => {
              return {
                rowKey: 'maSP',
                onDoubleClick: event => { this.props.history.push("/dashboard/productCRUD/" + record.maSP) }, // click row
              };
            }}
            columns={this.columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          {/* <TabPane tab="Deleted Product" key="0">
            <div>
            <Table
            onRow={(record, rowIndex) => {
              return {
                rowKey: 'maSP',
                onDoubleClick: event => { this.props.history.push("/dashboard/productCRUD/" + record.maSP) }, // click row
              };
            }}
            columns={this.columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
            </div>
          </TabPane> */}
        </Tabs>
        <BackToTop/>
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listDataAD: state.rootReducerAD.listDataAD,
    resultDelete: state.rootReducerAD.resultDelete,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListProductAD: (trangThai) => {
      dispatch(getListProductAction(trangThai))
    },
    deleteProductAD: (maSP) => {
      dispatch(deleteProductAction(maSP))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListAdmin))
