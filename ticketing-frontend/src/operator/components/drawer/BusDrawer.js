import React, { useState, useContext, useEffect } from "react";
import "./productDrawer.css";
import Scrollbars from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import { bus } from "../../../Redux/userReducer";
import { Textarea, Select } from "@windmill/react-ui";
import { MultiSelect } from "react-multi-select-component";
import Title from "../form/Title";
import Swal from "sweetalert2";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import Cookies from "universal-cookie";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import SelectOption from "../form/SelectOption";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useProductSubmit from "../../hooks/useProductSubmit";
import { Button } from "@windmill/react-ui";
import { SidebarContext } from "../../context/SidebarContext";
import { controllers } from "chart.js";
import { updateBus } from "../../../Redux/userReducer";
import { BsWindowSidebar } from "react-icons/bs";
import PlacesAutocomplete from "react-places-autocomplete";

// import SingleBusDetail from "../../../client/pages/SingleBusDetail/SingleBusDetail";
import { busDetail } from "../../../Redux/userReducer";

import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
const cookies = new Cookies();
// import { image } from 'html2canvas/dist/types/css/types/image';

const ProductDrawer = ({ id }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const singleBusData = useSelector(
    (state) => state?.userReducer?.singleBusDetail?.busDetails
  );
  const busDataRed = useSelector(
    (state) => state?.userReducer?.busDataOperator?.data
  );

  console.log("singleBusData", singleBusData);
  const userId = cookies.get("userID");
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
    { label: `Wifi 📶`, value: "wifi" },
    { label: `Charging Point 🔋🔌`, value: "charging_point" },
    { label: `Headphones 🎧`, value: "headphones" },
    { label: `Air Conditioner ❄️`, value: "AC" },
    { label: `Medication 🩺`, value: "medical" },
    { label: `Refreshment 🍽️`, value: "food" },
  ];

  const [allBusData, setAllBusData] = React.useState([]);

  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [imageBus, setImageBus] = useState();
  const [imgPreview, setImgPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [seatSelection, setSelection] = useState(false);
  console.log("singleBusData?.departureTo", singleBusData?.departureTo);
  const [busData, setBusData] = useState({
    image: singleBusData?.image,
    type: singleBusData?.busType,
    date: singleBusData?.date,
    number: singleBusData?.busNumber,
    price: singleBusData?.price,
    departureRoute: singleBusData?.routeFrom,
    arrivalRoute: singleBusData?.routeTo,
    facilities: selected,
    departure: singleBusData?.departureTime,
    arrival: singleBusData?.arrivalTime,
    baggage: singleBusData?.baggage,
    seats: singleBusData?.totalSeats,
  });

  console.log("busDatabusData", busData);

  const handleSeatSelection = () => {
    setSelection(!seatSelection);
  };
  console.log("singleBusData", singleBusData);
  console.log("busDatabusData", busData);
  console.log("singleBusData?.busType", singleBusData?.busType);
  const handleBusData = (e) => {
    setBusData({
      ...busData,
      [e.target.name]: e.target.value,
    });
    console.log("handleData", busData);
  };

  const handleSubmit = () => {
    setBusData({
      ...busData,
      facilities: selected,
    });

    console.log("added to localstorage");
    console.log(busData);
    setAllBusData([...allBusData, busData]);

    localStorage.setItem(`AllBus`, JSON.stringify(allBusData));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];

    setImageBus(selected);
  };

  const handleInput = (name, e) => {
    console.log("e.target", e.target);
    setValue(e.target.value);
  };

  // const handleSelect = (val, flag) => {
  //   setValue(val, false);

  // };

  const addBusClicked = async () => {
    const data = new FormData();
    data.append("operatorId", userId);
    data.append("busNumber", busData.number);
    data.append("busType", busData.type);
    data.append("totalSeats", busData.seats);
    data.append("price", busData.price);
    data.append("departureTime", busData.departure);
    data.append("arrivalTime", busData.arrival);
    data.append("routeTo", busData.arrivalRoute);
    data.append("routeFrom", busData.departureRoute);
    data.append("date", busData.date);
    data.append("baggage", busData.baggage);
    data.append("bus_facilities", JSON.stringify(selected));
    data.append("image", imageBus);
    data.append("seatSelection", seatSelection);

    const response = await dispatch(bus(data));

    console.log("responseBusDrawer", response?.payload?.data?.message);
    console.log("responseBusDrawer", response);

    if (response?.payload?.data?.message) {
      Swal.fire({
        icon: "correct",
        title: response?.payload?.data?.message,
        text: "",
      }).then(() => {
        window.location.assign("/operator/buses");
      });
    }
  };

  useEffect(() => {
    // singleBusDataFunc();
  }, []);

  const singleBusDataFunc = async () => {
    const user = {
      busId: id,
    };
    const singleBusResponse = await dispatch(busDetail(user));
    console.log("singleBusResponse11", singleBusResponse);
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
    } else {
    }
  };

  const updateBusClicked = () => {
    const data = {
      busId: id,
      operatorId: userId,
      busNumber: busData.number,
      busType: busData.type,
      totalSeats: busData.seats,
      price: busData.price,
      departureTime: busData.departure,
      arrivalTime: busData.arrival,
      routeTo: busData.departureRoute,
      routeFrom: busData.departureRoute,
      date: busData.date,
      baggage: busData.baggage,
      bus_facilities: selected,
      image: imageBus,
    };

    const response = dispatch(updateBus(data));
  };
  useEffect(async () => {
    const user = {
      busId: id,
    };
    const singleBusResponse = await dispatch(busDetail(user));
    console.log("singleBusResponse11", singleBusResponse);
  }, []);
  const [address, setAdress] = useState("");
  const { coordinates, setCoordinates } = useState({
    lat: null,
    lng: null,
  });
  const handleSelect = (val, flag) => {
    setValue(val, false);
  };

  console.log("singleBusData?.image", singleBusData?.image);
  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
      </>
    );
  };
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
        {id ? (
          <Title
            title="Update Bus"
            description="Update your bus and necessary information from here"
          />
        ) : (
          <Title
            title="Add Bus"
            description="Add your bus and necessary information from here"
          />
        )}
      </div>

      {id ? (
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
          <form className="block">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Image" />
                <div className="col-span-8 sm:col-span-4">
                  {/* <input
                    type="file"
                    accept="image/png , image/jpeg, image/webp"
                    onChange={handleImageChange}
                 
                  /> */}

                  <div className="btn_sec">
                    {/* {!imgPreview && (
                      <img src={singleBusData?.image} className="profileImg" />
                    )} */}
                    {imgPreview && (
                      <div
                        className="profileImg"
                        style={{
                          background: imgPreview
                            ? `url("${imgPreview}")  no-repeat center/cover`
                            : "#121212",
                          width: "200px",
                          height: "200px",
                        }}
                      ></div>
                    )}

                    <input
                      type="file"
                      id="file"
                      accept="image/png , image/jpeg, image/webp"
                      class="inputfile"
                      onChange={handleImageChange1}
                    />
                    {/* <label for="file">Choose image</label> */}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Type" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectOption
                    label="Bus type"
                    name="type"
                    defaultValue={busData.type}
                    onChange={(e) => handleBusData(e)}
                  />
                  <Error errorName={errors.type} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Date" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Number"
                    defaultValue={busData.date}
                    name="date"
                    onChange={(e) => handleBusData(e)}
                    type="date"
                    placeholder="Select Date"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Number Plate" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Number Plate"
                    defaultValue={busData.number}
                    name="number"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Number Plate"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Price" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Price"
                    defaultValue={busData.price}
                    name="price"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Price"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Departure City" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Departure City"
                    defaultValue={busData.departureRoute}
                    name="departureRoute"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Select Departure Place"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Arrival City" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Arrival City"
                    defaultValue={busData.arrivalRoute}
                    name="arrivalRoute"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Select Arrival Place"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Facilites" />
                <div className="col-span-8 sm:col-span-4">
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={(e) => {
                      let data = [];

                      setSelected(e);

                      console.log("selectedDD", selected);
                      selected.map((item) => {
                        data.push(item.label);

                        console.log("dataPush", data);
                      });

                      setSelected1(data);
                    }}
                    labelledBy="Select Facilities"
                  />
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Departure" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Departure"
                    name="departure"
                    defaultValue={busData.departure}
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Departure"
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Arrival" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label="Bus Departure"
                    defaultValue={busData.arrival}
                    name="arrival"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Arrival"
                  />
                  <Error errorName={errors.slug} />
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
                    defaultValue={busData.seats}
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
                    type="number"
                    defaultValue={busData.baggage}
                    placeholder="Baggage"
                  />
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
                  {" "}
                  {id ? (
                    <span
                      className="addBusBtn"
                      onClick={updateBusClicked}
                      style={{ cursor: "pointer", border: "1px solid orange" }}
                    >
                      Update Bus
                    </span>
                  ) : (
                    <span
                      className="addBusBtn"
                      onClick={updateBusClicked}
                      style={{ cursor: "pointer", border: "1px solid orange" }}
                    >
                      Update Bus
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Scrollbars>
      ) : (
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
                <LabelArea label="Bus Type" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectOption
                    label="Bus type"
                    name="type"
                    onChange={(e) => handleBusData(e)}
                  />
                  <Error errorName={errors.type} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Date" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Number"
                    name="date"
                    onChange={(e) => handleBusData(e)}
                    type="date"
                    placeholder="Select Date"
                  />
                  <Error errorName={errors.price} />
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
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Price" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Price"
                    name="price"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Price"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Departure City" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Departure City"
                    name="departureRoute"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Select Departure Place"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Arrival City" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Arrival City"
                    name="arrivalRoute"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Select Arrival Place"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Facilites" />
                <div className="col-span-8 sm:col-span-4">
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={(e) => {
                      let data = [];

                      setSelected(e);

                      console.log("selectedDD", selected);
                      selected.map((item) => {
                        data.push(item.label);

                        console.log("dataPush", data);
                      });

                      setSelected1(data);
                    }}
                    labelledBy="Select Facilities"
                  />
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Departure" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required="false"
                    label="Bus Departure"
                    name="departure"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Departure"
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Arrival" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label="Bus Departure"
                    name="arrival"
                    onChange={(e) => handleBusData(e)}
                    type="text"
                    placeholder="Bus Arrival"
                  />
                  <Error errorName={errors.slug} />
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
                <LabelArea label="Baggage Allowed" />
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
                  {" "}
                  {id ? (
                    <span>Update Bus</span>
                  ) : (
                    <span
                      className="addBusBtn addBusBtnProfile Picture
                      "
                      onClick={addBusClicked}
                      style={{ cursor: "pointer", border: "1px solid orange" }}
                    >
                      Add Bus
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Scrollbars>
      )}
    </>
  );
};

export default React.memo(ProductDrawer);
