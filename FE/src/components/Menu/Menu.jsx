import React, { Component } from "react";
import {
  getListCategoryAction,
} from './../../redux/actions/AdminData';
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import Icon from "@material-ui/core/Icon";
import { Menu } from 'antd';
// import { CircularProgress } from "@material-ui/core";
const { SubMenu } = Menu;



class ConnectedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      listCategory:[]
    };

  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    loadCSS("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
    this.props.getListCategoryAD();
    
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return{
        ...prevState, listCategory: nextProps.listCategory
    }
}
  render() {

    const styleActive = {
      color: "orange",
      fontWeight: "bold"
    }
    if(typeof(this.state.listCategory)==="undefined"){
      return <span></span>
    }
    if (!this.props.showMenu) return null;
    return (
      <div className="userMenu">
        <div style={{ width: "100%", height: "100%", backgroundColor: "#001529" }}>
          <Menu
            defaultOpenKeys={['sub1','sub2']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}

          >
            <SubMenu
              key="sub1"
              title={
                <div>
               PRODUCT CATEGORY
                    </div>
                // </NavLink>
              }
            >
              <Menu.Item key="1">
              <NavLink
                to={"/search/?category=All%20categories"}
                exact
                activeStyle={styleActive}
              >
                <div>
                  <Icon
                    className="fas fa-chart-pie"
                    style={{ fontSize: 22, width: 30, marginRight: 5 }}
                  />
                  All Category</div>
              </NavLink>
            </Menu.Item>
            {this.state.listCategory.map((item, index)=>{
              return <Menu.Item key={item.maLoaiSP}>
              <NavLink
                to={`/search/?category=${item.maLoaiSP}`}
                exact
                activeStyle={styleActive}
              >
                <div>
                  <Icon
                    className={item.icon}
                    style={{ fontSize: 22, width: 30, marginRight: 5 }}
                  />
                  {item.tenLoai}</div>
              </NavLink>
            </Menu.Item>
            })}
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <div> FILTER PRODUCT </div>
              }
            >
              <Menu.Item key="2">
                <NavLink
                  to={"/search/?category=Discount"}
                  exact
                  activeStyle={styleActive}
                >ON SALE
                  </NavLink></Menu.Item>
              <Menu.Item key="3">
                <NavLink
                  to={"/search/?category=Bestseller"}
                  exact
                  activeStyle={styleActive}
                >BEST SELLER
                  </NavLink></Menu.Item>
              <Menu.Item key="4">
                <NavLink
                  to={"/search/?category=HighRate"}
                  exact
                  activeStyle={styleActive}
                >HIGH RATE
                  </NavLink></Menu.Item>
            </SubMenu>
          </Menu>
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    showMenu: state.rootReducer.showMenu,
    listCategory: state.rootReducerAD.listCategory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListCategoryAD: () => {
      dispatch(getListCategoryAction())
    },

  }
};

const MenuClient = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu));
export default MenuClient;