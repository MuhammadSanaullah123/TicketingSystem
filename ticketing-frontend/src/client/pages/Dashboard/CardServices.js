import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
//scss
import "./Dashboard.scss";
//component
import StaticPart from "./StaticPart";
import SearchForm from "./SearchForm";
import Carousal from "./Carousal";
import TravelServices from "./TravelServices";
//mui
import Grid from "@mui/material/Grid";

//assets
import busPromo from "../../assets/sadaat.png";

const Dashboard = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [seatNo, setSeatNo] = React.useState(1);
  const [selected, setSelected] = React.useState("Bus Ticket");

  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleChangeSeat = (event) => {
    setSeatNo(event.target.value);
  };

  return (
    <>
      <Grid container className="LandingWrapper">
        <Grid container xs={12} className="form-wrapper">
          <Grid container xs={10}>
            <Grid item xs={12}>
              <h1 className="title-home">Explore Dubai!</h1>
              <p className="subtitle-home">
                Visit amazing places with great views and mountains
              </p>
            </Grid>
            <Grid container xs={12} className="categories">
              <Grid
                item
                className={`${
                  selected == "Bus Ticket" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Bus Ticket")}
              >
                <p>Bus Ticket</p>
              </Grid>
              <Grid
                item
                className={`${
                  selected == "Visa Services" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Visa Services")}
              >
                <p>Visa Services</p>
              </Grid>
              <Grid
                item
                className={`${
                  selected == "Cargo Service" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Cargo Service")}
              >
                <p>Cargo Service</p>
              </Grid>
              <Grid
                item
                className={`${
                  selected == "Hajj" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Hajj")}
              >
                <p>Hajj</p>
              </Grid>
              <Grid
                item
                className={`${
                  selected == "Umrah" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Umrah")}
              >
                <p>Umrah</p>
              </Grid>
              <Grid
                item
                className={`${
                  selected == "Tourism" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Tourism")}
              >
                <p>Tourism</p>
              </Grid>
              <Grid
                item
                className={`${
                  selected == "Bus Rental" ? "selected" : ""
                } category-item`}
                onClick={() => setSelected("Bus Rental")}
              >
                <p>Bus Rental</p>
              </Grid>
            </Grid>
            <Grid container xs={12} className="BookingContainer">
              <Grid item className="inputCardsWrapper">
                <Grid container className="CardsContainer">
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="placeWrapper"
                  >
                    <p className="heading">
                      {selected == "Bus Ticket" ? "Book Your Bus Ticket" : null}
                      {selected == "Visa Services"
                        ? "Get your Visa to Saudi Arabia"
                        : null}
                      {selected == "Cargo Service"
                        ? "Get your Cargo Service to Saudi Arabia"
                        : null}
                      {selected == "Hajj"
                        ? "Get your Hajj Service to Saudi Arabia"
                        : null}
                      {selected == "Umrah"
                        ? "Get your Umrah Service to Saudi Arabia"
                        : null}
                      {selected == "Tourism"
                        ? "Get your Tourism Service to Saudi Arabia"
                        : null}
                      {selected == "Bus Rental" ? "Bus Rental" : null}
                    </p>
                    {selected == "Bus Ticket" ? <SearchForm /> : null}
                    {selected !== "Bus Ticket" ? (
                      <TravelServices service={selected} />
                    ) : null}
                    {/*   {selected == 'Cargo Service' ? <TravelServices service="Cargo Service" /> : null}
                    {selected == 'Hajj' ? <TravelServices service="Hajj" /> : null}
                    {selected == 'Umrah' ? <TravelServices service="Umrah" /> : null}
                    {selected == 'Tourism' ? <TravelServices service="Tourism" /> : null}
                    {selected == 'Bus Rental' ? <TravelServices service="Bus Rental" /> : null} */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} align="center" marginTop="72px">
                <h2 className="free-ticket">Grab your Free Tickets!!</h2>
                <p className="free-details">
                  Every 10th ticket issued by our website is free,{" "}
                  <span style={{ color: "#C79638" }}>Click here</span> to see
                  the daily lucky winners from the past
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Carousal />
        <StaticPart />
      </Grid>
    </>
  );
};

export default Dashboard;
