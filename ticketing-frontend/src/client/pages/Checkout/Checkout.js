import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";

//scss
import "./Checkout.scss";

//mui
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";

//icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

//assets

const Checkout = () => {
  const searchedData = useSelector((state) => state?.userReducer?.searchDataH2);
  const priceData = useSelector((state) => state?.userReducer?.priceDataH2);
  const breadcrumbs = [
    <p>Bus Listing</p>,
    <p>Seat Selection</p>,
    <p>Passenger Detail</p>,
    <p key="3" color="text.primary" style={{ margin: "0" }}>
      Payment
    </p>,
  ];

  return (
    <>
      <div className="checkOutTopWrapper">
        <Grid container className="CheckoutWrapper">
          <Grid
            container
            className="CheckoutContainer"
            display="flex"
            justifyContent="center"
          >
            <Grid item xs={11} xl={10} className="bgGrey">
              <Grid container spacing={12} className="CheckoutContainerInner">
                <Grid item xl={7} lg={7} md={12} sm={12} xs={12} className="CheckoutContainerInnerMoreInner">
                  <Grid item className="title">
                    <p>Checkout</p>
                  </Grid>

                  {/* Breadcrumbs */}
                  <Grid item xs={12}>
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="large" />}
                      aria-label="breadcrumb"
                      className="breadCrumbs"
                    >
                      {breadcrumbs}
                    </Breadcrumbs>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="heading inputMargins"
                    sx={{
                      margin: "40px 0",
                      fontSize: "2rem",
                      color: "#0c2f54",
                    }}
                  >
                    <p>Card Information</p>
                  </Grid>

                  {/* Email */}
                  {/* <Grid item xs={12} sx={{ margin: "20px 0" }}>
                    <TextField
                      id="outlined-basic"
                      className="checkOutInputFields"
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid> */}

                  {/* Name */}
                  <Grid
                    container
                    justifyContent="space-between"
                    className="twoInputs"
                  >
                    <Grid item md={12} xl={12} lg={12} sx={{ margin: "20px 0" }}>
                      <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        className="checkOutInputFields"
                        type="text"
                        label="Name as displayed on Card"
                        variant="outlined"
                      />
                    </Grid>
                    {/* <Grid
                      item
                      md={12}
                      xl={6}
                      lg={6}
                      sx={{ margin: "20px 0" }}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextField
                        style={{ width: "95%" }}
                        id="outlined-basic"
                        type="text"
                        className="checkOutInputFields"
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid> */}
                  </Grid>

                  {/* CVV */}
                  <Grid
                    container
                    justifyContent="space-between"
                    className="twoInputs"
                  >
                    <Grid md={12} xl={6} lg={6} item sx={{ margin: "20px 0" }}>
                      <TextField
                        style={{ width: "95%" }}
                        id="outlined-basic"
                        type="text"
                        className="checkOutInputFields"
                        label="CVV"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      md={12}
                      xl={6}
                      lg={6}
                      item
                      sx={{ margin: "20px 0" }}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextField
                        style={{ width: "95%" }}
                        id="outlined-basic"
                        type="text"
                        className="checkOutInputFields"
                        label="Expiry"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                  {/* Address/information */}
                  <Grid item xs={12} sx={{ margin: "20px 0" }}>
                    <TextField
                      id="outlined-basic"
                      type="email"
                      label="Address"
                      className="checkOutInputFields"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ margin: "20px 0" }}>
                    <TextField
                      id="outlined-basic"
                      type="number"
                      className="checkOutInputFields"
                      label="Postal Code"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ margin: "20px 0" }}>
                    <TextField
                      id="outlined-basic"
                      type="number"
                      label="Phone Number"
                      className="checkOutInputFields"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid  item xl={4} lg={4} md={12} sm={12} xs={12} className="CheckoutContainerInnerMoreInner">
                  <Grid
                  className="rightCardCheckout"
                    container
                    sx={{
                      border: "3px solid #C69537",
                      padding: "20px 10px",
                      color: "#000",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid
                        item
                        xs={12}
                        sx={{ fontSize: "2rem", color: "#0c2f54" }}
                      >
                        <p>Details</p>
                      </Grid>
                      <Grid item sx={{ margin: "30px 0" }}>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "0px 0 10px 0", fontSize: "1.4rem" }}
                          className="CheckoutDetailHeading"
                        >
                          <p>
                            <strong>Operator</strong>
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                          className="CheckoutDetailHeading"
                        >
                          <p>
                            <strong>Bus Type</strong>
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                          className="CheckoutDetailHeading"
                        >
                          <p>
                            <strong>No of Seats</strong>
                          </p>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ margin: "30px 0" }}>
                        <Grid
                          item
                          xs={12}
                          sx={{ marginBottom: "10px", fontSize: "1.4rem" }}
                          className="CheckoutDetailHeading"
                        >
                          <p>Faisal Movers</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                          className="CheckoutDetailHeading"
                        >
                          <p>Business Class</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                          className="CheckoutDetailHeading"
                        >
                          <p>{priceData?.passengerNumber}</p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ margin: "20px 0" }} justifyContent="space-between" display="flex">
                        <div style={{alignSelf:'center'}}>
                          <input type="checkbox" name="promo" />
                          <label for="promo" className="checkbox-discount"><strong>I have discount code</strong></label>
                        </div>
                        <input type="text" className="promo-discount" placeholder="Enter Coupon Code" />
                      </Grid>
                      <Grid item sx={{ margin: "20px 0" }}>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                        >
                          <p>Subtotal</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                        >
                          <p>Tax</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                        >
                          <p>Total</p>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ margin: "20px 0" }}>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                        >
                          <p>{priceData?.fareAmount}</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                        >
                          <p>0</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ margin: "20px 0", fontSize: "1.4rem" }}
                        >
                          <p>{priceData?.fareAmount}</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} align="center">
                      <Link to="/client/order-invoice">
                        <button
                          className="payBtn"
                          style={{
                            padding: "10px 25px",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "5px",
                            fontSize: "22px",
                          }}
                        >
                          Proceed to Pay
                        </button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Checkout;
