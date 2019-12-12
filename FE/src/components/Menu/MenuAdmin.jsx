import React, { Component } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import Icon from "@material-ui/core/Icon";
import { getMenuDataAction } from './../../redux/actions/Data';
import { getListOrderAction } from './../../redux/actions/AdminData';
import { Menu } from 'antd';
const { SubMenu } = Menu;


class ConnectedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };

  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  // componentWillMount() {
  //   this.props.getMenuData();
  // }
  componentDidMount() {
    loadCSS("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
  }
  handleClick = e => {
    this.props.getListOrderAD(e.key)
  };
  render() {
    if (!this.props.showMenu) return null;
    const styleActive = {
      color: "orange",
      fontWeight: "bold"
    }
    
    return (
      <div>
        <div   style={{ width: "100%", height:"100%", backgroundColor:"#001529" }}>
          <Menu
            // defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            
          >
            <Menu.Item key="21">
              <NavLink
                to={"/dashboard/admin"}
                exact
                activeStyle={styleActive}
              >
                <div>
                  <Icon
                    className="fas fa-chart-pie"
                    style={{ fontSize: 22, width: 30, marginRight: 5 }}
                  />
                  DASHBOARD
                    </div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="20">
              <NavLink to={"/dashboard/listDiscount"} exact
              activeStyle={styleActive} >
                <div>
                  <Icon
                    className="fas fa-tags"
                    style={{ fontSize: 22, width: 30, marginRight: 5 }}
                  />
                  DISCOUNT
                    </div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to={"/dashboard/listCustomers"} exact
              activeStyle={styleActive}>
                <div>
                  <Icon
                    className="fas fa-user-shield"
                    style={{ fontSize: 22, width: 30, marginRight: 5 }}
                  />
                  CUSTOMMER
                    </div>
              </NavLink>
            </Menu.Item>
            <SubMenu
              onClick={this.handleClick}
              key="sub1"
              title={
                // <NavLink
                //   to={"/dashboard/listorder/0"}
                //   exact
                //   activeStyle={styleActive}
                // >
                  <div>
                    <Icon
                      className="fas fa-file-invoice-dollar"
                      style={{ fontSize: 22, width: 30, marginRight: 5 }}
                    />
                    ORDERS
                    </div>
                // </NavLink>
              }
            >
              <Menu.Item key="0">
              <NavLink
                  to={"/dashboard/listorder/0"}
                  exact
                  activeStyle={styleActive}
                  
                >Already Check
                  </NavLink>
                </Menu.Item>
              <Menu.Item key="2">
              <NavLink
                  to={"/dashboard/listorder/2"}
                  exact
                  activeStyle={styleActive}
                >Checked
                  </NavLink></Menu.Item>
              <Menu.Item key="1">
              <NavLink
                  to={"/dashboard/listorder/1"}
                  exact
                  activeStyle={styleActive}
                >FullFill
                  </NavLink></Menu.Item>
              <Menu.Item key="-1">
              <NavLink
                  to={"/dashboard/listorder/-1"}
                  exact
                  activeStyle={styleActive}
                >Cancel
                  </NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              onClick={this.handleClick}
              key="sub2"
              title={
                // <NavLink
                //   to={"/dashboard/listproduct/0"}
                //   exact
                //   activeStyle={styleActive}
                // >
                  <div>
                    <Icon
                      className="fab fa-product-hunt"
                      style={{ fontSize: 22, width: 30, marginRight: 5 }}
                    />
                    PRODUCTS
                    </div>
                // </NavLink>
              }
            >
              <Menu.Item key="1">
              <NavLink
                  to={"/dashboard/listproduct/1"}
                  exact
                  activeStyle={styleActive}
                >Publish
                  </NavLink></Menu.Item>
              <Menu.Item key="2">
              <NavLink
                  to={"/dashboard/listproduct/2"}
                  exact
                  activeStyle={styleActive}
                >Unpublish
                  </NavLink></Menu.Item>
              <Menu.Item key="-1">
              <NavLink
                  to={"/dashboard/listproduct/-1"}
                  exact
                  activeStyle={styleActive}
                > OutOf Stock
                  </NavLink>
               </Menu.Item>
            </SubMenu>
            <Menu.Item key="8">
            <NavLink
            to={"/dashboard/listReview"}
            exact
            activeStyle={styleActive}
          >
            <div >
              <Icon
                className="fas fa-comment-dots"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              REVIEW
                    </div>
          </NavLink>
            </Menu.Item>
            <Menu.Item key="9">
            <NavLink
            to={"/dashboard/listInvoices"}
            exact
            activeStyle={styleActive}
          >
            <div>
              <Icon
                className="fas fa-file-import"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              INVOICES
                    </div>
          </NavLink>
            </Menu.Item>
            <Menu.Item key="10">
            <NavLink
            to={"/dashboard/import"}
            exact
            activeStyle={styleActive}
          >
            <div>
              <Icon
                className="fas fa-dolly"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              IMPORT PRODUCT
                    </div>
          </NavLink>
            </Menu.Item>
            <Menu.Item key="11">
            <NavLink
            to={"/dashboard/statistical"}
            exact
            activeStyle={styleActive}>
            <div>
              <Icon
                className="fas fa-file-invoice"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              STATISTICAL
            </div>
          </NavLink>
          
            </Menu.Item>
            <hr/>
            <Menu.Item key="32">
            <NavLink
            to={"/dashboard/warranty"}
            exact
            activeStyle={styleActive}
          >
            <div >
              <Icon
              class="fas fa-exclamation-circle"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              GUARANTEE
                    </div>
          </NavLink>
            </Menu.Item>
            <Menu.Item key="12">
            <NavLink
            to={"/dashboard/listPartner"}
            exact
            activeStyle={styleActive}
          >
            <div >
              <Icon
                className="fas fa-handshake"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              PARTNER
                    </div>
          </NavLink>
            </Menu.Item>
            <Menu.Item key="13">
            <NavLink
            to={"/dashboard/listCategalory"}
            exact
            activeStyle={styleActive}
          >
            <div >
              <Icon
                className="fas fa-bookmark"
                style={{ fontSize: 22, width: 30, marginRight: 5 }}
              />
              CATEGALORY
                    </div>
          </NavLink>
            </Menu.Item>

          </Menu>
        </div>
     
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
    },
    getListOrderAD: (trangThai) => {
      dispatch(getListOrderAction(trangThai))
  },
  }
}

const MenuAdmin = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu));
export default MenuAdmin;