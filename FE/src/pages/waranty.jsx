import React, { Component } from 'react'
import { Modal, Button , Input} from 'antd';

export default class waranty extends Component {
    state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
      seri:"",
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  inputOnchange=(value)=>{
      this.setState({
        seri: value
      });
  }
    render() {
        return (
            <div>
        <Button type="primary" onClick={this.showModal}>
            Input Product Seri
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="Input Product Seri"  onChange={(e)=>{
              this.inputOnchange(e.target.value)}}/>
        </Modal>
      </div>
        )
    }
}
