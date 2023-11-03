import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-date-picker";
import Scrollbars from "react-custom-scrollbars";

import Select from "react-select";
import { Textarea, Button } from "@windmill/react-ui";
import { MultiSelect } from "react-multi-select-component";
// CSS
import "./productDrawer.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
// Components
import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import SelectOption from "../form/SelectOption";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
// Context
import { SidebarContext } from "../../context/SidebarContext";
import useProductSubmit from "../../hooks/useProductSubmit";
// API
import { getAllBuses } from "../../../actions/buses";
import { loadAllCustomers } from "../../../actions/auth";
import { getAllTrips, getTripById } from "../../../actions/trips";
import { addBooking } from "../../../actions/bookings";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const Booking = ({
  id,
  buses: { buses },
  auth: { users },
  trips: { allTrips, trip },
  addBooking,
  handleGetAllBookings,
}) => {
  const {
    register,
    watch,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  } = useProductSubmit(id);

  const { toggleDrawer } = useContext(SidebarContext);

  const options = [
    { label: `Wifi 📶`, value: "wifi" },
    { label: `Charging Point 🔋🔌`, value: "charging_point" },
    { label: `Headphones 🎧`, value: "headphones" },
    { label: `Air Conditioner ❄️`, value: "AC" },
    { label: `Medication 🩺`, value: "medical" },
    { label: `Refreshment 🍽️`, value: "food" },
  ];

  const [allBookingData, setAllBookingData] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [selected, setSelected] = useState([]);
  const [seatSelected, setSeatSelected] = useState(null);
  const [seatOptions, setSeatOptions] = useState([]);
  const [bookingData, setBookingData] = useState({
    tripId: "",
    phone: "",
    email: "",
    price: "",
    seats: [],
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    passportNumber: "",
    country: "",
    mobile: "",
    passport: "",
    additionalDetails: "",
  });

  useEffect(() => {
    store.dispatch(getAllBuses());
    store.dispatch(loadAllCustomers());
    store.dispatch(getAllTrips());

    if (bookingData.tripId !== "") {
      store.dispatch(getTripById(bookingData.tripId));
      if (trip != null) {
        let tempOptions = Array.from(
          { length: trip.busId.totalSeats },
          (_, index) => {
            if (!trip.busId.occupiedSeats.includes(index + 1)) {
              return { label: `${index + 1}`, value: `${index + 1}` };
            }
            return null;
          }
        ).filter((option) => option !== null);
        console.log("tempOptions", tempOptions);
        setSeatOptions(tempOptions);
      }
    }
  }, [bookingData.tripId]);

  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
    console.log(bookingData);
  };

  const handleSubmit = () => {
    let tempSeatSelection = seatSelected.map((seat) => seat.value);
    let seatsSelectedTemp = tempSeatSelection.map((seat) => parseInt(seat, 10));

    let bookingObj = {
      tripId: bookingData.tripId,
      phone: bookingData.tripId,
      noOfSeats: seatSelected.length,
      email: bookingData.email,
      price: parseInt(bookingData.price, 10),
      seats: seatsSelectedTemp,
      passengerDetails: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        gender: bookingData.gender,
        dob: dateOfBirth,
        passportNumber: bookingData.passportNumber,
        country: bookingData.country,
        mobile: bookingData.mobile,
        passport: bookingData.passport,
      },
      additionalDetails: bookingData.additionalDetails,
    };
    console.log("bookingObj", bookingObj);
    addBooking(bookingObj);
    handleGetAllBookings();
  };

  const handleGetSeats = () => {
    store.dispatch(getTripById(bookingData.tripId));
    if (trip != null) {
      let tempOptions = Array.from(
        { length: trip.busId.totalSeats },
        (_, index) => {
          if (!trip.busId.occupiedSeats.includes(index + 1)) {
            return { label: `${index + 1}`, value: `${index + 1}` };
          }
          return null;
        }
      ).filter((option) => option !== null);
      console.log("tempOptions", tempOptions);
      setSeatOptions(tempOptions);
    }
  };

  const handleSeatOptionsChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSeatSelected(selectedOptions.map((option) => option));
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
        {id ? (
          <Title
            title="Update Booking"
            description="Update your booking and necessary information from here"
          />
        ) : (
          <Title
            title="Add Booking"
            description="Add your booking and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
        <form className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Trip ID" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  name="tripId"
                  onChange={(e) => handleBookingData(e)}
                >
                  <option value=""></option>
                  {allTrips != null &&
                    allTrips.map((trip, index) => {
                      const departuretimeString = new Date(trip.departureTime);
                      const arrivaltimeString = new Date(trip.arrivalTime);

                      const options = {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      };

                      const formattedDepartureDate =
                        departuretimeString.toLocaleDateString(
                          "en-US",
                          options
                        );
                      const formattedArrivalDate =
                        arrivaltimeString.toLocaleDateString("en-US", options);

                      return (
                        <option key={index} value={trip._id}>
                          {trip.routeFrom} to {trip.routeTo} <br />
                          {formattedDepartureDate} - {formattedArrivalDate}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Phone Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="Phone Number"
                  name="phone"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="Phone Number"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Email" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="Email"
                  name="email"
                  onChange={(e) => handleBookingData(e)}
                  type="email"
                  placeholder="Email"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="Price"
                  name="price"
                  onChange={(e) => handleBookingData(e)}
                  type="number"
                  placeholder="Price"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Select Seats" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  isMulti
                  options={seatOptions}
                  value={seatSelected}
                  onChange={handleSeatOptionsChange}
                  placeholder="Select seats..."
                  onMenuOpen={handleGetSeats}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="First Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="firstName"
                  name="firstName"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="First Name"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Last Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="lastName"
                  name="lastName"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="Last Name"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Gender" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  name="gender"
                  onChange={(e) => handleBookingData(e)}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Date Of Birth" />
              <div className="col-span-8 sm:col-span-4">
                <DatePicker
                  maxDate={new Date()}
                  onChange={setDateOfBirth}
                  value={dateOfBirth}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Passport Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="passportNumber"
                  name="passportNumber"
                  onChange={(e) => handleBookingData(e)}
                  type="number"
                  placeholder="Passport Number"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Country" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  name="country"
                  onChange={(e) => handleBookingData(e)}
                >
                  <option value=""></option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="India">India</option>
                  <option value="Saudia Arabia">Saudia Arabia</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Mobile" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="mobile"
                  name="mobile"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="Mobile Number"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Passport" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="passport"
                  name="passport"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="passport"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Additional Details" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="additonalDetails"
                  name="additionalDetails"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="additional Details"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
          </div>

          {/* <DrawerButton id={id} title="Bus" data={busData} /> */}
          <div className="fixed bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                onClick={toggleDrawer}
                className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 cancelbtnDiv"
                layout="outline"
              >
                Cancel
              </Button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className={`w-full h-12 addbtnDiv`} onClick={handleSubmit}>
                {id ? <span>Update Booking</span> : <span>Add Booking</span>}
              </div>
            </div>
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

Booking.propTypes = {
  addBooking: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buses: state.buses,
  auth: state.auth,
  trips: state.trips,
});

export default connect(mapStateToProps, { addBooking })(Booking);
