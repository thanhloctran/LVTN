import React from 'react';
import {Button, Input } from 'antd';
const { TextArea } = Input;
export default class SendingMail extends React.Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', name: 'Name', email: 'loctran0397@gmail.com' };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
	return (
  	<form className="test-mailing p-3">
  <p>To {this.props.receiveMail}</p>
    	<div>
      	<TextArea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Please input email content"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '150px'}}
      	/>
    	</div>
    	<Button type="primary" onClick={this.handleSubmit} >Send</Button>
  	</form>
	)
  }
  handleSubmit (event) {
    const templateId = 'template_C5OLRniQ';
    const serviceId = 'ShopO_gmail_com';
	const userId = 'user_QjJ2xI8tto5p7sBwmt4Jg';
	const receiveMail = this.props.receiveMail

	this.sendFeedback(templateId , serviceId,userId, receiveMail)
  }

  sendFeedback (templateId, serviceId, userId, receiveMail) {
    var templateParams = {
        name: 'James',
        notes: 'Check this out!',
        from_name: 'ShopO@gmail.com',
        to_name: 'n15dccn118@gmail.com',
        to_mail: receiveMail

    };

    window.emailjs.send(serviceId, templateId, templateParams, userId).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });

	// window.emailjs.send(
  	// 'gmail', templateId,serviceId,userId,
  	// variables
  	// ).then(res => {
    // 	console.log('Email successfully sent!')
  	// })
  	// // Handle errors here however you like, or use a React error boundary
  	// .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  handleChange(event) {
    this.setState({feedback: event.target.value})
  }

}