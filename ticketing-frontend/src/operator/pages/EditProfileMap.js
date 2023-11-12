import React, { useState, useEffect } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";
import RoomIcon from "@mui/icons-material/Room";
import LabelArea from "../components/form/LabelArea";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

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

const AnyReactComponent = ({ text }) => (
  <div style={{ width: "30px", height: "30px" }}>
    <RoomIcon style={{ width: "100%", height: "100%", color: "#22C55E" }} />
  </div>
);

const EditProfileMap = ({
  user,
  setUser,
  currentMap,
  busStation,
  removeBusStation,
  currentoperator,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  const [marker, setMarker] = useState(null);
  const defaultProps = {
    center: {
      lat: 23.424076, // Default latitude for UAE
      lng: 53.847818, // Default longitude for UAE
    },
    zoom: 7,
  };
  /*   const [dynamicCenter, setDynamicCenter] = useState(defaultProps.center); */
  const [mapOptions, setMapOptions] = useState({
    center: {
      lat: 23.424076, // Default latitude for UAE
      lng: 53.847818, // Default longitude for UAE
    },
    zoom: currentMap?.lat ? 15 : 7,
  });
  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.lat,
      lng: event.lng,
    };

    setMarker(newMarker);

    // Extract information about the marker
    console.log("Latitude:", newMarker.lat);
    console.log("Longitude:", newMarker.lng);
  };

  /*   const [userData, setUserData] = useState(); */
  /*   console.log("likeLikeOO", userDataStore); */

  const [address, setAddress] = useState("");
  console.log(address);

  const handleAddress = async () => {
    try {
      setKey("AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY");
      const response = await geocode(RequestType.ADDRESS, address.label);

      const { lat, lng } = response.results[0].geometry.location;
      const newMarker = {
        lat: lat,
        lng: lng,
      };

      setMarker(newMarker);

      setMapOptions({
        center: {
          lat: newMarker.lat,
          lng: newMarker.lng,
        },
        zoom: 15,
      });
      console.log("Latitude:", newMarker.lat);
      console.log("Longitude:", newMarker.lng);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLocation = () => {
    const { lat, lng } = marker;

    const updatedLocations = { lat, lng };

    setUser((prevUser) => ({
      ...prevUser,
      companylocation: updatedLocations,
    }));
    /*     setDynamicCenter({ lat, lng }); */
    setMapOptions({
      center: {
        lat: 23.424076, // Default latitude for UAE
        lng: 53.847818, // Default longitude for UAE
      },
      zoom: 7,
    });
    // Close the modal or perform any other actions if needed
    closeModal();
  };
  console.log(user);
  console.log(mapOptions);

  useEffect(() => {
    handleAddress();
  }, [address]);

  return (
    <>
      <div className="col-span-8 sm:col-span-4 mapDiv">
        <Button onClick={openModal}>Choose a location</Button>
        {user?.companylocation.lat && <CheckCircleIcon className="checkIcon" />}

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          /*   className="mapModel" */
        >
          <ModalHeader>
            <p style={{ marginTop: "0" }}>Choose location</p>
          </ModalHeader>
          <GooglePlacesAutocomplete
            /*      style={autoStyles} */
            selectProps={{
              address,
              onChange: setAddress,
            }}
          />

          <ModalBody>
            <div style={{ height: "50vh", position: "relative" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={user?.companylocation ? 15 : defaultProps.zoom}
                center={
                  user?.companylocation && user?.companylocation.lat
                    ? user.companylocation
                    : mapOptions.center
                }
                zoom={user.companylocation?.lat ? 15 : mapOptions.zoom}
                onClick={handleMapClick}
              >
                {marker && (
                  <AnyReactComponent lat={marker.lat} lng={marker.lng} />
                )}
              </GoogleMapReact>
              <Button
                onClick={handleLocation}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                }}
              >
                Submit
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default EditProfileMap;
