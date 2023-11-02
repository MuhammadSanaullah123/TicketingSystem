import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./../../ColorSchemeChange/ColorSchemeChange.css";
import { useSelector, useDispatch } from "react-redux";

import { resetState } from "../../../Redux/userReducer";
import { logout } from "../../../Redux/userReducer";
// import './../../assets/'
import logoMain from "./../../../assets/logoMain.png";
// tippy js
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { serviceClickedData } from "../../pages/BusListing/features/seatsSlice";
//svg
import bus from "../../assets/bus-side-view-white.svg";

//react icons

import { IoMdArrowDropdown } from "react-icons/io";
//scss
import "./Header.scss";

//components
import MyBookings from "./MyBookings";

//mui components
import Grid from "@mui/material/Grid";

//mui icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

//Accordian
import Accordion from "react-bootstrap/Accordion";

//cookies
import Cookies from "universal-cookie";
const cookies = new Cookies();

const isLogin = cookies.get("auth");

export default function Header() {
  const service = [
    {
      ser: "BUS",
    },
    {
      ser: "VISA SERVICE",
    },
    {
      ser: "CARGO SERVICE",
    },
    {
      ser: "HAJJ",
    },
    {
      ser: "UMRAH",
    },
    {
      ser: "TOURISM",
    },
  ];
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = React.useState({ left: false });
  const [hideIcon, setHideICon] = useState(0);
  const [serviceType, setServiceType] = useState(0);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const iconMouseEnter = () => {
    setHideICon(1);
  };
  const iconMouseLeave = () => {
    setHideICon(0);
  };

  console.log("hideICon", hideIcon);

  const clickedHandleSer = (index) => {
    setServiceType(index);
    dispatch(serviceClickedData(serviceType));
  };
  console.log("serviceType", serviceType);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const clickedLogout = () => {
    // dispatch(resetState());

    dispatch(logout());
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You want to SignOut!",
    }).then(() => {
      // localStorage.clear();
      // cookies.clear();
      window.location.assign("/");
      // navigate("/")
      var allCookies = document.cookie.split(";");

      // The "expire" attribute of every cookie is
      // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
      for (var i = 0; i < allCookies.length; i++)
        document.cookie =
          allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    });
  };

  console.log("isLogin", isLogin);
  const list = (anchor) => (
    <Box sx={{ width: 250 }} role="presentation">
      <Grid container sx={{ padding: "20px 30px" }}>
        <Grid item xs={12} align="right">
          <CloseIcon
            onClick={toggleDrawer(anchor, false)}
            sx={{ color: "#c99a3c", fontSize: "35px" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            color: "#c99a3c",
            margin: "10px 0",
          }}
        >
          <Link to="/home" style={{ textDecoration: "none", color: "#c99a3c" }}>
            Home
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            color: "#c99a3c",
            margin: "10px 0",
          }}
        >
          <Link
            to="/client/about"
            style={{ textDecoration: "none", color: "#c99a3c" }}
          >
            About Us
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            color: "#c99a3c",
            margin: "10px 0",
          }}
        >
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header >Services</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Link
                    to="/client/bus-service"
                    style={{ color: "#FFF", textDecoration: "none" }}
                  >
                    <div>BUS</div>
                  </Link>
                  <Link
                    to="/client/visa-service"
                    style={{ color: "#FFF", textDecoration: "none" }}
                  >
                    <div>VISA SERVICE</div>
                  </Link>
                  <Link
                    to="/client/cargo-service"
                    style={{ color: "#FFF", textDecoration: "none" }}
                  >
                    <div>CARGO SERVICE</div>
                  </Link>
                  <Link
                    to="/client/hajj-service"
                    style={{ color: "#FFF", textDecoration: "none" }}
                  >
                    <div>HAJJ</div>
                  </Link>
                  <Link
                    to="/client/umrah-service"
                    style={{ color: "#FFF", textDecoration: "none" }}
                  >
                    <div>UMRAH</div>
                  </Link>
                  <Link
                    to="/client/tourism-service"
                    style={{ color: "#FFF", textDecoration: "none" }}
                  >
                    <div>TOURISM</div>
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            color: "#c99a3c",
            margin: "10px 0",
          }}
          onClick={handleOpenModal}
        >
          My Bookings
        </Grid>
   
        <Grid
          item
          xs={12}
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            color: "#c99a3c",
            margin: "10px 0",
          }}
        >
          <Link
            to="/client/login"
            style={{ color: "#c99a3c", textDecoration: "none" }}
          >
            <p>Login</p>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <Grid container className="header-box desktop">
        <Grid item xl={6} lg={6} md={5} sm={1} className="logoWrapper">
          <Link to="/client/bus-service">
            <img src={logoMain} alt="BusBooking" className="header-logo" />
          </Link>
        </Grid>
        <Grid item className="navLinksWrapper">
          <Grid
            item
            className="navLink"
            onMouseEnter={iconMouseEnter}
            onMouseLeave={iconMouseLeave}
          >
            <Tippy
              interactive={true}
              placement="bottom"
              className="tippyService"
              onMouseEnter={iconMouseEnter}
              onMouseLeave={iconMouseLeave}
              content={
                <div
                  className="mainContainerContentTippy"
                  onMouseEnter={iconMouseEnter}
                >
                  <Link
                    to="/client/bus-service"
                    style={{ color: "#c99a3c", textDecoration: "none",fontSize:"18px" }}
                  >
                    <div>BUS</div>
                  </Link>
                  <Link
                    to="/client/visa-service"
                    style={{ color: "#343434", textDecoration: "none",fontSize:"18px" }}
                  >
                    <div>VISA SERVICE</div>
                  </Link>
                  <Link
                    to="/client/cargo-service"
                    style={{ color: "#343434", textDecoration: "none",fontSize:"18px" }}
                  >
                    <div>CARGO SERVICE</div>
                  </Link>
                  <Link
                    to="/client/hajj-service"
                    style={{ color: "#343434", textDecoration: "none",fontSize:"18px" }}
                  >
                    <div>HAJJ</div>
                  </Link>
                  <Link
                    to="/client/umrah-service"
                    style={{ color: "#343434", textDecoration: "none", fontSize:"18px" }}
                  >
                    <div>UMRAH</div>
                  </Link>
                  <Link
                    to="/client/tourism-service"
                    style={{ color: "#343434", textDecoration: "none", fontSize:"18px" }}
                  >
                    <div>TOURISM</div>
                  </Link>
                </div>
              }
            >
              <div className="serviceTxtIconTop">
                <button>All Services</button>

                <IoMdArrowDropdown
                  style={{ fontSize: "35px", color: "#343434" }}
                />
                {/* )} */}
              </div>
            </Tippy>
          </Grid>
          <Grid item className="navLink">
            <Link
              to="/client/about"
              style={{ color: "white", textDecoration: "none" }}
            >
              <p>About Us</p>
            </Link>
          </Grid>
          <Grid
            item
            className="navLink"
            onClick={handleOpenModal}
            style={{ cursor: "pointer" }}
          >
            <p>My Bookings</p>
          </Grid>
          {/* <Grid item className="navLink">
            <p>Balance: $100</p>
          </Grid> */}
          {isLogin == undefined && (
            <Grid item className="navLink">
              <Link
                to="/client/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                <p>Login</p>
              </Link>
            </Grid>
          )}
          {isLogin && (
            <Link to="/client/edit-profile">
              <Grid item className="navLink">
                <p style={{ cursor: "pointer" }}>Edit Profile</p>
              </Grid>
            </Link>
          )}
          {isLogin && (
            <Grid item className="navLink" onClick={clickedLogout}>
              <p style={{ cursor: "pointer" }}>Logout</p>
            </Grid>
          )}
        </Grid>
        <MyBookings openModal={openModal} handleCloseModal={handleCloseModal} />
      </Grid>
      <Grid
        container
        className="header-box mobile"
        justifyContent="space-between"
      >
        <Grid item>
          <Link to="/home">
            <img src={logoMain} alt="BusBooking" className="header-logo" />
          </Link>
        </Grid>

        <Grid item>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon style={{ color: "#c99a3c",fontSize:"40px" }} />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
