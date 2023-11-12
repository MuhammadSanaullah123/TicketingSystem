import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiList,
  FiSettings,
} from "react-icons/fi";
import { BsBusFront, BsFillChatDotsFill } from "react-icons/bs";

import { BiTrip } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";
import { MdRequestPage } from "react-icons/md";
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/admin/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/admin/buses",
    icon: BsBusFront,
    name: "Buses",
  },
  {
    path: "/admin/trips",
    icon: BiTrip,
    name: "Trips",
  },
  {
    path: "/admin/customers",
    icon: AiOutlineUser,
    name: "Customers",
  },
  {
    path: "/admin/admins",
    icon: FiUsers,
    name: "Operators",
  },
  // {
  //   path: '/admin/AdminChat',
  //   icon: BsFillChatDotsFill,
  //   name: 'Chat',
  // },
  {
    path: "/admin/bookings",
    icon: FaFileInvoice,
    name: "Bookings",
  },
  {
    path: "/admin/coupons",
    icon: FiGift,
    name: "Coupons",
  },
  {
    path: "/admin/request",
    icon: MdRequestPage,
    name: "Requests",
  },

  {
    path: "/admin/profile",
    icon: FiSettings,
    name: "Edit Profile",
  },
];

export default sidebar;
