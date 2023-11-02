import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./BookingSeats.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { bookSeats } from "../../../../Redux/userReducer";
//mui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { bookSeatsWithoutLogin } from "../../../../Redux/userReducer";
import SelectOption from "../../../../operator/components/form/SelectOption";
import { sendPriceData } from "../../../../Redux/userReducer";
// React Icons
import { TbSteeringWheel } from "react-icons/tb";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state) => state?.userReducer?.userdataOperator?.user
  );
  const busData = useSelector(
    (state) => state?.userReducer?.busData?.data?.bus
  );

  const seatsData = () => ({});

  const arraySeats = [...new Array()].map(() => seatsData);
  console.log("props.busId", props.busId);
  for (let i = 0; i < props?.availableSeats; i++) {
    arraySeats[i] = {
      ...arraySeats[i],
      seatNo: i + 1,
      flag: false,
    };
  }

  const [arraytwo, setArrayTwo] = useState(arraySeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [place, setIndex] = useState(0);

  const seatSelectedClicked = (indexone, user, occuSeats) => {
    if (user.flag === true) {
      console.log("selectedSeats  when flag=true: ", selectedSeats);
      let removeIndex;
      for (let i = 0; i <= selectedSeats.length; i++) {
        if (selectedSeats[i] === user.seatNo) {
          removeIndex = i;
        }
      }
      console.log(busData);
      const index = selectedSeats.indexOf(removeIndex);

      if (removeIndex > -1) {
        // only splice array when item is found
        selectedSeats.splice(removeIndex, 1); // 2nd parameter means remove one item only
      }
    }

    if (user.flag === false) {
      const result = occuSeats.filter((number) => user.seatNo === number);

      // console.log("item.seatNo ",item.seatNo );
      // console.log("occuSeats",occuSeats);
      console.log("result", result[0]);

      if (result[0] != user.seatNo) {
        selectedSeats.push(user.seatNo);
      }
    }

    user.flag = !user.flag;
    let oldData = [...arraytwo];
    oldData[indexone] = user;
    setIndex(indexone);
    setArrayTwo(oldData);

    console.log("user.seatNo", user.seatNo);
    console.log(props);
    setTotalPrice(totalPrice + props.busPrice);

    // setTotalPrice(busData[0]?.price * selectedSeats?.length);
  };

  console.log("selectedSeats", selectedSeats);
  // arraySeats[0]={
  //   ...arraySeats[3],
  //   seatNo:"2"

  // }

  console.log("arraySeats", arraySeats);

  const [value, setValue] = React.useState(0);
  const [totalFare, setTotalFare] = React.useState(0);
  const [newColor, setNewColor] = React.useState(false);
  const [seatsCount, setSeatsCount] = useState(0);
  const [seatsCount1, setSeatsCount1] = useState(0);
  const [user, setUser] = useState({
    email: "",
    phone: "",
  });
  const [arayCount, setArayCount] = useState([...Array(0)]);
  const [araydata, setAraydata] = useState([...Array(0)]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatsLength, setSeatsLength] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleSeat = (event) => {
    var selectedId = event.currentTarget.id;

    setTotalPrice(400);
    setSeatsLength(1);

    var getElement = document.getElementById(selectedId).style;

    if (!newColor) {
      getElement.backgroundColor = "#d3a74b";
      setNewColor(true);
      setTotalFare(totalFare + 100);
    } else {
      getElement.backgroundColor = "#ccc";

      setNewColor(false);
      setTotalFare(totalFare - 100);
    }
  };

  const handleChangeEN = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log("arayCount", arayCount);
  const handleChangeSeats = (e) => {
    setSeatsCount(e.target.value === "" ? 0 : parseInt(e.target.value));
  };

  console.log("busData11", busData);
  console.log("props.id", props?.busDataProps?.totalSeats);
  const handleClientDdetails = (e, idx) => {
    const newState = araydata.map((obj, i) =>
      i === idx ? { ...obj, [e.target.name]: e.target.value } : obj
    );
    setAraydata(newState);

    console.log(newState, "arayda");
  };
  useEffect(() => {
    // setTotalPrice(arayCount.length * busData[0]?.price);
    let obj = {
      name: "",
      age: "",
      gender: "",
    };

    let datap = [];
    let b = [...Array(seatsCount)].map((data, i) => {
      datap[i] = obj;
    });
    setAraydata(datap);
    setTimeout(() => {
      setArayCount([...Array(seatsCount)]);
    }, 100);
  }, [seatsCount]);

  // console.log("userId1",userId);
  console.log("arrayCount", arayCount);
  const dataSender = {
    busId: props.busId,
    noOfSeats: selectedSeats.length,
    seats: selectedSeats,
    phone: userData?.phone,
    email: userData?.email,
    price: 500,
    // passengerDetails: araydata,
  };
  const bookingSubmited = async (e) => {
    // e.preventDefault();
    // history.push("/client/passenger-detail");

    const data = {
      busId: props.id,
      noOfSeats: selectedSeats.length,
      phone: userData.phone,
      email: userData.email,
      price: 500,
      // passengerDetails: araydata,
    };
    const response = await dispatch(bookSeats(data));
    console.log("responseBook1", response?.payload?.data?.message);
    if (response?.payload?.data?.message) {
      history.push("/client/passenger-detail");
    }
    console.log("userData123", userData?.price);
  };

  const dataSending = 30;

  const nextClicked = () => {
    const priceData = {
      passengerNumber: selectedSeats.length,
      fareAmount: totalPrice,
      seatsAllocation: selectedSeats,
      // departureCity: busData[0]?.routeFrom,
      // arrivalCity: busData[0]?.routeTo,
      // departure: busData[0]?.departureTime,
      // arrival: busData[0]?.arrivalTime,
      // date: busData[0]?.date,
    };

    dispatch(sendPriceData(priceData));
  };

  console.log("selectedSeats", selectedSeats.length);

  const buttonClickedClasses = (flag, item, occuSeats) => {
    const result = occuSeats.filter((number) => item.seatNo === number);
    console.log("flag", flag);
    console.log("item.seatNo ", item.seatNo);
    console.log(occuSeats.indexOf(item.seatNo));
    console.log("occuSeats", occuSeats);
    // console.log("result", result[0]);

    // if (result[0] === item.seatNo) {
    //   console.log("resultresult", result);

    //   return "occupiedSeatClass";
    // }

    // if (flag === true) {
    //   return "busSteatBookBooked";
    // }
    // if (flag === false) {
    //   return "busSteatBook";
    // }
  };

  return (
    <>
      <TabPanel value={value} index={0}>
        <Grid
          container
          className="availableContainer"
          justifyContent="space-between"
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            xs={12}
            align="center"
            className="mapContainer"
            style={{ padding: "20px 0" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Available Seats" {...a11yProps(0)} />
              <Tab label="Refunds" {...a11yProps(1)} />
            </Tabs>

            <div className="legendIndicator1">
              <div className="emptySeat">
                <p>Empty Seat:</p>
                <div></div>
              </div>
              <div className="emptySeat2">
                <p>Reserved Seat:</p>
                <div></div>
              </div>
              <div className="emptySeat3">
                <p>Selected Seat:</p>
                <div></div>
              </div>
            </div>
            <div className="topEnterSeats">
              <p>Please select your Seats Below:</p>
              {/* <input
                placeholder="Enter number of the seats"
                type="number"
                onChange={handleChangeSeats}
              /> */}
            </div>
            <div className="steering-wheel">
              <TbSteeringWheel style={{ fontSize: "40px" }} />
            </div>
            {arayCount?.map((data, index) => (
              <div key={index} className="topInputPassengerDetail">
                <p>Enter detail of Passengeraaa</p>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => handleClientDdetails(e, index)}
                />
                <input
                  name="age"
                  type="number"
                  placeholder="Enter Age"
                  onChange={(e) => handleClientDdetails(e, index)}
                />
                <input
                  name="gender"
                  type="text"
                  placeholder="Enter Gender"
                  onChange={(e) => handleClientDdetails(e, index)}
                />
                <div></div>
              </div>
            ))}

            <Grid
              container
              className="mapWrapper"
              align="center"
              justifyContent="center"
              style={{ paddingTop: "10px" }}
            >
              <div
                id="seat-map"
                class="seatCharts-container"
                tabindex="0"
                aria-activedescendant="2_2"
              >
                {arraytwo.map((item, i) => {
                  return (
                    <div
                      // className="busSteatBook"
                      className={buttonClickedClasses(
                        item.flag,
                        item,
                        props.occupiedSeats
                      )}
                      onClick={(e) =>
                        seatSelectedClicked(i, item, props.occupiedSeats)
                      }
                      key={i}
                    >
                      <div
                        className={`seat-wrapper ${
                          item.flag ? "seat-selected" : ""
                        } ${
                          props.occupiedSeats.indexOf(item.seatNo) != -1
                            ? "reserved-seat"
                            : "empty-seat"
                        }`}
                      >
                        {item.seatNo}
                      </div>
                    </div>
                  );
                })}
                {/* {[...Array(45)].map((item, i) => {
                  return <div className="busSteatBook">{i + 1}</div>;
                })} */}
              </div>
              {/* <div
                id="seat-map"
                class="seatCharts-container"
                tabindex="0"
                aria-activedescendant="2_2"
              >
                <div class="front-indicator">Front</div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">1</div>
                  <div
                    id="1_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    1
                  </div>
                  <div
                    id="1_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell unavailable"
                  >
                    2
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="1_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    3
                  </div>
                  <div
                    id="1_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    4
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">2</div>
                  <div
                    id="2_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    5
                  </div>
                  <div
                    id="2_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                    // style={{display:"none"}}
                  >
                    6
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="2_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    7
                  </div>
                  <div
                    id="2_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    8
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">3</div>
                  <div
                    id="3_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    9
                  </div>
                  <div
                    id="3_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    10
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="3_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    11
                  </div>
                  <div
                    id="3_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    12
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">4</div>
                  <div
                    id="4_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell unavailable"
                  >
                    13
                  </div>
                  <div
                    id="4_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    14
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="4_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    15
                  </div>
                  <div
                    id="4_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    16
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">5</div>
                  <div
                    id="5_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    17
                  </div>
                  <div
                    id="5_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    18
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">6</div>
                  <div
                    id="6_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    19
                  </div>
                  <div
                    id="6_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    20
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="6_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    21
                  </div>
                  <div
                    id="6_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    22
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">7</div>
                  <div
                    id="7_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell unavailable"
                  >
                    23
                  </div>
                  <div
                    id="7_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell unavailable"
                  >
                    24
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="7_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    25
                  </div>
                  <div
                    id="7_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    26
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">8</div>
                  <div
                    id="8_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    27
                  </div>
                  <div
                    id="8_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    28
                  </div>
                  <div class="seatCharts-cell seatCharts-space"></div>
                  <div
                    id="8_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    29
                  </div>
                  <div
                    id="8_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    30
                  </div>
                </div>
                <div class="seatCharts-row">
                  <div class="seatCharts-cell seatCharts-space">9</div>
                  <div
                    id="9_1"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    31
                  </div>
                  <div
                    id="9_2"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    32
                  </div>
                  <div
                    id="9_3"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    33
                  </div>
                  <div
                    id="9_4"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    34
                  </div>
                  <div
                    id="9_5"
                    role="checkbox"
                    aria-checked="false"
                    focusable="true"
                    tabindex="-1"
                    class="seatCharts-seat seatCharts-cell available"
                    onClick={(e) => toggleSeat(e)}
                  >
                    35
                  </div>
                </div>
              </div> */}
            </Grid>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            md={12}
            xs={12}
            className="priceSection"
            style={{ padding: "20px 0" }}
          >
            <Grid item xs={12} className="container">
              <p className="heading">Booking Details</p>
              <p className="seatNo">Selected Seats ({selectedSeats.length}):</p>
              {/* <ul className="seatDetails">
                <li className="individualSeat">Seat # 1</li>
                <li className="individualSeat">Seat # 9</li>
              </ul> */}
            </Grid>
            <Grid item xs={12} className="fare">
              <p className="finalPrice">
                Total Fare:{" "}
                <span>
                  <strong>{totalPrice}</strong>
                </span>
              </p>
            </Grid>
            <Grid item xs={12} className="btnWrap">
              {/* <Link to="/client/passenger-detail"> */}
              <Link
                onClick={nextClicked}
                to={{
                  pathname: "/client/passenger-detail",
                  state: dataSender,
                }}
              >
                <button onClick={bookingSubmited}>Next</button>
              </Link>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item xs={12} className="tableWrapper">
          <table className="cancellationTable">
            <thead className="cancellationHead">
              <tr className="cancellationRow">
                <th className="cancellation">Hours before Departure</th>
                <th className="cancellation">Refund Percentage</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr className="tableRow">
                <td className="cancellation">Before 0 Hrs.</td>
                <td className="cancellation">0%</td>
              </tr>
              <tr className="tableRow">
                <td className="cancellation">Before 24 Hrs.</td>
                <td className="cancellation">30%</td>
              </tr>
              <tr className="tableRow">
                <td className="cancellation">Before 48 Hrs.</td>
                <td className="cancellation">60%</td>
              </tr>
              <tr className="tableRow">
                <td className="cancellation">Before 60 Hrs.</td>
                <td className="cancellation">75%</td>
              </tr>
              <tr className="tableRow">
                <td className="cancellation">Above 60 Hrs.</td>
                <td className="cancellation">80%</td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} className="policy">
          <p className="heading">Terms & Conditions</p>
          <ul className="policyListing">
            <li className="list">
              The penalty is subject to 24 hrs before departure. No Changes are
              allowed after that.
            </li>
            <li className="list">The charges are per seat.</li>
            <li className="list">
              Partial cancellation is not allowed on tickets booked under
              special discounted fares.
            </li>
            <li className="list">
              In case of no-show or ticket not cancelled within the stipulated
              time, only statutory taxes are refundable subject to Service Fee.
            </li>
          </ul>
        </Grid>
      </TabPanel>
    </>
  );
};
export default BasicTabs;
