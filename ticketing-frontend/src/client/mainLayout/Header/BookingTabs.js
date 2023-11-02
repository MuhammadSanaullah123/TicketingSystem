import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myBookings } from "../../../Redux/userReducer";
import { onConfirm } from "react-confirm-pro";
import { ImWarning } from "react-icons/im";

//scss
import Swal from "sweetalert2";
import "./BookingTabs.scss";
//mui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//icons
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { cancelUserBooking } from "../../../Redux/userReducer";

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

const BasicTabs = () => {
  const bookingData = useSelector(
    (state) => state?.userReducer?.myBooking?.data
  );
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [alertCancelBooking, setAlertCancelBooking] = useState(false);
  const [newColor, setNewColor] = React.useState(false);
  const [bookingId, setBookingId] = useState();
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

  const yesClicked = () => {
    dispatch(cancelUserBooking(bookingId));
  };

  useEffect(() => {
    dispatch(myBookings());
  }, []);

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Upcoming Bookings" {...a11yProps(0)} />
        <Tab label="Past Bookings" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid item xs={12} className="pastContainer">
          {upcomingBookings != undefined &&
            upcomingBookings.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                className="pastBooking"
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Grid item className="busDetails">
                  <p className="Name">{item.email}</p>
                  {/* <p className="operator">Parveen Travels</p> */}
                  <p className="operator">Number of Seats {item.noOfSeats}</p>

                  <Grid
                    item
                    xs={12}
                    className="detailsWrap"
                    display="flex"
                    flexDirection="row"
                  >
                    <Grid item className="departureDetails">
                      <p className="departurePlace">{item.busId.routeFrom}</p>
                      <p className="departureTime">
                        {item.busId.departureTime}
                      </p>
                    </Grid>
                    <Grid item className="arrowIcon">
                      <ArrowRightAltIcon />
                    </Grid>
                    <Grid item className="arrivalDetails">
                      <p className="departurePlace">{item.busId.routeTo}</p>
                      <p className="departureTime">{item.busId.arrivalTime}</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="price">
                  {item.busId.price}
                </Grid>
                {item.bookingStatus ? (
                  <div>{item.bookingStatus}</div>
                ) : (
                  <div
                    className="cancelBtn"
                    onClick={() => cancelBooking(item._id)}
                  >
                    Cancel Booking
                  </div>
                )}
              </Grid>
            ))}
        </Grid>
        {alertCancelBooking && (
          <div className="alertBoxCancelBooking">
            <ImWarning className="warningIcon" />
            <p>You want to cancel Booking?</p>
            <div className="topYesNO">
              <p
                className="noTxtAlert"
                onClick={() => setAlertCancelBooking(!alertCancelBooking)}
              >
                No
              </p>
              <p className="yesTxtAlert" onClick={yesClicked}>
                Yes
              </p>
            </div>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item xs={12} className="pastContainer">
          {pastBookings != undefined &&
            pastBookings.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                className="pastBooking"
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Grid item className="busDetails">
                  <p className="Name">{item.email}</p>
                  {/* <p className="operator">Parveen Travels</p> */}
                  <p className="operator">Number of Seats {item.noOfSeats}</p>

                  <Grid
                    item
                    xs={12}
                    className="detailsWrap"
                    display="flex"
                    flexDirection="row"
                  >
                    <Grid item className="departureDetails">
                      <p className="departurePlace">{item.busId.routeFrom}</p>
                      <p className="departureTime">
                        {item.busId.departureTime}
                      </p>
                    </Grid>
                    <Grid item className="arrowIcon">
                      <ArrowRightAltIcon />
                    </Grid>
                    <Grid item className="arrivalDetails">
                      <p className="departurePlace">{item.busId.routeTo}</p>
                      <p className="departureTime">{item.busId.arrivalTime}</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="price">
                  {item.busId.price}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </TabPanel>
    </>
  );
};
export default BasicTabs;
