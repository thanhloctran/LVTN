import React from "react";
// import { 
//   withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from 'redux';
import { Paper } from '@material-ui/core';

// import firebase from 'firebase';
import { addUserAction } from "./../../redux/actions/Data";

// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Swal from 'sweetalert2'


import "./Login.css";

import {
  Form,
  Input,
  InputNumber,
  // Tooltip,
  // Icon,
  // Cascader,
  // AutoComplete,
  // Select,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker
} from 'antd';

// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    // autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const fieldsValue = {
          ...values,
          'ngaySinh': values['ngaySinh'].format('MM/DD/YYYY'),
          'loaiND' : 'KH'
        }
        console.log('Received values of form: ', fieldsValue);
        this.props.registerAccount(fieldsValue);
        // setTimeout(() => {
        //   alert
        // }, 2000);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // handleWebsiteChange = value => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
        md: {
          span: 8,
          offset: 4,
        },
      },
    };

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
            ],
          })(<Input />)}
        </Form.Item>

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
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item label="Full Name">
          {getFieldDecorator('hoTen', {
            rules: [
              {
                required: true,
                message: 'Please input Full Name!',
              },
            ],
          })(<Input />)}
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
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="BirthDay">
          {getFieldDecorator('ngaySinh', {rules: [{ type: 'object', required: true, message: 'Please select time!' }]})(<DatePicker />)}
        </Form.Item>

        <Form.Item label="Address">
          {getFieldDecorator('diaChi', {
            rules: [
              {
                required: true,
                message: 'Please input Address!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="IdentiCard">
          {getFieldDecorator('cmnd', {
            rules: [
            {
               required: true, 
               message: 'Please input your IdentiCard!' },],
          })(<InputNumber style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('soDT', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input  style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              {/* {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })( */}
              <Input />
               {/* )} */}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        <Checkbox>
              I have read the <span>agreement</span>
            </Checkbox>,
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      </Paper>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerAccount: (user) => {
      dispatch(addUserAction(user));
    }
  }
}


export default compose(connect(null, mapDispatchToProps)(Form.create()(RegistrationForm))) ;
