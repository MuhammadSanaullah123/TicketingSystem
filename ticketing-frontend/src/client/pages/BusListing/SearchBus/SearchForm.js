import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import CitiesData from "./cities.json";
//icons
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function SearchForm() {
  let history = useHistory();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: moment().format("YYYY-MM-DD"),
  });

  const [cityData, setCityData] = useState([]);

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
      history.push(
        `/client/bus-listing/searchbus?from=${formData.from}&to=${formData.to}&date=${formData.date}`
      );
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

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{ display: "flex", margin: "30px 0" }}
      >
        <div className="form-each-box">
          {/* <img src={building} alt="" className="form-logo" /> */}
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
        </div>
        <div className="form-each-box">
          {/* <img src={building} alt="" className="form-logo" /> */}
          <input
            name="to"
            type="text"
            placeholder="To"
            value={capitalize(formData.to)}
            onChange={handleChange}
            className="form-input"
            required={true}
          ></input>
          {formData.to === "" ? (
            <div></div>
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

                return <></>;
              })}
            </div>
          )}
        </div>
        <div className="form-each-box">
          {/* <img src={building} alt="" className="form-logo" /> */}
          <input
            name="date"
            type="date"
            placeholder="Depart Date"
            value={formData.date}
            onChange={handleChange}
            min={moment().format("YYYY-MM-DD")}
            className="form-input"
          ></input>
        </div>
        <button
          type="submit"
          className="form-submit-button"
          style={{ width: "200px" }}
        >
          Search
        </button>
      </form>
    </>
  );
}
