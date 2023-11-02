import React, { useState, useContext, useEffect } from "react";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import TimePicker from "react-time-picker";
import Scrollbars from "react-custom-scrollbars";
import Select from "react-select";
import { Textarea, Button } from "@windmill/react-ui";
import PlacesAutocomplete from "react-places-autocomplete";
import Swal from "sweetalert2";
import { controllers } from "chart.js";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
// CSS
import "./productDrawer.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateBus, busDetail, bus } from "../../../Redux/userReducer";
// Components
import SingleBusDetail from "../../../client/pages/SingleBusDetail/SingleBusDetail";
import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import SelectOption from "../form/SelectOption";
import SelectOperator from "../form/SelectOperator";
import SelectBusType from "../form/SelectBusType";
import SelectCity from "../form/SelectCity";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import Icon from "./Icon";
// Hooks
import useProductSubmit from "../../hooks/useProductSubmit";
import { SidebarContext } from "../../context/SidebarContext";
// React icons
import { BsWindowSidebar } from "react-icons/bs";
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
import { addBus } from "../../../actions/buses";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const AddBusByAdmin = ({
  handleGetAllBuses,
  id,
  addBus,
  operators: { operators },
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const [selectedIcons, setSelectedIcons] = useState([]);

  const handleIconChange = (selectedOptions) => {
    setSelectedIcons(selectedOptions.map((option) => option.value));
  };

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
  const dispatch = useDispatch();

  const options = [
    { icon: "Wifi", label: "Wifi" },
    { icon: "AC", label: "Air Conditioner" },
    { icon: "WC", label: "Washroom" },
    { icon: "Sleeper", label: "Sleep" },
    { icon: "TV", label: "TV" },
    { icon: "Emergency", label: "Emergency" },
    { icon: "Drinks", label: "Drinks" },
    { icon: "Food", label: "Food" },
    { icon: "Charging", label: "Charging" },
    { icon: "Headphones", label: "Headphones" },
  ];
  const [valueArrival, onChangeArrival] = useState("10:00");
  const [valueDeparture, onChangeDeparture] = useState("10:00");
  const [allBusData, setAllBusData] = React.useState([]);
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [imageBus, setImageBus] = useState();
  const [imgPreview, setImgPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [seatSelection, setSelection] = useState(false);
  const [busData, setBusData] = useState({
    image: "",
    type: "",
    number: "",
    facilities: "",
    baggage: [],
    seats: [],
    operatorId: "",
  });
  const [address, setAdress] = useState("");
  const { coordinates, setCoordinates } = useState({
    lat: null,
    lng: null,
  });

  const handleSeatSelection = () => {
    setSelection(!seatSelection);
  };

  const handleBusData = (e) => {
    setBusData({
      ...busData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setBusData({
      ...busData,
      facilities: selected,
    });

    setAllBusData([...allBusData, busData]);

    localStorage.setItem(`AllBus`, JSON.stringify(allBusData));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    console.log(selected);
    setImageBus(selected.name);
  };

  const handleInput = (name, e) => {
    setValue(e.target.value);
  };

  const addBusClicked = async () => {
    let dataObj = {
      operatorId: busData.operatorId,
      busNumber: busData.number,
      busType: busData.type,
      totalSeats: busData.seats,
      baggage: busData.baggage,
      bus_facilities: selectedIcons,
      image: imageBus,
      seatSelection: seatSelection,
    };

    console.log("dataObj", dataObj);

    addBus(dataObj);
    handleGetAllBuses();
  };

  const handleImageChange1 = (e) => {
    const selected = e.target.files[0];

    setImageBus(selected);

    setImage(selected);

    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSelect = (val, flag) => {
    setValue(val, false);
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
  console.log("OPERRRRRRAAAAATTTTORs");
  console.log(operators);
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
        <Title
          title="Add Bus"
          description="Add your bus and necessary information from here"
        />
      </div>

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
                {/* <SelectOperator
                    label="operator"
                    name="operatorId"
                    busData={busData}
                    setBusData={setBusData}
                    onChange={(e) => handleBusData(e)}
                  /> */}
                <select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  name="operatorId"
                  onChange={(e) => handleBusData(e)}
                >
                  <option value=""></option>
                  {operators != null &&
                    operators?.map((operator, index) => (
                      <option value={operator._id} key={index}>
                        {operator.operatorId}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Bus Type" />
              <div className="col-span-8 sm:col-span-4">
                <SelectBusType
                  label="Bus type"
                  name="type"
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
                  name="number"
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
                  value={iconOptions.filter((icon) =>
                    selectedIcons.includes(icon.value)
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
                  name="seats"
                  onChange={(e) => handleBusData(e)}
                  type="number"
                  placeholder="Seats"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Number Of Baggages Allowed" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  label="Baggage"
                  name="baggage"
                  onChange={(e) => handleBusData(e)}
                  type="number"
                  placeholder="Baggage"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Seat Selection" />
              <div className="col-span-8 sm:col-span-4">
                <label class="switch1">
                  <input type="checkbox" onChange={handleSeatSelection} />
                  <span class="sliderBus roundBus"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                onClick={toggleDrawer}
                className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600"
                layout="outline"
              >
                Cancel
              </Button>
            </div>
            <div
              className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow"
              onClick={toggleDrawer}
            >
              <div className="w-full h-12" onClick={handleSubmit}>
                <span
                  className="addBusBtn addBusBtnProfile Picture
                      "
                  onClick={() => addBusClicked()}
                  style={{ cursor: "pointer", border: "1px solid orange" }}
                >
                  Add Bus
                </span>
              </div>
            </div>
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

AddBusByAdmin.propTypes = {
  addBus: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buses: state.buses,
  operators: state.operators,
});

export default connect(mapStateToProps, { addBus })(AddBusByAdmin);
