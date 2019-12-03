import React, { Component } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import Icon from "@material-ui/core/Icon";
import { getMenuDataAction } from './../../redux/actions/Data'


class ConnectedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Keep track of expanded title items in menu
      // expandedItems: this.props.categoryData.reduce((accum, current) => {
      //   if (current.type === "title") {
      //     accum[current.id] = true;
      //   }
      //   return accum;
      // }, {})
    };

  }
  // componentWillMount() {
  //   this.props.getMenuData();
  // }
  componentDidMount() {
    loadCSS("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
  }

  render() {
    if (!this.props.showMenu) return null;
    const styleActive={
      color: "white" ,
      transition: "0.5s",
      backgroundColor: "orange",
      textDecoration: "none",
      borderTop: "1px solid grey",
      borderBottom: "1px solid grey"
    }
    return (
      <div className="menu" >
                  <NavLink
                    className="item-menuad"
                    to={"/dashboard/admin"}
                    exact
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-chart-pie"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      DASHBOARD
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listorder"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-file-invoice-dollar"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      ORDERS
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listDiscount"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-tags"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      DISCOUNT
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listCustomers"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-user-shield"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      CUSTOMMER
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listReview"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-comment-dots"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      REVIEW
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listproduct"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fab fa-product-hunt"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      PRODUCTS
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listInvoices"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-file-import"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      INVOICES
                    </div>
                  </NavLink>
                  
                  <NavLink
                    to={"/dashboard/import"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-dolly"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      IMPORT PRODUCT
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/statistical"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-file-invoice"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      STATISTICAL
                    </div>
                  </NavLink>
                  <hr/>
                  <NavLink
                    to={"/dashboard/listPartner"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-handshake"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      PARTNER
                    </div>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/listCategalory"}
                    exact
                    className="item-menuad"
                    activeStyle={styleActive}
                  >
                    <div className="menuItem">
                      <Icon
                        className="fas fa-bookmark"
                        style={{ fontSize: 22, width: 30, marginRight: 5 }}
                      />
                      CATEGALORY
                    </div>
                  </NavLink>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    showMenu: state.rootReducer.showMenu,
    checkedOutItems: state.rootReducer.checkedOutItems,
    loggedInUser: state.rootReducer.loggedInUser,
    categoryData: state.rootReducer.categoryData,
    expandedItems: state.rootReducer.expandedItems,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMenuData: () => {
      dispatch(getMenuDataAction())
    }
  }
}

const MenuAdmin = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu));
export default MenuAdmin;