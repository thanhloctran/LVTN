import React, { Component } from "react";

import { connect } from "react-redux";
import { addItemInCartAction } from "../../redux/actions/Data";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StarIcon from "@material-ui/icons/Stars";

// import Swal from 'sweetalert2'
import './Item.css';

class ConnectedItem extends Component {
// state={
//   maSP: "",
//   tenSP: "",
//   soLuong: 0,
//   donGia: 0
  
// }
  render() {
    return (
      <div className="card text-center item-card " style={{cursor:"pointer"}}
        onClick={() => {
          this.props.history.push("/details/" + this.props.item.maSP);
        }}
        >
        <div style={{minHeight:"242px"}}>
        <img className="card-img-top item-image" src={this.props.item.hinhAnh} alt="Card" />
        </div>
       
        <div className="card-body">
        {!this.props.item.giamGia ? (
               <span></span>
            ) : (
                
                <div className="card-discount">
               -{this.props.item.giamGia}%
         </div>
              )}
         
          <h4 className="card-title item-title" >
            {this.props.item.spMoi ? (
              <StarIcon color="secondary" size="medium" />
            ) : (
                <span></span>
              )}
            {this.props.item.tenSP}</h4>

            {this.props.item.giamGia ? 
            (<div><span className="old-price">{(this.props.item.donGia).toLocaleString("en-US", { 
              style: "currency", 
              currency: "USD"
            })}  </span>
             <span className="card-text ">
               {(this.props.item.donGia - (this.props.item.donGia * this.props.item.giamGia/100)).toLocaleString("en-US", { 
                    style: "currency", 
                    currency: "USD"
                  })}  </span>
            </div>)

            :
            <span className="card-text ">{(this.props.item.donGia).toLocaleString("en-US", { 
              style: "currency", 
              currency: "USD"
            })}  </span>
            }

          <div><Button className="button-detail" variant="outlined" onClick={() => {
            // this.props.history.push("/details/SP01");
          }}
          > Details
          </Button>
          </div>
        
        </div>
        <div className="itemcircle-hover">
        <IconButton className="button-addcart" title="Add to cart"
            size="medium"
            onClick={(e) => {
              let invertoryReduce = this.props.item.soLuongTon - 1;
              let giaSPDDH = this.props.item.donGia;
              if(this.props.item.giamGia){
                giaSPDDH = this.props.item.donGia - (this.props.item.donGia * this.props.item.giamGia/100);
              }
              
              
              e.stopPropagation();
              this.props.dispatch(
                addItemInCartAction(
                  { 
                    tenSP: this.props.item.tenSP,
                    hinhAnh: this.props.item.hinhAnh,
                    maSP : this.props.item.maSP,
                    soLuong: 1 , 
                    soLuongTon: invertoryReduce ,
                    donGia: giaSPDDH})
              );
            }}
            color="primary"
            aria-label="Add to shopping cart"
          >
            <AddShoppingCartIcon size="medium" style={{color:"white", fontSize:40, width:"100%"}}/>
          </IconButton>
        </div>
      </div>

     

    );
  }
}


export default withRouter(connect()(ConnectedItem));
