import React, { Component } from 'react'

export default class HeaderContent extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div>
                <div className="ml-2 mr-2 mb-3">
                    <div className="d-flex justify-content-between mb-2">
                        <div style={{
                            width: "30%", marginTop: 10, height: 85,
                            overflow: 'hidden',
                            backgroundSize: 'cover', backgroundImage: "url('https://hoanghamobile.com/Uploads/Originals/2019/11/26/201911261828381019_1920x416.jpg;width=1920;height=471;mode=crop;format=jpg')"
                        }}>
                        </div>
                        <div style={{
                            width: "69%", marginTop: 10, height: 85,
                            overflow: 'hidden',
                            backgroundSize: 'cover', backgroundImage: "url('https://hoanghamobile.com/Uploads/Originals/2019/11/26/201911261828381019_1920x416.jpg;width=1920;height=471;mode=crop;format=jpg')"
                        }}>
                        </div>
                    </div>
                    <div>
                        <img style={{ width: "100%" }} src="../img/2.png" alt="" />
                    </div>
                </div>
                {this.props.item === "Phones" ?
                    <div className="list-icon">
                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=iphone")
                        }}>
                            <img className="icon-image" alt="#" src="../img/iphoneicon.jpg" />
                        </span>

                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=samsung")
                        }}>
                            <img className="icon-image" alt="#" src="../img/samsungicon.jpg" />
                        </span>


                        <span className="icon-laptop">
                            <img className="icon-image" alt="#" src="../img/huaweiicon.jpg" onClick={() => {
                                this.props.history.push("/search/?category=All categories&term=huawei")
                            }} />
                        </span>
                        <span className="icon-laptop" >
                            <img className="icon-image" alt="#" src="../img/vivoicon.jpg" />
                        </span>

                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=oppo")
                        }}>
                            <img className="icon-image" alt="#" src="../img/oppoicon.jpg" />
                        </span>
                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=realme")
                        }}>
                            <img className="icon-image" alt="#" src="../img/realmeicon.png" />
                        </span>
                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=xiaomi")
                        }}>
                            <img className="icon-image" alt="#" src="../img/xiaomiicon.png" />
                        </span>




                    </div>
                    :
                    <div className="list-icon">
                        <span className="icon-laptop" onClick={() => { this.props.history.push("/search/?category=All categories&term=macbook") }}>
                            <img alt="#" src="../img/macbookicon.jpg" />
                        </span>
                        <span className="icon-laptop" onClick={() => { this.props.history.push("/search/?category=All categories&term=asus") }}>
                            <img alt="#" src="../img/asusicon.jpg" />
                        </span>
                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=dell")
                        }}>
                            <img alt="#" src="../img/dellicon.jpg" />
                        </span>
                        <span className="icon-laptop">
                            <img alt="#" src="../img/acericon.jpg" onClick={() => {
                                this.props.history.push("/search/?category=All categories&term=acer")
                            }} />
                        </span>
                        <span className="icon-laptop" >
                            <img alt="#" src="../img/hpicon.jpg" />
                        </span>

                        
                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=lenovo")
                        }}>
                            <img alt="#" src="../img/lenovoicon.jpg" />
                        </span>
                        <span className="icon-laptop" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=msi")
                        }}>
                            <img alt="#" src="../img/msiicon.png" />
                        </span>
                    </div>
                }

                
            </div>
        )
    }
}
