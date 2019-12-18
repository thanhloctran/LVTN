import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { 
  Table,
  Button 
  } from 'antd';
import {
  getListReviewAction,
  deleteReviewAction
} from './../../redux/actions/AdminData';
// import { Button } from "@material-ui/core";


class ReviewListAdmin extends Component {
  state = {
    propertiesName: [],
    deleteResult: this.props.deleteResult,
    listDataAD:[]
  };
  columns = [
    {
      title: 'Account',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Product',
      dataIndex: 'tenSP',
    },
    {
      title: 'Rating',
      dataIndex: 'danhGia',
      render(dataIndex) {
        return (<div>
          {function () {
            let row = [];
            for (let i = 0; i < dataIndex; i++) {
              row.push(<i key={i} className="fas fa-star" style={{ color: "#F1C40F" }}></i>)
            }
            return row;
          }()}
  
        </div>
        )
      }
    },
    {
      title: 'Date',
      dataIndex: 'ngayTao',
  
    },
    {
      title: 'Comment',
      dataIndex: 'noiDung',
    },
    {
      title: "Action",
      key: "action",
      render: (text, record)=> 
      <div style={{ backgroundColor: "rgb(234, 66, 66)" ,color:"white" , borderRadius:5, textAlign:"center"}}
      key={record.maBL} onClick={()=>{this.props.deleteReview(record.maBL);
      }}> 
         Delete </div>
        
      
    }
  ];
  componentDidMount() {
    this.props.getList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, listDataAD: nextProps.listDataAD
    }
  }

  

  render() {

    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> REVIEWS </div>
          <Button size="large" type="primary" onClick={()=>{
            this.componentDidMount()
          }}>Reload</Button>
        </div>
        
        <div>
          <Table
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: event => { this.props.history.push("/dashboard/reviews/"+record.maBL) }, // click row
              };
            }}
            columns={this.columns} dataSource={this.props.listDataAD} rowKey='maBL' style={{ backgroundColor: "white" }} />
        </div>


      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listDataAD: state.rootReducerAD.listReview,
    deleteResult:state.rootReducerAD.deleteResult
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => {
      dispatch(getListReviewAction())
    },
    deleteReview: (maBL) => {
      dispatch(deleteReviewAction(maBL))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewListAdmin))
