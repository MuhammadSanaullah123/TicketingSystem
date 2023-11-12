import React, { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
} from "@windmill/react-ui";
// React Icons
import { FiPlus } from "react-icons/fi";
import { CSVReader, CSVDownloader } from "react-papaparse";
// Hooks
import useAsync from "../hooks/useAsync";
// import productData from '../utils/products';
// import NotFound from '../components/table/NotFound';
// import Loading from '../components/preloader/Loading';
import PageTitle from "../components/Typography/PageTitle";
import { SidebarContext } from "../context/SidebarContext";
import ExclusiveTripsTable from "../components/bus/ExclusiveTripsTable";
import RegularTripsTable from "../components/bus/RegularTripsTable";
import MainDrawer from "../components/drawer/MainDrawer";
import BusDrawer from "../components/drawer/BusDrawer";
import AddTripByAdmin from "../components/drawer/AddTripByAdmin";
// CSS
import "react-tabs/style/react-tabs.css";
import "./trips.css";
import store from "../../store";
import { getRegularTrips, getExclusiveTrips } from "../../actions/trips";

const Trips = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const handleGetRegularTrips = () => {
    setTimeout(() => {
      store.dispatch(getRegularTrips());
    }, 2000);
  };
  const handleGetExclusiveTrips = () => {
    setTimeout(() => {
      store.dispatch(getExclusiveTrips());
    }, 2000);
  };
  return (
    <>
      <MainDrawer>
        <AddTripByAdmin
          handleGetRegularTrips={handleGetRegularTrips}
          handleGetExclusiveTrips={handleGetExclusiveTrips}
        />
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
            <div>
              <div className="w-full md:w-56 lg:w-56 xl:w-56">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12 addBusBtnHome"
                >
                  <span className="mr-3">
                    <FiPlus />
                  </span>
                  Add Trip
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
      <Tabs>
        <TabList>
          <Tab>Exclusive Trips</Tab>
          <Tab>Regular Trips</Tab>
        </TabList>

        {/* Exclusive Trips */}
        <TabPanel>
          {/* <PageTitle>Exclusive Trips</PageTitle> */}
          <TableContainer className="mb-8 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Trip ID</TableCell>
                  <TableCell>Bus Number Plate</TableCell>

                  <TableCell>Price</TableCell>
                  <TableCell>Departure</TableCell>
                  <TableCell>Arrival</TableCell>
                  {/* <TableCell>Seats</TableCell> */}
                  {/* <TableCell>Seats</TableCell> */}
                  {/* <TableCell>Facilites</TableCell> */}
                  {/* <TableCell>Seat Selection</TableCell> */}

                  <TableCell className="text-right">Actions</TableCell>
                </tr>
              </TableHeader>
              <ExclusiveTripsTable />
            </Table>
            <TableFooter></TableFooter>
          </TableContainer>
        </TabPanel>

        {/* Regular Trips */}
        <TabPanel>
          {/* <PageTitle>Regular Trips</PageTitle> */}
          <TableContainer className="mb-8 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Regular Trip ID</TableCell>
                  <TableCell>Bus Number Plate</TableCell>

                  <TableCell>Price</TableCell>
                  <TableCell>Departure</TableCell>
                  <TableCell>Arrival</TableCell>

                  <TableCell className="text-right">Actions</TableCell>
                </tr>
              </TableHeader>
              <RegularTripsTable />
            </Table>
            <TableFooter></TableFooter>
          </TableContainer>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Trips;
