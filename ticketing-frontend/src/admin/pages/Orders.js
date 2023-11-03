import React, { useContext, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CSVDownloader } from 'react-papaparse';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';
// CSS
import 'react-tabs/style/react-tabs.css';
import './trips.css'
// React icons
import { IoCloudDownloadOutline } from 'react-icons/io5';
import {FiPlus} from "react-icons/fi"

import orderData from '../utils/orders';
import useAsync from '../hooks/useAsync';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import PastTables from '../../admin/components/order/PastTables';
import UpcomingTables from '../../admin/components/order/UpcomingTables';
import PageTitle from '../components/Typography/PageTitle';
import MainDrawer from '../components/drawer/MainDrawer';
import BookingDrawer from '../components/drawer/BookingDrawer';
import { SidebarContext } from '../context/SidebarContext';
// API
import { getBookings } from "../../actions/bookings"
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"

const Orders = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  useEffect(() => {
    store.dispatch(getBookings())
  }, [])

  return (
    <>
      <MainDrawer>
        <BookingDrawer />
      </MainDrawer>
      {/* Filters */}
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white mb-5">
        <CardBody>
          <form
            // onSubmit={handleSubmitOrder}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:grid-cols-6 xl:grid-cols-6"
          >
            <div>
              <Input
                // ref={orderRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder="Search by Operator"
              />
            </div>
            {/* <div>
              <Select
               
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Status" defaultValue hidden>
                  Status
                </option>
                <option value="Delivered">In Journey</option>
                <option value="Pending">Yet To Arrive</option>
                <option value="Processing">Yet To Depart</option>
                <option value="Cancel">Not Available</option>
              </Select>
            </div>
            <div>
              <Select
              
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Order limits" defaultValue hidden>
                  Order limits
                </option>
                <option value="5">Last 5 days orders</option>
                <option value="7">Last 7 days orders</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
              </Select> */}
            {/* </div> */}
            <div>
             
              <div className="w-full md:w-56 lg:w-56 xl:w-56">
                <Button onClick={toggleDrawer} className="w-full rounded-md h-12 addBusBtnHome">
                  <span className="mr-3">
                    <FiPlus />
                  </span>
                  Add Booking
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card> 
      {/* Tabs */}
      <Tabs>
        <TabList>
          <Tab>Past Bookings</Tab>
          <Tab>Upcoming Bookings</Tab>
        </TabList>

        {/* Past bookings */}
        <TabPanel>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Operator</TableCell>
                  <TableCell>Bus Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Departure Time</TableCell>
                  <TableCell>Arrival Time</TableCell>
                  <TableCell>Payment method</TableCell>
                  <TableCell>Booking amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell className="text-right">Is Payment Done?</TableCell>
                </tr>
              </TableHeader>
              <PastTables />
            </Table>
            <TableFooter>
            </TableFooter>
          </TableContainer>
        </TabPanel>

        {/* Upcoming bookings */}
        <TabPanel>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Operator</TableCell>
                  <TableCell>Bus Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Departure Time</TableCell>
                  <TableCell>Arrival Time</TableCell>
                  <TableCell>Payment method</TableCell>
                  <TableCell>Booking amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell className="text-right">Is Payment Done?</TableCell>
                </tr>
              </TableHeader>
              <UpcomingTables />
            </Table>
            <TableFooter>
            </TableFooter>
          </TableContainer>
        </TabPanel>
      </Tabs>
      
    
    </>
  );
};

export default Orders

{/* <Pagination
totalResults={12}
resultsPerPage={5}
// onChange={handleChangePage}
  label="Table navigation"
/> */}
{/* ) : (
  <NotFound title="Order" />
)} */}