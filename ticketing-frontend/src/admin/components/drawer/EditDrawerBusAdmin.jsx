import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import Nav from "react-bootstrap/Nav";
// import { useSelector, useDispatch } from "react-redux";
// import SelectOption from "../form/SelectOption";

import SelectOption from "../form/SelectOption";
import SelectBusType from "../form/SelectBusType";
import Scrollbars from "react-custom-scrollbars";
import Navbar from "react-bootstrap/Navbar";
import LabelArea from "../form/LabelArea";
import { MultiSelect } from "react-multi-select-component";
import Title from "../form/Title";
import NavDropdown from "react-bootstrap/NavDropdown";
import { bus } from "../../../Redux/userReducer";
// import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./EditDrawerBusAdmin.css";
import InputArea from "../form/InputArea";
import SelectOperator from "../form/SelectOperator";
import Select from "react-select";
// Assets
import AC from "../../assets/air-conditioner.svg";
import WC from "../../assets/headphones (1).svg";
import Sleeper from "../../assets/headphones (2).svg";
import TV from "../../assets/headphones (3).svg";
import Food from "../../assets/headphones (4).svg";
import Emergency from "../../assets/plastic-bottle (1).svg";
import Drinks from "../../assets/plastic-bottle.svg";
import Charging from "../../assets/phone-charger.svg";
import Headphones from "../../assets/headphones.svg";
import Wifi from "../../assets/wifi.svg";
// API
import { updateBus } from "../../../actions/buses";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const EditDrawerBusAdmin = ({ handleGetAllBus, selectedBus, updateBus }) => {
  console.log("selected bus id for update", selectedBus);

  const [imageBus, setImageBus] = useState();
  const [allBusData, setAllBusData] = React.useState([]);
  const [selected, setSelected] = useState(selectedBus?.bus_facilities);
  const [selectedIcons, setSelectedIcons] = useState(
    selectedBus?.bus_facilities
  );
  const [seatSelection, setSelection] = useState(selectedBus?.seatSelection);

  const dispatch = useDispatch();

  const options = [
    { label: `Wifi 📶`, value: `📶` },
    { label: `Charging Point 🔋🔌`, value: `🔋🔌` },
    { label: `Headphones 🎧`, value: `🎧` },
    { label: `Air Conditioner ❄️`, value: `❄️` },
    { label: `Medication 🩺`, value: `🩺` },
    { label: `Refreshment 🍽️`, value: `🍽️` },
  ];

  const [busData, setBusData] = useState({
    image: selectedBus?.image,
    busType: selectedBus?.busType,
    busNumber: selectedBus?.busNumber,
    bus_facilities: selectedBus?.bus_facilities,
    baggage: selectedBus?.baggage,
    totalSeats: selectedBus?.totalSeats,
    seatSelect: selectedBus?.seatSelection,
  });

  const handleImageChange = (e) => {
    const selected1 = e.target.files[0];

    setImageBus(selected1);
  };

  const handleBusData = (e) => {
    setBusData({
      ...busData,
      [e.target.name]: e.target.value,
    });
    console.log("handleData", busData);
  };
  const handleSeatSelection = () => {
    setSelection(!seatSelection);
  };

  console.log("bus data>>>>>>>", busData);

  const updateBusClicked = async () => {
    console.log("updatebusclicked");

    let ID = selectedBus._id;

    console.log("request", busData);
    updateBus({ busData, ID });
    handleGetAllBus();
  };

  const iconOptions = [
    { value: "ac", label: "Air Conditioner", icon: <img src={AC} alt="AC" /> },
    {
      value: "wc",
      label: "Washroom",
      icon: <img src={WC} alt="Headphones 1" />,
    },
    {
      value: "sleeper",
      label: "Sleeper",
      icon: <img src={Sleeper} alt="Headphones 2" />,
    },
    { value: "tv", label: "TV", icon: <img src={TV} alt="Headphones 3" /> },
    {
      value: "food",
      label: "Food & Refreshments",
      icon: <img src={Food} alt="Headphones 4" />,
    },
    {
      value: "emergency",
      label: "Emergency",
      icon: <img src={Emergency} alt="Plastic Bottle 1" />,
    },
    {
      value: "drinks",
      label: "Drinks",
      icon: <img src={Drinks} alt="Plastic Bottle" />,
    },
    {
      value: "charging",
      label: "Phone Charger",
      icon: <img src={Charging} alt="Phone Charger" />,
    },
    {
      value: "headphones",
      label: "Headphones",
      icon: <img src={Headphones} alt="Headphones" />,
    },
    { value: "wifi", label: "WiFi", icon: <img src={Wifi} alt="WiFi" /> },
  ];

  const handleIconChange = (selectedOptions) => {
    setSelectedIcons(selectedOptions.map((option) => option.value));
    setBusData({ ...busData, bus_facilities: selectedIcons });
  };

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
                  title="Update Bus"
                  description="Update your bus and necessary information from here"
                />
                <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
                  <form className="block">
                    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Image" />
                        <div className="col-span-8 sm:col-span-4">
                          <input
                            type="file"
                            accept="image/png , image/jpeg, image/webp"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Operator ID" />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectOperator
                            label="operator"
                            name="operatorId"
                            onChange={(e) => handleBusData(e)}
                            defaultValue={selectedBus?.operatorId}
                            setBusData={setBusData}
                            busData={busData}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Type" />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectBusType
                            label="Bus type"
                            defaultValue={busData.busType}
                            name="busType"
                            onChange={(e) => handleBusData(e)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Number Plate" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            required="false"
                            label="Bus Number Plate"
                            defaultValue={busData.busNumber}
                            name="busNumber"
                            onChange={(e) => handleBusData(e)}
                            type="text"
                            placeholder="Bus Number Plate"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Facilites" />
                        <div className="col-span-8 sm:col-span-4">
                          <Select
                            isMulti
                            options={iconOptions}
                            value={iconOptions?.filter((icon) =>
                              selectedIcons?.includes(icon.value)
                            )}
                            onChange={handleIconChange}
                            placeholder="Select icons..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Bus Seats" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Seats"
                            name="totalSeats"
                            defaultValue={busData.totalSeats}
                            onChange={(e) => handleBusData(e)}
                            type="number"
                            placeholder="Seats"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Baggage Allowed" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Baggage"
                            name="baggage"
                            onChange={(e) => handleBusData(e)}
                            defaultValue={busData.baggage}
                            type="number"
                            placeholder="Baggage"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Seat Selection" />
                        <div className="col-span-8 sm:col-span-4">
                          <label class="switch1">
                            <input
                              type="checkbox"
                              //    {busDataSeatSelection &&defaultChecked}
                              defaultChecked={
                                selectedBus?.seatSelection == true
                                  ? true
                                  : false
                              }
                              onChange={handleSeatSelection}
                            />
                            <span class="sliderBus roundBus"></span>
                          </label>
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
                          onClick={updateBusClicked}
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
                            Update Bus
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

EditDrawerBusAdmin.propTypes = {
  updateBus: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buses: state.buses,
});

export default connect(mapStateToProps, { updateBus })(EditDrawerBusAdmin);
