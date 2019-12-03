import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import "./Details.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCartAction, getDetailProductAction, getListCommentAction, addCommentAction, updateCartItemQnt } from "../../redux/actions/Data";
import Api from "../../Api";
import Item from "../Item/Item";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate, Form, Input, Button, InputNumber } from 'antd';
import BackToTop from "../ProtectedRoute/BackToTop";
const { TextArea } = Input;
// import Paper from '@material-ui/core/Paper';
// import Swal from 'sweetalert2'

var Remarkable = require("remarkable");

class ConnectedDetails extends Component {
  isCompMounted = false;
  state = {
    relatedItems: [],
    soLuong: "1",
    item: {},
    unfinishedTasks: 0,
    comment: { //comment
      maSP: this.props.match.params.id,
      noiDung: "",
      danhGia: 0
    }

  };

  async fetchProductUsingID(id) {
    this.setState(ps => ({ unfinishedTasks: ps.unfinishedTasks + 1 }));

    // First, let's get the item, details of which we want to show.
    let item = await Api.getItemUsingID(id);
    if (item === "null") {
      return <div>NO VALUE</div>
    }
    let relatedItems = await Api.searchItems({
      category: item.maLoaiSP,
      page: "1",
      itemsPerPage: "5"
    });

    if (this.isCompMounted) {
      this.setState(ps => {
        return {
          item,
          unfinishedTasks: ps.unfinishedTasks - 1,
          relatedItems: relatedItems.data.filter(x => x.maSP !== item.maSP)
        };
      });
    }
  }

  componentWillReceiveProps(nextProps, prevSate) {
    this.fetchProductUsingID(nextProps.match.params.id);
    if (this.state.item.giamGia) {
      this.setState({
        item: {
          ...this.state.item,
          donGia: (this.state.item.donGia - (this.state.item.donGia * this.state.item.giamGia / 100))
        }
      })
    }

  }

  componentDidMount() {
    this.isCompMounted = true;
    this.props.getListComment(this.props.match.params.id);

  }

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
    console.log(values);
    this.props.addComment(values);

  };
  onChangeNumber = (value) => {
    this.setState({
      ...this.state,
      soLuong: value,
    })
    let soLuong = parseInt(value, 10);
    let soLuongTon = this.state.item.soLuongTon;
    this.props.updateCartItemQnt({
      maSP: this.state.item.maSP,
      soLuong,
      soLuongTon
    }
    )
  }
  render() {
    if (this.state.unfinishedTasks !== 0) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
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
        this.state.relatedItems.length < 4 ? this.state.relatedItems.length : 4,
      slidesToScroll:
        this.state.relatedItems.length < 4 ? this.state.relatedItems.length : 3
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
        {console.log(this.state.item)}
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
            {this.state.item.giamGia ? (

              <div className="details-price" >

                <p style={{ fontSize: 15 }}>Old Price:
                <span style={{ textDecoration: "line-through", color: "gray", fontSize: 15 }}>
                    {this.state.item.donGia.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD"
                    })}</span>  </p>
                <p> New Price:
                  <span style={{ fontSize: 27 }}>
                    {(this.state.item.donGia - (this.state.item.donGia * this.state.item.giamGia / 100)).toLocaleString("en-US", {
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

            <InputNumber min={1} defaultValue={this.state.soLuong} onChange={this.onChangeNumber} />

            <Button
              className="button-add"
              type="primary"
              onClick={() => {
                let invertoryReduce = this.state.item.soLuongTon - 1;
                // console.log(this.state.item);
                this.setState({
                  item: {
                    ...this.state.item,
                    soLuong: parseInt(this.state.soLuong),
                    soLuongTon: invertoryReduce
                  }
                })
                setTimeout(() => {
                  this.props.addItemInCart(this.state.item)
                }, 500)

              }}
            >
              Add to Cart &nbsp; <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>

          </div>
          {/* <div style={{width: "28%", marginTop:"20px"}}>
              <p >
              <span  style={{color:"grey", fontSize:30}}>Racing: </span>
              <span style={{color:"tomato", fontSize:30}}> {this.state.item.luotBC} <i className="fas fa-star"></i></span>
              </p>
              
            </div> */}
        </div>

        <div className="details-title">Product Description</div>

        {this.state.item.moTa ? (
          <div >

            <div className=" description" id="collapseExample"
              dangerouslySetInnerHTML={this.getRawMarkup(
                this.state.item.moTa
              )
              }
            />
            <div className="btn-container " >
              <button id="toggle" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Read More</button>
            </div>
          </div>
        ) : (
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
              }}
              dangerouslySetInnerHTML={{ __html: "Not available" }}
            />
          )}

        {/* <a className="decription-viewAll">View All</a> */}
        {isEmpty(this.props.user) ? (
          <p></p>
        ) : (
            <div>
              <div className="details-title">Rating &nbsp; <Rate value={3}  name="rating" onChange={(value) => {
                this.setState({
                  comment: {
                    ...this.state.comment,
                    danhGia: value,
                    maKH: this.props.user.maND
                  }
                })
                // console.log(value);

              }} /> </div>
              <TextArea style={{ width: "48%", fontSize: 17 }} rows={3} placeholder="Please input comment" onChange={(e) => {
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

        <p className="details-title">Product's  Review</p>
        <div className="detail-review" >

          {this.props.listComment.length === 0 ? <div>No Review</div>
            :
            this.props.listComment.map((item, index) => {
              return (
                <div style={{ marginBottom: 15 }} key={index}>
                  <p className="comment-account">#{item.binhLuan.taiKhoan}</p>
                  <p className="comment-date">{item.binhLuan.ngayTao}</p>
                  <div><Rate allowHalf disabled defaultValue={item.binhLuan.danhGia} />
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
            })}


        </div>
        <div
          className="details-title"
        >
          Related Items
        </div>

        {this.state.relatedItems.length === 0 ? (
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
              <Slider {...settingsRelatedItems}>
                {this.state.relatedItems.map(x => {
                  return <Item key={x.maSP} item={x} />;
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
    result: state.rootReducer.result
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


let Details = withRouter(compose(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ConnectedDetails))));
export default Details;
