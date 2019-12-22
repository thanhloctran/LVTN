import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  showCartDlg,
  deleteCartItem,
  updateCartItemQnt
} from "../../redux/actions/Data";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
// import TextField from "@material-ui/core/TextField";
import { InputNumber } from 'antd';

// import Swal from 'sweetalert2'

const CartRow = props => {
  let { item } = props;

  function onChange(value) {
    // console.log("item", item); 
    // console.log("soluong", value);
    
    let soLuong = parseInt(value, 10);
    let soLuongTon = item.soLuongTon;
    props.dispatch(updateCartItemQnt({
      maSP: item.maSP,
      soLuong,
      soLuongTon
    })
    )
  }


  return (
    <TableRow className="text-center">
      <TableCell>
        <Link to={`/details/${item.maSP}`}>
          <div
            onClick={() => {
              //   User will be navigated to item URL by clicking this item due to link above,
              //   and also we close this dialog.
              props.dispatch(showCartDlg(false));
            }}
          >
            <img src={item.hinhAnh} alt="Product" style={{ width: 70 }} />

          </div>
        </Link>
      </TableCell>
      <TableCell>{item.donGia.toLocaleString("en-US", { 
    style: "currency", 
    currency: "USD"
  })}</TableCell>
      <TableCell>
        <div className="row">
          &nbsp;
          <InputNumber min={1} defaultValue={item.soLuong} onChange={onChange} />
          {/* <TextField
            type="number"
            // style={{ width: 40 }}
            // inputProps={{ min: "1", step: "1" }}
            value={}
            onChange={e => {
              let soLuong = parseInt(e.target.value, 10);
              let soLuongTon = item.soLuongTon;
              // console.log("invento:" ,soLuongTon);
              
              if (soLuong < 0) return;

              // Update soLuong for this cart item.
              props.dispatch(
                updateCartItemQnt({
                  id: item.id,
                  soLuong,
                  soLuongTon

                })
              );
            }}
          /> */}

        </div>

      </TableCell>
      <TableCell>
        <Button
          color="secondary"
          onClick={() => {
            props.dispatch(deleteCartItem(item.maSP));
            // Delete.

          }}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;
