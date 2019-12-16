import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Highlighter from 'react-highlight-words';
import { 
//   Divider, 
  Table, 
  Button, 
  Input,
  Icon,
  Tabs , 
  Popconfirm } from 'antd';
import {
//   getListCustomerAction,
//   deleteUserAction,
  getListWarrantyAction
} from './../../redux/actions/AdminData';
import { CircularProgress } from "@material-ui/core";

class WarrantyList extends Component {
  state= {
    resultDelete : this.props.resultDelete,
    listItem:[],
    searchText: '',
    searchedColumn: '',
  }
  
  
  componentDidMount() {
    this.props.getListWarranty("-1");
  }
  callback = (key) => {
    this.props.getListWarranty(key);
  }

  handelOnclick(maBH, id){
    // console.log(id);
    this.props.history.push("warranty/"+ maBH+"/"+ id)
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
        title: 'ID',
        dataIndex: 'maBH',
        ...this.getColumnSearchProps('maBH'),
    
      },
      {
        title: 'Product Seri',
        dataIndex: 'maSeri',
        ...this.getColumnSearchProps('maSeri'),
      },
      {
        title: 'Date',
        dataIndex: 'ngayTao',
      },
      {
        title: 'Note',
        dataIndex: 'noiDung',
      },
      {
        title: 'Status',
        dataIndex: 'trangThai',
        render(dataIndex) {
          return (dataIndex===-1 ?
            <div style={{ color: "#375975" }}> <i className="fas fa-circle" style={{ color: "#13BEBB", fontSize: 10 }}></i> &nbsp;
                 UnHandel  </div> :
            <div><i className="fas fa-circle" style={{  color: "#lightgray",fontSize: 10 }}></i> &nbsp;
                  Done  </div>)
        }
      },
      {
        title: "Action",
        key: "action",
        render:(text, record) =>
            <span>
              <Popconfirm title="Sure to cancle?" 
            //   onConfirm={() => this.props.deleteUser(record.maND, record.loaiND)}
              >
              <span style={{ backgroundColor: "rgb(234, 66, 66)" ,color:"white" , borderRadius:5, textAlign:"center"}}> 
                              Cancle </span>
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
          <div className="online-shop-title"> Warranty List </div>
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
               this.props.history.push("/dashboard/warranty")
              }}
            >
              ADD  WARRANTY SHEDUCLE &nbsp; <i className="fas fa-plus"></i>
            </Button>
          </div>
        </div>
        <Tabs defaultActiveKey="-1" onChange={this.callback}>
          <TabPane tab="Already to check" key="-1">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    rowKey: 'maND',
                    key: rowIndex,
                   onDoubleClick: event => { this.handelOnclick(record.maBH, record.maSeri) }, // click row
                  };
                }}
                columns={columns} dataSource={this.props.listDataAD} rowKey='maBH' style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          <TabPane tab="FullFilled" key="1">
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    rowKey: 'maBH',
                    onDoubleClick: event => { this.handelOnclick(record.maBH,record.maSeri) }, // click row
                  };
                }}
                columns={columns} dataSource={this.props.listDataAD} rowKey='maBH' style={{ backgroundColor: "white" }} />
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
    // getList: (key) => {
    //   dispatch(getListCustomerAction(key))
    // },
    // deleteUser:(maND,loaiND)=>{
    //   dispatch(deleteUserAction(maND, loaiND))
    // },
    getListWarranty: (key) => {
        dispatch(getListWarrantyAction(key))
      },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WarrantyList))
