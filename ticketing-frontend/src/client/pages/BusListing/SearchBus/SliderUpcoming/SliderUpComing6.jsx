import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "./SliderUpcoming.css";

import { sendSearchData } from "../../../../../Redux/userReducer";
import {
  format,
  addDays,
  lastDayOfWeek,
  getWeek,
  getMonth,
  getYear,
  addWeeks,
  subWeeks,
  subDays,
} from "date-fns";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { searchBus } from "../../../../../Redux/userReducer";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "20px 20px 0px 20px",
      width: theme.spacing(16),
      height: "auto",
    },
  },
  paper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "30px 0px",
  },
  calender: {
    float: "right",
    margin: "20px 10px",
  },
  heading: {
    marginLeft: "20px",
  },
  layout: {
    margin: "40px 20px",
  },
  icon: {
    border: "1px solid #ADD8E6",
    padding: "5px",
    color: "#0000FF",
  },
  Dateicon: {
    display: "inline-block",
    border: "1px solid #ADD8E6",
    padding: "5px",
    color: "#0000FF",
  },
  view: {
    padding: "5px",
    width: "120px",
  },
  week: {
    color: "#0000FF",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "18px",
  },
  day: {
    color: "#000000c9",
    fontSize: "24px",
  },
  main: {
    background: "#8080802b",
    padding: "0px 20px",
  },
}));

