import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
// mui
import Grid from "@mui/material/Grid";
// component
import CitiesData from "./cities.json";
import Passengers from "./Passengers";
import CalendarComponent from "./CalendarComponent";
// React icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
// API
import { searchBuses } from "../../../actions/buses";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const SearchForm = ({ buses: { buses } }) => {
  let history = useHistory();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: moment().format("YYYY-MM-DD"),
  });
  const [cityData, setCityData] = useState([]);
  const [departureDate, setDepartureDate] = useState("Not Selected");
  const [returnDate, setReturnDate] = useState("Not Selected");
  const [infantCount, setInfantCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);

  useEffect(() => {
    setCityData(getCity());
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    if (formData.from != "" && formData.to != "" && formData.date != "") {
      // history.push(
      //   `/bus-listing/searchbus?from=${formData.from}&to=${formData.to}&date=${formData.date}`
      // );
    }
    event.preventDefault();
  }

  function handleToButton(event) {
    setFormData({
      ...formData,
      ["to"]: event.target.id,
    });
    event.preventDefault();
  }

  function handleFromButton(event) {
    setFormData({
      ...formData,
      ["from"]: event.target.id,
    });
    event.preventDefault();
  }

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  function getCity() {
    let city = JSON.parse(JSON.stringify(CitiesData));

    let cities = city.map((each) => each.city);

    return cities;
  }

  const searchBusSbmit = async () => {
    await searchBuses(formData);

    history.push(
      `/client/bus-listing?from=${formData.from}&to=${formData.to}&date=${formData.date}`
    );
  };
  console.log(cityData);
  console.log(formData);
  return (
    <>
      <Grid item xl={12} lg={12} md={12} flexDirection="column">
        <form className="form" onSubmit={handleSubmit}>
          <Grid
            item
            xs={12}
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
          >
            <Grid
              item
              xs={5}
              className="form-each-box"
              paddingLeft="0"
              paddingRight="0"
            >
              {/* <img src={building} alt="" className="form-logo" /> */}
              <span className="location-icon">
                <IoLocationSharp
                  style={{ color: "#c99a3c", fontSize: "20px" }}
                />
              </span>
              <span className="triangle-icon">
                <GoTriangleDown />
              </span>
              <input
                name="from"
                type="text"
                placeholder="From"
                value={capitalize(formData.from)}
                onChange={handleChange}
                className="form-input"
                required={true}
              ></input>

              {formData.from === "" ? (
                <div></div>
              ) : (
                <div className="form-input-select-box">
                  {cityData.map((each, index) => {
                    if (
                      formData.from !== each &&
                      formData.from === each.slice(0, formData?.from?.length)
                    ) {
                      console.log(each.slice(0, formData?.from?.length));
                      return (
                        <button
                          key={index}
                          id={each}
                          onClick={handleFromButton}
                          className="form-input-select"
                        >
                          {each}
                        </button>
                      );
                    }
                  })}
                </div>
              )}
            </Grid>
            <Grid item xs={1} alignSelf="center">
              <HiArrowsRightLeft
                style={{ fontSize: "40px", color: "#c99a3c" }}
              />
            </Grid>
            <Grid
              item
              xs={5}
              className="form-each-box"
              paddingLeft="0"
              paddingRight="0"
            >
              {/* <img src={building} alt="" className="form-logo" /> */}
              <span className="location-icon">
                <IoLocationSharp
                  style={{ color: "#c99a3c", fontSize: "20px" }}
                />
              </span>
              <span className="triangle-icon">
                <GoTriangleDown />
              </span>
              <input
                style={{ width: "100%" }}
                name="to"
                type="text"
                placeholder="To"
                value={capitalize(formData.to)}
                onChange={handleChange}
                className="form-input"
                required={true}
              ></input>

              {formData.to === "" ? (
                ""
              ) : (
                <div className="form-input-select-box">
                  {cityData.map((each, index) => {
                    if (
                      formData.to !== each &&
                      formData.to === each.slice(0, formData?.to?.length)
                    ) {
                      return (
                        <button
                          key={index}
                          id={each}
                          onClick={handleToButton}
                          className="form-input-select"
                        >
                          {each}
                        </button>
                      );
                    }

                    return;
                  })}
                </div>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            className="form-each-box"
            width="100%"
            display="block"
            paddingLeft="0"
            paddingRight="0"
          >
            {/* <img src={building} alt="" className="form-logo" /> */}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-passenger">
                <Grid
                  container
                  xs={12}
                  justifyContent="space-between"
                  className="timing-wrapper"
                >
                  <Grid item xs={4} align="center">
                    <p className="tour-title">Departure Date</p>
                    <p className="tour-date">{departureDate}</p>
                    <p className="tour-day">Tuesday</p>
                  </Grid>
                  <Grid item alignSelf="center">
                    <div className="horizontal-rule" />
                  </Grid>
                  <Grid item xs={4} align="center">
                    <p className="tour-title">Return Date</p>
                    <p className="tour-date">{returnDate}</p>
                    <p className="tour-day">Wednesday</p>
                  </Grid>
                </Grid>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <CalendarComponent
                  departureDate={departureDate}
                  setDepartureDate={setDepartureDate}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                />
              </Dropdown.Menu>
            </Dropdown>
            <Grid item xs={12} className="passenger-wrap" marginTop="10px">
              <p className="form-heading">Passengers</p>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-passenger">
                  <input
                    name="input"
                    type="text"
                    value={
                      infantCount && childCount && adultCount == 0
                        ? ""
                        : `${infantCount} infants, ${childCount} children, ${adultCount} adults`
                    }
                    placeholder="Not Selected"
                    read-only
                    // value={formData.date}
                    // onChange={handleChange}
                    // min={moment().format("YYYY-MM-DD")}

                    className="form-input-text"
                  ></input>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Passengers
                    infantCount={infantCount}
                    setInfantCount={setInfantCount}
                    childCount={childCount}
                    setChildCount={setChildCount}
                    adultCount={adultCount}
                    setAdultCount={setAdultCount}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid>
          <Grid item xs={12} align="center">
            {/* <Link to={`/client/bus-listing?from=${formData.from}&to=${formData.to}&date=${formData.date}`}> */}
            <button
              type="submit"
              className="form-submit-button"
              onClick={searchBusSbmit}
            >
              Search Bus Trips
            </button>
            {/* </Link> */}
          </Grid>
        </form>
      </Grid>
    </>
  );
};

SearchForm.propTypes = {
  // addLike: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  buses: state.buses,
});

export default connect(mapStateToProps, null)(SearchForm);
