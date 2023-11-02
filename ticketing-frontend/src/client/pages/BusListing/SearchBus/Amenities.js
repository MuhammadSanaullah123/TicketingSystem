import React, { useState, useEffect } from "react";
import powerPlugLogo from "../../../assets/power-plug.svg";
import lightLogo from "../../../assets/light.svg";
import trackLogo from "../../../assets/tracking.svg";
import ticketLogo from "../../../assets/ticket.svg";
import newspaperLogo from "../../../assets/newspaper.svg";
import emergencyCallLogo from "../../../assets/emergency-call.svg";
import blanketsLogo from "../../../assets/bed-sheets.svg";
import pillowLogo from "../../../assets/pillow.svg";
import cctvLogo from "../../../assets/cctv.svg";
import movieLogo from "../../../assets/video.svg";
import tvLogo from "../../../assets/tv.svg";
import wifiLogo from "../../../assets/wifi.svg";


import airConditioner from './../../../assets/airConditioner.png'
import medication from './../../../assets/medication.png'
import headPhone from './../../../assets/headPhone.png'
import refreshment from './../../../assets/refreshment.png'
// import bottle from "../../../assets/bottle.svg";
// import mask from "../../../assets/mask.svg";
// import sanitizer from "../../../assets/sanitizer.svg";
// import temperature from "../../../assets/newspaper.svg";
// import clean from "../../../assets/clean.svg";

import EachAmenities from "./EachAmenities";

export default function Amenities({ data }) {
  const [parsedData, setParsedData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let tempData = data = JSON.parse(data)
    
    setParsedData(tempData)
    console.log("data.value", parsedData);
    setLoading(false)
  }, [loading])
  
  console.log("data.value", parsedData);
  console.log("parsedData.length", parsedData.length)
  // let {
  //   blankets,
  //   cctv,
  //   charging_point,
  //   deep_cleaned_bus,
  //   emergency_contact_number,
  //   hand_sanitiser_provided,
  //   mobile_ticket,
  //   movie,
  //   newspaper,
  //   personaltv,
  //   pillow,
  //   reading_light,
  //   regular_temperature_check,
  //   staff_with_mask,
  //   track_my_bus,
  //   water_bottle,
  //   wifi,
  // } = data;
  return (
    <>
      {/* {<EachAmenities
        present={charging_point}
        logo={powerPlugLogo}
        title="Charging Point"
      />} */}
      {/* <EachAmenities
        present={reading_light}
        logo={lightLogo}
        title="Reading Light"
      /> */}
      {/* <EachAmenities
        present={track_my_bus}
        logo={trackLogo}
        title="Track My Bus"
      /> */}
      {/* <EachAmenities
        present={mobile_ticket}
        logo={ticketLogo}
        title="Mobile Ticket"
      /> */}
      {/* <EachAmenities
        present={newspaper}
        logo={newspaperLogo}
        title="Newspaper"
      /> */}
      {/* <EachAmenities
        present={emergency_contact_number}
        logo={emergencyCallLogo}
        title="Emergency Contact Number"
      /> */}
      {/* <EachAmenities present={blankets} logo={blanketsLogo} title="Blankets" />
      <EachAmenities present={pillow} logo={pillowLogo} title="Pillow" />
      <EachAmenities present={cctv} logo={cctvLogo} title="CCTV" />
      <EachAmenities present={movie} logo={movieLogo} title="Movie" />
      <EachAmenities present={personaltv} logo={tvLogo} title="Personal TV" /> */}
      
        {parsedData[0]?.label == "Wifi" && <EachAmenities  logo={wifiLogo} title="Wifi" />}
        {parsedData[1]?.label == "Charging Point" && <EachAmenities logo={powerPlugLogo} title="Charging Point" />}
        {parsedData[2]?.label == "Headphones" && <EachAmenities  logo={headPhone} title="Headphones" />}
        {parsedData[3]?.label == "Air Conditioner" && <EachAmenities  logo={airConditioner} title="Air Conditioner" />}
        {parsedData[4]?.label == "Medication" && <EachAmenities  logo={medication} title="Medication" />}
        {parsedData[5]?.label == "Refreshment" && <EachAmenities  logo={refreshment} title="Refreshment" />}
      
      {(parsedData.length > 0) && (
        <p>abdulla</p>,
        parsedData[0]?.label == "Wifi" && <EachAmenities  logo={wifiLogo} title="Wifi" />,
        parsedData[1]?.label == "Charging Point" && <EachAmenities logo={powerPlugLogo} title="Charging Point" />,
        parsedData[2]?.label == "Headphones" && <EachAmenities  logo={headPhone} title="Headphones" />,
        parsedData[3]?.label == "Air Conditioner" && <EachAmenities  logo={airConditioner} title="Air Conditioner" />,
        parsedData[4]?.label == "Medication" && <EachAmenities  logo={medication} title="Medication" />,
        parsedData[5]?.label == "Refreshment" && <EachAmenities  logo={refreshment} title="Refreshment" />
      )}
      {/* <EachAmenities present={water_bottle} logo={bottle} title="Water Bottle" />
      <EachAmenities present={} logo={mask} title="Staff with Mask" />
      <EachAmenities present={} logo={sanitizer} title="Hand Sanitizers Provided" />
      <EachAmenities present={} logo={temperature} title="Regular Temperature Checks" />
      <EachAmenities present={} logo={clean} title="Deep Cleaned Buses" /> */}
    </>
  );
}
