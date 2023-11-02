import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import { withRouter } from "react-router";

//scss
import "./ThankYou.scss";

//mui
import Grid from '@mui/material/Grid';
//assets

const ThankYou = () => {
  
  const breadcrumbs = [
    <p>
      BusListing
    </p>,
    <p>
      Seat Selection
    </p>,
    <p key="3" color="text.primary" style={{margin:'0'}}>
      Payment
    </p>,
  ];

  
  return (
    <>
      <Grid container className="ThankYouWrapper">
        <Grid item xs={12} className="ThankYouContainer" display="flex" justifyContent="center">
          <Grid item xs={11} className="bgGrey">
            <Grid container justifyContent="center">
              <Grid item xl={7} lg={7} md={8} sm={10} xs={12} align="center" className="title">
                <p>Thank You For Using Our Service</p>
              </Grid>
              <Grid item xl={7} lg={7} md={8} sm={10} xs={12} className="emailConfirm" align="center" sx={{margin:'20px 0'}}>
                <p>We have sent you an email at <span style={{color:'#0c2f54', textDecoration:'underline'}}>abc@gmail.com</span> for order confirmation with your seat invoice attached.</p>
                <p style={{margin:'20px 0'}}>Or you can view your booking in <span style={{color:'#c99a3c', fontWeight: 600}}>"My Bookings"</span> tab</p>
              </Grid>
            </Grid>  
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ThankYou;
