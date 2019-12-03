import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { 
  Table,
  // Button 
  } from 'antd';
import {
  getListReviewAction,
  deleteReviewAction
} from './../../redux/actions/AdminData';


class ReviewListAdmin extends Component {
  state = {
    propertiesName: []
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
          <span key={record.maBL} onClick={()=>{this.props.deleteReview(record.maBL);
          }}>Delete</span>
        
      
    }
  ];
  componentDidMount() {
    // console.log("dataReceive",this.props.listDataAD);
    this.props.getList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
    }
  }

  

  render() {

    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="online-shop-title"> REVIEWS </div>
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
