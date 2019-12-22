import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getListOrderAction , deleteOrderAction,getListOrderClientAction} from './../../redux/actions/AdminData'
import { 
    Table, 
    Tabs , 
    Popconfirm} from 'antd';
const { TabPane } = Tabs;

class ListOrderAD extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        listItem: [],
    }

    start = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    callback = (key) => {
        
        if(typeof(this.props.match)==="undefined" ||!this.props.match.params.id){
            this.props.history.push("/dashboard/listorder/"+key);
            this.props.getListOrderAD(key);
        }else
        {
            this.props.history.push("/userOrder/"+this.props.match.params.id+"/"+key);
            this.props.getListOrderCL(this.props.match.params.id, key)
        }
        
        
        
    }

    componentDidMount() {
        console.log(this.props.match.params);
        if(typeof(this.props.match)==="undefined" || !this.props.match.params.id){
            this.props.getListOrderAD(this.props.match.params.status);
        }
        else
        this.props.getListOrderCL(this.props.match.params.id, this.props.match.params.status)
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
                                return <div className="statusInList" style={{ backgroundColor: "#13BEBB"}}> 
                                {/* <i className="fas fa-circle" style={{ color: "#lightgray", fontSize: 10 }}></i> &nbsp; */}
                              Checked </div>;
                            case 1: 
                            return <div className="statusInList" style={{ backgroundColor: "rgb(27, 137, 191)"}}> 
                            Deliveried </div>;
                            case -1: 
                            return <div className="statusInList" style={{ backgroundColor: "rgb(79, 10, 10)"}}> 
                            Cancled </div>;
                            default: 
                                return <div className="statusInList" style={{ backgroundColor: "rgb(64, 123, 5)"}}>
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
                        case 1: return  <div className="statusInList" style={{ backgroundColor: "orange" }}>Paided
                         </div>;
                        case -1: return<div className="statusInList" style={{ backgroundColor: "orange"}}>ReFund
                        </div> ;
                        default: return<div className="statusInList" style={{ backgroundColor: "#28317d"}}>UnPaid
                        </div> ;
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
                    {!this.props.userInfor.maLoaiND === "KH"|| this.props.userInfor.maLoaiND === "NV"|| typeof(this.props.userInfor.maLoaiND) === "undefined" ?
                  <Popconfirm title="Sure to delete?" 
                  onConfirm={() => this.props.deleteOrder(record.maDDH)}
                  >
                    <div style={{ backgroundColor: "rgb(234, 66, 66)" ,color:"white" , borderRadius:5, textAlign:"center"}}> 
                            Delete </div>
                  </Popconfirm>:<span>View</span>}
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
                    <Tabs activeKey={this.props.match.params.status} onChange={this.callback}>
                        <TabPane tab="Order already to check" key="0">
                            <div>
                                <Table
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onDoubleClick: event => {!this.props.match.params.id? this.props.history.push('/dashboard/detailorderAD/' + record.maDDH) : this.props.history.push('/detailorderUser/' + record.maDDH)}, // click row
                                        };
                                    }}
                                    columns={this.columns} dataSource={this.props.listDataAD.reverse()} rowKey='maDDH' style={{ backgroundColor: "white" }} />
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
        listDataAD: state.rootReducerAD.listOrder,
        userInfor: state.rootReducerAD.userInfor
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
            dispatch(getListOrderClientAction(maND,trangThai));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOrderAD)
