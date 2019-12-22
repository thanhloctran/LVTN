import React from 'react'
import { connect } from 'react-redux';
import {
  getDetailProductAction,
  getListProducerAction,
  getListProviderAction,
  getListTypeProductAction,
  updateProductAction,
  addProductAction,
  upLoadImageAction
} from './../redux/actions/AdminData';

import {
  Form,
  Select,
  InputNumber,
  Switch,
  Input,
  Button,
  Upload,
  Icon,
  // Radio
} from 'antd';

import { Paper } from '@material-ui/core';
import { compose } from 'redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { isUndefined } from 'util';
// const { TextArea } = Input;
const { Option } = Select;



class ProductAction extends React.Component {

  state = {
    productInfor: {},
    
  }
  decription = "";
  
  componentDidMount() {
    // console.log(this.props.location.state); 
    this.props.getDetailProductAD(this.props.match.params.id);
    this.props.getListProducerAD();
    this.props.getListProviderAD();
    this.props.getListTypeProductAD();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, productInfor: nextProps.item
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let trangThai =1
        if(!values.trangThai){
          trangThai =2;
        }
        
        let valuePost = {
          ...values,
          trangThai:trangThai,
           mota: this.decription, 
           hinhAnh: values.hinhAnh.file.originFileObj.name
        };

        //upload image
        var formData = new FormData();
        formData.set('tenSP', valuePost.tenSP);
        formData.set('maSP', valuePost.maSP);
        formData.append('file', values.hinhAnh.file.originFileObj);
        this.props.upLoadImage(formData);
        console.log('Received values of form: ', valuePost)
        if (this.props.match.params.id) {
          this.props.updateProductInfor(valuePost);
        }
        else {
          this.props.addProductAD(valuePost);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (

      <Paper className="col-md-10 m-auto pb-5 product-action">
        <p className="cover-title">Product CRUD</p>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Product's ID: ">
            {getFieldDecorator('maSP', {
              rules: [{ required: true, message: 'Please input Product ID!', whitespace: true }], initialValue: this.state.productInfor.maSP
            })(<Input placeholder="Please input Product ID" />)}
          </Form.Item>

          <Form.Item label="Product's Name: ">
            {getFieldDecorator('tenSP', {
              rules: [{ required: true, message: 'Please input Product Name!', whitespace: true }], initialValue: this.state.productInfor.tenSP,
            })(<Input placeholder="Please input Product Name" />)}
          </Form.Item>
          <Form.Item label="Type" hasFeedback>
            {getFieldDecorator('maLoaiSP', {
              rules: [{ required: true, message: 'Please select product type!' }], initialValue: this.state.productInfor.maLoaiSP
            })(
              <Select placeholder="Please select product type">
                {this.props.type.map((itemx, index) => {
                  return (<Option key={index} value={itemx.maLoaiSP}>{itemx.tenLoai}</Option>)
                })}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Provider" hasFeedback>
            {getFieldDecorator('maNCC', {
              rules: [{ required: true, message: 'Please select provider!' }], initialValue: this.state.productInfor.maNCC
            })(
              <Select placeholder="Please select provider">
                {this.props.provider.map((itemx, index) => {
                  return (<Option key={index} value={itemx.maNCC}>{itemx.tenNCC}</Option>)
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Producer" hasFeedback>
            {getFieldDecorator('maNSX', {
              rules: [{ required: true, message: 'Please select producer!' }], initialValue: this.state.productInfor.maNSX
            })(
              <Select placeholder="Please select producer">

                {this.props.producer.map((itemx, index) => {
                  return (<Option key={index} value={itemx.maNSX}>{itemx.tenNSX}</Option>)
                })}
              </Select>,
            )}
          </Form.Item>


          <Form.Item label="Price">
            {getFieldDecorator('donGia', { rules: [{ required: true, message: 'Please input price Product!' }], initialValue: this.state.productInfor.donGia })(<InputNumber
                style={{ width: 200 }} min={1} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />)
            }
            <span className="ant-form-text"></span>
          </Form.Item>


        
          {/* <br style={{ clear: "both", display: "block", margin:"40px 0"  }} /> */}

         
          {/* <div className="d-flex"> */}
          <Form.Item label="In Stock" >
            {getFieldDecorator('soLuongTon',
              { initialValue: !this.state.productInfor.soLuongTon? 0:  this.state.productInfor.soLuongTon })(<InputNumber style={{ width: 200, marginRight: 20 }} min={0} disabled={true} className="input-label" />)}
            <Button type="primary" onClick={() => this.props.history.push(`/dashboard/import/${this.state.productInfor.maSP}`)}>
              Add product
            </Button>
          </Form.Item>

          <Form.Item label="View:  " >
            {getFieldDecorator('luotXem',{ initialValue:!this.state.productInfor.luotXem? 0:  this.state.productInfor.luotXem  })(<InputNumber min={0} className="input-label" />)}
          </Form.Item>
          <Form.Item label="Rating:   ">
            {getFieldDecorator('luotBC',{ initialValue: !this.state.productInfor.luotBC? 0:this.state.productInfor.luotBC })(<InputNumber min={0} className="input-label" max={5} disabled={true} />)}

          </Form.Item>
          <Form.Item label="Purchase:   ">
            {getFieldDecorator('soLanMua',{ initialValue: !this.state.productInfor.soLanMua? 0:  this.state.productInfor.soLanMua })(<InputNumber min={0} className="input-label" />)}
          </Form.Item>

          <Form.Item label="Warranty (Month):   ">
          {getFieldDecorator('thoiGianBH',{ initialValue: !this.state.productInfor.thoiGianBH? 0:  this.state.productInfor.thoiGianBH })(<InputNumber min={0} className="input-label" />)}
          </Form.Item>
          {/* </div> */}

          <Form.Item label="Published">
            {getFieldDecorator('trangThai', {  valuePropName: 'checked',initialValue:  this.state.productInfor.trangThai!==1? false:  true ,})(<Switch />)}
          </Form.Item>

          <Form.Item label="New Product">
            {getFieldDecorator('spMoi', {
              valuePropName: 'checked',
              initialValue:  !this.state.productInfor.spMoi? 0:  this.state.productInfor.spMoi ,
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="Upload Image">
            {getFieldDecorator('hinhAnh', {  rules: [{ required: true, message: 'Please choose product image!' }]

            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <div className="editor" >
            <p className="editor-title">Decription</p>
            <CKEditor
              editor={ClassicEditor}
              data={
                typeof(this.state.productInfor.moTa) === "undefined" ?
                " " : this.state.productInfor.moTa
                 
                // this.state.productInfor.moTa
              }

              onChange={(event, editor) => {
                const data = editor.getData();
                this.decription = data;
                console.log({ event, editor, data });
              }}

            />

          </div>
          <div className="d-flex" style={{ marginLeft: 25 }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
            <Form.Item style={{ marginLeft: 15 }}>
              <Button type="danger">
                Cancle
            </Button>
            </Form.Item>
          </div>

        </Form>
      </Paper>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.rootReducerAD.detail,
    producer: state.rootReducerAD.listDataAD,
    provider: state.rootReducerAD.listProvider,
    type: state.rootReducerAD.listTypeProduct,
    result: state.rootReducerAD.result
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProductAD: (maSP) => {
      dispatch(getDetailProductAction(maSP))
    },
    getListProducerAD: () => {
      dispatch(getListProducerAction())
    },
    getListProviderAD: () => {
      dispatch(getListProviderAction())
    },
    getListTypeProductAD: () => {
      dispatch(getListTypeProductAction())
    },
    updateProductInfor: (product) => {
      dispatch(updateProductAction(product))
    },
    addProductAD: (product) => {
      dispatch(addProductAction(product))
    },
    upLoadImage:(file)=>{
      dispatch(upLoadImageAction(file))
    }
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProductAction)));

