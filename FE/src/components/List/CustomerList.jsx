import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import Button from "@material-ui/core/Button";
// import SearchIcon from "@material-ui/icons/Search";
// import TextField from "@material-ui/core/TextField";
import Highlighter from 'react-highlight-words';
import { 
  Divider, 
  Table, 
  Button, 
  Input,
  Icon,
  Tabs , 
  Popconfirm } from 'antd';
import {
  getListCustomerAction,
  deleteUserAction
} from './../../redux/actions/AdminData';
import { CircularProgress } from "@material-ui/core";

class CustomerListAdmin extends Component {
  state= {
    resultDelete : this.props.resultDelete,
    listItem:[],
    searchText: '',
    searchedColumn: '',
  }
  
  
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
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search value`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const columns = [
      {
        title: 'Account',
        dataIndex: 'taiKhoan',
        ...this.getColumnSearchProps('taiKhoan'),
    
      },
      {
        title: 'Name',
        dataIndex: 'hoTen',
        ...this.getColumnSearchProps('hoTen'),
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
        ...this.getColumnSearchProps('email'),
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
               {/* <span>Edit</span>
              <Divider type="vertical" /> */}
              <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteUser(record.maND, record.loaiND)}>
              <div className="btn-action">  Delete</div>
              </Popconfirm>
              
            </span>
        
      }
    
    ];
  
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
            <Button
              style={{ margin: 5, backgroundColor: "#2BD5C5", color: "white" }}
              onClick={() => {
               this.handelOnclick(null);
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
                    rowKey: 'maND',
                    key: rowIndex,
                    onDoubleClick: event => { this.handelOnclick(record.taiKhoan) }, // click row
                  };
                }}
                columns={columns} dataSource={this.props.listDataAD} rowKey='maND' style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          <TabPane tab=" Employee Account" key="NV">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    rowKey: 'maND',
                    onDoubleClick: event => { this.handelOnclick(record.taiKhoan)}, // click row
                  };
                }}
                columns={columns} dataSource={this.props.listDataAD} rowKey='maND' style={{ backgroundColor: "white" }} />
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
    deleteUser:(maND,loaiND)=>{
      dispatch(deleteUserAction(maND, loaiND))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerListAdmin))
