import React, { Component } from 'react'
import './Style.css'
import { connect } from "react-redux";
import { Carousel } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    getListNewProductAction,
    getListDiscountProductAction,
    getListProductByTypeAction,
    getListProductAction
} from './../redux/actions/Data';
import Item from '../components/Item/Item';
import BackToTop from '../components/ProtectedRoute/BackToTop';
import { CircularProgress } from '@material-ui/core';
class Home extends Component {
    state = {
        listHead: "./img/phone.png",
        urlType: "/search/?category=LSP02",
    }
    componentDidMount() {
        this.props.getListNewProduct();
        this.props.getListDiscountProduct();
        this.props.getListProductByType("LSP02");
        this.props.getListProductAD("-3");
    }
    changeType(maLoai, image) {
        this.props.getListProductByType(maLoai);
        this.setState({
            listHead: image,
            urlType: `/search/?category=${maLoai}`,
        })
    }
    render() {
        let settingsRelatedItems = {
            dots: false,
            autoplay: true,
            infinite: true,
            speed: 500,
            focusOnSelect: false,
            slidesToShow:
                this.props.listNewProduct.length < 5 ? this.props.listNewProduct.length : 5,
            slidesToScroll:
                this.props.listNewProduct.length < 5 ? this.props.listNewProduct.length : 3
        };
        if (!this.props.listNewProduct.length) {
            return <CircularProgress className="circular" />
        }
        return (
            <div className="homepage">
                <Carousel autoplay>
                    <div>
                        <div className="container-caroul"
                            style={{
                                backgroundImage: "url('./img/b3.jpg')"
                            }}>
                            <div className="content-caroul wow flip" data-wow-duration="1s">

                                <p className="caroul-caption">Get flat <span >10%</span> Cashback</p>
                                <h3 className="caroul-title">NEW
								<span> STANDARD </span>
                                </h3>

                                <button onClick={() => {
                                    this.props.history.push("/search/")
                                }} className="btn btn-outline-light caroul-button">SHOP NOW</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container-caroul"
                            style={{
                                backgroundImage: "url('./img/b2.jpg')"
                            }}>
                            <div className="content-caroul">

                                <p className="caroul-caption">Get Now <span>40%</span> Discount</p>
                                <h3 className="caroul-title">TODAY
								<span> DISCOUNT </span>

                                </h3>
                                <button onClick={() => {
                                    this.props.history.push("/account")
                                }} className="btn btn-outline-light caroul-button">SHOP NOW</button>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="container-caroul "
                            style={{
                                backgroundImage: "url('./img/b1.jpg')"
                            }}>
                            <div className="content-caroul">
                                <p className="caroul-caption">Get <span>Account</span> Now </p>
                                <h3 className="caroul-title">HAVE MANY
								<span> COUPON </span>
                                </h3>
                                <button onClick={() => {
                                    this.props.history.push("/search/?category=All categories")
                                }} className="btn btn-outline-light caroul-button">ACCOUNT</button>
                            </div>
                        </div>
                    </div>
                </Carousel>
                <div className="home-container">
                    <div className="list-slide ">
                        <p className="listHome-title wow bounceIn" data-wow-duration="2s">New Product</p>
                        <Slider {...settingsRelatedItems}>
                            {this.props.listNewProduct.map(x => {
                                return <Item key={x.maSP} item={x} />;
                            })}
                        </Slider>
                        <p className="text-view wow flash" data-wow-duration="2s" data-wow-iteration="infinite" onClick={() => { this.props.history.push("/search/") }}>View All</p>
                    </div>
                </div>
                {/* list image icon laptop brand */}
                <div className="list-icon">
                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="1.2s" onClick={() => { this.props.history.push("/search/?category=All categories&term=macbook") }}>
                        <img alt="#" src="./img/macbookicon.jpg" />
                    </span>
                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="1s" onClick={() => { this.props.history.push("/search/?category=All categories&term=asus") }}>
                        <img alt="#" src="./img/asusicon.jpg" />
                    </span>
                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="0.8s">
                        <img alt="#" src="./img/acericon.jpg" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=acer")
                        }} />
                    </span>
                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="0.6s" >
                        <img alt="#" src="./img/hpicon.jpg" />
                    </span>

                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="0.4s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=dell")
                    }}>
                        <img alt="#" src="./img/dellicon.jpg" />
                    </span>
                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="0.25s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=lenovo")
                    }}>
                        <img alt="#" src="./img/lenovoicon.jpg" />
                    </span>
                    <span className="icon-laptop wow bounceInLeft" data-wow-delay="0.1s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=msi")
                    }}>
                        <img alt="#" src="./img/msiicon.png" />
                    </span>
                </div>
                <div className="ml-3 mr-3">
                    <div className="d-flex justify-content-between mb-2">
                        <div style={{
                            width: "30%", marginTop: 10, height: 250,
                            overflow: 'hidden',
                            backgroundSize: 'cover', backgroundImage: "url('./img/discount1.jpg')"
                        }}>
                            <div style={{ textAlign: "center", position: "relative", top: "30%" }}>
                                <button onClick={() => {
                                    this.props.history.push("/account")
                                }} className="btn btn-outline-light">ACCOUNT</button>
                                <h3 style={{ color: "white" }}>LOGIN & CREATE ACCOUNT</h3>
                            </div>

                        </div>
                        <div style={{
                            width: "69%", marginTop: 10, height: 250,
                            overflow: 'hidden',
                            backgroundSize: 'cover', backgroundImage: "url('./img/discount1.jpg')",
                        }}>
                            {/* <div style={{ textAlign: "center", position: "relative", top: "30%" }}>
                                <button onClick={() => {
                                    this.props.history.push("/search/?category=All categories")
                                }} className="btn btn-outline-light">ALL CATEGORY</button>
                                <h3 style={{ color: "white" }}>SHOPPING NOW</h3>
                            </div> */}

                        </div>
                    </div>
                    <div className="wow tada" style={{textAlign:"center"}} data-wow-iteration="infinite" >
                        <img style={{ width: "91%" }} src="./img/2.png" alt="" />
                    </div>
                    <div>
                        <img style={{width:"100%"}} src="https://didongmoi.com.vn/site/pictures/categories/1543636654_banner-gif-1.gif" alt=""/>
                    </div>
                </div>
                {this.props.listDiscountProduct.length!==0?
                <div className="home-container list-discount">
                    <p className="listHome-title">Product in Discount</p>
                    <div className="listhome-content" style={{ maxHeight: 830 }}>
                        <div className="list-head">
                            <img className="wow flash" data-wow-iteration="3" alt="#" src="./img/background.jpg" style={{ width: "100%", height: "50%" }} />
                            <img className="wow fadeInDown" alt="#" src="./img/1.png" style={{ width: "100%", height: "50%", marginTop: 10 }} />

                        </div>
                        {this.props.listDiscountProduct.map(item => {
                            return <Item key={item.maSP} item={item}   /*reducesoLuongTon={this.reducesoLuongTon}*/ />;
                        })}
                    </div>
                    <p className="text-view wow flash" data-wow-duration="2s" data-wow-iteration="infinite" onClick={() => { this.props.history.push("/search/?category=Discount") }}>View All</p>

                </div>:<div></div>}
                {/* list image icon phone brand */}
                <div className="list-icon mt-3">
                    <span className="icon-laptop wow bounceInRight" data-wow-delay="0.1s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=iphone")
                    }}>
                        <img className="icon-image" alt="#" src="./img/iphoneicon.jpg" />
                    </span>

                    <span className="icon-laptop wow bounceInRight" data-wow-delay="0.25s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=samsung")
                    }}>
                        <img className="icon-image" alt="#" src="./img/samsungicon.jpg" />
                    </span>
                    <span className="icon-laptop wow bounceInRight" data-wow-delay="0.43s">
                        <img className="icon-image" alt="#" src="./img/huaweiicon.jpg" onClick={() => {
                            this.props.history.push("/search/?category=All categories&term=huawei")
                        }} />
                    </span>
                    <span className="icon-laptop wow bounceInRight" data-wow-delay="0.6s" >
                        <img className="icon-image" alt="#" src="./img/vivoicon.jpg" />
                    </span>

                    <span className="icon-laptop wow bounceInRight" data-wow-delay="0.8s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=oppo")
                    }}>
                        <img className="icon-image" alt="#" src="./img/oppoicon.jpg" />
                    </span>
                    <span className="icon-laptop wow bounceInRight" data-wow-delay="1s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=realme")
                    }}>
                        <img className="icon-image" alt="#" src="./img/realmeicon.png" />
                    </span>
                    <span className="icon-laptop wow bounceInRight" data-wow-delay="1.2s" onClick={() => {
                        this.props.history.push("/search/?category=All categories&term=xiaomi")
                    }}>
                        <img className="icon-image" alt="#" src="./img/xiaomiicon.png" />
                    </span>




                </div>
                {/* list product high rate */}
                <div className="home-container list-discount">
                    <p className="listHome-title wow bounceIn">Product High Rate</p>
                    <div className="listhome-content" style={{ maxHeight: 830 }}>
                        <div className="list-head">
                            <img className="wow flash" data-wow-iteration="3" alt="#" src="./img/background.jpg" style={{ width: "100%", height: "50%", }} />
                            <img className="wow fadeInDown" alt="#" src="./img/1.png" style={{ width: "100%", height: "50%", marginTop: 10 }} />

                        </div>
                        {this.props.listHighRate.map(item => {
                            return <Item key={item.maSP} item={item}   /*reducesoLuongTon={this.reducesoLuongTon}*/ />;
                        })}
                    </div>
                    <p className="text-view wow flash"  data-wow-duration="2s" data-wow-iteration="infinite" onClick={() => { this.props.history.push("/search/?category=HighRate") }}>View All</p>

                </div>
                 {/* list product bestsell */}
                <div className="list-slide" style={{ height: "100%" }}>
                    <p className="listHome-title wow bounceIn">BestSell Product</p>
                    <Slider {...settingsRelatedItems}>
                        {this.props.listNewProduct.map(x => {
                            return <Item key={x.maSP} item={x} />;
                        })}
                    </Slider>
                    <p className="text-view wow flash" data-wow-duration="2s" data-wow-iteration="infinite" onClick={() => { this.props.history.push("/search/?category=Bestseller") }}>View All</p>
                </div>
                {/* list product by type */}
                <div className="home-container d-flex justify-content-around">
                    <img className="type-icon wow rotateInUpRight" src="./img/phone.png" title="View Phone" alt="" onClick={() => this.changeType("LSP02", "./img/phone.png")} />
                    <img className="type-icon wow rotateInUpRight" data-wow-delay=".2s" src="./img/laptop.png" title="View Laptop" alt="" onClick={() => this.changeType("LSP01", "./img/laptop.png")} />
                    <img className="type-icon wow rotateInUpRight" data-wow-delay=".4s" src="./img/watch.png" title="View Watch" alt="" onClick={() => this.changeType("LSP03", "./img/watch.png")} />
                    <img className="type-icon wow rotateInUpRight" data-wow-delay=".6s" src="./img/camera.png" title="View Camera" alt="" onClick={() => this.changeType("LSP05", "./img/camera.png")} />
                </div>
                <br />
                <div className="home-container list-discount">
                    {!this.props.listProductType.length ?
                        <CircularProgress className="circular" /> :
                        <div className="listhome-content">
                            <div style={{ height: 420 , display:"none"}}>
                                <img alt="#" src={this.state.listHead} style={{ width: "100%" }} />
                            </div>
                            {this.props.listProductType.map(item => {
                                return <Item key={item.maSP} item={item}   /*reducesoLuongTon={this.reducesoLuongTon}*/ />;
                            })}
                        </div>
                    }
                    <p className="text-view wow flash" data-wow-duration="2s" data-wow-iteration="infinite" onClick={() => { this.props.history.push(this.state.urlType) }}>View All</p>

                </div>
                <br />
                <BackToTop />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listNewProduct: state.rootReducer.listNewProduct,
        listDiscountProduct: state.rootReducer.listDiscountProduct,
        listProductType: state.rootReducer.listProductType,
        listHighRate: state.rootReducer.listHighRate
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListDiscountProduct: () => {
            dispatch(getListDiscountProductAction())
        },
        getListNewProduct: () => {
            dispatch(getListNewProductAction())
        },
        getListProductByType: (maLoai) => {
            dispatch(getListProductByTypeAction(maLoai))
        },
        getListProductAD: (trangThai) => {
            dispatch(getListProductAction(trangThai))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)