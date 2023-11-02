import React, { useEffect,useState } from 'react'
import PropTypes from "prop-types";
// MUI
import Grid from "@mui/material/Grid"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Redux
import { useDispatch, useSelector } from "react-redux";
// API
import { myBookings } from "../../../Redux/userReducer";
import { cancelUserBooking } from "../../../Redux/userReducer";
// React Icons
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { ImWarning } from "react-icons/im";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }} style={{ paddingBottom: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  

const Bookings = () => {
    const bookingData = useSelector(
        (state) => state?.userReducer?.myBooking?.data
      );
      console.log(bookingData)
      const dispatch = useDispatch();
      const [value, setValue] = React.useState(0);
      const[alertCancelBooking,setAlertCancelBooking]=useState(false);
      const [newColor, setNewColor] = React.useState(false);
      const[bookingId,setBookingId]=useState();
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const upcomingBookings = bookingData?.upcomingBookings;
      const pastBookings = bookingData?.pastBookings;
    
      console.log("pastBookings", pastBookings);
      console.log("upcomingBookings", upcomingBookings);
      const toggleSeat = (event) => {
        var selectedId = event.currentTarget.id;
    
        var getElement = document.getElementById(selectedId).style;
    
        if (!newColor) {
          getElement.backgroundColor = "#20bf7a";
          setNewColor(true);
        } else {
          getElement.backgroundColor = "#ccc";
    
          setNewColor(false);
        }
      };
    
      const cancelBooking = (id) => {
    
        setAlertCancelBooking(true);
    
        setBookingId(id);
        // Swal.fire({
        //   icon: "warning",
        //   title: "",
        //   text: "You want to cancel Booking?",
        // }).then(() => {
        //   console.log("upcomingBookingsID", id);
        // });
      };
    
      const yesClicked=()=>{
    
        dispatch(cancelUserBooking(bookingId))
    
      }
    
      useEffect(() => {
        dispatch(myBookings());
      }, []);
    
  return (
    <Grid container>
        <Grid item xs={12} align="center">
            <h1 className="bookings-title">My Bookings</h1>
        </Grid>
        <Grid item xs={12} marginTop="40px">
            <>
              <Grid item xs={12} align="center" display="flex" justifyContent="center">
                  <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      
                  >
                      <Tab label="Upcoming Bookings" {...a11yProps(0)} style={{margin:'0 20px'}} />
                      <Tab label="Past Bookings" {...a11yProps(1)} style={{margin:'0 20px'}} />
                  </Tabs>
                </Grid>
                <TabPanel value={value} index={0}>
                  <Grid container className="pastContainer" justifyContent="center">
                    {/* {upcomingBookings != undefined &&
                        upcomingBookings.map((item, index) => ( */}
                        <Grid
                            item
                            lg={8}
                            xs={11}
                            className="pastBooking"
                            display="flex"
                            justifyContent="space-around"
                            flexDirection="row"
                        >
                          <table className="table-booking">
                            <tbody>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Booking ID</p>
                                </td>
                                <td>
                                  <p className="table-list-value">323</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Date Of Booking</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23 April 2023</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Ticket Number</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23342334</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Number of Seats</p>
                                </td>
                                <td>
                                  <p className="table-list-value">2</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table className="table-booking">
                            <tbody>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Departure time</p>
                                </td>
                                <td>
                                  <p className="table-list-value">7:48 pm</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Amount Paid</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23902</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Booking amount paid</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23902</p>
                                </td>
                              </tr>
                              <Grid item xs={12} align="center" style={{margin:'15px 0'}}>
                                <div style={{width:'100%', display:'flex'}}>
                                  <span className="title-table-booking">
                                    Multan
                                    <p>23</p>
                                  </span>
                                  <span style={{margin:'0 15px', alignSelf: 'center'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="18" viewBox="0 0 56 18" fill="none">
                                      <path d="M56 9L41 0.339746V17.6603L56 9ZM0 10.5H42.5V7.5H0V10.5Z" fill="black"/>
                                    </svg>
                                  </span>
                                  <span style={{fontSize:'18px', marginTop:'3px'}}>
                                    Lahore
                                    <p style={{marginTop:'5px'}}>32</p>
                                  </span>
                                </div>
                              </Grid>
                            </tbody>
                          </table>

                          {/* <Grid item className="busDetails"> */}
                            {/* <p className="Name"> */}
                              {/* {item.email} */}
                              {/* abdullah@gmail.com */}
                            {/* </p> */}
                            {/* <p className="operator">Parveen Travels</p> */}
                            {/* <p className="operator">Number of Seats */}
                             {/* {item.noOfSeats} */}
                             {/* 2
                            </p> */}

                            {/* <Grid
                              item
                              xs={12}
                              className="detailsWrap"
                              display="flex"
                              flexDirection="row"
                            > */}
                              {/* <Grid item className="departureDetails">
                                <p className="departurePlace"> */}
                                  {/* {item.busId.routeFrom} */}
                                  {/* Multan */}
                                {/* </p>
                                <p className="departureTime"> */}
                                    {/* {item.busId.departureTime} */}
                                    {/* 22:04 */}
                                {/* </p>
                              </Grid>
                              <Grid item className="arrowIcon">
                                <ArrowRightAltIcon />
                              </Grid> */}
                              {/* <Grid item className="arrivalDetails">
                                <p className="departurePlace"> */}
                                  {/* {item.busId.routeTo} */}
                                  {/* Faislabad
                                </p>
                                <p className="departureTime"> */}
                                  {/* {item.busId.arrivalTime} */}
                                  {/* 12:56
                                </p>
                              </Grid> */}
                            {/* </Grid> */}
                            {/* </Grid> */}
                            {/* <Grid item className="price"> */}
                              {/* {item.busId.price} */}
                              {/* 200
                            </Grid> */}
                            {/* {item.bookingStatus ? */}
                              {/* <div> */}
                                {/* {item.bookingStatus} */}
                                {/* Fulfilled */}
                              {/* </div> */}
                              {/* :  */}
                              {/* <div
                            className="cancelBtn"
                            // onClick={() => cancelBooking(item._id)}
                            >
                            Cancel Booking
                            </div> */}
                            {/* } */}
                        {/* </Grid> */}
                        {/* ))} */}
                
                    {/* </Grid> */}
                    </Grid>
                    </Grid>
                    {alertCancelBooking && <div className="alertBoxCancelBooking">
                        <ImWarning className="warningIcon" />
                        <p>You want to cancel Booking?</p>
                        <div className="topYesNO">
                        <p className="noTxtAlert" onClick={()=>setAlertCancelBooking(!alertCancelBooking)}>No</p>
                        <p className="yesTxtAlert" onClick={yesClicked}>Yes</p>
                        </div>
                    </div>

                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* Just use pastBookings instead of upcomingBookings rest is same */}
                    <Grid container className="pastContainer" justifyContent="center">
                    {/* {upcomingBookings != undefined &&
                        upcomingBookings.map((item, index) => ( */}
                        <Grid
                            item
                            lg={8}
                            xs={11}
                            className="pastBooking"
                            display="flex"
                            justifyContent="space-around"
                            flexDirection="row"
                        >
                          <table className="table-booking">
                            <tbody>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Booking ID</p>
                                </td>
                                <td>
                                  <p className="table-list-value">323</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Date Of Booking</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23 April 2023</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Ticket Number</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23342334</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Number of Seats</p>
                                </td>
                                <td>
                                  <p className="table-list-value">2</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table className="table-booking">
                            <tbody>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Departure time</p>
                                </td>
                                <td>
                                  <p className="table-list-value">7:48 pm</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Amount Paid</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23902</p>
                                </td>
                              </tr>
                              <tr className="table-row-booking">
                                <td>
                                  <p className="title-table-booking">Booking amount paid</p>
                                </td>
                                <td>
                                  <p className="table-list-value">23902</p>
                                </td>
                              </tr>
                              <Grid item xs={12} align="center">
                                <div style={{width:'100%', display:'flex', marginTop:'10px'}}>
                                  <span className="title-table-booking">
                                    Multan
                                    <p>23</p>
                                  </span>
                                  <span style={{margin:'0 15px', alignSelf: 'center'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="18" viewBox="0 0 56 18" fill="none">
                                      <path d="M56 9L41 0.339746V17.6603L56 9ZM0 10.5H42.5V7.5H0V10.5Z" fill="black"/>
                                    </svg>
                                  </span>
                                  <span style={{fontSize:'18px', marginTop:'3px'}}>
                                    Lahore
                                    <p style={{marginTop:'5px'}}>32</p>
                                  </span>
                                </div>
                              </Grid>
                            </tbody>
                          </table>

                          {/* <Grid item className="busDetails"> */}
                            {/* <p className="Name"> */}
                              {/* {item.email} */}
                              {/* abdullah@gmail.com */}
                            {/* </p> */}
                            {/* <p className="operator">Parveen Travels</p> */}
                            {/* <p className="operator">Number of Seats */}
                             {/* {item.noOfSeats} */}
                             {/* 2
                            </p> */}

                            {/* <Grid
                              item
                              xs={12}
                              className="detailsWrap"
                              display="flex"
                              flexDirection="row"
                            > */}
                              {/* <Grid item className="departureDetails">
                                <p className="departurePlace"> */}
                                  {/* {item.busId.routeFrom} */}
                                  {/* Multan */}
                                {/* </p>
                                <p className="departureTime"> */}
                                    {/* {item.busId.departureTime} */}
                                    {/* 22:04 */}
                                {/* </p>
                              </Grid>
                              <Grid item className="arrowIcon">
                                <ArrowRightAltIcon />
                              </Grid> */}
                              {/* <Grid item className="arrivalDetails">
                                <p className="departurePlace"> */}
                                  {/* {item.busId.routeTo} */}
                                  {/* Faislabad
                                </p>
                                <p className="departureTime"> */}
                                  {/* {item.busId.arrivalTime} */}
                                  {/* 12:56
                                </p>
                              </Grid> */}
                            {/* </Grid> */}
                            {/* </Grid> */}
                            {/* <Grid item className="price"> */}
                              {/* {item.busId.price} */}
                              {/* 200
                            </Grid> */}
                            {/* {item.bookingStatus ? */}
                              {/* <div> */}
                                {/* {item.bookingStatus} */}
                                {/* Fulfilled */}
                              {/* </div> */}
                              {/* :  */}
                              {/* <div
                            className="cancelBtn"
                            // onClick={() => cancelBooking(item._id)}
                            >
                            Cancel Booking
                            </div> */}
                            {/* } */}
                        {/* </Grid> */}
                        {/* ))} */}
                
                    {/* </Grid> */}
                    </Grid>
                    </Grid>
                </TabPanel>
            </>
        </Grid>
    </Grid>
    

  )
}

export default Bookings