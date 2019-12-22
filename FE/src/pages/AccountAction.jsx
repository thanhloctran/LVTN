import React from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import { Paper } from '@material-ui/core';

import { addUserAction, updateAccountAction, getDetailUserAction } from "./../redux/actions/Data";

import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  DatePicker
} from 'antd';

import moment from 'moment';
const { Option } = Select;
class Account extends React.Component {
  state = {
    confirmDirty: false,
    detailUser: {},
    employeeAccount:""
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    
    if(typeof(this.props.match.params.id)==="undefined"){
      this.props.getDetailUser(this.props.userInfor.taiKhoan);
    }
    else{
      this.props.getDetailUser(this.props.match.params.id);
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    // if(typeof(this.props.match.params.id)==="undefined" && this.props.match.params.id!==""){
    //   this.props.getDetailUser(this.props.userInfor.taiKhoan);
    // }
    // else{
    //   this.props.getDetailUser(this.props.match.params.id);
    // }
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, detailUser: nextProps.detailUser
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const fieldsValue = {
          ...values,
          'ngaySinh': values['ngaySinh'].format('MM-DD-YYYY'),
          'trangThai': 1,
          'maND': this.state.detailUser.maND
        }
        // console.log('Received values of form: ', fieldsValue);
        if (this.props.match.params.id!=="null") {
          this.props.updateAccountInfor(fieldsValue);
        }
        else {
          this.props.registerAccount(fieldsValue);
        }
       

      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
    // if (!this.props.loginStatus) {
    //   return <Redirect to={"/login"} />;
    // }

    return (

      <Paper className="col-md-10 m-auto pb-5">
        <p className="cover-title">Account Infor</p>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Account Name">
            {getFieldDecorator('taiKhoan', {
              rules: [
                {
                  required: true,
                  message: 'Please input Account Name!',
                },
              ], initialValue: this.state.detailUser.taiKhoan
            })(<Input />)}
          </Form.Item>

            {typeof(this.props.match.params.id)=== "undefined" || this.props.match.params.id === this.state.detailUser.taiKhoan ?
                <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('matKhau', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ], initialValue: this.state.detailUser.matKhau
                })(<Input.Password />)}
              </Form.Item>
               :
              <div></div>
                
          } 
            
         

          <Form.Item label="Full Name">
            {getFieldDecorator('hoTen', {rules: [{required: true,message: 'Please input Full Name!'}], initialValue: this.state.detailUser.hoTen})(<Input />)}
          </Form.Item>

          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ], initialValue: this.state.detailUser.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="BirthDay">
            {getFieldDecorator('ngaySinh', { rules: [{ type: 'object', required: true, message: 'Please select time!' }], initialValue: moment(this.state.detailUser.ngaySinh, "MM/DD/YYYY") })(<DatePicker format={"DD/MM/YYYY"} />)}
          </Form.Item>

          <Form.Item label="Address">
            {getFieldDecorator('diaChi', {
              rules: [
                {
                  required: true,
                  message: 'Please input Address!',
                },
              ], initialValue: this.state.detailUser.diaChi
            })(<Input />)}
          </Form.Item>

          <Form.Item label="IdentiCard">
            {getFieldDecorator('cmnd', {
              rules: [
                {
                  required: true,
                  message: 'Please input your IdentiCard!'
                }], initialValue: this.state.detailUser.cmnd
            })(<Input style={{ width: '50%' }} />)}
          </Form.Item>

          <Form.Item label="Phone Number">
            {getFieldDecorator('soDT', {
              rules: [{ required: true, message: 'Please input your phone number!' }], initialValue: this.state.detailUser.soDT
            })(<Input style={{ width: '50%' }} />)}
          </Form.Item>

          {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                rules: [{ required: false, message: 'Please input the captcha you got!' }],
              })(
                <Input />
                 )} 
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item> */}
           {typeof(this.props.userInfor)!== "undefined" && this.state.detailUser.loaiND === "NV" ?
          <Form.Item hiđen label="Type User" hasFeedback>
          {getFieldDecorator('loaiND', {
            rules: [{ required: true}], initialValue: this.state.detailUser.loaiND
          })(
            <Select>
              <Option value="KH">Custommer</Option>
              <Option value="NV">Employee</Option>
            </Select>,
          )}
        </Form.Item>
        : <span></span>}
          <Form.Item {...tailFormItemLayout}>
            <Checkbox>
              I have read the <span>agreement</span>
            </Checkbox>,
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
    typeUser: state.rootReducer.listTypeUser,
    result: state.rootReducerAD.result,
    detailUser: state.rootReducer.userInfor,
    userInfor: state.rootReducerAD.userInfor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerAccount: (user) => {
      dispatch(addUserAction(user));
    },
    updateAccountInfor: (product) => {
      dispatch(updateAccountAction(product))
    },
    getDetailUser: (id) => {
      dispatch(getDetailUserAction(id))
    }

  }
}


export default compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Account)));
