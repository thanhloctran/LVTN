import React, { Component } from 'react'

export default class MailTemplate extends Component {
    render() {
        return (
            <div style={{ width: '90%', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                <div style={{ backgroundColor: 'white' }}>
                    <h2 style={{ padding: '0px 10px', margin: 0, fontWeight: 'lighter' }}>
                        Thanks For Your Bussiness!</h2>
                    <h3 style={{ fontSize: 28, fontWeight: 'lighter' }}>
                        Your Order</h3>
                    <div style={{ width: '100%', margin: '0 auto' }}>
                        <p>Moday, Dec 28 2019 at 4:13pm</p>
                        <table style={{ width: '100%' }}>
                            <tbody><tr>
                                <td style={{ width: 200, textAlign: 'left', borderBottom: '1px solid lightgray', padding: '9px 0px' }}>
                                    SomeThing</td>
                                <td style={{ textAlign: 'right', borderBottom: '1px solid lightgray' }}>
                                    200.00</td>
                            </tr>
                                <tr>
                                    <td style={{ width: 200, textAlign: 'left', borderBottom: '1px solid lightgray', padding: '9px 0px' }}>
                                        SomeThing else</td>
                                    <td style={{ textAlign: 'right', borderBottom: '1px solid lightgray' }}>
                                        200.00</td>
                                </tr>
                                <tr>
                                    <td style={{ width: 200, textAlign: 'left', borderBottom: '1px solid lightgray', padding: '9px 0px' }}>
                                        SubTotal </td>
                                    <td style={{ textAlign: 'right', borderBottom: '1px solid lightgray' }}>
                                        400.00
                                        </td>
                                </tr>
                                <tr>
                                </tr><tr style={{ backgroundColor: 'lightsteelblue', fontSize: 17 }}>
                                    <td>Tax</td>
                                    <td>0.00</td>
                                </tr>
                                <tr style={{ backgroundColor: 'rgb(107, 150, 192)', fontSize: 17 }}>
                                    <td>Total</td>
                                    <td>440.00</td>
                                </tr>
                            </tbody></table>
                        <p style={{ fontSize: 22 }}>Your Detail</p>
                        <div>
                            <table style={{ width: '100%', border: '1px solid gray', padding: '18px 10px' }}>
                                <tbody><tr>
                                    <td style={{ width: '40%', textAlign: 'left' }}>
                                        Name</td>
                                    <td style={{ textAlign: 'right' }}>
                                        Tran Thanh Loc</td>
                                </tr>
                                    <tr>
                                        <td style={{ width: '40%', textAlign: 'left' }}>
                                            Number phone</td>
                                        <td style={{ textAlign: 'right' }}>
                                            0987656453</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '40%', textAlign: 'left' }}>
                                            Email</td>
                                        <td style={{ textAlign: 'right' }}>
                                            loctran@mail.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>
                                            Shipping to </td>
                                        <td style={{ textAlign: 'right' }}>
                                            97 Man Thien, Hiep Phu , TP Ho Chi Minh</td>
                                    </tr>
                                </tbody>
                                </table>
                        </div>
                    </div>
                    <div style={{ width: '77%', backgroundColor: '#868db4c7', padding: 10, margin: '13px auto', color: 'white' }}>
                        Check for purchase
                    </div>
                </div>
            </div>

        )
    }
}
