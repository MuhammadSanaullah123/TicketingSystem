import React, { useState } from "react";
import "./Header2.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import MyBookings from "./MyBookings";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import logo from "./../../../assets/backgroundLogo.png";
import logoMain from "./../../../assets/logoMain.png";
import Accordion from "react-bootstrap/Accordion";
import Cookies from "universal-cookie";
import "tippy.js/dist/tippy.css";
import { sendSearchData } from "../../../Redux/userReducer";
import { Link } from "react-router-dom";
import { bookingBySearch } from "../../../Redux/userReducer";
import { logout } from "../../../Redux/userReducer";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux/es/exports";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";

const Header2 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);
  const cookies = new Cookies();
  const [searchTxt, setSearchTxt] = useState(0);

  const isLogin = cookies.get("auth");

  const [navBarFixed, setNavBarFixed] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const logoutClicked = (e) => {
    //  dispatch(logout());

    Swal.fire({
      icon: "warning",
      title: "",
      text: "You want to SignOut!",
    }).then((data) => {
      // localStorage.clear();
      // cookies.clear();
      if (data) {
        window.location.assign("/client/bus-listing2/home");
        // navigate("/")
        var allCookies = document.cookie.split(";");
        for (var i = 0; i < allCookies.length; i++)
          document.cookie =
            allCookies[i] + "=;expires=" + new Date(0).toUTCString();
      }
    });
  };

  console.log("searchTxt", searchTxt);

  const ticketSearchClicked = async () => {
    const date = {
      id: searchTxt,
    };

    console.log("datedatedatedate", date);
    const response = await dispatch(bookingBySearch(date));

    console.log("responseSearchTicket", response.payload.data.success);
    if (response.payload.data.success) {
      history.push("/client/ticket");
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavBarFixed(true);
    } else {
      setNavBarFixed(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <>
      <Navbar
        fixed={"top"}
        className={navBarFixed == true ? "navbarWebScroll" : "navbarWeb"}
        bg="none"
        expand="lg"
      >
        {navBarFixed === false && !isLogin && (
          <div className="topBarOverNav">
            <div className="topSearchTicket">
              <input
                type="number"
                name="search"
                className="searchBarTicket"
                onChange={(e) => setSearchTxt(e.target.value)}
                placeholder="Search Ticket"
              />
              <div className="searchTxtTicket" onClick={ticketSearchClicked}>
                {" "}
                Search
              </div>
            </div>
            <FiLogIn className="loginIcon" />
            <Link to="/client/login" style={{ color: "unset" }}>
              {" "}
              <div className="loginTxtTop">Login</div>
            </Link>
          </div>
        )}

        {isLogin && !navBarFixed && (
          <div className="topBarOverNav">
            <div className="topSearchTicket">
              <input
                name="search"
                type="number"
                className="searchBarTicket"
                onChange={(e) => setSearchTxt(e.target.value)}
                placeholder="Search Ticket"
              />
              <div className="searchTxtTicket" onClick={ticketSearchClicked}>
                {" "}
                Search
              </div>
            </div>
            <FiLogIn className="loginIcon" />
            <div className="loginTxtTop" onClick={logoutClicked}>
              Logout
            </div>
          </div>
        )}

        <Container fluid>
          <Navbar.Brand>
            <div
              className={
                navBarFixed == true ? "imgHeaderLogMainScroll" : "topHeaderImgs"
              }
            >
              {/* <img className={navBarFixed==true?"imgHeaderLogo":""} src={logo}/> */}
              <Link to="/client/bus-listing2/home">
                <img
                  className={
                    navBarFixed == true
                      ? "imgHeaderLogMain1"
                      : "imgHeaderLogMain"
                  }
                  src={logoMain}
                />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              style={{ maxHeight: "100px" }}
              navbarScroll
              className={navBarFixed == true ? "navMainScroll" : ""}
            >
              <Nav.Link>
                <Tippy
                  interactive={true}
                  placement="bottom"
                  className="tippyServiceWeb"
                  content={
                    <div className="mainContainerContentTippy">
                      <Link
                        to="/client/bus-listing2/home"
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
                  }
                >
                  <div
                    className={
                      navBarFixed == true
                        ? "serviceTxtIconTop1"
                        : "serviceTxtIconTop"
                    }
                  >
                    <button>All Services</button>

                    <IoMdArrowDropdown style={{ fontSize: "35px" }} />
                    {/* )} */}
                  </div>
                </Tippy>
              </Nav.Link>
              <Nav.Link>
                <Link to="/client/about" style={{ color: "unset" }}>
                  About US
                </Link>
              </Nav.Link>
              <Nav.Link onClick={handleOpenModal}>My Bookings</Nav.Link>
              {/* <Nav.Link href="#action2">Balance:$100</Nav.Link> */}
              {/* <Nav.Link href="#action2">Login</Nav.Link> */}
              {isLogin && (
                <Nav.Link>
                  <Link to="/client/edit-profile" style={{ color: "unset" }}>
                    Edit Profile
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <MyBookings openModal={openModal} handleCloseModal={handleCloseModal} />
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          fixed="top"
          bg="none"
          expand={expand}
          className="mb-3 offCanvasNav"
        >
          <Container fluid>
            <Navbar.Brand>
              <img className="logoMainOffCanvas" src={logoMain} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header style={{ textDecoration: "none" }}>
                          Services
                        </Accordion.Header>
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
                  </Nav.Link>
                  <Nav.Link href="#action2">About US</Nav.Link>
                  <Nav.Link href="#action2">My Bookings</Nav.Link>
                  <Nav.Link href="#action2">Balance:$100</Nav.Link>
                  <Nav.Link href="#action2">Login</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header2;
