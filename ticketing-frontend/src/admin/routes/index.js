import { lazy } from "react";
// const MyAccount = lazy(() => import("../userPages/MyAccount/MyAccount"));
// const Categorys = lazy(() => import("../userPages/Category/Category"));
// const Cart = lazy(() => import("../userPages/Cart/Cart"));
// const ThankYou = lazy(() => import("../userPages/Thankyou/ThankYou"));
// const Signin = lazy(() => import("../userPages/Signin/Signin"));
// const Home = lazy(() => import("../userPages/Home/Home"));
// const Product = lazy(() => import("../userPages/Products/Products"));
// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Buses = lazy(() => import("../pages/Buses"));
const Trips = lazy(() => import("../pages/Trips"));

const AdminChat = lazy(() => import("../pages/AdminChat"));
const AdminChatBox = lazy(() => import("../pages/AdminChatBox"));
const ProductDetails = lazy(() => import("../pages/BusDetails"));
// const Category = lazy(() => import("../pages/Category"));
const Request = lazy(() => import("../pages/Request"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomersTravelHistory = lazy(() =>
  import("../pages/CustomersTravelHistory")
);

const Admins = lazy(() => import("../pages/Admins"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
// const Setting = lazy(() => import("../pages/Setting"));
//const Page404 = lazy(() => import("../pages/404"));
const EditProfile = lazy(() => import("../pages/EditProfile"));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/buses",
    component: Buses,
  },
  {
    path: "/admin/trips",
    component: Trips,
  },
  {
    path: "/admin/product/:id",
    component: ProductDetails,
  },
  {
    path: "/admin/customers",
    component: Customers,
  },
  {
    path: "/admin/customer/:id/travel-history",
    component: CustomersTravelHistory,
  },
  {
    path: "/admin/admins",
    component: Admins,
  },
  {
    path: "/admin/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/admin/request",
    component: Request,
  },
  {
    path: "/admin/bookings",
    component: Orders,
  },
  {
    path: "/admin/bookings/:id",
    component: OrderInvoice,
  },
  {
    path: "/admin/coupons",
    component: Coupons,
  },
  { path: "/admin/profile", component: EditProfile },

  {
    path: "/admin/edit-profile",
    component: EditProfile,
  },
  {
    path: "/admin/adminChat",
    component: AdminChat,
  },
  {
    path: "/admin/adminChatBox",
    component: AdminChatBox,
  },
];

export default routes;
