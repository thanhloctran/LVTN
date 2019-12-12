import React, { Fragment  } from "react"
import "./App.css"
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
import { Switch} from "react-router-dom"
import {BrowserRouter} from "react-router-dom"


import ProductListClient from "./components/ProductList/ProductList"

// import Details from "./components/Details/Details"
import Order from "./components/Order/Order"
import Login from "./pages/login"
import SignUp from "./components/Login/SignUp"
import Payment from "./components/Order/Payment"
import Home from "./pages/home"


import Admin from "./pages/admin"
import Review from "./pages/review"
import Disccount from "./pages/disccount"
import importProduct from "./pages/importProduct"
import AccountAction from "./pages/AccountAction"
import ProductAction from "./pages/ProductAction"
import DiscountAction from "./pages/DiscountAction"
import HomeTemplate from "./templates/HomeTemplates"
import ReviewList from "./components/List/ReviewList"
import AdminTemplate from "./templates/AdminTemplate"
import InvoiceList from "./components/List/InvoiceList"
import PartnerList from "./components/List/PartnerList"
import ListOrderAD from "./components/Order/ListOrderAD"
import DiscountList from "./components/List/DiscountList"
import CustomerList from "./components/List/CustomerList"
import ListCategory from "./components/List/ListCategory"
import DetailOrderAD from "./components/Order/DetailOrderAD"
import ProductListAdmin from "./components/List/ProductListAD"
import DetailInvoiceAD from "./components/Order/DetailInvoiceAD"


import { Result,} from 'antd'
import Statistical from "./pages/Statistical"
import PartnerAction from "./pages/PartnerAction"
import SendingMail from "./components/ProtectedRoute/SendingMail"
import DetailProduct from "./components/Details/DetailProduct"
import waranty from "./pages/waranty"

firebase.initializeApp(firebaseConfig);

function App(props) {

    return (
      <BrowserRouter>
   
      <Fragment>  
      <Switch>
            <HomeTemplate path="/search/" Component={ProductListClient}/>
            {/* <HomeTemplate  path="/details/:id" Component={Details}/> */}
            {/* <HomeTemplate path="/about" render={() => <div>About us</div>} /> */}
            <HomeTemplate path="/login" Component={Login} />
            <HomeTemplate path="/details/:id" Component={DetailProduct} />
            <HomeTemplate path="/SignUp" Component={SignUp}  />
            <HomeTemplate  path="/payment" Component={Payment} />
            <HomeTemplate path="/order" Component={Order}  />
            <HomeTemplate  path="/account/:id" Component={AccountAction}/>
            {/* <HomeTemplate  path="/detailorder/:id" Component={DetailOrder}/> */}
            <HomeTemplate  path="/userOrder/:id/:status" Component={ListOrderAD} />
            
            <AdminTemplate path='/dashboard/admin' Component={Admin}/>
            <AdminTemplate exact path='/dashboard/reviews/:id' Component={Review}/>
            <AdminTemplate  path="/dashboard/accountAD" Component={AccountAction}/>
  
           
            <AdminTemplate path="/dashboard/detailorderAD/:id" Component={DetailOrderAD}/>
            <HomeTemplate path="/detailorderUser/:id" Component={DetailOrderAD}/>
            {/* <AdminTemplate path="/dashboard/product/:id" Component={ProductDetail}/> */}
            <AdminTemplate path="/dashboard/user/:id" Component={AccountAction}/>
            <AdminTemplate path='/dashboard/discounts/:id' Component={Disccount}/>
            <AdminTemplate path='/dashboard/invoice/:id' Component={DetailInvoiceAD}/>

            <AdminTemplate path='/dashboard/listCustomers' Component={CustomerList}/>
            <AdminTemplate path='/dashboard/listReview' Component={ReviewList}/>
            <AdminTemplate path='/dashboard/listproduct/:status'  Component={ProductListAdmin}/>
            
            <AdminTemplate exact path='/dashboard/listorder/:status' Component={ListOrderAD}/>
            <AdminTemplate path='/dashboard/listorder' Component={ListOrderAD}/>
          
            <AdminTemplate path='/dashboard/listDiscount' Component={DiscountList}/>
            <AdminTemplate path='/dashboard/listInvoices' Component={InvoiceList}/>
            <AdminTemplate path='/dashboard/listCategalory' Component={ListCategory}/>
            <AdminTemplate path='/dashboard/listPartner' Component={PartnerList}/>


            <AdminTemplate exact path='/dashboard/productCRUD' Component={ProductAction}/>
            <AdminTemplate exact path='/dashboard/accountCRUD' Component={AccountAction}/>
            <AdminTemplate exact path='/dashboard/discountCRUD' Component={DiscountAction}/>
            <AdminTemplate exact path='/dashboard/invoiceCRUD' Component={DiscountAction}/>
            <AdminTemplate exact path='/dashboard/warranty' Component={waranty}/>
            <AdminTemplate path='/dashboard/partnerCRUD' Component={PartnerAction}/>
            <AdminTemplate path='/dashboard/sendingmail' Component={SendingMail}/>


           <AdminTemplate path='/dashboard/productCRUD/:id' Component={ProductAction}/>
           <AdminTemplate path='/dashboard/accountCRUD/:id' Component={AccountAction}/>
           <AdminTemplate exact path='/dashboard/discountCRUD/:id' Component={DiscountAction}/>
           <AdminTemplate path='/dashboard/statistical' Component={Statistical}/>
           

           <AdminTemplate exact path='/dashboard/import' Component={importProduct}/>
           <AdminTemplate path='/dashboard/import/:id' Component={importProduct}/>
           
            
            
            <HomeTemplate path="/" exact component={Home}  />
            <AdminTemplate  component={() => (
                  <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  // extra={<Button type="primary">Back Home</Button>}
                />
                )}  />
            

      </Switch> 
      </Fragment>
      
  </BrowserRouter>

    );

  }

export default App;
