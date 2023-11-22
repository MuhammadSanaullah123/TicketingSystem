import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PassengerDetail.css";
import { bookSeats } from "../../../Redux/userReducer";
import { useLocation } from "react-router-dom";
import { Select } from "@windmill/react-ui";
import Cookies from "universal-cookie";
/* import Select from "react-select"; */
import PhoneInput from "react-phone-input-2";
import countryList from "react-select-country-list";
import moment from "moment";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "react-phone-input-2/lib/style.css"; // import the styles

import Swal from "sweetalert2";
import { DatePicker, SelectPicker } from "rsuite";
import { bookSeatsWithoutLogin } from "../../../Redux/userReducer";
import { useDispatch } from "react-redux";
//mui
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";

import { bookingIdStore } from "../../../Redux/userReducer";

import { useHistory } from "react-router-dom";
//icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const PassengerDetail = (props) => {
  const cookies = new Cookies();

  const isLogin = cookies.get("auth");

  const dispatch = useDispatch();

  const receivedData = props.location.state;
  let query = useQuery();
  let tripId = query.get("tripId");
  console.log(tripId);

  console.log("receivedDatareceivedData", isLogin);
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [valid, setValid] = useState();
  const [emailChecker, setEmailChecker] = useState();
  const [selectedNationality, setSelectedNationality] = useState("");
  const [tempDOB, setTempDOB] = useState();
  const [passengerDetail, setPassengerDetail] = useState({
    cCode: "971",
    phone: "",
    email: receivedData ? receivedData?.email : "",
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
  console.log(phone);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetail({ ...passengerDetail, [name]: value });

    if (emailRegex.test(passengerDetail.email)) {
      setEmailChecker(2);
    }
  };
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
      const updatedPassengers = [...passengerDetail.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value,
      };

      setPassengerDetail({
        ...passengerDetail,
        passengers: updatedPassengers,
      });
    } else if (name === "dob") {
      // If the field is date of birth, handle it differently
      const updatedPassengers = [...passengerDetail.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        dob: value, // assuming the DatePicker component directly passes the date string
      };

      setPassengerDetail({
        ...passengerDetail,
        passengers: updatedPassengers,
      });
    } else if (name === "image") {
      const updatedPassengers = [...passengerDetail.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        image: e.target.value,
      };

      setPassengerDetail({
        ...passengerDetail,
        passengers: updatedPassengers,
      });
    } else {
      setPassengerDetail({
        ...passengerDetail,
        [name]: value,
      });
    }
  };
  const handleChange1 = (value, name) => {
    setPassengerDetail({ ...passengerDetail, cCode: value.trim() });
  };

  console.log("FormpassengerDetail", passengerDetail);
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("");
  const [imagePassport, setImagePassport] = useState();
  const options = useMemo(() => countryList().getData(), []);

  console.log("countryList", countryList().getData, options);

  const [gender, setGender] = useState();
  const [date, setDateOfBirth] = useState();
  const [country, setCountry] = useState();

  const genderHandleChange = (e) => {
    setGender(e.target.value);
  };
  const dateHandleChange = (newDate) => {
    console.log(newDate);
    setPassengerDetail({ ...passengerDetail, dateOfBirth: newDate });
    // setDateOfBirth(value);
  };

  const changeHandler = (value) => {
    setValue(value);
  };

  const countryHandleChange = (value) => {
    setCountry(value);
  };

  const handleImageChange1 = (e) => {
    // const selected = e.target.files[0];
    const selected = e.target.files[0];

    setImagePassport(selected);
  };

  console.log("gender", gender);
  console.log("date", date);
  console.log("country", country);
  console.log("imagePassport", imagePassport);

  const data = ["Male", "Female"].map((item) => ({ label: item, value: item }));

  const breadcrumbs = [
    <p>BusListing</p>,
    <p>Seat Selection</p>,
    <p>Passenger Detail</p>,
  ];

  console.log("receivedDataData", receivedData);

  let checkVariable = Array.isArray(receivedData?.seats);

  console.log("receivedData?.seats", receivedData?.seats);
  console.log("passengerDetail986", passengerDetail);

  const proceedPaymentClicked = async () => {
    // history.push("/client/checkout");
    if (passengerDetail.email) {
      if (!emailRegex.test(passengerDetail.email)) {
        setEmailChecker(1);
      }
    }

    if (
      passengerDetail.passengers[passengerDetail.passengers.length - 1]
        .firstName &&
      passengerDetail.passengers[passengerDetail.passengers.length - 1]
        .middleName &&
      passengerDetail.passengers[passengerDetail.passengers.length - 1]
        .lastName &&
      passengerDetail.passengers[passengerDetail.passengers.length - 1]
        .gender &&
      passengerDetail.passengers[passengerDetail.passengers.length - 1].dob &&
      /*  passengerDetail.passengers[passengerDetail.passengers.length - 1].image && */
      passengerDetail.passengers[passengerDetail.passengers.length - 1]
        .passportNumber &&
      passengerDetail.phone &&
      passengerDetail.email &&
      passengerDetail.cCode &&
      passengerDetail.passengers[passengerDetail.passengers.length - 1]
        .country &&
      emailRegex.test(passengerDetail.email)
    ) {
      if (isLogin) {
        console.log("INSIDDDDDDDDDDDDDDDDDDDDDE");
        let image_url_arr = [];
        for (let i = 0; i < passengerDetail.passengers.length; i++) {
          const dataForm = new FormData();
          dataForm.append("file", passengerDetail.passengers[i].image);
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

        const updatedPassengers = passengerDetail.passengers.map(
          (passenger, index) => ({
            ...passenger,
            image: image_url_arr[index],
          })
        );
        console.log(
          "updatedPassengersupdatedPassengersupdatedPassengersupdatedPassengers"
        );
        console.log(updatedPassengers);

        setPassengerDetail({
          ...passengerDetail,
          passengers: updatedPassengers,
        });

        console.log("isLoggedIn");
        let numberArraySeats = [];

        let length = receivedData?.seats?.length;

        for (let i = 0; i < length; i++) {
          numberArraySeats.push(parseInt(receivedData.seats[i]));
        }

        console.log("length", length);
        const newNumber =
          passengerDetail.cCode + "" + passengerDetail.mobileNumber;
        const dateBFFinal = moment(passengerDetail.dateOfBirth);

        const formattedDate = dateBFFinal.format("DD/MM/YYYY");
        console.log("formattedDate", formattedDate);
        let passengerDetailForm = [
          {
            firstName: passengerDetail.firstName,
            lastName: passengerDetail.lastName,
            // middleName: passengerDetail.middleName,
            gender: gender,
            dob: passengerDetail.dateOfBirth,
            passportNumber: passengerDetail.passportNumber,
            mobile: newNumber,
          },
        ];

        console.log("passengerDetailForm", passengerDetailForm);

        passengerDetailForm = JSON.stringify(passengerDetailForm);
        let bookingObj = {
          tripId: sessionStorage.getItem("tripId"),
          busId: receivedData?.busId,
          NoOfpassengers: receivedData?.seats.length,
          phone: passengerDetail.phone,
          noOfSeats: receivedData?.noOfSeats,
          email: passengerDetail.email,
          price: receivedData?.price,
          seats: numberArraySeats,
          passengerDetails: updatedPassengers,
        };
        /*  const data = new FormData();
        data.append("tripId", sessionStorage.getItem("tripId"));
        data.append("busId", receivedData.busId);
        data.append("phone", newNumber);
        data.append("noOfSeats", receivedData.noOfSeats);
        data.append("email", receivedData.email);
        data.append("price", receivedData.price);
        data.append("passports", imagePassport);
        data.append("seats", numberArraySeats);
        data.append("passengerDetails", passengerDetailForm);
 */
        const response = await dispatch(bookSeats(bookingObj));
        const bookingId = response?.payload?.data?.bookingId;

        console.log("bookingIdPass", bookingId);
        console.log("responsePass", response);

        dispatch(bookingIdStore(bookingId));

        console.log("response", response?.data?.bookingDetails?._id);
        Swal.fire({
          icon: "success",
          title: "",
          text: "Booking Successful",
        });

        if (response?.payload?.data?._id) {
          history.push("/client/checkout");
        }
      } else {
        console.log("isNotLoggedIn");
        console.log("INSIDDDDDDDDDDDDDDDDDDDDDE noooooooooooooot login");

        let image_url_arr = [];
        for (let i = 0; i < passengerDetail.passengers.length; i++) {
          const dataForm = new FormData();
          dataForm.append("file", passengerDetail.passengers[i].image);
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

        const updatedPassengers = passengerDetail.passengers.map(
          (passenger, index) => ({
            ...passenger,
            image: image_url_arr[index],
          })
        );
        console.log(
          "updatedPassengersupdatedPassengersupdatedPassengersupdatedPassengers"
        );
        console.log(updatedPassengers);

        setPassengerDetail({
          ...passengerDetail,
          passengers: updatedPassengers,
        });

        let numberArraySeats = [];

        let length = receivedData?.seats?.length;

        for (let i = 0; i < length; i++) {
          numberArraySeats.push(parseInt(receivedData.seats[i]));
        }

        console.log("length", length);
        const newNumber =
          passengerDetail.cCode + "" + passengerDetail.mobileNumber;
        const dateBFFinal = moment(passengerDetail.dateOfBirth);

        const formattedDate = dateBFFinal.format("DD/MM/YYYY");
        console.log("formattedDate", formattedDate);

        let passengerDetailForm = [
          {
            firstName: passengerDetail.firstName,
            lastName: passengerDetail.lastName,
            gender: gender,
            dob: formattedDate,
            passportNumber: passengerDetail.passportNumber,
            mobile: newNumber,
          },
        ];

        console.log("passengerDetailForm", passengerDetailForm);

        passengerDetailForm = JSON.stringify(passengerDetailForm);
        /*  const data = new FormData();

        data.append("busId", receivedData.busId);
        data.append("phone", newNumber);
        data.append("noOfSeats", receivedData.noOfSeats);
        data.append("email", passengerDetail.email);
        data.append("price", receivedData.price);
        data.append("passports", imagePassport);
        data.append("seats", receivedData?.seats);
        data.append("passengerDetails", passengerDetailForm);
        data.append("tripId", sessionStorage.getItem("tripId"));

        data.append("additionalDetails", "OtherData"); */
        let bookingObj = {
          tripId: sessionStorage.getItem("tripId"),
          busId: receivedData?.busId,
          NoOfpassengers: receivedData?.seats.length,
          phone: passengerDetail.phone,
          noOfSeats: receivedData?.noOfSeats,
          email: passengerDetail.email,
          price: receivedData?.price,
          seats: numberArraySeats,
          passengerDetails: updatedPassengers,
        };
        console.log("DispassengerDetail.email", passengerDetail.email);
        const response = await dispatch(bookSeatsWithoutLogin(bookingObj));
        const bookingId = response?.payload?.data?.bookingDetails?.bookingId;
        console.log("response", response);
        dispatch(bookingIdStore(bookingId));

        Swal.fire({
          icon: "success",
          title: "",
          text: "Booking Successful",
        });

        if (response?.payload?.data?.bookingDetails?._id) {
          history.push("/client/checkout");
        }
      }
    } else {
      setValid(1);
    }
  };

  const handleBlur = () => {
    // setTimeout(() => {
    //   toRef1.current.focus();
    // }, 0);
  };
  useEffect(() => {
    async function fetchNationalities() {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      const nationalities = data.flatMap((country) => country.demonym);
      setNationalities(nationalities);
    }

    fetchNationalities();
  }, []);

  function handleSelect(event) {
    // setSelectedNationality(event.target.value);
    setPassengerDetail({
      ...passengerDetail,
      selectCountry: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Selected nationality: ${selectedNationality}`);
    // add code to save the selected nationality
  }

  return (
    <>
      <div className="passengerWrapperTop passengerWrapperTopH3">
        <Grid container className="CheckoutWrapper passengerWrapper">
          <Grid
            item
            xs={12}
            className="CheckoutContainer"
            display="flex"
            justifyContent="center"
          >
            <Grid item xs={12} xl={12} className="bgGrey topInneCardPassDet">
              <Grid container>
                <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
                  <Grid item className="title">
                    <p>Passenger Detail</p>
                  </Grid>

                  {/* Breadcrumbs */}
                  <Grid
                    item
                    xs={12}
                    style={{
                      marginBottom: "30px",
                    }}
                  >
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      {breadcrumbs}
                    </Breadcrumbs>
                  </Grid>

                  {Array(parseInt(receivedData?.seats.length))
                    .fill(true)
                    .map((item, index) => {
                      return (
                        <Accordion key={index} className="accordian">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Grid
                              item
                              xs={12}
                              className="heading inputMargins"
                              sx={{
                                margin: "40px 0",
                                fontSize: "2rem",
                                color: "#0c2f54",
                              }}
                            >
                              <p className="passInfoTxt">
                                Passenger {index + 1} Information
                              </p>
                            </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid
                              xs={12}
                              container
                              justifyContent="space-between"
                              className="twoInputs"
                            >
                              <Grid
                                item
                                xs={12}
                                xl={4}
                                md={4}
                                lg={4}
                                sx={{ margin: "20px 0" }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  type="text"
                                  label="First Name"
                                  value={passengerDetail.firstName}
                                  name="firstName"
                                  onChange={(e) => handleBookingData(e, index)}
                                  variant="outlined"
                                  style={{
                                    width: "95%",
                                    margin: "auto",
                                    border:
                                      valid === 1 && !passengerDetail.firstName
                                        ? "1px solid red"
                                        : "",
                                  }}
                                  className="textFieldPassDet"
                                />
                                {valid === 1 && !passengerDetail.firstName && (
                                  <div style={{ color: "red" }}>Required</div>
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                xl={4}
                                md={4}
                                lg={4}
                                sx={{ margin: "20px 0" }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  type="text"
                                  label="Middle Name"
                                  value={passengerDetail.middleName}
                                  name="middleName"
                                  onChange={(e) => handleBookingData(e, index)}
                                  variant="outlined"
                                  style={{ width: "95%", margin: "auto" }}
                                  className="textFieldPassDet"
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                xl={4}
                                lg={4}
                                md={4}
                                sx={{ margin: "20px 0" }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  fullWidth
                                  type="text"
                                  value={passengerDetail.lastName}
                                  name="lastName"
                                  onChange={(e) => handleBookingData(e, index)}
                                  label="Last Name"
                                  variant="outlined"
                                  className="textFieldPassDet"
                                  style={{
                                    width: "95%",
                                    margin: "auto",
                                    border:
                                      valid === 1 && !passengerDetail.lastName
                                        ? "1px solid red"
                                        : "",
                                  }}
                                />
                                {valid === 1 &&
                                  !passengerDetail.passengers[index]
                                    .lastName && (
                                    <div style={{ color: "red" }}>Required</div>
                                  )}
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sx={{ margin: "20px 0" }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  fullWidth
                                  type="text"
                                  value={passengerDetail.email}
                                  name="email"
                                  onChange={(e) =>
                                    setPassengerDetail({
                                      ...passengerDetail,
                                      email: e.target.value,
                                    })
                                  }
                                  label="Enter Email"
                                  variant="outlined"
                                  className="textFieldPassDet"
                                  style={{
                                    width: "98%",
                                    margin: "auto",
                                    border:
                                      valid === 1 && !passengerDetail.email
                                        ? "1px solid red"
                                        : "",
                                  }}
                                />
                                {valid === 1 && !passengerDetail.email && (
                                  <div style={{ color: "red" }}>Required</div>
                                )}
                                {emailChecker === 1 && (
                                  <div style={{ color: "red" }}>
                                    Enter Valid Email
                                  </div>
                                )}
                              </Grid>
                            </Grid>

                            {/* CVV */}
                            <Grid
                              container
                              justifyContent="space-between"
                              className="twoInputs"
                            >
                              <Grid
                                item
                                xs={12}
                                lg={6}
                                md={6}
                                xl={6}
                                sx={{ margin: "20px 0", paddingRight: "10px" }}
                              >
                                {/* <TextField
                    id="outlined-basic"
                    fullWidth
                    type="text"
                    label="Select Gender"
                    variant="outlined"
                    style={{ width: "95%", margin: "auto" }}
                  /> */}
                                {/* <SelectPicker
                      placement="bottom"
                      className="dataePickerInputPasse"
                      placeholder="Select Gender"
                      data={data}
                      onChange={(v) => genderHandleChange(v)}
                      name="gender"
                      // onChange={handleChange}
                      style={{
                        width: "95%",
                        border: valid === 1 && !gender ? "1px solid red" : "",
                      }} 
                    /> */}
                                <Select
                                  className="dataePickerInputPasse genderSelect"
                                  name="gender"
                                  placeholder="Gender"
                                  onChange={(e) => handleBookingData(e, index)}
                                >
                                  <option value="" defaultValue hidden>
                                    Gender
                                  </option>

                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </Select>

                                {valid === 1 &&
                                  !!passengerDetail.passengers[index]
                                    .gender && (
                                    <div style={{ color: "red" }}>Required</div>
                                  )}
                              </Grid>
                              <Grid
                                item
                                align="left"
                                sx={{ margin: "20px 0" }}
                                md={6}
                                lg={6}
                                xs={12}
                                xl={6}
                              >
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
                                    passengerDetail.passengers[index]
                                      ? passengerDetail.passengers[index].dob
                                      : null
                                  }
                                />
                                {valid === 1 &&
                                  !!passengerDetail.passengers[index].dob && (
                                    <div style={{ color: "red" }}>Required</div>
                                  )}
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              justifyContent="space-between"
                              className="twoInputs"
                            >
                              <Grid
                                item
                                xs={12}
                                xl={6}
                                md={6}
                                lg={6}
                                sx={{ margin: "20px 0" }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  type="number"
                                  value={passengerDetail.passportNumber}
                                  name="passportNumber"
                                  onChange={(e) => handleBookingData(e, index)}
                                  fullWidth
                                  label="Passport Number"
                                  variant="outlined"
                                  style={{
                                    width: "95%",
                                    margin: "auto",
                                    border:
                                      valid === 1 &&
                                      !passengerDetail.passportNumber
                                        ? "1px solid red"
                                        : "",
                                  }}
                                  className="textFieldPassDet"
                                />

                                {valid === 1 &&
                                  !!passengerDetail.passengers[index]
                                    .passportNumber && (
                                    <div style={{ color: "red" }}>Required</div>
                                  )}
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                xl={6}
                                md={6}
                                lg={6}
                                sx={{ margin: "20px 0" }}
                              >
                                {/* <TextField
                    id="outlined-basic"
                    fullWidth
                    type="text"
                    label="Select Nationality"
                    variant="outlined"
                    style={{ width: "95%", margin: "auto" }}
                  /> */}
                                <select
                                  id="nationality"
                                  name="country"
                                  value={
                                    passengerDetail.passengers[index].country
                                  }
                                  onChange={(e) => handleBookingData(e, index)}
                                  className="selectNationality"
                                  style={{
                                    border:
                                      valid === 1 &&
                                      !passengerDetail.passportNumber
                                        ? "1px solid red"
                                        : "",
                                  }}
                                >
                                  <option value="" disabled>
                                    --Select Nationality--
                                  </option>
                                  {nationalities.map((nationality, index) => (
                                    <option key={index} value={nationality}>
                                      {nationality}
                                    </option>
                                  ))}
                                </select>
                                {valid === 1 &&
                                  !!passengerDetail.passengers[index]
                                    .country && (
                                    <div style={{ color: "red" }}>Required</div>
                                  )}
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              justifyContent="space-between"
                              className="twoInputs"
                            >
                              <Grid
                                item
                                xs={12}
                                xl={2}
                                md={2}
                                lg={2}
                                sx={{ margin: "20px 0" }}
                              >
                                <PhoneInput
                                  country={"ae"}
                                  enableSearch={true}
                                  value={phone}
                                  onBlur={handleBlur}
                                  // error={error}
                                  onChange={(phone) =>
                                    handleChange1(phone, "cCode")
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                xl={4}
                                md={4}
                                lg={4}
                                sx={{ margin: "20px 0" }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  value={passengerDetail.phone}
                                  name="phone"
                                  onChange={(e) => handleBookingData(e, index)}
                                  type="number"
                                  fullWidth
                                  label="Mobile Number"
                                  variant="outlined"
                                  className="textFieldPassDet"
                                  style={{
                                    width: "95%",
                                    margin: "auto",

                                    border:
                                      valid === 1 && !passengerDetail.phone
                                        ? "1px solid red"
                                        : "",
                                  }}
                                />
                                {valid === 1 && !passengerDetail.phone && (
                                  <div style={{ color: "red" }}>Required</div>
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                xl={6}
                                md={6}
                                lg={6}
                                sx={{ margin: "20px 0" }}
                                alignSelf="center"
                              >
                                <div
                                  className="upload-div"
                                  style={{
                                    width: "95%",
                                  }}
                                >
                                  <p className="title-upload">
                                    Upload copy of the Passport
                                  </p>
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
                                {valid === 1 &&
                                  !passengerDetail.passengers[index].image && (
                                    <div style={{ color: "red" }}>Required</div>
                                  )}
                              </Grid>
                            </Grid>
                            <div className="btnTopPayment">
                              {/* <Link to="/client/checkout"> */}
                              <button
                                style={{
                                  display: `${
                                    index + 1 === receivedData?.seats.length
                                      ? "block"
                                      : "none"
                                  }`,
                                }}
                                className="btnPaymentPassDet"
                                onClick={proceedPaymentClicked}
                              >
                                Submit and Proceed
                              </button>
                              {/* </Link> */}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PassengerDetail;
