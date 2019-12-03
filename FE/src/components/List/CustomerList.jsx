import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import Button from "@material-ui/core/Button";
// import SearchIcon from "@material-ui/icons/Search";
// import TextField from "@material-ui/core/TextField";
import { 
  Divider, 
  Table,
   Button, 
  //  message,
   Popconfirm, 
   Tabs } from 'antd';
import {
  getListCustomerAction,
  deleteUserAction
} from './../../redux/actions/AdminData';
import { CircularProgress } from "@material-ui/core";

class CustomerListAdmin extends Component {

  columns = [
    {
      title: 'Account',
      dataIndex: 'taiKhoan',
  
    },
    {
      title: 'Name',
      dataIndex: 'hoTen',
    },
    {
      title: 'Number Phone',
      dataIndex: 'soDT',
    },
    {
      title: 'Address',
      dataIndex: 'diaChi',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'trangThai',
      render(dataIndex) {
        return (!dataIndex ?
          <div style={{ color: "#375975" }}> <i className="fas fa-circle" style={{ color: "#lightgray", fontSize: 10 }}></i> &nbsp;
                Unactive </div> :
          <div><i className="fas fa-circle" style={{ color: "#13BEBB", fontSize: 10 }}></i> &nbsp;
             Active     </div>)
      }
    },
    {
      title: "Action",
      key: "action",
      render:(text, record) =>
          <span>
             <span>Edit</span>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteUser(record.maND)}>
            <span>Delete </span>
            </Popconfirm>
            
          </span>
      
    }
  
  ];

  componentWillMount() {
    // console.log("dataReceive",this.props.listDataAD);
    this.props.getList("KH");
  }
  callback = (key) => {
    this.props.getList(key);
  }

  handelOnclick(id){
    // console.log(id);
    this.props.history.push("accountCRUD/" + id)
    
    
  }
  render() {
    const { TabPane } = Tabs;
    if(!this.props.listDataAD){
      return(
        <CircularProgress  className="circular" />
      )
    }

    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> Account </div>
          <div>
            {/* <TextField className="header-search" style={{ position: "relative", top: -7 }} label="Search" />
            <Button
              style={{ marginRight: 20 }}
              variant="outlined"
              color="primary">
              {" "}
              <SearchIcon color="primary" size="small" />Search
            </Button> */}
            <Button
              style={{ margin: 5, backgroundColor: "#2BD5C5", color: "white" }}
              onClick={() => {
               this.handelOnclick("");
              }}
            >
              ADD ACCOUNT &nbsp; <i className="fas fa-plus"></i>
            </Button>
          </div>
        </div>
        <Tabs defaultActiveKey="KH" onChange={this.callback}>
          <TabPane tab="Customer Account" key="KH">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    key: rowIndex,
                    onDoubleClick: event => { this.handelOnclick(record.taiKhoan) }, // click row
                  };
                }}
                columns={this.columns} dataSource={this.props.listDataAD} rowKey='maND' style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          <TabPane tab=" Employee Account" key="NV">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: event => { this.handelOnclick(record.taiKhoan)}, // click row
                  };
                }}
                columns={this.columns} dataSource={this.props.listDataAD} rowKey='maND' style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
        </Tabs>



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
    getList: (key) => {
      dispatch(getListCustomerAction(key))
    },
    deleteUser:(maND)=>{
      dispatch(deleteUserAction(maND))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerListAdmin))