export default function SliderUpcoming6(props) {
  const classes = useStyles();

  let history = useHistory();
  let tempData = [];
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [flagInner, setFlagInner] = useState(false);
  let [data, setData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));

  let newData2;
  if (
    index != 0 &&
    index != 1 &&
    index != 2 &&
    index != 3 &&
    index != 4 &&
    index != 5 &&
    index != 6
  ) {
    const newData = new Date(props?.date);
    newData2 = subDays(newData, 3);
  }
  const [startDate, setStartDate] = useState(newData2);
  const [currentYear, setCurrentYear] = useState(getYear(currentMonth));
  const [currentMonthNumber, setCurrentMonthNumber] = useState(
    getMonth(currentMonth) + 1
  );
  const [size, setSize] = useState([0, 0]);
  const [index, setIndex] = useState();
  const [dateMain, setDateMain] = useState(new Date());

  const month1 = getMonth(currentMonth) + 1;

  console.log("dateMain", dateMain);
  const changeWeekHandle = (btnType) => {
    setData([]);
    setIndex(10);
    if (btnType === "prev") {
      setStartDate((date) => {
        return subDays(date, 3);
      });
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
      setCurrentYear(getYear(currentMonth));
      setCurrentMonthNumber(getMonth(currentMonth) + 1);
      setDateMain(currentMonth);
    }
    if (btnType === "next") {
      setStartDate((date) => {
        return addDays(date, 3);
      });
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
      setCurrentYear(getYear(currentMonth));
      setCurrentMonthNumber(getMonth(currentMonth));
      setDateMain(currentMonth);
    }
  };
  const ExampleCustomInput = ({ value, onClick }) => {
    return <CalendarTodayIcon className={classes.Dateicon} onClick={onClick} />;
  };

  useEffect(() => {});
  const renderCells = () => {
    console.log("dateRenderCells");

    const dateClicked = () => {
      console.log("dateClicked");
    };
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d ";
    const dateFormatMonth = " MMM ";
    const dateFormatWeek = "EEE";

    const rows = [];
    let days = [];

    let day = startDate;
    console.log("startDatestartDate", startDate);
    let formattedDate = "";
    let formattedDateMonth = "";
    let formattedDateWeek = "";
    let dateCurrentSelected = "";

    for (let i = 0; i < 3; i++) {
      console.log(day);
      formattedDate = format(day, dateFormat);
      formattedDateMonth = format(day, dateFormatMonth);
      formattedDateWeek = format(day, dateFormatWeek);
      dateCurrentSelected = day;
      const obj = {
        a: formattedDate,
        b: formattedDateMonth,
        c: formattedDateWeek,
        d: dateCurrentSelected,
      };
      console.log("objobjobj", obj);
      if (index != 0 && index != 1 && index != 2 && index != 3 && index != 4) {
        console.log("obj", obj);
        if (data.length >= 0 && data.length < 3) {
          data.push(obj);
        }
        console.log("dataGGG", data);
      }

      if (index === 0) {
        if (i === 0 && data.length > 6 && flagInner === true) {
        }
        if (i === 0 && data.length > 2 && flagInner === false) {
          console.log("iiiiiiiiiiii", i);
          console.log("data.length", data.length);

          data.splice(data.length - 1, 1);
        }
        console.log("dataUnshiftBeforIF", data);

        if (data.length >= 2 && data.length < 3) {
          tempData.push(obj);

          console.log("tempData", tempData);

          if (data.length === 2) {
            if (tempData[0]) {
              data.unshift(tempData[0]);
            }
          }

          if (data.length === 3) {
            setFlagInner(true);
          }
        }
      }

      if (index === 2) {
        if (i === 0 && data.length > 6 && flagInner === true) {
        }
        if (i === 0 && data.length > 2 && flagInner === false) {
          console.log("iiiiiiiiiiii", i);

          //   data.shift();
          data.shift();

          console.log("data.data", data);
        }
        console.log("dataUnshiftBeforIF", data);

        if (data.length >= 2 && data.length < 3) {
          tempData.push(obj);

          console.log("objInnerIndex5", tempData);
          console.log("dataObj2", obj);
          console.log("dataObj", data);

          //   if (tempData[3] && data.length === 3) {
          //     data.push(tempData[3]);
          //   }
          if (tempData[2] && data.length === 2) {
            data.push(tempData[2]);
          }

          if (data.length === 3) {
            console.log("setFlagLength6");
            setFlagInner(true);
            console.log("innerFlag3", flagInner);
          }
        }

        console.log("data.lengthdata.length", data.length);

        console.log("dataUnshiftdataUnshift", data);
      }

      days != [] &&
        days.push(
          <div
            key={day}
            className={classes.view}
            style={{ display: "inline-block" }}
          >
            <div className={classes.week}>{formattedDateWeek}</div>
            <div className={classes.day}>{formattedDate}</div>
            <div>{formattedDateMonth}</div>
          </div>
        );
      day = addDays(day, 1);
    }
    console.log("datadata", data);

    rows.pop();
    rows.push(<div key={day}>{days}</div>);
    days = [];

    console.log("sizeSlider", size);

    return (
      <div className={classes.main}>
        <Grid container>
          <Grid item lg={2}>
            <div>
              <h4>Rooms & Rates</h4>
            </div>
          </Grid>
          <Grid item lg={10}>
            <div onClick={dateClicked}>{rows}</div>
          </Grid>
        </Grid>
      </div>
    );
  };

  renderCells();

  const cardSliderClicked = async (item, index) => {
    console.log("index)", index);

    if (index === 0) {
      setIndex(0);

      if (flagInner === true) {
        setFlagInner(false);
      }
      setStartDate((date) => {
        return subDays(date, 1);
      });
    }
    if (index === 2) {
      setIndex(2);

      if (flagInner === true) {
        setFlagInner(false);
      }
      setStartDate((date) => {
        return addDays(date, 1);
      });
    }

    // if (index === 6) {
    //   setIndex(6);

    //   if (flagInner === true) {
    //     setFlagInner(false);
    //   }
    //   setStartDate((date) => {
    //     return addDays(date, 3);
    //   });
    // }
    // if (index === 5) {
    //   setIndex(5);

    //   if (flagInner === true) {
    //     setFlagInner(false);
    //   }
    //   setStartDate((date) => {
    //     return addDays(date, 2);
    //   });
    // }
    // if (index === 4) {
    //   setIndex(4);

    //   if (flagInner === true) {
    //     setFlagInner(false);
    //   }
    //   setStartDate((date) => {
    //     return addDays(date, 2);
    //   });
    // }
    // if (index === 3) {
    //   setIndex(3);

    //   if (flagInner === true) {
    //     setFlagInner(false);
    //   }
    //   setStartDate((date) => {
    //     return addDays(date, 1);
    //   });
    // }

    setIndex(index);

    console.log("item", item);

    const formData = {
      from: "Multan",
      to: "Lahore",

      date: moment(item.d).format("YYYY-MM-DD"),
    };

    console.log("formData", formData);

    const respone = await dispatch(searchBus(formData));

    dispatch(sendSearchData(formData));

    console.log("respone", respone);
    if (respone?.payload?.status) {
      history.push(
        `/client/bus-listing?from=${formData.from}&to=${formData.to}&date=${formData.date}`
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

  return (
    <>
      <div className={classes.root}>
        <Paper
          className={classes.paper}
          variant="outlined"
          elevation={0}
          id="topTextSlider"
        >
          <p className="selectDateTxt">Select A Date</p>
          <div className="tpSliderData">
            <div
              style={{ display: "inline-block" }}
              className="arrowsSliderPricePrev"
            >
              <ArrowBackIosIcon onClick={() => changeWeekHandle("prev")} />
            </div>
            <div className="topDateSlideCardMain">
              {data.map((item, i) => (
                <div
                  key={i}
                  className={
                    i === 3 ? "topDateSlideCardClicked" : "topDateSlideCard"
                  }
                  onClick={() => cardSliderClicked(item, i)}
                  // style={{background:currentDate.getDate() > item.d.getDate()?"lightgray":"",pointerEvents:currentDate.getDate() > item.d.getDate()?"none":"" }}
                >
                  <div className="dayTxtSlider">{item.c}</div>
                  <p className="mDayTxtSlider">
                    {item.a} <span> {item.b}</span>
                  </p>
                  <div className="priceTxtSlider">
                    <span className="priceTxtSliderSp">From</span> SAR 159.
                    <span className="priceTxtSliderSp">00</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{ display: "inline-block" }}
              className="arrowsSliderPrice"
            >
              <ArrowForwardIosIcon onClick={() => changeWeekHandle("next")} />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}
