import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { 
    Divider, 
    Table, 
    Popconfirm, 
    Tabs ,
    Button
  } from 'antd';
import {
  getListProviderAction,
  getListProducerAction
} from './../../redux/actions/AdminData';

class PartnerList extends Component {

  columnsNSX = [
    {
      title: 'CompanyCode',
      dataIndex: 'maNSX',
  
    },
    {
      title: 'Company Name',
      dataIndex: 'tenNSX',
    },
    {
      title: 'Company Infor',
      dataIndex: 'thongTin',
    },
    {
      title: 'Image',
      dataIndex: 'hinhAnh',
    },
    {
      title: "Action",
      key: "action",
      render:(text, record) =>
          <span>
            <span >Edit</span>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" 
            // onConfirm={() => this.props.deleteUser(record.maND)}
            >
              <span>Delete</span>
            </Popconfirm>
            
          </span>
      
    }
  
  ];
  columnsNCC = [
    {
      title: 'CompanyCode',
      dataIndex: 'maNCC',
  
    },
    {
      title: 'Company Name',
      dataIndex: 'tenNCC',
    },
    {
      title: 'Company Address',
      dataIndex: 'diaChi',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
        title: 'Fax',
        dataIndex: 'fax',
      },
    {
      title: "Action",
      key: "action",
      render:(text, record) =>
          <span>
            <span >Edit</span>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" 
            // onConfirm={() => this.props.deleteUser(record.maND)}
            >
              <span>Delete</span>
            </Popconfirm>
            
          </span>
      
    }
  
  ];

  componentWillMount() {
    this.props.getListProvider()
  }
  callback = (key) => {
    if(key==="NSX"){
        this.props.getListProducer()
    }
    if(key==="NCC"){
        this.props.getListProvider()
    }
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> PARTNER </div>
          <div>
        <Button
              style={{ margin: 5, backgroundColor: "#2BD5C5", color: "white" }}
              onClick={() => {
                this.props.history.push("/dashboard/partnerCRUD")
              }}
            >
              ADD PARTNER &nbsp; <i className="fas fa-plus"></i>
            </Button>
        </div>
        </div>
       
        <Tabs defaultActiveKey="NCC" onChange={this.callback}>
          <TabPane tab="Provider" key="NCC">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: event => {}, // click row
                  };
                }}
                columns={this.columnsNCC} dataSource={this.props.listProvider} rowKey='maNCC' style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          <TabPane tab="Producer" key="NSX">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: event => { }, // click row
                  };
                }}
                columns={this.columnsNSX} dataSource={this.props.listDataAD}  rowKey='maNSX' style={{ backgroundColor: "white" }} />
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
    listProvider : state.rootReducerAD.listProvider
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListProvider:()=>{
        dispatch(getListProviderAction())
    },
    getListProducer:()=>{
        dispatch(getListProducerAction())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PartnerList))
