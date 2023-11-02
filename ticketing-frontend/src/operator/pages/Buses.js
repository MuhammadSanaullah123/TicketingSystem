import React, { useContext, useState, useEffect } from "react";
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
import { FiPlus } from "react-icons/fi";
import { CSVReader, CSVDownloader } from "react-papaparse";
import useAsync from "../hooks/useAsync";
import "../components/drawer/productDrawer.css";
import PageTitle from "../components/Typography/PageTitle";
import { SidebarContext } from "../context/SidebarContext";
import BusTable from "../components/bus/BusTable";
import MainDrawer from "../components/drawer/MainDrawer";
import AddBusByOperator from "../components/drawer/AddBusByOperator";
import EditDeleteButton from "../components/table/EditDeleteButton";
import useToggleDrawer from "../hooks/useToggleDrawer";
// CSS
import "./../../admin/assets/css/custom.css";
import "../components/drawer/productDrawer.css";
// Drawers
import store from "../../store";
import { getAllBuses } from "../../actions/buses";

const Buses = () => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { toggleDrawer } = useContext(SidebarContext);

  const handleGetAllBuses = () => {
    setTimeout(() => {
      store.dispatch(getAllBuses());
    }, 2000);
  };

  return (
    <>
      <MainDrawer>
        <AddBusByOperator handleGetAllBuses={handleGetAllBuses} />
      </MainDrawer>

      <PageTitle>Buses</PageTitle>
      <div className="flex-grow-0 md:flex-grow mb-3 lg:flex-grow xl:flex-grow justify-between flex">
        <div>
          <Input
            // ref={couponRef}
            type="search"
            className="border h-12 text-sm focus:outline-none block w-44 bg-gray-100 border-transparent focus:bg-white"
            placeholder="Search by bus number plate"
          />
        </div>
        <div>
          <Input
            // ref={couponRef}
            type="search"
            className="border h-12 text-sm focus:outline-none block w-44 bg-gray-100 border-transparent focus:bg-white"
            placeholder="Search by category"
          />
        </div>
        <div className="w-full md:w-56 lg:w-56 xl:w-56">
          <Button
            onClick={toggleDrawer}
            className="w-full rounded-md h-12 addBusBtnHome"
          >
            <span className="mr-3">
              <FiPlus />
            </span>
            Add Bus
          </Button>
        </div>
      </div>
      <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Bus Number Plate</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Facilites</TableCell>
              <TableCell>Seat Selection</TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </tr>
          </TableHeader>
          <BusTable />
        </Table>
        <TableFooter></TableFooter>
      </TableContainer>
    </>
  );
};

export default Buses;
