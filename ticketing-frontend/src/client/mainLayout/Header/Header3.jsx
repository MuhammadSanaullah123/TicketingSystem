import React, { useState } from 'react'
import './Header3.css'
import logo from './../../../assets/logoMain.png'
// import { useSelector } from 'react-redux/es/exports';
import { useSelector, useDispatch } from "react-redux";
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav'
// Components
import Signup from "./Signup"
import Signin from "./Signin"
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
// React icons
import { FiLogOut } from "react-icons/fi"
import { AiOutlineSearch } from "react-icons/ai"
// React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

const Header3 = () => {
  const [status, setStatus] = useState('signup')

    const searchedData = useSelector(
      (state) => state?.userReducer?.searchDataH2
    );
    const priceData = useSelector(
      (state) => state?.userReducer?.priceDataH2
    );

    const [navBarFixed, setNavBarFixed] = useState(false);

    const changeBackground = () => { 
      if (window.scrollY >= 80) {
        setNavBarFixed(true);
      } else {
        setNavBarFixed(false);
      }
    };
    
    window.addEventListener("scroll", changeBackground);

    console.log("searchedDatahh",searchedData)
    console.log(status)
    return (
      <>
        <div className='topWebH3'>
          <div className={navBarFixed ? "mainHeader3OnScoll" : 'mainHeader3'}>
            <div className='topLogoHeader3'>
              <Link to="/client/bus-listing2">
                <img src={logo} style={{cursor:"pointer"}} className="logoMainH3Img"/>
              </Link>
            </div>
            <div className="right-header-part">
              <div className="language">
                <p>Choose your language:</p>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-language">
                    English
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Arabic</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Urdu</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">French</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="search-bar">
                <span className="search-icon"><AiOutlineSearch style={{fontSize: '15px'}} /></span>
                <input type="text" placeholder="search..." />
              </div>
              <div className="login-button">
                
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <button className="login-button-inner">
                          <div className="btn-text">Login</div> 
                          <div className="btn-icon">
                            <FiLogOut style={{fontSize:'18px'}}/>
                          </div>
                        </button>
                      </Dropdown.Toggle>
                      <Dropdown.Menu id="dropdown-menu">
                        {status === 'signup' ? 
                          <Signup status={status} setStatusToSignin={() => setStatus('login')} setStatusToSignup={() => setStatus('signup')} /> : 
                          <Signin status={status} setStatusToSignin={() => setStatus('login')} setStatusToSignup={() => setStatus('signup')} />
                        }
                      </Dropdown.Menu>
                    </Dropdown>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <div className='topMobileViewH3'>
        {[false].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3" fixed='top'>
            <Container fluid>
              <Navbar.Brand href="#">
                <Link to="/client/bus-listing2">  
                  <img src={logo} style={{cursor:"pointer"}} className="logoMainH3Img" />
                </Link>
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
                    <div className='topRightLeftH3'>
                      <div className='topPencilH3'>
                        <BsFillPencilFill className='pencilIconH3'/>
                      </div>
                      <div>
                        <p className='destiH3Txt'>{searchedData?.from} to {searchedData?.to}</p>
                        <p className='dateTxtH3'>{searchedData?.date}</p>
                      </div>
                    </div>
                    <div className='totalSpTxt'>NO of Passengers: {priceData?priceData?.passengerNumber:"0"} </div>
                      <div className='topTextPrices'>
                        <span className='totalSpTxt'>Total</span ><span className='totalSpTxt'> SAR</span> <span className='priceTxtH3'>{priceData?priceData?.fareAmount:"0.00"}$</span>
                      </div>
                      <button className='btnContinueH3'>Continue</button>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
          </Container>
        </Navbar>
        ))}
      </div>
    
    </>
  )
}

export default Header3