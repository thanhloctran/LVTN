import React from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import {
    getListProductAction,
    getListProviderAction ,
    getDetailInvoiceAction,
    addInvoiceAction
  } from './../redux/actions/AdminData';
// import Swal from 'sweetalert2'
import moment from 'moment';
import { Paper } from '@material-ui/core';
import {
  Form,
  Input,
  Icon,
  Select,
  Button,
  DatePicker,
  InputNumber
} from 'antd';



const { Option } = Select;
let id = 0;

class ImportProduct extends React.Component {
  state = {
    confirmDirty: false,
    id: this.props.match.params.id,
    userInfor: {}
  };

  componentDidMount(){
    this.props.getListProduct();
    this.props.getListProviderAD();
    console.log(this.props.match.params.id);
    
  }


  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
    let maNV =retrievedObject.maND;
    this.props.form.validateFields((err, values) => {
      var dsSanPham = [{
        maSP: values.maSP,
        donGia: values.donGia,
        dsSeriSanPham:[],
      }];
      values.dsSeriSanPham.forEach(element => {
        let item = element
        dsSanPham[0].dsSeriSanPham.push(item)
      });
      if (!err) {
        
        const fieldsValue = {
          'dsSanPham': dsSanPham,
          'maCode': values.maCode,
          'ngayTao': values['ngayTao'].format('MM/DD/YYYY HH:mm:ss'),
          'trangThai': 1,
          'maNV': maNV,
          'maNCC': values.maNCC
        }
        console.log('Received values of form: ', fieldsValue);
        this.props.addInvoice(fieldsValue);
       
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  render() {
     
    const { getFieldDecorator , getFieldValue} = this.props.form;
    // const { autoCompleteResult } = this.state;

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
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
          md: { span: 14,offset: 6 },
        },
      };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Seri Number' : ''}
        required={false}
        key={k}
      >
        
        {getFieldDecorator(`dsSeriSanPham[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: false,
              message: "Please input seri number  or delete this field.",
            },
          ],
        })(<Input placeholder="Product Seri" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <Paper className="col-md-10 m-auto pb-5">
      <span className="cover-title">IMPORT PRODUCT</span>  
     
      <Form style={{marginTop:20}} {...formItemLayout} onSubmit={this.handleSubmit}>

      <Form.Item label="Invoice'S ID">
          {getFieldDecorator('maCode', {
            rules: [
              {
                required: true,
                message: 'Please input Invoice ID!',
              },
            ],
          })(<Input />)}
        </Form.Item>

      <Form.Item label="Product's ID" hasFeedback>
            {getFieldDecorator('maSP', {
              rules: [{ required: true, message: 'Please select Product!' }], initialValue: this.props.match.params.id
            })(
              <Select placeholder="Please select product ">
                {this.props.listProduct.map((itemx, index) => {

                return (<Option key={index} value={itemx.maSP}>[{itemx.maSP} ] &nbsp; {itemx.tenSP}</Option>)
                })}
              </Select>,
            )}
          </Form.Item>

        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add}>
            <Icon type="plus" /> Add Seri
          </Button>
        </Form.Item>


          <Form.Item label="Provider" hasFeedback>
            {getFieldDecorator('maNCC', {
              rules: [{ required: true, message: 'Please select Provider!' }],
            })(
              <Select placeholder="Please select Provider ">
                {this.props.listProvider.map((itemx, index) => {

                return (<Option key={index} value={itemx.maNCC}>[{itemx.maNCC} ] &nbsp; {itemx.tenNCC}</Option>)
                })}
              </Select>,
            )}
          </Form.Item>
        <Form.Item label="Price">
          {getFieldDecorator('donGia', {
            rules: [{ required: true, message: 'Please input Price!' }],
          })(<InputNumber
            style={{ width: '100%' }}  min={1}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          /> )}
        </Form.Item>

        <Form.Item label="Date Created">
          {getFieldDecorator('ngayTao', {rules: [{ type: 'object', required: true, message: 'Please select time!' }],initialValue: moment() })(<DatePicker disabled={true} showTime format="DD/MM/YYYY HH:mm:ss"  />)}
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
      userInfor: state.rootReducer.userInfor,
      result: state.rootReducerAD.result,
      listProduct: state.rootReducerAD.listDataAD,
    //   listProducer: state.rootReducerAD.listProducer,
      listProvider: state.rootReducerAD.listProvider,
    }
  }
const mapDispatchToProps = (dispatch) => {
  return {
    getListProduct: () => {
        dispatch(getListProductAction("null"))
      },
    getListProviderAD: () => {
        dispatch(getListProviderAction())
    },
    getDetailInvoice: (id) =>{
        dispatch(getDetailInvoiceAction(id))
      },
    addInvoice : (item) =>{
        dispatch(addInvoiceAction(item))
      },

  }
}


export default compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ImportProduct))) ;
