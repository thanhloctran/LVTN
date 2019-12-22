import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CreateIcon from "@material-ui/icons/Create";
import { loginAction } from "./../redux/actions/Data";
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';


class ConnectedLogin extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let item = {
          taiKhoan: values.username,
          matKhau: values.password,
        }
        this.props.login(item);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // provider.setCustomParameters({
    //   'display': 'popup'
    // });
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    
    // If user was authenticated, redirect her to where she came from.
    if (this.props.loginStatus==="NV") {
      return <Redirect to={from} />;
    }
    if (this.props.loginStatus || this.props.loginStatus==="KH") {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: "28%" }}>
          <div className="login-icon"> <LockOutlinedIcon className="icon-lock" />
          </div>

          <div className="login-title">Log in </div>

          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button style={{ width: 150 }} type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            <span
              style={{ color: "red", float: "right", marginTop: 5, cursor: "pointer" }}
              onClick={() => {
                this.props.history.push("/SignUp");
              }}>
              <CreateIcon style={{ color: "red" }} />
              Register Now</span>

          </Form.Item>
        </Form>


      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginStatus: state.rootReducer.loginStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (inforLogin) => {
      dispatch(loginAction(inforLogin))
    }
  }
}
const Login = withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ConnectedLogin)));

export default Login;
