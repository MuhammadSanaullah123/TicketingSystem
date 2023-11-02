import React, { useRef, useEffect, useLayoutEffect } from "react";
import "./HeaderComponent.css";
import { DatePicker, SelectPicker } from "rsuite";
import { GrClose } from "react-icons/gr";
import { TbArrowsLeftRight } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { sendSearchData } from "../../../Redux/userReducer";
import { DateRangePicker } from "rsuite";
import { FaBeer } from "react-icons/fa";
import { useDispatch } from "react-redux/es/exports";
import { searchBus } from "../../../Redux/userReducer";
import { Link } from "react-router-dom";
import { setSearchedData } from "../../../Redux/userReducer";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DateComponent from "./DateComponent";

import { loginGoogleResult } from "../../../Redux/userReducer";
const HeaderComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [date, setDate] = useState();
  const [dateForword, setDateForword] = useState();

  console.log("dateForword", dateForword);
  console.log("datedatedate", date);

  const [size, setSize] = useState([0, 0]);
  const [searchValue, setSearchValue] = useState({
    From: "",
    To: "",
  });

  const [showFrom, setShowFrom] = useState(0);
  const [navBarFixed, setNavBarFixed] = useState(false);

  const toRef = useRef();
  const dateRef = useRef();

  const countryData = [
    {
      name: "Multan",
      sName: "MU",
    },
    {
      name: "Lahore",
      sName: "LH",
    },
    {
      name: "Kuwait",
      sName: "KW",
    },
    {
      name: "Faislabad",
      sName: "FSL",
    },
    {
      name: "Jada",
      sName: "JD",
    },
  ];
  const data = [
    "Multan",
    "Lahore",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  };

  const fromClicked = () => {
    setShowFrom(1);
  };
  const toClicked = () => {
    setShowFrom(2);
  };
  const fromListClicked = (value) => {
    console.log("searchValue222", value);

    setSearchValue({
      ...searchValue,
      From: value,
    });

    setShowFrom(2);
  };
  const toListClicked = (value) => {
    console.log("searchValue222", value);

    setSearchValue({
      ...searchValue,
      To: value,
    });

    setShowFrom(3);
  };

  const dateClicked = () => {
    setShowFrom(3);
  };

  const toCloseClicked = () => {
    setShowFrom(8);
  };
  const fromCloseClicked = () => {
    setShowFrom(7);
  };

  useEffect(() => {
    if (showFrom === 2) {
      toRef.current.focus();
    }
    // if (showFrom === 3) {
    //   dateRef.current.focus();
    // }
  }, [showFrom]);

  function useWindowSize() {
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useWindowSize();

  console.log("sizeHeaderComponent", size);
  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setNavBarFixed(true);
    } else {
      setNavBarFixed(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  console.log("showFrom", showFrom);

  console.log("searchValue", searchValue);

  const searchBusSbmit = async () => {
    // history.push('/client/bus-listing')
    dispatch(setSearchedData(dateForword));
    const formData = {
      from: searchValue.From,
      to: searchValue.To,
      date: date,
    };

    const respone = await dispatch(searchBus(formData));

    dispatch(sendSearchData(formData));

    console.log("respone", respone);
    const discount = 23;
    const passengers = 23;
    if (respone?.payload?.status) {
      history.push(
        `/client/bus-listing?from=${formData.from}&to=${formData.to}&date=${formData.date}&discount=${discount}&passengers=${passengers}`
      );
    }
    if (respone.payload == undefined) {
      Swal.fire({
        icon: "",
        title: "Bus not found",
        text: "",
      });
    }
  };

  useEffect(() => {
    const { data } = axios.get("http://localhost:5000/api/auth/login/success", {
      withCredentials: true,
    });

    console.log("responseLoginGoogle", data);
  }, []);

  return (
    <>
      <div className="headerComponentContainer">
        <div
          className={
            navBarFixed && size[0] > 991
              ? "headerComponentContainerInnerOnScroll"
              : "headerComponentContainerInner"
          }
        >
          <div
            className={
              navBarFixed == true && size[0] > 991
                ? "dataPickerHeaderOnScroll"
                : "dataPickerHeader"
            }
          >
            <div
              className={
                navBarFixed && size[0] > 991
                  ? "dataPickerHeaderInnerOnScroll"
                  : "dataPickerHeaderInner"
              }
            >
              <div className="bookBusTicketsTxt">{props.title}</div>
              <div
                id={
                  showFrom === 1 || showFrom === 2
                    ? "topRowDataCardH"
                    : "topRowDataCardH1"
                }
                className={
                  navBarFixed && size[0] > 991 ? "topRowDataCardH1OnScroll" : ""
                }
              >
                {/* <SelectPicker
                  placement="right"
                  data={data}
                  placeholder="From"
                  className="fromCitySelect"
                  style={{ width: 224, left: "900px" }}
                /> */}

                <input
                  className="inputSearchBus"
                  placeholder="From"
                  value={searchValue.From}
                  name="From"
                  onClick={fromClicked}
                  onChange={handleSearch}
                />
                <TbArrowsLeftRight className="doubleArrowDate" />
                {/* <SelectPicker
                  placement="right"
                  className="toCitySelect"
                  placeholder="To"
                  data={data}
                  style={{ width: 224 }}
                /> */}
                <input
                  className="inputSearchBus"
                  onChange={handleSearch}
                  onClick={toClicked}
                  ref={toRef}
                  name="To"
                  value={searchValue.To}
                  placeholder="To"
                />
              </div>
              {/* <DatePicker placement="right" className="dataePickerInput" /> */}
              <div
                id={showFrom == 3 ? "topDatePicker1" : "topDatePicker"}
                onClick={dateClicked}
                className={
                  navBarFixed && size[0] > 991
                    ? "topDatePickerOnScroll"
                    : "topDatePickerOnScroll1"
                }
              >
                <p>Departure Date</p>
                <DateComponent
                  setShowFrom1={setShowFrom}
                  showFrom={showFrom}
                  setDate={setDate}
                  setDateForword={setDateForword}
                />
              </div>
              {/* <Link to="/client/bus-service"> */}{" "}
              <button
                className={
                  navBarFixed ? "searchBtnHomeOnScroll" : "searchBtnHome"
                }
                onClick={searchBusSbmit}
              >
                Search
              </button>
              {/* </Link> */}
              {showFrom == 1 && (
                <div
                  className={
                    navBarFixed && size[0] > 991
                      ? "fromCountryDataOnScroll"
                      : "fromCountryData"
                  }
                >
                  <div className="fromCountryDataTopRow">
                    <p>From</p>
                    <GrClose onClick={fromCloseClicked} />
                  </div>

                  <div className="locationDataFrom" id="style-1">
                    <div className="locationDataFromInner">
                      {countryData.map((item, index) => (
                        <div
                          key={index}
                          className="topCountryShort"
                          onClick={() => fromListClicked(item.name)}
                        >
                          <p>{item.name}</p>
                          <p>{item.sName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {showFrom == 2 && (
                <div
                  className={
                    navBarFixed && size[0] > 991
                      ? "fromCountryDataOnScroll"
                      : "fromCountryData"
                  }
                >
                  <div className="fromCountryDataTopRow">
                    <p>To</p>
                    <GrClose onClick={toCloseClicked} />
                  </div>

                  <div className="locationDataFrom" id="style-1">
                    <div className="locationDataFromInner">
                      {countryData.map((item, index) => (
                        <div
                          key={index}
                          className="topCountryShort"
                          onClick={() => toListClicked(item.name)}
                        >
                          <p>{item.name}</p>
                          <p>{item.sName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={
              navBarFixed && size[0] > 991
                ? "rightPartTextHeader1"
                : "rightPartTextHeader"
            }
          >
            <p className="firstRowTxtHeader">fly to our summer</p>
            <p className="firstRowTxtHeader">destinations</p>
            <p className="secondRowTxtHeader">*Seats Limited *One way fare</p>
            <p className="secondRowTxtHeader">includes 7 kg carry-on bag</p>

            <button className="btnRightHeader">
              Discover our summer destinations
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
