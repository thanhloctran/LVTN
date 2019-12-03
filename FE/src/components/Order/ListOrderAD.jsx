import React, { Component } from 'react'
// import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getListOrderAction , deleteOrderAction,getListOrderClientAction} from './../../redux/actions/AdminData'
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import SearchIcon from "@material-ui/icons/Search";
import { 
    // Divider, 
    Table, 
    Tabs , 
    Popconfirm} from 'antd';
const { TabPane } = Tabs;

class ListOrderAD extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        listItem: []
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    callback = (key) => {
        if(typeof(this.props.match)==="undefined" ||!this.props.match.params.id){
            this.props.getListOrderAD(key);
        }else
        this.props.getListOrderCL(this.props.match.params.id, key)
        
        
    }

    componentDidMount() {
        if(typeof(this.props.match)==="undefined" || !this.props.match.params.id){
            this.props.getListOrderAD("0");
        }
        else
        
        this.props.getListOrderCL(this.props.match.params.id, "0")
    }// Store

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState, listItem: nextProps.listDataAD
        }
    }
    columns = [
        {
            title: '#',
            dataIndex: 'maDDH',
        },
        {
            title: 'Placed On',
            dataIndex: 'ngayDat',
        },
        {
            title: 'Customer',
            dataIndex: 'tenNguoiNhan',
        },
        {
            title: 'Order status ',
            dataIndex: 'trangThai',
            render: (dataIndex) =>
                <div>
                    {(() => {
                        switch (dataIndex) {
                            case 2: 
                                return <div style={{ color: "#375975" }}> <i className="fas fa-circle" style={{ color: "#lightgray", fontSize: 10 }}></i> &nbsp;
                              Checked </div>;
                            case 1: 
                                return "Deliveried";
                            case -1: 
                                return "Cancled";
                            default: 
                                return <div><i className="fas fa-circle" style={{ color: "#13BEBB", fontSize: 10 }}></i> &nbsp;
                                    UnCheck</div>;
                        }
                    })()}
                </div>
        },
       
        {
            title: 'Payment status',
            dataIndex: 'tinhTrang',
            render: (dataIndex) =>
            <div> 
                {(() => {
                    switch (dataIndex) {
                        case 1: return "Paided";
                        case -1: return "ReFund";
                        default: return "UnPaid";
                    }
                })()}
            </div>
        },
        
        {
            title: 'Total Price',
            dataIndex: 'tongTien',
            render(dataIndex) {
                return (
                    <p style={{marginBottom:"0"}}>  {(dataIndex * 1.0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        // maximumFractionDigits: 4
                    })} </p>
                )
            }
        },
        {
            title: 'Handel Order Date ',
            dataIndex: 'ngayXuLy',
            render: (dataIndex) =>
                <div>
                    {(() => {
                        switch (dataIndex) {
                            case null : return "NO HANDEL";
                            default: return dataIndex;
                        }
                    })()}
                </div>
        },
        {
            title: "Action",
            render:(text, record) =>
                <span key={record.maDDH}>
                  <Popconfirm title="Sure to delete?" 
                  onConfirm={() => this.props.deleteOrder(record.maDDH)}
                  >
                    <span>Delete</span>
                  </Popconfirm>
             </span>
          }
    ];

    render() {
        return (
            <div style={{ padding: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="online-shop-title"> Orders ready for shipment </div>
                </div>
                <div>
                    <Tabs defaultActiveKey="0" onChange={this.callback}>
                        <TabPane tab="Order already to check" key="0">
                            <div>
                                <Table
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onDoubleClick: event => {!this.props.match.params.id? this.props.history.push('/dashboard/detailorderAD/' + record.maDDH) : this.props.history.push('/detailorderUser/' + record.maDDH)}, // click row
                                        };
                                    }}
                                    columns={this.columns} dataSource={this.props.listDataAD} rowKey='maDDH' style={{ backgroundColor: "white" }} />
                            </div>
                        </TabPane>
                        <TabPane tab="Checked Order" key="2">
                            <div>
                                <Table
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onDoubleClick: event => {!this.props.match.params.id? this.props.history.push('/dashboard/detailorderAD/' + record.maDDH) : this.props.history.push('/detailorderUser/' + record.maDDH)}, // click row
                                        };
                                    }}
                                    columns={this.columns} dataSource={this.props.listDataAD} rowKey='maDDH' style={{ backgroundColor: "white" }} />
                            </div>
                        </TabPane>
                        <TabPane tab="FullFilled Order" key="1">
                            <div>
                                <Table
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onDoubleClick: event => {!this.props.match.params.id? this.props.history.push('/dashboard/detailorderAD/' + record.maDDH) : this.props.history.push('/detailorderUser/' + record.maDDH)}, // click row
                                        };
                                    }}
                                    columns={this.columns} dataSource={this.props.listDataAD} rowKey='maDDH' style={{ backgroundColor: "white" }} />
                            </div>
                        </TabPane>
                        <TabPane tab="Cancel Order" key="-1">
                            <div>
                                <Table
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onDoubleClick: event => {!this.props.match.params.id? this.props.history.push('/dashboard/detailorderAD/' + record.maDDH) : this.props.history.push('/detailorderUser/' + record.maDDH)}, // click row
                                        };
                                    }}
                                    columns={this.columns} dataSource={this.props.listDataAD} rowKey='maDDH' style={{ backgroundColor: "white" }} />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>


            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listDataAD: state.rootReducerAD.listOrder
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListOrderAD: (trangThai) => {
            dispatch(getListOrderAction(trangThai))
        },
        deleteOrder:(maDDH)=>{
            dispatch(deleteOrderAction(maDDH))
        },
        getListOrderCL: (maND,trangThai) => {
            dispatch(getListOrderClientAction(maND,trangThai))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOrderAD)
