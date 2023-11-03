import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router";
//scss
import "./BusListing";
//components
import SearchBus from "./SearchBus/SearchBus";
//mui
import Grid from "@mui/material/Grid";

const About = () => {
  return (
    <>
      <div className="topSearchBusListing">
        <Grid container className="topSearchBusListingInner">
          <SearchBus />
        </Grid>
      </div>
    </>
  );
};

export default About;
