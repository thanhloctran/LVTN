import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import "./Details.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCartAction, getDetailProductAction, getListCommentAction, addCommentAction, updateCartItemQnt } from "../../redux/actions/Data";
//import Api from "../../Api";
import Item from "../Item/Item";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate, Form, Input, Button, InputNumber } from 'antd';
import BackToTop from "../ProtectedRoute/BackToTop";
import moment from "moment";
const { TextArea } = Input;
// import Paper from '@material-ui/core/Paper';
// import Swal from 'sweetalert2'

var Remarkable = require("remarkable");

class ConnectedDetailsLoc extends Component {
  isCompMounted = false;
  state = {
    relatedItems: [],
    soLuong: "1",
    item: {},
    itemCopy: {},
    // unfinishedTasks: 0,
    comment: { //comment
      maSP: this.props.match.params.id,
      noiDung: "",
      ngayTao: moment().format('MM/DD/YYYY HH:mm:ss'),
      danhGia: 3,
      maKH: this.props.user.maND
    }

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState, item: nextProps.item
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.props.getDetailProduct(this.props.match.params.id);
    // this.props.getListComment(this.props.match.params.id);
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("prevProps", prevProps);
  //   if (prevProps.item.maSP !== prevState.item.maSP) {
  //     this.props.getDetailProduct(this.props.match.params.id);
  //   }
  //   return;
  // }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  // Product information contains markup, we use Remarkable for this.
  getRawMarkup(data) {
    const md = new Remarkable();
    md.set({
      html: true,
      breaks: true
    });
    return { __html: md.render(data) };
  }

  handleSubmit(values) {
    this.props.addComment(values);
    this.setState({
      comment: { //comment
        maSP: this.props.match.params.id,
        noiDung: "",
        ngayTao: moment().format('MM/DD/YYYY HH:mm:ss'),
        danhGia: 3,
        maKH: this.props.user.maND
      }
  
    })
  };
  onChangeNumber = (value) => {
    this.setState({
      ...this.state,
      soLuong: value,
    })
    // let soLuong = parseInt(value, 10);
    // let soLuongTon = this.state.item.soLuongTon;
    // this.props.updateCartItemQnt({
    //   maSP: this.state.item.maSP,
    //   soLuong,
    //   soLuongTon
    // }
    // )
  }
  handleAddCart=()=>{
    let invertoryReduce = this.state.item.soLuongTon - this.state.soLuong;
    this.setState({
      itemCopy: {
        ...this.state.item,
        soLuong: parseInt(this.state.soLuong),
        soLuongTon: invertoryReduce
      }
    })
    setTimeout(() => {
      this.props.addItemInCart(this.state.itemCopy);
      // console.log(this.state.item)
    }, 500)
  }
  render() {
    if ( !this.state.item || !this.state.item.binhLuan) {
      return <CircularProgress className="circular" />;
    }

    // let settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   focusOnSelect: false,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // };


    let settingsRelatedItems = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      focusOnSelect: false,
      slidesToShow:
        5 < 4 ? 5 : 4,
      slidesToScroll:
        5 < 4 ? 5 : 3
    };
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    
    
    return (
      <div className="details">
       {/* {console.log("cloneCartItems",this.props.cloneCartItems)} */}
        <div style={{ display: "flex" }}>
          <div className="details-image">
            {/* <Slider {...settings}>
              {this.state.item.hinhAnh.map(x => {
                // NOTE: If I pass img directly instead of wrapping it in div, this component seems to mess up its styles.
                return (
                  <div key={x}>
                    <img
                      alt="Item"
                      style={{
                        objectFit: "contain",
                        height: 290,
                        width: 290
                      }}
                      src={x}
                    />
                  </div>
                );
              })}
            </Slider> */}
            <img
              alt="Item"
              style={{
                objectFit: "contain",
                height: 290,
                width: 290
              }}
              src={this.state.item.hinhAnh}
            />
          </div>
          <div className="details-infor">
            <div className="details-name" >
              {this.state.item.tenSP}  {this.state.item.spMoi && (
                <span className="popular-item">
                  (New product)
              </span>
              )}
            </div>
            <div style={{ width: "28%", }}>
              <p >
                <span style={{ color: "grey", fontSize: 30 }}>Rate: </span>
                <span style={{ color: "tomato", fontSize: 30 }}> {this.state.item.luotBC} <i className="fas fa-star"></i></span>
              </p>

            </div>
            {this.state.item.giamGia ? (

              <div className="details-price " >

                <p style={{ fontSize: 15 }}>Old Price:
                <span style={{ textDecoration: "line-through", color: "gray", fontSize: 15 }}>
                    {this.state.item.giaGoc.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD"
                    })}</span>  </p>
                <p> New Price:
                  <span style={{ fontSize: 27 }}>
                    {(this.state.item.donGia).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2
                    })}</span></p>
              </div>

            ) : (
                <div className="details-price" >
                  <p>Price:
                     <span style={{ fontSize: 27 }}>
                      {(this.state.item.donGia * 1.0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })}
                    </span>
                  </p>
                </div>
              )}

            <InputNumber min={1} 
            // max={this.state.item.soLuongTon} 
            defaultValue={this.state.soLuong} onChange={this.onChangeNumber} />

            <Button
              className="button-add"
              type="primary"
              onClick={() => {
                this.handleAddCart();
              }}
            >
              Add to Cart &nbsp; <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>

          </div>

        </div>



        {this.state.item.moTa ? (
          <div >
            <div className="details-title">Product Description</div>
            <div className=" description" id="collapseExample"
              dangerouslySetInnerHTML={this.getRawMarkup(
                this.state.item.moTa
              )
              }
            />
            {/* <div className="btn-container " >
              <button id="toggle" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Read More</button>
            </div> */}
          </div>
        ) : (
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
              }}
              dangerouslySetInnerHTML={{ __html: "Decription is not available" }}
            />
          )}

        {/* <a className="decription-viewAll">View All</a> */}
        {isEmpty(this.props.user) ? (
          <p></p>
        ) : (
            <div>
              <div className="details-title">Rating  &nbsp; <Rate  value={this.state.comment.danhGia} name="rating" onChange={(value) => {
                this.setState({
                  comment: {
                    ...this.state.comment,
                    danhGia: value,
                    maKH: this.props.user.maND
                  }
                })
                // console.log(value);

              }} /> </div>
              <TextArea style={{ width: "48%", fontSize: 17 }} rows={3} placeholder="Please input comment" value={this.state.comment.noiDung} onChange={(e) => {
                this.setState({
                  comment: {
                    ...this.state.comment,
                    noiDung: e.target.value
                  }
                })
              }} />
              <br></br>
              <Button
                style={{ width: 100, marginTop: 5, }}
                type="primary"
                onClick={() => {
                  this.handleSubmit(this.state.comment);
                }}
              >
                Submit
          </Button>
            </div>
          )}

       
        <div className="detail-review" >
          {!this.props.item.binhLuan || this.props.item.binhLuan.length === 0 ? <div className="details-title">No Review</div>
            :<div>
               <p className="details-title">Product's  Review</p>
              {
                this.props.item.binhLuan.map((item, index) => {
                  return (
                    <div style={{ marginBottom: 15 }} key={index}>
                      <p className="comment-account">#{item.binhLuan.taiKhoan}</p>
                      <p className="comment-date">{item.binhLuan.ngayTao}</p>
                      <div>
                        <Rate allowHalf disabled value={item.binhLuan.danhGia} />
                        &nbsp;  <span className="comment-text">{item.binhLuan.noiDung}</span>
                      </div>
                      {item.dsHoiDap.map((item2, index) => {
                        return (
                          <div key={index} style={{ marginLeft: 33, fontSize: 20 }}>
                            <span>@{item.binhLuan.taiKhoan}_</span>
                            <span>{item2.noiDung}</span>  &nbsp;
                        <i style={{ fontSize: 15, color: "gray" }}>{item2.ngayTao}</i>
                          </div>
                        )
                      })}
                    </div>)
                })
              }
            </div>
            
            
            
            }


        </div>
       
        {!this.state.item.spTuongTu ? (
          <div
            style={{
              fontSize: 13,
              color: "gray",
              marginLeft: 10,
              marginBottom: 10
            }}
          >
            Not available
          </div>
        ) : (
            <div
              style={{ maxWidth: 1105, height: 540, margin: "0 auto" }}
            >
               <div className="details-title"> Related Items </div>
              <Slider {...settingsRelatedItems}>
                {this.state.item.spTuongTu.map(x => {
                  return <Item key={x.maSP} item={x} onClick={() => {
                    this.props.history.push("/detailas/" + x.maSP)
                  }} />;
                })}
              </Slider>
            </div>
          )}
        <div>

        </div>
        <BackToTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.userInfor,
    item: state.rootReducer.productDetail,
    listComment: state.rootReducer.listComment,
    cloneCartItems: state.rootReducer.cartItems
    // result: state.rootReducer.result
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduct: (id) => {
      dispatch(getDetailProductAction(id))
    },
    addItemInCart: (item) => {
      dispatch(addItemInCartAction(item))
    },
    getListComment: (id) => {
      dispatch(getListCommentAction(id))
    },
    addComment: (item) => {
      dispatch(addCommentAction(item))
    },
    updateCartItemQnt: (item) => {
      dispatch(updateCartItemQnt(item))
    }

  }
}


let DetailProduct = withRouter(compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ConnectedDetailsLoc))));
export default DetailProduct;
