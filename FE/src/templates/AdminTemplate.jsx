import React, { Fragment } from 'react';
import {Redirect } from "react-router-dom";
import "./templates.css";
import { Route /*,Redirect*/ } from 'react-router-dom';
import MenuAdmin from "./../components/Menu/MenuAdmin";
import HeaderAdmin from './../components/Header/HeaderAdmin';
// import CartDialog from '../components/CartDialog/CartDialog';
import Footer from './../components/Footer/Footer'
// import Home from '../pages/home';

const AdminLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="app">
            <HeaderAdmin/> 
        <div className="app-body" style={{ marginTop: 80, minHeight: 570 ,background:"#F1F5F5"}}>
        <MenuAdmin/>
          <div className="content">
              {children}
                
          </div>
        </div>
        <Footer/>
      </div>
            
        </Fragment>
    )
}
const AdminTemplate = ({ Component, ...rest }) => {
    return (
        <Fragment>
            < Route {...rest} render={(props) => {
                if(sessionStorage.getItem('employee'))
                { 
                return (
                    <AdminLayout>
                        <Component {...props} />
                    </AdminLayout>
                )
                }
                else{
                    return <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }}/>
                }

            }} />
        </Fragment>

    )
}


export default AdminTemplate;