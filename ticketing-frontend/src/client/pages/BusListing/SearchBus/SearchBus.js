import React, { useState, useEffect ,useLayoutEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// import 'mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Datepicker, setOptions } from '@mobiscroll/react';

//mui
import Grid from "@mui/material/Grid";
import ModifyCurrentSearch from "./ModifyCurrentSearch";
import CurrentSearch from "./CurrentSearch";
import EachBusData from "./EachBusData";
import Loading from "./Loading";
import { addDate, selectBus } from "../features/seatsSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//icons
import CloseIcon from "@mui/icons-material/Close";

//import components
import SearchForm from "./SearchForm";
import BasicTabs from "./BasicTabs";
import Calendar from "./Calendar"
//import stylesheet
import "./SearchBus.scss";
import SliderUpcoming from "./SliderUpcoming/SliderUpcoming";
import SliderUpcoming9 from "./SliderUpcoming/SliderUpComing9";
import SliderUpcoming6 from "./SliderUpcoming/SliderUpComing6";
// API
import { getAllBuses } from "../../../../actions/buses"
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../../../store"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "90vh",
  overflow: "auto",
  p: 4,
};

const SearchBus = ({buses: { buses }}) => {
  let query = useQuery();
  let from = query.get("from");
  let to = query.get("to");
  let date = query.get("date");
  const busData = buses
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  let dispatch = useDispatch();
  let busSelectedId = useSelector(selectBus);
  const [modify, setModify] = useState(false);
  const [size, setSize] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const from1 = searchParams.get("from");
  const to1 = searchParams.get("to");
  const date1 = searchParams.get("date");
  const discount = searchParams.get("discount");
  const passengers = searchParams.get("passengers");

  console.log("from1to1",from1,to1,date1,discount,passengers)
  const handleOpenModal = () => {
    setOpenModal(true);
    // console.log(open)
  };
  const handleCloseModal = () => setOpenModal(false);
  useEffect(() => {
    let source = axios.CancelToken.source();
    dispatch(addDate(date));
    fetchData(source);

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [from, to, date]);

  async function fetchData(source) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // const response = await axios.get(`/bus/search?to=${to}&from=${from}`, {
    //   cancelToken: source.token,
    // });
    const response = [
      {
        ac: true,
        amenities: {
          blankets: false,
          charging_point: true,
          deep_cleaned_bus: false,
          emergency_contact_number: true,
          hand_sanitiser_provided: true,
          mobile_ticket: true,
          movie: false,
          newspaper: true,
          personaltv: false,
          pillow: false,
          reading_light: true,
          regular_temperature_check: false,
          staff_with_mask: true,
          track_my_bus: false,
          water_bottle: false,
          wifi: false,
        },
        boarding_point: [
          {
            add_time: 15,
            address: "N.I.T.Parking, Jagnade Square, near 7star Hospital",
            placename: "N.I.T. Parking, Jagnade Square",
            _id: "6073f4ff3a979d3b2b036f40",
          },
          {
            add_time: 30,
            address: "Ashirwad Talkies, near Karbala Dargah, Great Road",
            placename: "Ashirwad Talkies",
            _id: "6073f4ff3a979d3b2b36f41",
          },
          {
            add_time: 30,
            address: "Ashirwad Talkies, near Karbala Dargah, Great Road",
            placename: "Ashirwad Talkies",
            _id: "6073f4ff3a979d3b2b06f41",
          },
        ],
        booked_seat: [],
        dropping_point: [
          {
            address: "Namaskar Chowk",
            placename: "Namaskar Chowk",
            remove_time: 30,
            _id: "6073f4ff3a979d3bb036f43",
          },
          {
            address: "Namaskar Chowk",
            placename: "Namaskar Chowk",
            remove_time: 30,
            _id: "6073f4ff3a979d32b036f43",
          },
          {
            address: "Namaskar Chowk",
            placename: "Namaskar Chowk",
            remove_time: 30,
            _id: "6073f4ff3a979db2b036f43",
          },
        ],
        from: "Chennai",
        name: "Parveen Travels",
        share_seat_price: 779,
        single_seat_price: 961,
        timing: {
          arrival: "2021-04-12T16:21:31.782Z",
          departure: "2021-04-12T07:21:31.782Z",
        },
        to: "Cawnpore",
        type: "Sleeper(2T)",
        _id: "6073f4ff3a979d3b2b036f3f",
      },
    ];
    if (response) {
      console.log(response);
      setData(response);
      // setIsLoading(false);
    }
  }

  function onModifyClicked() {
    setModify(!modify);
  }

  useEffect(() => {
    store.dispatch(getAllBuses())
  },[])

  console.log("busDataSearchBus", busData);
  console.log("busData._id", busData?._id);

  //  console.log("busDataSearchBus1",busData[0].availableSeats)

  

  function useWindowSize() {
      
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useWindowSize();
  console.log("windowSize", size[0]);

  return (
    <>
      <div className="search-current">
        <SearchForm />
      </div>
      <Calendar />
      <Grid
        container
        className="result"
        justifyContent="space-between"
        style={{ margin: "10px 0" }}
      >
        <Grid item xs={12} align='center'>
          <> 
            <span className="to-fro-cities">{from1}</span> 
            <span className="to-text">To</span> 
            <span className="to-fro-cities">{to1}</span>
          </>
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={3}
          sm={12}
          xs={12}
          style={{
            background: "#fff",
            boxShadow:
              "2px 2px 8px -3px rgb(0 0 0 / 40%), -2px -2px 8px -3px rgb(0 0 0 / 40%)",
            padding: "20px",
            borderRadius: "10px",
            margin: "30px 0",
            paddingBottom: "30px",
          }}
        >
          
          <h2 className="filterTxtHeading">Filter</h2>
          <h5 className="subHeadingFilter">Bus Type</h5>
          <Grid item xs={12}>
            <Grid item xs={12} style={{ margin: "10px 0" }}>
              <input type="checkbox" />
              <label style={{ marginLeft: "10px" }} className="filterTypeTxt">
                Executive Class
              </label>
            </Grid>
            <Grid item xs={12} style={{ margin: "10px 0" }}>
              <input type="checkbox" />
              <label style={{ marginLeft: "10px" }} className="filterTypeTxt">
                Business Class
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h5 style={{ marginTop: "20px" }} className="subHeadingFilter">
              Operators
            </h5>
            <Grid item xs={12} style={{ margin: "10px 0" }}>
              <input type="checkbox" />
              <label style={{ marginLeft: "10px" }} className="filterTypeTxt">
                Faisal Movers
              </label>
            </Grid>
            <Grid item xs={12} style={{ margin: "10px 0" }}>
              <input type="checkbox" />
              <label style={{ marginLeft: "10px" }} className="filterTypeTxt">
                Daewoo Express
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xl={9.7}
          lg={9.7}
          md={8}
          sm={12}
          xs={12}
          style={{
            background: "#fff",
            boxShadow:
              "2px 2px 8px -3px rgb(0 0 0 / 40%), -2px -2px 8px -3px rgb(0 0 0 / 40%)",
            borderRadius: "10px",
            overflowX: "scroll",
            margin: "30px 0",
          }}
        >
            {/* <div className="result-loading">
              <Loading />
            </div> */}
          {
          isLoading ? (
            <div className="result-loading">
              <Loading />
            </div>
          ) : (
            <>
              {data?.length === 0 ? (
                <div>
                  <h3>No Result!!</h3>
                </div>
              ) : (
                <Grid
                  item
                  xs={12}
                  style={{ minWidth: "1000px" }}
                  className="topBusListingSearchedRes"
                >
                  {/* <h3>
                  {data.length} Buses{" "}
                  <span className="result-count">Found</span>
                </h3> */}
                  <Grid
                    container
                    className="ListingWrapper"
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderTop: "1px solid #dee2e6",
                      borderBottom: "1px solid #dee2e6",
                      padding: "10px",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">Operators</p>
                    </Grid>
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">Departure</p>
                    </Grid>
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">Duration</p>
                    </Grid>
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">Arrival</p>
                    </Grid>
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">Price</p>
                    </Grid>
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">Available Seats</p>
                    </Grid>
                    <Grid item xs={1.71} className="Listings">
                      <p className="headingBusListing">The Baggage</p>
                    </Grid>
                  </Grid>
                  {/* {busSelectedId === ""
                  ? data.length != 0 &&
                    data.map((eachbus) => {
                      return (<EachBusData key={eachbus._id} data={eachbus} handleOpenModal={handleOpenModal} busData={busData}  />);
                    })
                  : data.length != 0 &&
                    data.map((eachbus) => {
                      if (busSelectedId === eachbus._id)
                        return (<EachBusData key={eachbus._id} data={eachbus} busData={busData} handleOpenModal={handleOpenModal}  />);
                    })} */}
                  {busData != undefined &&
                    busData.map((eachbus, index) => {
                      return (
                        <>
                          <EachBusData
                            busId={eachbus?._id}
                            totalSeats={eachbus[index]?.totalSeats}
                            data={eachbus}
                            busData={eachbus}
                            handleOpenModal={handleOpenModal}
                          />
                          {console.log(
                            "eachbus[index]?.totalSeats",
                            eachbus?._id
                          )}
                        </>
                      );
                    })}
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {/* Modal */}
    </>
  );
}

SearchBus.propTypes = {
  // addLike: propTypes.func.isRequired
}

const mapStateToProps = state => ({
  buses: state.buses
})

export default connect(mapStateToProps, null)(SearchBus)