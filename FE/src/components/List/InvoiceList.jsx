import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  // Divider,
  Table,
  Button,
  Popconfirm
  // message
} from 'antd';
import {
  getListInvoiceAction,
  deleteInvoiceAction
} from './../../redux/actions/AdminData';
import { CircularProgress } from "@material-ui/core";
// import Swal from 'sweetalert2'

class InvoiceListAdmin extends Component {
  columns = [
    {
      title: 'ID',
      dataIndex: 'maPN',
    },
    // {
    //   title: 'Code Text',
    //   dataIndex: 'maCode',
    // },
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
  
    },
    {
      title: 'Status',
      dataIndex: 'trangThai',
      render(dataIndex) {
        return (dataIndex ?
          <div>
            <i className="fas fa-circle" style={{ color: "#13BEBB", fontSize: 10 }}></i>
            &nbsp; FullFill</div> :
          <div><i className="fas fa-circle" style={{ color: "gray", fontSize: 10 }}></i> &nbsp;
                                  UnFullFill </div>)
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
          <span key={record.maPN}>
             {/* <span onClick={()=> this.props.history.push("/dashboard/invoice/"+record.maPN)} >Edit </span>
            <Divider type="vertical" /> */}
            <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteInvoiceAD(record.maPN)}>
            <div style={{ backgroundColor: "rgb(234, 66, 66)" ,color:"white" , borderRadius:5, textAlign:"center"}}> 
                            Delete </div>
            </Popconfirm>
          </span>
    }
  ];
  componentDidMount() {
    this.props.getListInvoiceAD();
  }

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //       return {prevState};
  //     }
  componentWillReceiveProps() {
    return { ...this.state }
  }
  render() {
    if(!this.props.listDataAD){
      return(
        <CircularProgress  className="circular" />
      )
    }
    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> INVOICE LIST </div>
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
                this.props.history.push("/dashboard/import")
              }}
            >
              ADD INVOICE &nbsp; <i className="fas fa-plus"></i>
            </Button>
          </div>
        </div>
        <div>
          <Table
            onRow={(record, rowIndex) => {

              return {
                onDoubleClick: event => {this.props.history.push("/dashboard/invoice/"+record.maPN) }, // click row
              };
            }}
            columns={this.columns} dataSource={this.props.listDataAD} rowKey='maPN' style={{ backgroundColor: "white" }} />
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
    getListInvoiceAD: () => {
      dispatch(getListInvoiceAction())
    },
    deleteInvoiceAD:(maPN) =>{
      dispatch(deleteInvoiceAction(maPN))
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceListAdmin))
