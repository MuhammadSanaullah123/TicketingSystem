import React, { useContext, useState } from "react";
import { Button } from "@windmill/react-ui";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/userReducer";
import { BsPlusCircleFill } from "react-icons/bs";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import img from "../assets/alarm.png";
import Map from "./Map";
import GoogleMapReact from "google-map-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import imge from "../assets/alarm.png";
import Swal from "sweetalert2";
import "./BusStations.css";
import Error from "../components/form/Error";
import { useSelector } from "react-redux/es/exports";
import useStaffSubmit from "../hooks/useStaffSubmit";
import LabelArea from "../components/form/LabelArea";
import InputArea from "../components/form/InputArea";
import { AdminContext } from "../context/AdminContext";
import SelectRole from "../components/form/SelectRole";
import RoomIcon from "@mui/icons-material/Room";

// import { getUser } from "../../../Redux/userReducer";
import { getUser } from "../../Redux/userReducer";
import PageTitle from "../components/Typography/PageTitle";
import Uploader from "../components/image-uploader/Uploader";
import { useEffect } from "react";
import { addBusStations, removeBusStations } from "../../Redux/userReducer";
import { getAllOperators } from "../../actions/operators";
import store from "../../store";
import { connect } from "react-redux";

const AnyReactComponent = ({ text }) => (
  <div style={{ width: "30px", height: "30px" }}>
    <RoomIcon style={{ width: "100%", height: "100%", color: "#22C55E" }} />
  </div>
);

const BusStations = ({ operators: { operators } }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    locations: [{ lat: null, lng: null }],
    image: [],
  });
  const [useradd, setUserAdd] = useState({
    locations: [{ lat: null, lng: null }],
    image: [],
  });
  const [location, setLocation] = useState({
    lat: "",
    long: "",
  });
  const [imagesUrl, setImagesUrl] = useState([]);

  const userDataStore = useSelector(
    (state) => state?.userReducer?.userData?.user
  );
  let currentoperator = operators?.filter(
    (operator) => operator.userId === userDataStore?._id
  );
  if (currentoperator) {
    currentoperator = currentoperator[0];
  }
  console.log(currentoperator);

  const [numberOfComponents, setNumberOfComponents] = useState(0);

  const componentArray = new Array(numberOfComponents).fill(null);

  console.log("user", user);

  const {
    state: { adminInfo },
  } = useContext(AdminContext);

  const { register, handleSubmit, onSubmit, errors, imageUrl, setImageUrl } =
    useStaffSubmit(adminInfo?._id);

  const submitUpdate = async (e) => {
    e.preventDefault();
    /*   setUser({ ...user, locations: [...user.locations, location] }); */
    let image_url_arr = [];
    for (let i = 0; i < useradd.image.length; i++) {
      const dataForm = new FormData();
      dataForm.append("file", useradd.image[i]);
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
    setUserAdd((prevUser) => ({
      ...prevUser,
      image: image_url_arr,
    }));

    for (let i = 0; i < useradd.locations.length; i++) {
      const data = {
        images: image_url_arr[i],
        locations: useradd.locations[i],
      };
      const response = await dispatch(addBusStations(data));

      console.log("responseUpdateOperator", response);

      if (response?.payload?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Bus Station Added",
        });
      }
    }
    window.location.reload();
  };

  const removeBusStation = async (id) => {
    const response = await dispatch(removeBusStations(id));

    console.log("responseUpdateOperator", response);

    if (response?.payload?.data?.success) {
      Swal.fire({
        icon: "success",
        title: "",
        text: "Bus Station Removed",
      });
    }
    window.location.reload();
  };

  const handleAdd = () => {
    setNumberOfComponents((prev) => prev + 1);
    setUser({ ...user, locations: [...user.locations, location] });
    setLocation({
      lat: "",
      lng: "",
    });
  };

  const handleImageChange = (e, index) => {
    const newImage = e.target.files[0];

    // Update the image array in user state based on the index
    setUserAdd((prevUser) => {
      const updatedImages = [...prevUser.image];
      updatedImages[index] = newImage;

      return {
        ...prevUser,
        image: updatedImages,
      };
    });
  };

  useEffect(() => {
    if (currentoperator) {
      const { busStations } = currentoperator;

      const locations = busStations.map((station) => station.location);
      const images = busStations.map((station) => station.images);
      setImagesUrl(images);
      setUser({
        ...user,
        locations:
          locations.length > 0 ? locations : [{ lat: null, lng: null }],
      });
    }
  }, [currentoperator]);

  useEffect(() => {
    store.dispatch(getAllOperators());
    handleGetUserData();
  }, []);
  console.log(imagesUrl);
  const handleGetUserData = async () => {
    store.dispatch(getUser());
  };
  return (
    <>
      <PageTitle>Bus Stations</PageTitle>
      <div className="container p-6 mx-auto bg-white rounded-lg">
        <form onSubmit={submitUpdate}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
            {currentoperator?.busStations.map((busStation, index) => {
              return (
                <>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Map
                      index={index}
                      user={user}
                      setUser={setUser}
                      currentMap={user.locations[index]}
                      busStation={busStation}
                      removeBusStation={removeBusStation}
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea
                      label={`Bus Station Location-${index + 1} Picture`}
                    />
                    {/*   <div className="col-span-8 sm:col-span-4">
                      <input
                        id="file-uploader"
                        style={{ display: "block" }}
                        type="file" 
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div> */}
                  </div>
                  {imagesUrl.length > 0 && (
                    <img
                      src={busStation.images}
                      style={{ width: "100%", marginBottom: "20px" }}
                    />
                  )}
                  {/* {index + 1 === currentoperator.busStations.length && (
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Add more locations" />
                      <div className="col-span-8 sm:col-span-4">
                        <BsPlusCircleFill
                          className={`fa-solid fa-circle-plus plusIcon`}
                          onClick={handleAdd}
                        />
                      </div>
                    </div>
                  )} */}
                </>
              );
            })}
            {componentArray.map((_, index) => {
              return (
                <>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Map
                      index={index}
                      user={useradd}
                      setUser={setUserAdd}
                      currentMap={useradd.locations[index]}
                      currentoperator={currentoperator}
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea
                      label={`Add location-${
                        currentoperator?.busStations.length > 0
                          ? currentoperator.busStations.length + 1
                          : index + 1
                      } Pictures`}
                    />
                    <div className="col-span-8 sm:col-span-4">
                      <input
                        id="file-uploader"
                        style={{ display: "block" }}
                        type="file"
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div>
                  </div>

                  {/*    {index + 1 === componentArray.length && (
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Add more locations" />
                      <div className="col-span-8 sm:col-span-4">
                        <BsPlusCircleFill
                          className={`fa-solid fa-circle-plus plusIcon`}
                          onClick={handleAdd}
                        />
                      </div>
                    </div>
                  )} */}
                </>
              );
            })}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Add more locations" />
              <div className="col-span-8 sm:col-span-4">
                <BsPlusCircleFill
                  className={`fa-solid fa-circle-plus plusIcon`}
                  onClick={handleAdd}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse pr-6 pb-6">
            <Button
              type="submit"
              className="h-12 px-6 updateBtn"
              /*      onClick={submitUpdate} */
            >
              Update Bus Stations
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  operators: state.operators,
});

export default connect(mapStateToProps, null)(BusStations);
