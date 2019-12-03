import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Icon from "@material-ui/core/Icon";
import DeleteIcon from '@material-ui/icons/Delete';

import {
  setCheckedOutItems,
  deleteCartItem,
} from "../../redux/actions/Data";
import Swal from 'sweetalert2'


const mapStateToProps = (state) => {
  return {
    checkedOutItems: state.rootReducer.cartItems,
    payloadSub: state.rootReducer.payloadSub
    // cartItems: state.rootReducer.cartItems
  };
};


// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {

  state = {
    maSP: "",
    tenSP: "",
    soLuong: 0,
    donGia: 0

  }
  // componentDidMount(){
  //   console.log("check out", this.props.checkedOutItems);

  // }
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      // console.log(item);  
      return accumulator + item.donGia * item.soLuong;
    }, 0);

    return (
      <div style={{ padding: 10 }}>
        <div className="online-shop-title">
          Please review order before purchase
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.maSP}>
                  <TableCell ><img style={{ width: "100px" }} alt="Product" src={item.hinhAnh} /></TableCell>
                  <TableCell>{item.tenSP}</TableCell>
                  <TableCell>{item.donGia.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                  })}</TableCell>
                  <TableCell>{item.soLuong} </TableCell>
                  <TableCell>
                    <Button color="secondary" onClick={() => {
                      this.props.dispatch(deleteCartItem(item.maSP));
                      // Delete.

                    }}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
          Total price: {totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </div>
        <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            // console.log("1dgfusa", this.props.checkedOutItems);

            this.props.dispatch(setCheckedOutItems(this.props.checkedOutItems));
            this.props.history.push("/payment");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            // this.props.cartItems=[];
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Discard!',
            }).then((result) => {

              if (result.value) {
                this.props.dispatch(setCheckedOutItems([]));
                // this.props.dispatch(clearCartAction());
                Swal.fire(
                  'Deleted!',
                  'Your cart has been deleted.',
                  'success',
                  '1000'

                )
              }
            })


          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
