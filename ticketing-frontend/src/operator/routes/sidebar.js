import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiList,
  FiSettings,

} from 'react-icons/fi';
import {
  BsBusFront,
  BsFillChatDotsFill,
} from 'react-icons/bs';

import { BiTrip } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { FaFileInvoice } from 'react-icons/fa'
import { MdRequestPage } from 'react-icons/md'
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: '/operator/dashboard', // the url
    icon: FiGrid, // icon
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/operator/buses',
    icon: BsBusFront,
    name: 'Buses',
  },
  {
    path: '/operator/trips',
    icon: BiTrip,
    name: 'Trips',
  },
  {
    path: '/operator/bookings',
    icon: FaFileInvoice,
    name: 'Bookings',
  },
  {
    path: '/operator/coupons',
    icon: FiGift,
    name: 'Coupons',
  },
  {
    path: '/operator/setting',
    icon: FiSettings,
    name: 'Setting',
  },
];

export default sidebar;
