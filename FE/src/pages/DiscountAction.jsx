import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from 'redux'
import {
  getListProductDiscountAction, addDiscountAction,
  getDetailDiscountAction,
  updateDiscountAction
} from './../redux/actions/AdminData';
import {
  Form,
  Input,
  // Icon,
  Select,
  Button,
  DatePicker,
  InputNumber
} from 'antd';
import moment from 'moment';
import { Paper } from '@material-ui/core';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class DiscountAction extends Component {
  state = {
    discountInfor: {},
    date: [],
    dsSanPhamSate:[]
  };
  

  componentDidMount() {
    this.props.getListProduct();
    if(typeof(this.props.match.params.id)==="undefined"){
      console.log("123");
      
      this.props.getDetailDiscountAD(0);
    }
    else{  
      this.props.getDetailDiscountAD(this.props.match.params.id);
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.item);
    
    return {
      ...prevState,discountInfor: nextProps.item
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
    let maNV = retrievedObject.maND;
    let maKM=0;
    if(typeof(this.props.match.params.id)!=="undefined"){
      maKM=this.props.match.params.id;
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let dsSanPhamKM = [];
        values.dsSanPham.forEach(element => {
          let item = {
            maSP: element,
            giamGia: values.giamGia,
          }
          dsSanPhamKM.push(item);
        });
        const fieldsValue = {
          'code': values.code,
          'dsSanPhamKM': dsSanPhamKM,
          'trangThai': 1,
          'maNV': maNV,
          'ngayBD': this.state.date[0],
          'ngayKT': this.state.date[1],
          'moTa': values.moTa,
          'maKM': maKM
        }
        console.log("fieldsValue",fieldsValue);
        if (this.props.match.params.id) {
          this.props.updateDiscount(fieldsValue);
        }
        else {
          this.props.addDiscount(fieldsValue);
        }
        

      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  onChange = (value, dateString) => {

    console.log("dateString", dateString);
    try {
      this.setState({
        date: dateString
      })
    } catch (Exception) {
      console.log("wrong");

    }

  }



  render() {
    // if (typeof(!this.state.discountInfor) ==="undefined"|| typeof(this.state.discountInfor.dsSanPhamKM) ==="undefined") {
    //   return <p style={{ margin: "20px" }}>NO VALUE </p>;
    //   }
    const { 
      getFieldDecorator, 
      // getFieldValue
     } = this.props.form;
    const dateFormat = "MM/DD/YYYY HH:mm:ss";

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        md: {
          span: 8,
          offset: 4,
        },
      },
    };
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 },
    //     md: { span: 14, offset: 6 },
    //   },
    // };

    
    return (

      <Paper className="col-md-10 m-auto pb-5">
        <span className="cover-title">DISCOUNT GENERAL</span>

        <Form style={{ marginTop: 20 }} {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="Discount Code">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: 'Please input Discount Code!',
                },
              ], initialValue: this.state.discountInfor.code
            })(<Input />)}
          </Form.Item>

          <Form.Item label="List Product">
            {getFieldDecorator('dsSanPham', {rules: [{ required: true, message: 'Please select product!' } ]})(<Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={handleChange}>
              {this.props.listProduct.map((item, index) => {
                return (<Option key={index} value={item.maSP}>{item.maSP} | {item.tenSP}</Option>)
              })}
            </Select>)}
          </Form.Item>




          <Form.Item label="Discount Percent">
            {getFieldDecorator('giamGia', {
              rules: [{ required: true, message: 'Please input discount!' }], 
              initialValue:  this.props.item.giamGia
            })(<InputNumber
              style={{ width: "175px" }}
              min={1}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            // onChange={onChange}
            />)}
          </Form.Item>
          <Form.Item label="Discount's Decription: ">
            {getFieldDecorator('moTa', { initialValue: this.state.discountInfor.moTa
            })(<TextArea rows={4} placeholder="Please input Discount Decription" />)}
          </Form.Item>

          <Form.Item label="RangePicker">
            {getFieldDecorator('ngay', { rules: [{ type: 'array', required: true, message: 'Please select time!' }], initialValue:[moment(this.props.item.ngayBD, dateFormat), moment(this.props.item.ngayKT, dateFormat)] })(<RangePicker
                onChange={this.onChange}
                showTime={{ format: 'HH:mm:ss' }}
                format="MM/DD/YYYY HH:mm:ss"
                placeholder={['Date Started', 'Date Finished']}
                value={[moment(this.props.item.ngayBD, dateFormat), moment(this.props.item.ngayKT, dateFormat)]}
                onOk={this.onOk}
              />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
              </Button>
          </Form.Item>
        </Form>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.rootReducerAD.detail,
    // result: state.rootReducerAD.result,
    listProduct: state.rootReducerAD.listDataAD,
   
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListProduct: () => {
      dispatch(getListProductDiscountAction())
    },
    addDiscount :(discountInfor)=>{
      dispatch(addDiscountAction(discountInfor))
    },
    updateDiscount:(discountInfor)=>{
      dispatch(updateDiscountAction(discountInfor))
    },
    getDetailDiscountAD: (maKM) => {
      dispatch(getDetailDiscountAction(maKM))
  }
  }
}

export default withRouter(compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(DiscountAction))));