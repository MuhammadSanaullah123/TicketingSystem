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
    NoOfpassengers: "1",
    phone: "",
    email: "",
    price: trip?.price,
    seats: [],
    passengers: [
      {
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dob: null,
        passportNumber: "",
        country: "",
        image: null,
      },
    ],
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

  const handleBookingData = (e, index) => {
    const { name, value } = e.target;

    // If the field belongs to a passenger, update that passenger's details
    if (
      name === "firstName" ||
      name === "middleName" ||
      name === "lastName" ||
      name === "gender" ||
      name === "passportNumber" ||
      name === "country"
    ) {
      const updatedPassengers = [...bookingData.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value,
      };

      setBookingData({
        ...bookingData,
        passengers: updatedPassengers,
      });
    } else if (name === "dob") {
      // If the field is date of birth, handle it differently
      const updatedPassengers = [...bookingData.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        dob: value, // assuming the DatePicker component directly passes the date string
      };

      setBookingData({
        ...bookingData,
        passengers: updatedPassengers,
      });
    } else if (name === "image") {
      // If the field is an image, handle it differently
      const updatedPassengers = [...bookingData.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        image: e.target.value,
      };

      setBookingData({
        ...bookingData,
        passengers: updatedPassengers,
      });
    } else {
      // If the field is not related to a specific passenger, update the main state
      setBookingData({
        ...bookingData,
        [name]: value,
      });
    }
  };
  console.log("bookingDatabookingDatabookingDatabookingData");
  console.log(bookingData);

  const handleSubmit = async () => {
    let image_url_arr = [];
    for (let i = 0; i < bookingData.passengers.length; i++) {
      const dataForm = new FormData();
      dataForm.append("file", bookingData.passengers[i].image);
      dataForm.append("upload_preset", "u928wexc");
      dataForm.append("cloud_name", "dihkvficg");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dihkvficg/image/upload",
        {
          method: "post",
          body: dataForm,
        }
      );

      const resData = await res.json();
      const image_url = resData.url;
      image_url_arr.push(image_url);
    }

    const updatedPassengers = bookingData.passengers.map(
      (passenger, index) => ({
        ...passenger,
        image: image_url_arr[index],
      })
    );
    console.log(
      "updatedPassengersupdatedPassengersupdatedPassengersupdatedPassengers"
    );
    console.log(updatedPassengers);

    setBookingData({
      ...bookingData,
      passengers: updatedPassengers,
    });

    let tempSeatSelection = seatSelected.map((seat) => seat.value);
    let seatsSelectedTemp = tempSeatSelection.map((seat) => parseInt(seat, 10));

    let bookingObj = {
      tripId: bookingData.tripId,
      NoOfpassengers: bookingData.NoOfpassengers,
      phone: bookingData.tripId,
      noOfSeats: seatSelected.length,
      email: bookingData.email,
      price: parseInt(bookingData.price, 10),
      seats: seatsSelectedTemp,
      passengerDetails: updatedPassengers,
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
  useEffect(() => {
    if (trip?.price) {
      setBookingData({ ...bookingData, price: trip?.price });
    }
  }, [trip]);

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
              <LabelArea label="Select a Trip" />
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
                      let type = trip.type;
                      type = type[0].toUpperCase() + type.slice(1, type.length);
                      return (
                        <option key={index} value={trip._id}>
                          {trip.routeFrom} to {trip.routeTo} <br />
                          {formattedDepartureDate} - {formattedArrivalDate}{" "}
                          {`(${type})`}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Number of passengers" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="NoOfpassengers"
                  name="NoOfpassengers"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="Number of passengers"
                  // defaultValue={tripData?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Mobile Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="Mobile Number"
                  name="phone"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="Mobile Number"
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
                  defaultValue={bookingData.price}
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

            {Array(
              parseInt(
                bookingData.NoOfpassengers ? bookingData.NoOfpassengers : "1"
              )
            )
              .fill(true)
              .map((item, index) => {
                return (
                  <>
                    <h5 style={{ marginBottom: "20px" }}>
                      Passenger {index + 1} Details
                    </h5>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="First Name" />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required="false"
                          label="firstName"
                          name="firstName"
                          onChange={(e) => handleBookingData(e, index)}
                          type="text"
                          placeholder="First Name"
                          // defaultValue={tripData?.price}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Middle Name" />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required="false"
                          label="middleName"
                          name="middleName"
                          onChange={(e) => handleBookingData(e, index)}
                          type="text"
                          placeholder="Middle Name"
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
                          onChange={(e) => handleBookingData(e, index)}
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
                          onChange={(e) => handleBookingData(e, index)}
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
                          /*  onChange={setDateOfBirth} */
                          /*     name="dob" */
                          onChange={(date) =>
                            handleBookingData(
                              { target: { name: "dob", value: date } },
                              index
                            )
                          }
                          value={
                            bookingData.passengers[index]
                              ? bookingData.passengers[index].dob
                              : null
                          }
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
                          onChange={(e) => handleBookingData(e, index)}
                          type="number"
                          placeholder="Passport Number"
                          // defaultValue={tripData?.price}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Nationality" />
                      <div className="col-span-8 sm:col-span-4">
                        <select
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                          name="country"
                          onChange={(e) => handleBookingData(e, index)}
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
                      <LabelArea label="Upload copy of Passport" />
                      <div className="col-span-8 sm:col-span-4">
                        <input
                          id="file-uploader"
                          style={{ display: "block" }}
                          type="file"
                          name="image"
                          onChange={(e) =>
                            handleBookingData(
                              {
                                target: {
                                  name: "image",
                                  value: e.target.files[0],
                                },
                              },
                              index
                            )
                          }
                        />
                      </div>
                    </div>
                  </>
                );
              })}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Additional Details" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required="false"
                  label="additonalDetails"
                  name="additionalDetails"
                  onChange={(e) => handleBookingData(e)}
                  type="text"
                  placeholder="Additional Details"
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
