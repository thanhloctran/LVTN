import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./listStyle.css";
// import Button from "@material-ui/core/Button";
// import SearchIcon from "@material-ui/icons/Search";
// import TextField from "@material-ui/core/TextField";
import Highlighter from 'react-highlight-words';
import { 
  // Divider, 
  Table, 
  Button, 
  Input,
  Icon,
  Tabs , 
  Popconfirm } from 'antd';


import {
  getListProductAction,
  deleteProductAction
} from './../../redux/actions/AdminData';
import BackToTop from "../ProtectedRoute/BackToTop";


class ProductListAdmin extends Component {

  state= {
    resultDelete : this.props.resultDelete,
    listItem:[],
    searchText: '',
    searchedColumn: '',
  }
  

  // deleteProduct=maSP=> {
  //   this.props.deleteProductAD(maSP);
  // }
  componentDidMount() {
    //console.log(this.props.match.params);
    this.props.getListProductAD(this.props.match.params.status);
  }
  // componentDidUpdate(prevProps, prevState){
  //   this.props.getListProductAD(this.props.match.params.status);
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, resultDelete: nextProps.resultDelete, listItem: nextProps.listDataAD
    }
  }
  callback = (key) => {
    this.props.history.push("/dashboard/listproduct/"+key);
    this.props.getListProductAD(key);
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
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
        ...this.getColumnSearchProps('tenSP'),
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
        styte:"width=150",
        render:(text, record) =>
            <span key={record.maSP}>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteProductAD(record.maSP, this.props.match.params.status)}>
              <div className="btn-action">  Delete</div>
              </Popconfirm>
         </span>
      }
    
    ];
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
        <Tabs activeKey={this.props.match.params.status} onChange={this.callback}>
          <TabPane tab="Publish Product" key="1">
            <div>
            <Table
            onRow={(record, rowIndex) => {
              return {
                rowKey: 'maSP',
                onDoubleClick: event => { this.props.history.push("/dashboard/productCRUD/" + record.maSP) }, // click row
              };
            }}
            columns={columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
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
            columns={columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
          <TabPane tab="Product Out Of Stock" key="-1">
            <div>
            <Table
            onRow={(record, rowIndex) => {
              return {
                rowKey: 'maSP',
                onDoubleClick: event => { this.props.history.push("/dashboard/productCRUD/" + record.maSP) }, // click row
              };
            }}
            columns={columns} dataSource={this.props.listDataAD} style={{ backgroundColor: "white" }} />
            </div>
          </TabPane>
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
    deleteProductAD: (maSP, trangThai) => {
      dispatch(deleteProductAction(maSP, trangThai))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListAdmin))
