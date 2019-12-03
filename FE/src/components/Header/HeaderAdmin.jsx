import React, { Component } from "react";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import {
  withRouter, 
  NavLink , 
  // Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import {
  // showCartDlg,
  toggleMenu,
  setLoggedInUser,
  // setCheckedOutItems
} from "../../redux/actions/Data";
import { categories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import firebase from 'firebase';
import Swal from 'sweetalert2'



// const categoryOptions = categories.map(x => {
//   return (
//     <MenuItem key={x.name} value={x.name}>
//       {x.name}
//     </MenuItem>
//   );
// });

class ConnectedHeader extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilter: categories[0].patch,
    employee:{}
  };
  componentDidMount(){
    let  retrievedObject = JSON.parse(sessionStorage.getItem('employee'));
    this.setState({
      employee: retrievedObject
    })
  }
  
  render() {
    let { anchorEl } = this.state;
    return (
      <AppBar className="bg-light d-flex justify-content-between Appbar">
        <Toolbar className="toolbar">
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="medium" />
            </IconButton>
            <NavLink style={{color:"rgb(63, 81, 181)", fontSize:23 , textDecoration:"none"}}
              to={"/dashboard/admin"}>
                SHOPONLINE ADMIN PAGE
              </NavLink>
          </div>
          <span style={{color:"darkblue", fontSize:20}}>{this.state.employee.taiKhoan}</span> &nbsp;
          <Avatar
                  onClick={event => {
                    this.setState({ anchorEl: event.currentTarget });
                  }}
                  style={{ backgroundColor: "#3f51b5", position :'static'  , right: 50 }}
                >
  
                  <Person />
                </Avatar>
                <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/dashboard/accountAD");
                }}
              >
                Setting Account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  Swal.fire({
                    title: 'Are you sure Logout?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Logout!',
                  }).then((result) => {
                    
                    if (result.value) {
                        this.setState({ anchorEl: null });
                        this.props.dispatch(setLoggedInUser(null));
                        sessionStorage.removeItem("employee");
                        window.location.reload();
                        // return(
                        //   <Redirect  to={"/dashboard/admin"} />
                        // )
                        
                    }
                  })
                }}
              >
                Log out
              </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // nrOfItemsInCard: state.rootReducer.cartItems.length,
    userInfor: state.rootReducer.userInfor,
    categories: state.rootReducer.categoryData,
  };
};

const HeaderAdmin = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default HeaderAdmin;
