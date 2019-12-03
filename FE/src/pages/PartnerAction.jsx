import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from 'redux';
import {
    addProducerAction,
    addProviderAction
} from './../redux/actions/AdminData';
// import Swal from 'sweetalert2'
// import moment from 'moment';
import { Paper } from '@material-ui/core';
import {
    Form,
    Input,
    // Icon,
    Select,
    Button,
} from 'antd';



const { Option } = Select;
// let id = 0;
class PartnerAction extends Component {
    state = {
        confirmDirty: false,
        id: this.props.match.params.id,
        userInfor: {}
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                let proiderInfor ={};
                if(values.loaiDT ==="NCC"){
                    proiderInfor={
                        maNCC: values.id,
                        tenNCC: values.ten,
                        diaChi: values.diaChi,
                        email: values.email,
                        soDT: values.soDT,
                        fax: values.fax,
                        trangThaiXoa: 0,
                    }
                    this.props.addProvider(proiderInfor);
                }
                else{
                    proiderInfor={
                        maNSX: values.id,
                        tenNSX: values.ten,
                        thongTin: values.note,
                        hinhAnh: "",
                        trangThaiXoa: 0,
                    }
                    this.props.addProducer(proiderInfor);
                }
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
        return (
            <Paper className="col-md-10 m-auto pb-5">
                <span className="cover-title">PARTNER INFOR </span>

                <Form style={{ marginTop: 20 }} {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Provider" hasFeedback>
                        {getFieldDecorator('loaiDT', {
                            rules: [{ required: true, message: 'Please select Type Partner!' }], initialValue:"NSX"
                        })(
                            <Select style={{width:"35%"}} placeholder="Please select Type Partner ">
                                        <Option value="NCC">Provider</Option>
                                        <Option value="NSX">Producer</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Partner'S ID">
                        {getFieldDecorator('id', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input ID Partner!',
                                },
                            ],
                        })(<Input  style={{width:"50%"}} />)}
                    </Form.Item>
                    <Form.Item label="Partner'S Name">
                        {getFieldDecorator('ten', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input Name Partner!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Partner'S Address">
                        {getFieldDecorator('diaChi', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input Address Partner!',
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
              ], initialValue: this.state.userInfor.email
            })(<Input />)}
            </Form.Item>
                    <Form.Item label="Partner'S Fax">
                        {getFieldDecorator('soFax', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input Fax Partner!',
                                },
                            ],
                        })(<Input style={{width:"50%"}}/>)}
                    </Form.Item>
                    <Form.Item label="Partner'S NumberPhone">
                        {getFieldDecorator('soDT', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input NumberPhone Partner!',
                                },
                            ],
                        })(<Input style={{width:"50%"}}/>)}
                    </Form.Item>
                    <Form.Item label="Partner'S Note">
                        {getFieldDecorator('note', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input Decription Partner!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
          </Button>
                    </Form.Item>
                </Form>
            </Paper>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        result: state.rootReducerAD.result,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addProducer: (item) => {
            dispatch(addProducerAction(item))
        },
        addProvider: (item) => {
            dispatch(addProviderAction(item))
        },

    }
}
export default compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(PartnerAction)));
