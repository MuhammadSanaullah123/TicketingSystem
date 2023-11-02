import React from 'react';
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
import TravelHistoryTable from '../components/customer/TravelHistoryTable';

const CustomersTravelHistory = () => {
  // const { data, loading } = useAsync(UserServices.getAllUsers);

  return (
    <>
      <PageTitle>Customer Travel History</PageTitle>
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
                <TableCell>Travel Date</TableCell>
                <TableCell>Booking itinerary Number</TableCell>
                <TableCell>Travel Route</TableCell>
                <TableCell>Price</TableCell>
                {/* <TableCell className="text-right">Actions</TableCell> */}
              </tr>
            </TableHeader>
            <TravelHistoryTable
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

export default CustomersTravelHistory;
