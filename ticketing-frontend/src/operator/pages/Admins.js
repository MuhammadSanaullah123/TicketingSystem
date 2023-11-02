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
import AdminsTable from '../components/Admins/AdminsTable';
import MainDrawer from '../components/drawer/MainDrawer';
import AddBusOperator from "../components/Admins/AddBusOperator"
const Admins = () => {


  return (
    <>
      <MainDrawer>
        <AddBusOperator />
      </MainDrawer>

      <PageTitle>Operators</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white mb-5">
        <CardBody>
          <form
      
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <Grid container justifyContent="space-between" className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Grid item align="center">
              <Input
     
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by ID"
              />
              </Grid>
              <Grid item align="center">
              <Input
       
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by Email"
              />
              </Grid>
              <Grid item align="center">
              <Input
         
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

    
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Joining Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                {/* <TableCell>Address</TableCell> */}
                <TableCell>Verification</TableCell>
                <TableCell>Add New Bus</TableCell>
                <TableCell>Add New Trip</TableCell>
  
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <AdminsTable />
          </Table>
         
        
        </TableContainer>
  
    </>
  );
};

export default Admins;
