import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import { serviceClickedData } from "../BusListing/features/seatsSlice";
// Scss
import "./Dashboard.scss";
// Component
import CardServices from "./CardServices"
import StaticPart from "./StaticPart"
import SearchForm from "./SearchForm"
// Mui
import Grid from '@mui/material/Grid';

// Assets
import busPromo from "../../assets/sadaat.png"

const Dashboard = () => {
  const data = useSelector((state)=>state);
  const dispatch = useDispatch();
  
  const [date, setDate] = React.useState(new Date());
  const [seatNo, setSeatNo] = React.useState(1)
  
  const handleDate = (newDate) => {
    setDate(newDate);
  };
  const handleChangeSeat = (event) => {
    setSeatNo(event.target.value);
  };
  
  // dispatch(serviceClickedData(1));
  useEffect(() => {
  
    
  });

  console.log("dataF",data?.seats?.serviceClicked)
  
  return (
    <>
      {data?.seats?.serviceClicked == 0 && <CardServices title={"Book Your Bus Tickets"}/>}
      {data?.seats?.serviceClicked == 1 && <CardServices title={"VISA SERVICE"}/>}
      {data?.seats?.serviceClicked == 2 && <CardServices title={"CARGO SERVICE"}/>}
      {data?.seats?.serviceClicked == 3 && <CardServices title={"HAJJ"}/>}
      {data?.seats?.serviceClicked == 4 && <CardServices title={"UMRAH"}/>}
      {data?.seats?.serviceClicked == 5 && <CardServices title={"TOURISM"}/>}
      

      {/* <StaticPart/> */}
    </>
  );
};

export default Dashboard;
