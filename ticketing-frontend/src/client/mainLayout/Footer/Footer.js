import React from 'react';
import Grid from '@mui/material/Grid';
//icons
import AppleIcon from '@mui/icons-material/Apple';
import {IoLogoGooglePlaystore} from 'react-icons/io5'
//styles
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <>
            {/* Desktop */}
            <Grid container className="FooterWrapper">
                <Grid container xl={9} lg={9} md={10} sm={11} xs={11} className="FooterSubWrap">
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className="LinksWrapper">
                        <p className="Header">Company</p>
                        <Grid item className="LinksNav">
                            <p className="LinksFooter">Home</p>
                            <p className="LinksFooter">About</p>
                            <p className="LinksFooter">Support</p>
                            <p className="LinksFooter">Reviews</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className="LinksWrapper">
                        <p className="Header">About</p>
                        <Grid item className="LinksNav">
                            <p className="LinksFooter">About Us</p>
                            <p className="LinksFooter">Find us</p>
                            {/* <p className="LinksFooter">Find A Therapist</p> */}
                        </Grid>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className="LinksWrapper">
                        <p className="Header">My Account</p>
                        <Grid item className="LinksNav">
                            <p className="LinksFooter">My Bookings</p>
                            <p className="LinksFooter">Past Transactions</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className="LinksWrapper">
                        <p className="Header">Information</p>
                        <Grid item className="LinksNav">
                        <Link
            to="/client/terms-and-policy"
            style={{ textDecoration: "none", color: "#0c2f54" }}
          >
           <p className="LinksFooter">Terms & Conditions</p>
           
          </Link>
                           
                            <p className="LinksFooter">Privacy Policy</p>
                        </Grid>
                    </Grid>
                    {/* <Grid item className="LinksWrapper">
                        <p className="Header">Company</p>
                        <Grid item className="LinksNav">
                            <p className="LinksFooter">Home</p>
                            <p className="LinksFooter">Business</p>
                            <p className="LinksFooter">About</p>
                            <p className="LinksFooter">FAQ</p>
                            <p className="LinksFooter">Reviews</p>
                        </Grid>
                    </Grid> */}
                </Grid>
                <Grid align="center" item xs={12} className="horizontalLineWrapper">
                    <div className="HorizontalLine" />
                </Grid>
                <Grid container xs={12} className="buttonContainer">
                    <Grid item xs={12} className="label" align="center">
                        <p className='footerLabel'>© 2022 Bus Agency</p>    
                    </Grid>                    
                </Grid>
            </Grid>
            
        </>
    )
}

export default Footer;