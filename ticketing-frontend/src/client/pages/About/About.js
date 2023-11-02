import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
//scss
import "./About.scss";
//mui
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//icons
import AddTaskIcon from "@mui/icons-material/AddTask";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  FaRoad,
  FaDollarSign,
  FaPercentage,
  FaSearch,
  FaLock,
} from "react-icons/fa";

//assets
import busPromo from "../../assets/sadaat.png";

const About = () => {
  return (
    <>
      <Grid container className="AboutWrapper topAboutForBorder" >
        <Grid
          item
          xs={12}
          className="AboutContainer"
          display="flex"
          justifyContent="center"
        >
          <Grid item xs={11} className="bgGrey ">
            <Grid item xs={12} className="descWrap">
              <p className="heading">What is [Company]?</p>
              <p className="desc">
                Instant Online recharge and Bill Payments Iisque persius
                interesset his et, in quot quidam persequeris vim, ad mea essent
                possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius
                an, eu nec
              </p>
              <p className="desc">
                Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis
                volumus mentitum. Alienum pertinacia maiestatis ne eum, verear
                persequeris et vim. Mea cu dicit voluptua efficiantur, nullam
                labitur veritus sit cu. Eum denique omittantur te, in justo
                epicurei his, eu mei aeque populo. Cu pro facer sententiae, ne
                brute graece scripta duo. No placerat quaerendum nec, pri alia
              </p>
            </Grid>
            <Grid container className="advantages">
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="container"
                display="flex"
                sx={{ margin: "20px 0" }}
              >
                <Grid item xs={2} align="center" className="iconContainer">
                  <AddTaskIcon style={{ color: "black", fontSize: "40px" }} />
                </Grid>
                <Grid item xs={10} className="description">
                  <p className="heading">Why choose Us</p>
                  <p className="desc">
                    Lisque persius interesset his et, in quot quidam persequeris
                    vim, ad mea essent possim iriure.
                  </p>
                </Grid>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="container"
                display="flex"
                sx={{ margin: "20px 0" }}
              >
                <Grid item xs={2} align="center" className="iconContainer">
                  <SendIcon style={{ color: "black", fontSize: "40px" }} />
                </Grid>
                <Grid item xs={10} className="description">
                  <p className="heading">Our Mission</p>
                  <p className="desc">
                    Lisque persius interesset his et, in quot quidam persequeris
                    vim, ad mea essent possim iriure.
                  </p>
                </Grid>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="container"
                display="flex"
                sx={{ margin: "20px 0" }}
              >
                <Grid item xs={2} align="center" className="iconContainer">
                  <RemoveRedEyeIcon
                    style={{ color: "black", fontSize: "40px" }}
                  />
                </Grid>
                <Grid item xs={10} className="description">
                  <p className="heading">Our Vision</p>
                  <p className="desc">
                    Lisque persius interesset his et, in quot quidam persequeris
                    vim, ad mea essent possim iriure.
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: "50px" }}>
              <p className="heading">Leadership</p>
            </Grid>
            <Grid
              item
              className="leadershipContainer"
              justifyContent="space-between"
            >
              <Grid
                container
                className="leadWrap"
                justifyContent="space-between"
                align="center"
              >
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={12}
                  xs={12}
                  className="partners"
                  sx={{ margin: "20px 0" }}
                  align="center"
                >
                  <img
                    src="http://demo.harnishdesign.net/html/quickai/images/team/leader.jpg"
                    alt=""
                    className="imgLead"
                    width="170px"
                  />
                  <p className="heading">Neil Patel</p>
                  <p className="desc">CEO & Founder</p>
                  <Grid
                    item
                    xs={12}
                    className="icons"
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <FacebookIcon
                      style={{ fontSize: "25px", color: "#3B5998" }}
                    />
                    <GoogleIcon
                      style={{ fontSize: "25px", color: "#DD4B39" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={12}
                  xs={12}
                  className="partners"
                  sx={{ margin: "20px 0" }}
                >
                  <img
                    src="http://demo.harnishdesign.net/html/quickai/images/team/leader.jpg"
                    alt=""
                    className="imgLead"
                    width="170px"
                  />
                  <p className="heading">James Maxwell</p>
                  <p className="desc">Co-Founder</p>
                  <Grid
                    item
                    xs={12}
                    className="icons"
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <FacebookIcon
                      style={{ fontSize: "25px", color: "#3B5998" }}
                    />
                    <GoogleIcon
                      style={{ fontSize: "25px", color: "#DD4B39" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={12}
                  xs={12}
                  className="partners"
                  sx={{ margin: "20px 0" }}
                >
                  <img
                    src="http://demo.harnishdesign.net/html/quickai/images/team/leader-3.jpg"
                    alt=""
                    className="imgLead"
                    width="170px"
                  />
                  <p className="heading">Ruby Clinton</p>
                  <p className="desc">Co-Founder</p>
                  <Grid
                    item
                    xs={12}
                    className="icons"
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <FacebookIcon
                      style={{ fontSize: "25px", color: "#3B5998" }}
                    />
                    <GoogleIcon
                      style={{ fontSize: "25px", color: "#DD4B39" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={12}
                  xs={12}
                  className="partners"
                  sx={{ margin: "20px 0" }}
                >
                  <img
                    src="http://demo.harnishdesign.net/html/quickai/images/team/leader-4.jpg"
                    alt=""
                    className="imgLead"
                    width="170px"
                  />
                  <p className="heading">Mike Sheth</p>
                  <p className="desc">Support</p>
                  <Grid
                    item
                    xs={12}
                    className="icons"
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <FacebookIcon
                      style={{ fontSize: "25px", color: "#3B5998" }}
                    />
                    <GoogleIcon
                      style={{ fontSize: "25px", color: "#DD4B39" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className="belowSection">
              <Grid item xs={11} className="lastSectionWrapper">
                <Grid container className="aboveFooter" align="center">
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    className="Card cardAbout"
                    sx={{ margin: "20px 0" }}
                  >
                    <Grid item xs={12} className="icon" align="center">
                      <FaLock style={{ color: "#c99a3c", fontSize: "30px" }} />
                    </Grid>
                    <Grid item xs={12} className="content">
                      <h5 className="heading headingAboutSecure">100% Secure Payments</h5>
                      <p className="desc">
                        Moving your card details to a much more secured place.
                      </p>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    className="Card cardAbout"
                    sx={{ margin: "20px 0" }}
                  >
                    <Grid item xs={12} className="icon" align="center">
                      <FaSearch style={{ color: "#c99a3c", fontSize: "30px" }} />
                    </Grid>
                    <Grid item xs={12} className="content">
                      <h5 className="heading headingAboutSecure">Trust Pay</h5>
                      <p className="desc">
                        Moving your card details to a much more secured place.
                      </p>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    className="Card cardAbout"
                    sx={{ margin: "20px 0" }}
                  >
                    <Grid item xs={12} className="icon" align="center">
                      <FaPercentage style={{ color: "#c99a3c", fontSize: "30px" }} />
                    </Grid>
                    <Grid item xs={12} className="content">
                      <h5 className="heading headingAboutSecure">Refer and Earn</h5>
                      <p className="desc">
                        Moving your card details to a much more secured place.
                      </p>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    className="Card cardAbout"
                    sx={{ margin: "20px 0" }}
                  >
                    <Grid item xs={12} className="icon" align="center">
                      <FaRoad style={{ color: "#c99a3c", fontSize: "30px" }} />
                     
                    </Grid>
                    <Grid item xs={12} className="content">
                      <h5 className="heading headingAboutSecure">24X7 Support</h5>
                      <p className="desc">
                        Moving your card details to a much more secured place.
                      </p>
                    </Grid>
                  </Grid>
                 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
