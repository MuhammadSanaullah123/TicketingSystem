import React, { useEffect } from 'react';
import Grid from "@mui/material/Grid"
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';

import useAsync from '../hooks/useAsync';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import PageTitle from '../components/Typography/PageTitle';
import CustomerTable from '../components/customer/CustomerTable';
// API
import { getBookings } from "../../actions/bookings"
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"

const Customers = () => {
  // const { data, loading } = useAsync(UserServices.getAllUsers);
  useEffect(() => {
    store.dispatch(getBookings())
  }, [])
  return (
    <>
      <PageTitle>Customers</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white mb-5">
        <CardBody>
          <form
            // onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <Grid container justifyContent="space-between" className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Grid item align="center">
              <Input
                // ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by Civilian ID"
              />
              </Grid>
              <Grid item align="center">
              <Input
                // ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by Booking ID"
              />
              </Grid>
              <Grid item align="center">
              <Input
                // ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by Name"
              />
              </Grid>
              <Grid item>
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
              </Grid>
            </Grid>
          </form>
        </CardBody>
      </Card>

      {/* {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? ( */}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Credit Score</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CustomerTable 
              // customers={dataTable} 
            />
          </Table>
          <TableFooter>
            {/* <Pagination
              totalResults={12}
              resultsPerPage={5}
              // onChange={handleChangePage}
              label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      {/* ) : (
        <NotFound title="Customer" />
      )} */}
    </>
  );
};

Customers.propTypes = {
  // addBus: propTypes.func.isRequired
}

const mapStateToProps = state => ({
  bookings: state.bookings
})

export default Customers

