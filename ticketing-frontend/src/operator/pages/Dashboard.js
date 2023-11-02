import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import { Input, Label, Button } from "@windmill/react-ui";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";
import { ImStack, ImCreditCard } from "react-icons/im";
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from "react-icons/fi";
import {
  barLegends,
  barOptions,
  doughnutLegends,
  doughnutOptions,
} from "../utils/chartsData";

import useAsync from "../hooks/useAsync";
import Loading from "../components/preloader/Loading";
import ChartCard from "../components/chart/ChartCard";
import CardItem from "../components/dashboard/CardItem";
import ChartLegend from "../components/chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import OrderTable from "../components/dashboard/OrderTable";
import CardItemTwo from "../components/dashboard/CardItemTwo";
import { recentBookingsAdmin } from "../../Redux/userReducer";
// import { useDispatch } from 'react-redux/es/hooks/useDispatch';
// import useSelection from 'antd/lib/table/hooks/useSelection';
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { recentBookingsOperator } from "../../Redux/userReducer";
import { salesOverViewAdmin } from "../../Redux/userReducer";
const Dashboard = () => {
  const monthlySale = useSelector(
    (state) => state?.userReducer?.salesOverViewAdminData?.data?.monthSale
  );
  const todaySale = useSelector(
    (state) => state?.userReducer?.salesOverViewAdminData?.data?.todaySale
  );

  console.log("monthlySale", monthlySale);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recentBookingsAdmin());
    dispatch(salesOverViewAdmin());
  }, []);

  return (
    <>
      <PageTitle>Dashboard Overview bb</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <CardItemTwo
          title="Today Sales"
          Icon={ImStack}
          price={todaySale}
          className="text-white bg-teal-500"
        />
        <CardItemTwo
          title="This Month"
          Icon={FiShoppingCart}
          price={monthlySale}
          className="text-white bg-blue-500"
        />
        <CardItemTwo
          title="Total Sales"
          Icon={ImCreditCard}
          price={todaySale + monthlySale}
          className="text-white bg-green-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Bookings"
          Icon={FiShoppingCart}
          quantity={12}
          className="text-orange-600 bg-orange-100"
        />
        {/* <CardItem
          title="Order Pending"
          Icon={FiRefreshCw}
          quantity={pending.length}
          className="text-blue-600 bg-blue-100"
        />
        <CardItem
          title="Order Processing"
          Icon={FiTruck}
          quantity={processing.length}
          className="text-teal-600 bg-teal-100"
        />
        <CardItem
          title="Order Delivered"
          Icon={FiCheck}
          quantity={delivered.length}
          className="text-green-600 bg-green-100"
        /> */}
      </div>
      <Grid
        container
        justifyContent="space-around"
        style={{ marginTop: "20px" }}
      >
        <Grid item>
          <Input
            // ref={orderRef}
            type="search"
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            placeholder="Search By Operator"
          />
        </Grid>
        <Grid item>
          <input
            name="date"
            type="date"
            placeholder="Depart Date"
            // value={formData.date}
            // onChange={handleChange}
            // min={moment().format("YYYY-MM-DD")}
            className="form-input"
          ></input>
        </Grid>
        <Grid item>
          <select
            // onChange={(e) => setSortedField(e.target.value)}
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option value="All" defaultValue hidden>
              Route
            </option>
            <option value="Low">Chennai - Cawnpore</option>
            <option value="High">Cawnpore - Chennai</option>
          </select>
        </Grid>
      </Grid>
      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard title="Bookings This Year">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        <ChartCard title="Top Revenue Bus">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div>

      <PageTitle>Recent Bookings</PageTitle>
      {/* {loading && <Loading loading={loading} />} */}

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Booking ID</TableCell>

              <TableCell>Booking Email</TableCell>
              <TableCell>Operator</TableCell>

              <TableCell>Bus Number Plate</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Payment method</TableCell>
              <TableCell>Booking amount</TableCell>
              <TableCell>Status</TableCell>
            </tr>
          </TableHeader>
          <OrderTable />
        </Table>
        <TableFooter>
          {/* <Pagination
              // totalResults={12}
              // resultsPerPage={4}
              // onChange={handleChangePage}
              label="Table navigation"
            /> */}
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Dashboard;
