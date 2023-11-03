import React, { lazy, useEffect } from "react";
// import { Widget } from "react-chat-widget";
import WebFont from "webfontloader";
import "react-chat-widget/lib/styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "./operator/utils/toast";
import AccessibleNavigationAnnouncer from "./operator/components/AccessibleNavigationAnnouncer";
// import PrivateRoute from './components/login/PrivateRoute';
import Layout from "./operator/layout/Layout";
import AdminLayout from "./admin/layout/Layout";
import ClientLayout from "./client/mainLayout/MainLayout";
import Login from "./client/pages/LogIn/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SignUp from "./client/pages/SignUp/SignUp";
import Dashboard from "./client/pages/Dashboard/Dashboard";
import BusListing from "./client/pages/BusListing/BusListing";
import About from "./client/pages/About/About";
import Checkout from "./client/pages/Checkout/Checkout";
import ThankYou from "./client/pages/ThankYou/ThankYou";
import Review from "./client/pages/Review/Review";
import TermsPolicy from "./client/pages/TermsPolicy/TermsPolicy";
import BusService from "./client/pages/Services/BusService/BusService";
import VisaService from "./client/pages/Services/VisaService/VisaService";
import CargoService from "./client/pages/Services/CargoService/CargoService";
import HajjService from "./client/pages/Services/HajjService/HajjService";
import UmrahService from "./client/pages/Services/UmrahService/UmrahService";
import TourismService from "./client/pages/Services/TourismService/TourismService";
import BusListing2 from "./client/pages/BusListing2/BusListing2";
import PassengerDetail from "./client/pages/PassengerDetail/PassengerDetail";
import ChatWidget from "./ChatWidget/ChatWidget";
import OrderInvoice from "./operator/pages/OrderInvoice";
import InvoiceUser from "./client/pages/InvoiceUser/InvoiceUser";
import WhatsAppWidget1 from "./client/WhatsAppWidget/WhatsAppWidget";
import OperatorLogin from "./operator/pages/OperatorLogin";
import OperatorSignup from "./operator/pages/OperatorSignUp";

import EditProfile from "./operator/pages/EditProfile";
import ProfilePage from "./client/pages/ProfilePage/ProfilePage";
import ForgotPassword from "./operator/pages/ForgotPassword";
import ResetPassword from "./operator/pages/ResetPassword";
import SingleBusDetail from "./client/pages/SingleBusDetail/SingleBusDetail";
import AdminLoginPage from "./admin/pages/AdminLogin/AdminLoginPage";
import TicketSearch from "./client/pages/TicketSearch/TicketSearch";
import Bookings from "./client/pages/Bookings/Bookings";

// Redux
import { Provider } from "react-redux";
import store from "./store";
// import PassengerDetail from './client/pages/BusListing/SearchBus/PassengerDetail';
// import PassengerDetail from './client/pages/PassengerDetail/PassengerDetail';
// import 'rsuite/dist/styles/rsuite-default.css';
WebFont.load({
  google: {
    families: ["Open Sans Web:300,400,700", "sans-serif"],
  },
});

const App = () => {
  const history = useHistory();

  if (window.location.pathname == "/") history.push("/client/bus-listing2");

  return (
    <>
      {/* <Provider store={store}> */}
      <ToastContainer />
      <Router>
        {/* {(params[3] == 'user') ? <Header/> : null} */}

        {/* <AccessibleNavigationAnnouncer /> */}
        <Switch>
          {/* Operator side */}
          <Route path="/operator/login" exact component={OperatorLogin} />
          <Route path="/operator/signup" exact component={OperatorSignup} />
          <Route path="/operator/" component={Layout} />
          <Route path="/operator/edit-profile" component={EditProfile} />

          <Route path="/client/resetPassword" component={ResetPassword} />
          <Route
            path="/client/forgot-password"
            exact
            component={ForgotPassword}
          />

          {/* Admin side */}

          <Route path="/admin/login" component={AdminLoginPage} />
          <Route path="/admin/" component={AdminLayout} />

          <Route path="/client/login" component={Login} />
          <Route path="/client/sign-up" component={SignUp} />

          <ClientLayout>
            <Route path="/client/home" component={Dashboard} />
            <Route path="/client/bus-service" component={BusService} />
            <Route path="/client/bus-listing" component={BusListing} />
            <Route path="/client/bus-listing2" component={BusListing2} />
            <Route
              path="/client/passenger-detail"
              component={PassengerDetail}
            />
            <Route path="/client/edit-profile" component={ProfilePage} />
            <Route path="/client/about" component={About} />
            <Route path="/client/ticket" component={TicketSearch} />
            <Route path="/client/terms-and-policy" component={TermsPolicy} />
            <Route path="/client/checkout" component={Checkout} />
            <Route path="/client/thank-you" component={ThankYou} />
            <Route path="/client/review" component={Review} />
            <Route path="/client/singleBusDetail" component={SingleBusDetail} />
            <Route path="/client/order-invoice" component={InvoiceUser} />
            <Route path="/client/bookings" component={Bookings} />
          </ClientLayout>
        </Switch>
      </Router>
      {/* </Provider> */}
    </>
  );
};

export default App;
