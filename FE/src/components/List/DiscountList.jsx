import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import SearchIcon from "@material-ui/icons/Search";
// import TextField from "@material-ui/core/TextField";
import {
  Divider,
  Table,
  Button,
  Popconfirm
  // message
} from 'antd';
import {
  getListDiscountAction,
  deleteDiscountAction
} from './../../redux/actions/AdminData';
import { CircularProgress } from "@material-ui/core";


class DiscountListAdmin extends Component {

  componentDidMount() {
    this.props.getListDiscountAD();
  }
  componentWillReceiveProps() {
    return { ...this.state }
  }
  columns = [
    {
      title: 'Code Text',
      dataIndex: 'code',
    },
    {
      title: 'Started Date',
      dataIndex: 'ngayBD',
    },
    {
      title: 'Finished Date',
      dataIndex: 'ngayKT',
    },
    {
      title: 'Decription',
      dataIndex: 'moTa',

    },
    {
      title: 'Status',
      dataIndex: 'trangThai',
      render(dataIndex) {
        return (!dataIndex ?
          <div style={{ color: "#375975" }}> <i className="fas fa-circle" style={{ color: "#lightgray", fontSize: 10 }}></i> &nbsp;
                Close   </div> :
          <div><i className="fas fa-circle" style={{ color: "#13BEBB", fontSize: 10 }}></i> &nbsp;
                 Open   </div>)
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        <span key={record.maKM}>
           <span onClick={()=> this.props.history.push("/dashboard/discountCRUD/" + record.maKM)} >Edit </span>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteDiscountAD(record.maKM)}>
          <span>Delete </span>
          </Popconfirm>
        </span>

    }
  ];
  render() {
    if(!this.props.listDataAD){
      return(
        <CircularProgress  className="circular" />
      )
    }
    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> Dicount's List </div>
          <div>
            <Button
              style={{ margin: 5, backgroundColor: "#2BD5C5", color: "white" }}
              onClick={() => {
                this.props.history.push("/dashboard/discountCRUD")
              }}
            >
              ADD DISCOUNT &nbsp; <i className="fas fa-plus"></i>
            </Button>
          </div>
        </div>
        <div>
          <Table
            onRow={(record, rowIndex) => {
              return {
                rowKey: 'maBL',
                onDoubleClick: event => { this.props.history.push("/dashboard/discounts/" + record.maKM) }, // click row
              };
            }}
            columns={this.columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listDataAD: state.rootReducerAD.listDataAD,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListDiscountAD: () => {
      dispatch(getListDiscountAction())
    },
    deleteDiscountAD: (maKM) => {
      dispatch(deleteDiscountAction(maKM))
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiscountListAdmin))
