import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  showCartDlg,
  toggleMenu,
  setLoggedInUser,
  setCheckedOutItems
} from "../../redux/actions/Data";
import cartImage from "../../Images/bagicon.png";
import { categories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
// import firebase from 'firebase';
import Swal from 'sweetalert2'



const categoryOptions = categories.map(x => {
  return (
    <MenuItem key={x.name} value={x.patch}>
      {x.name}
    </MenuItem>
  );
});

class ConnectedHeader extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilter: categories[0].name
  };
  componentDidMount(){
    // if(sessionStorage.getItem("custommer")){
    //   let  retrievedObject = JSON.parse(sessionStorage.getItem('custommer'));
    //   this.props.dispatch(setLoggedInUser(retrievedObject));
    // }
    // console.log(this.props.userInfor);
    
  }
  
  render() {
    if(this.props.categories.length!==0){
      // console.log(this.props.categories);
      
    }
    
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
            <NavLink
              to={"/"}><img className="header-icon"
                src={cartImage}
                alt={"Logo"}
                title={"Home"}
              /></NavLink>

            <div className="d-flex filter">
              <TextField className="header-search"
                label="Search products"
                value={this.state.searchTerm}
                onChange={e => {
                  this.setState({ searchTerm: e.target.value });
                }}

              />

              <Select className="header-select"
                value={this.state.categoryFilter}
                MenuProps={{

                }}
                onChange={e => {
                  this.setState({ categoryFilter: e.target.value });
                }}
              >
                {categoryOptions}
              </Select>

              <Button
                style={{ marginLeft: 20, color:"tomato" }}
                variant="outlined"
                // color="primary"
                onClick={() => {
                  // Generate new URL to redirect user to
                  this.props.history.push(
                    "/search/?category=" +
                    this.state.categoryFilter +
                    "&term=" +
                    this.state.searchTerm
                  );
                }}
              >
                {" "}
                <SearchIcon    style={{color:"tomato" }} size="small" />Search
            </Button>
            </div>

          </div>
          <div className="right-part">
            <Button
              variant="contained" color="secondary"
              style={{ position: "fixed", cursor:"pointer" , left:20, bottom:20,  }}
              className="wow flash" data-wow-iteration="10"
              onClick={() => {
                this.props.history.push("/warranty");
              }}
            >
              Guarantee
            </Button>
            {!sessionStorage.getItem("custommer")&& !sessionStorage.getItem("employee")  ? (
              <Button
              
                variant="contained" color="secondary"
                style={{ marginRight: 20, cursor:"pointer" }}
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Log in
              </Button>
            ) : (
                <Avatar
                  onClick={event => {
                    this.setState({ anchorEl: event.currentTarget });
                  }}
                  style={{ backgroundColor: "#3f51b5", marginLeft: 50  , cursor:"pointer"}}
                >
                  <Person />
                </Avatar>
              )}
            <IconButton
              aria-label="Cart"
              style={{ position: "absolute", right: 0 }}
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
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
                  this.props.history.push("/order");
                }}
              >
                Pending Order
              </MenuItem>
              <MenuItem
              onClick={() => {
                this.setState({ anchorEl: null });
                this.props.history.push("/account/"+this.props.userInfor.taiKhoan);
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
                      this.props.dispatch(setCheckedOutItems([]));
                      this.props.dispatch(setLoggedInUser(null));
                      sessionStorage.clear();
                      this.setState({ anchorEl: null });
                      this.props.history.push("/");
                    }
                  })
                }}
              >
                Log out
              </MenuItem>
              {this.props.userInfor.maLoaiND ==="NV" ? (
              <MenuItem
              onClick={() => {
                this.setState({ anchorEl: null });
                this.props.history.push("/dashboard/admin");
              }}
              >
              Dashboard
            </MenuItem>
            ) : (
              <MenuItem
              onClick={() => {
                this.setState({ anchorEl: null });
                this.props.history.push("/userOrder/"+this.props.userInfor.taiKhoan+"/0");
              }}
            >
              Monitor Order
            </MenuItem>
              )}

            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    nrOfItemsInCard: state.rootReducer.cartItems.length,
    userInfor: state.rootReducer.userInfor,
    categories: state.rootReducer.categoryData,
    loginStatus: state.rootReducer.loginStatus
  };
};

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
