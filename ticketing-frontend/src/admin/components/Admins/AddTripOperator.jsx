// React
import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Textarea, Button, Select } from "@windmill/react-ui";
import { Container, Form, Nav } from "react-bootstrap";
import SelectOption from "../form/SelectOption";
import SelectCity from "../form/SelectCity";
import Scrollbars from "react-custom-scrollbars";
import Navbar from "react-bootstrap/Navbar";
import LabelArea from "../form/LabelArea";
import { MultiSelect } from "react-multi-select-component";
import Title from "../form/Title";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// CSS
import "./AddBusOperator.css";
import InputArea from "../form/InputArea";
import MultiSelectAddBus from "./MultiSelectAddBus";
// API
import { getOperatorById } from "../../../actions/operators";
import { addTrip } from "../../../actions/trips";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const AddTripOperator = ({ operatorId, addTrip, operators: { operator } }) => {
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [valueArrival, onChangeArrival] = useState(new Date());
  const [valueDeparture, onChangeDeparture] = useState(new Date());
  const [allBusData, setAllBusData] = React.useState([]);
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [imageBus, setImageBus] = useState();
  const [imgPreview, setImgPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [seatSelection, setSelection] = useState(false);
  const [tripData, setTripData] = useState({
    busId: "",
    price: "",
    departureRoute: "",
    arrivalRoute: "",
    departure: "",
    arrival: "",
  });
  const [address, setAdress] = useState("");
  const [selectedTransit, setSelectedTransit] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    console.log("operatorId", operatorId);
    store.dispatch(getOperatorById(operatorId));
  }, [operatorId]);

  const addTripFunc = async () => {
    console.log("hellllooo");
    // transit
    const transitCities = selectedTransit.map((item) => item.value);
    const daysOfWeek = selectedDays.map((item) => item.value);

    let obj = {
      busId: tripData.busId,
      type: tripData.type,
      transit: transitCities,
      daysOfWeek: daysOfWeek,
      price: tripData.price,
      routeFrom: tripData.departureRoute,
      routeTo: tripData.arrivalRoute,
      departureTime: valueDeparture,
      arrivalTime: valueArrival,
    };
    console.log("request add trip", obj);
    addTrip(obj);
  };

  const handleTripData = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const transitOptions = [
    { value: "Lahore", label: "Lahore" },
    { value: "Islamabad", label: "Islamabad" },
    { value: "Karachi", label: "Karachi" },
    { value: "Peshawar", label: "Peshawar" },
    { value: "Srinagar", label: "Srinagar" },
    { value: "Multan", label: "Multan" },
    { value: "Rawalpindi", label: "Rawalpindi" },
  ];

  const weekOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id="AddBusOperatorTop"
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Title
                  title="Add Trip"
                  description="Add your trip and necessary information from here"
                />
                <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
                  <form className="block">
                    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Number Plate" />
                        <div className="col-span-8 sm:col-span-4">
                          <Select
                            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                            name="busId"
                            onChange={(e) => handleTripData(e)}
                          >
                            <option value="" defaultValue hidden></option>
                            {operator != null &&
                              operator?.busId.map((bus, index) => (
                                <option value={bus._id} key={index}>
                                  {bus.busNumber}
                                </option>
                              ))}
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Trip type" />
                        <div className="col-span-8 sm:col-span-4">
                          <Select
                            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                            name="type"
                            onChange={(e) => handleTripData(e)}
                          >
                            <option value="" defaultValue hidden></option>
                            <option value="regular">Regular</option>
                            <option value="exclusive">Exclusive</option>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Transit" />
                        <div className="col-span-8 sm:col-span-4">
                          <MultiSelect
                            isMulti
                            options={transitOptions}
                            value={selectedTransit}
                            onChange={setSelectedTransit}
                            placeholder="Select transit cities..."
                          />
                        </div>
                      </div>
                      {tripData.type == "regular" && (
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                          <LabelArea label="Repetition" />
                          <div className="col-span-8 sm:col-span-4">
                            <MultiSelect
                              isMulti
                              options={weekOptions}
                              value={selectedDays}
                              onChange={setSelectedDays}
                              placeholder="Select transit cities..."
                            />
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Price" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            required="false"
                            label="Bus Price"
                            name="price"
                            onChange={(e) => handleTripData(e)}
                            type="text"
                            placeholder="Bus Price"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Departure City" />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectCity
                            label="Departure City"
                            name="departureRoute"
                            onChange={(e) => handleTripData(e)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Arrival City" />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectCity
                            label="Arrival City"
                            name="arrivalRoute"
                            onChange={(e) => handleTripData(e)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Departure" />
                        <div className="col-span-8 sm:col-span-4">
                          <DateTimePicker
                            onChange={onChangeDeparture}
                            value={valueDeparture}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Arrival" />
                        <div className="col-span-8 sm:col-span-4">
                          <DateTimePicker
                            onChange={onChangeArrival}
                            value={valueArrival}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="fixed bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 topAddCancelButton">
                      <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <Button
                          className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 cancelBtnAdminAdd"
                          layout="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <div
                          className="w-full h-12"
                          //   onClick={handleSubmit}
                          onClick={() => addTripFunc()}
                        >
                          {" "}
                          {/* <span>Update Bus</span> */}
                          <span
                            className="addBusBtn"
                            style={{
                              cursor: "pointer",
                              border: "1px solid orange",
                            }}
                          >
                            Add Trip
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </Scrollbars>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

AddTripOperator.propTypes = {
  addTrip: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  operators: state.operators,
  trips: state.trips,
});

export default connect(mapStateToProps, { addTrip })(AddTripOperator);
