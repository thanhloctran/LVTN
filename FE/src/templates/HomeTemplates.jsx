import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from './../components/Header/Header';
import MenuClient from "./../components/Menu/Menu";
import CartDialog from '../components/CartDialog/CartDialog';
import Footer from './../components/Footer/Footer';
import "./templates.css";

const HomeLayout = ({ children }) => {
  return (
    <Fragment>
            {children}  {/* giông ng content */}
    </Fragment>
  )
}


const HomeTemplate = ({ Component, ...rest }) => {
  return (
    <Fragment>
      <div className="app">
      <Header />
      <CartDialog />
        <div className="app-body" style={{ marginTop: 80, minHeight: 570 }}>
          <MenuClient />
          <div className="content" style={{backgroundColor: "#FEFBF8 "}}>
          <Route {...rest} render={(props) => {
      return (
        <HomeLayout>
          <Component {...props} />
        </HomeLayout>
      )
    }} />
          </div>
        </div>
        <Footer />
      </div>
    
    </Fragment>
  )
}


export default HomeTemplate;