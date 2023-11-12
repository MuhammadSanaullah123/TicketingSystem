import React, { useEffect, useState } from "react";
//mui
import Cookies from "universal-cookie";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Moment from "react-moment";

import BasicTabs from "./BasicTabs";
import CloseIcon from "@mui/icons-material/Close";
import Amenities from "./Amenities";
import { useSelector, useDispatch } from "react-redux";
import { busDetail } from "../../../../Redux/userReducer";
import {
  emptySeats,
  emptyBookedSeats,
  selectSeats,
  addBookedSeats,
  addSelectedBus,
  removeSelectedBus,
} from "../features/seatsSlice";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const EachBusData = ({ bus, trip, operator }) => {
  const [loading, setLoading] = useState(true);
  //modal
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

  const history = useHistory();
  const store = useSelector((store) => store);
  /*   let {
    name,
    _id,
    ac,
    amenities,
    boarding_point,
    dropping_point,
    booked_seat,
    from,
    share_seat_price,
    single_seat_price,
    timing,
    to,
    type,
  } = data; */

  const [openSeats, setOpenSeats] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [showAmenties, setShowAmenties] = useState(false);
  const cookies = new Cookies();
  const handleCloseModal = () => setOpenModal(false);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
    // console.log(open)
  };

  const singBusDetailClicked = async () => {
    const user = {
      busId: bus[0]._id,
    };
    const response = await dispatch(busDetail(user));
    console.log("responseBusDetail", response);

    if (response.payload.success) {
      history.push("/client/singleBusDetail");
    }
  };

  const selectSeatClicked = () => {
    setShowAmenties(!showAmenties);
  };

  console.log(bus);
  console.log(trip);
  console.log(operator);

  return (
    // <></>

    <>
      <Grid container className="result-each" style={{ padding: "10px" }}>
        <Grid item xs={12} className="result-each-data">
          <Grid
            item
            xs={1.71}
            className="result-each-data-name"
            flexDirection="column"
          >
            <strong className="result-each-data-name-title">
              {operator[0]?.operatorName}
            </strong>
            {/*   <span className="result-each-data-name-type">Operator</span> */}
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-departure"
            flexDirection="column"
          >
            <span className="result-each-data-departure-time">
              {/* {moment(busData.departureTime).format("HH:mm")} */}

              <Moment format="DD/MM/YYYY hh:mm">{trip.departureTime}</Moment>
            </span>
            <span className="result-each-data-departure-place">
              {/* {boarding_point[0].placename} */}
              {trip.routeFrom}
            </span>
          </Grid>
          <Grid item xs={1.71}>
            <span className="result-each-data-total-time">
              {moment(trip.arrivalTime).diff(
                moment(trip.departureTime),
                "hours"
              ) / 60}{" "}
              Hours
              {/* {moment(busData?.arrivalTime).diff(moment(busData?.departureTime), "hours")} hr */}
            </span>
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-arrival"
            flexDirection="column"
          >
            <span className="result-each-data-arrival-time">
              {/* {moment(busData.arrivalTime).format("HH:mm")} */}

              <Moment format="DD/MM/YYYY hh:mm">{trip.arrivalTime}</Moment>
            </span>
            <span className="result-each-data-arrival-place">
              {trip.routeTo}
            </span>
          </Grid>
          <Grid item xs={1.71}>
            <span className="result-each-data-price">
              <span style={{ fontWeight: 400 }}>$</span> {trip.price}
            </span>
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-extra"
            flexDirection="column"
          > 
            <span className="result-each-data-extra-available">
              <span className="bold">
                {bus[0].totalSeats - bus[0].occupiedSeats.length}
              </span>{" "}
              Available
            </span>
            {/*  <span className="result-each-data-extra-windows">
              <span className="bold">20</span> Windows
            </span> */}
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-extra"
            flexDirection="column"
          >
            <span className="result-each-data-extra-available">
              <span className="bold">{bus[0].baggage}</span> Allowed
            </span>
          </Grid>
        </Grid>

        <Grid
          item
          className="result-each-amenities"
          justifyContent="space-between"
          flexDirection="row"
          style={{ width: "100%" }} 
        >
          <Grid item display="flex" flexDirection="row" alignItems="self-end">
            {/* <Amenities data={busData?.bus_facilities} /> */}
            {(bus[0]?.bus_facilities).map((amenity, index) => (
              <div style={{ fontSize: "25px" }} key={index}>
                {amenity.value}
              </div>
            ))}
            {/* {console.log("busData.bus_facilities",busData.bus_facilities[0].value)} */}
          </Grid>
          {/*  <Grid item>
            <h3 className="rating-title">Customer Ratings</h3>
            <ReactStars count={5} size={24} activeColor="#ffd700" />
          </Grid> */}
          <div>
            <button
              className="result-each-seats-button"
              onClick={singBusDetailClicked}
              style={{ marginRight: "10px" }}
            >
              View Bus Detail
            </button>

            {/* {isLogin && ( */}
            <button
              className="result-each-seats-button"
              onClick={handleOpenModal}
            >
              {openSeats ? <span>Hide</span> : <span>View</span>} and select
              Seat
            </button>
            {/* )} */}

            {/* {isLogin == undefined && ( */}
            {/* <Link to="/client/login">
            <button
              className="result-each-seats-button"
              onClick={handleOpenModal}
            >
              Please login to select seats
            </button>
          </Link> */}
            {/* )} */}
          </div>
        </Grid>

        {/* {showAmenties&& <div className="topAmentities">
          <div className="topAmentitiesDesc">
            <div className="topRowAmenDesc">
              <p>Travel</p>
              <p>
                <span className="amountSideTxt">Sar</span>409.00
              </p>
            </div>
            <div className="middleRowAmenDesc">
              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic4} />
                <div className="topTextPartAment">
                  
                  <p>Checked Bag</p>
                  <p className="btmDescAmen">Not Included</p>
                </div>
              </div>

              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic10} />
                <div className="topTextPartAment">
                <p>Seat Selection</p>
                  <p className="btmDescAmen">Fees Apply</p>
             
                
                  
                </div>
              </div>

              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic6} />
                <div className="topTextPartAment">
                <p>Meal</p>
                  <p className="btmDescAmen">Available for purchase</p>
               
                </div>
              </div>

              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic8} />
                <div className="topTextPartAment">
                 
                  <p>Carry-0n bag</p>
                  <p className="btmDescAmen">1*7kg</p>
                </div>
              </div>
              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic2} />
                <div className="topTextPartAment">
                  <p>Change booking</p>
                  <p className="btmDescAmen">Fees Apply</p>
                </div>
              </div>
            </div>
            <div className="selectBtn"
             onClick={handleOpenModal}
            >Select</div>
          </div>
          <div className="topAmentitiesDesc">
            <div className="topRowAmenDesc1">
              <p>Travel</p>
              <p>
                <span className="amountSideTxt">Sar</span>409.00
              </p>
            </div>
            <div className="middleRowAmenDesc">
              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic3} />
                <div className="topTextPartAment1">
                <p>Checked Bag</p>
                  <p className="btmDescAmen">Not Included</p>
                </div>
              </div>

              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic9} />
                <div className="topTextPartAment1">
                <p>Seat Selection</p>
                  <p className="btmDescAmen">Fees Apply</p>
             
                </div>
              </div>

              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic5} />
                <div className="topTextPartAment1">
                <p>Meal</p>
                  <p className="btmDescAmen">Available for purchase</p>
                </div>
              </div>

              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic7} />
                <div className="topTextPartAment1">
                <p>Carry-0n bag</p>
                  <p className="btmDescAmen">1*7kg</p>
                </div>
              </div>
              <div className="topAmentImgTxt">
                <img className="imgAmenties" src={pic1} />
                <div className="topTextPartAment1">
                <p>Change booking</p>
                  <p className="btmDescAmen">Fees Apply</p>
                </div>
              </div>
            </div>
            <div className="selectBtn1"
             onClick={handleOpenModal}
            >Select</div>
          </div>
        </div>} */}
      </Grid>

      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ borderRadius: "10px" }}
        >
          <Grid container justifyContent="center">
            <Grid
              item
              xl={6}
              lg={7}
              md={10}
              sm={11}
              xs={12}
              sx={style}
              style={{
                borderRadius: "15px",
                border: "thin solid #fff",
              }}
            >
              <Grid container className="ModalContainer">
                <Grid
                  item
                  xs={12}
                  flexDirection="row"
                  className="ModalWrapper"
                  justifyContent="space-between"
                  display="flex"
                >
                  <h5 className="heading">Bus Booking Details</h5>
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleCloseModal}
                  />
                </Grid>
                <Grid
                  container
                  className="tableContainer"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Grid
                    item
                    xl
                    lg
                    md
                    sm={12}
                    xs={12}
                    className="tableCol"
                    style={{ margin: "10px 0" }}
                  >
                    <p className="heading">{operator[0].operatorName}</p>
                    {/* <p className="Detail">AC Sleeper</p> */}
                  </Grid>
                  <Grid
                    item
                    xl
                    lg
                    md
                    sm={12}
                    xs={12}
                    className="tableCol"
                    style={{ margin: "10px 0" }}
                  >
                    <p className="heading">
                      {" "}
                      <Moment format="hh:mm">{trip.departureTime}</Moment>
                    </p>
                    {/*   <p className="Detail">Middle</p> */}
                  </Grid>
                  <Grid
                    item
                    xl
                    lg
                    md
                    sm={12}
                    xs={12}
                    className="tableCol"
                    style={{ margin: "10px 0" }}
                  >
                    <p className="heading">
                      {" "}
                      {moment(trip.arrivalTime).diff(
                        moment(trip.departureTime),
                        "hours"
                      ) / 60}{" "}
                      Hours
                    </p>
                    {/*        <p className="Detail">12 Stops</p> */}
                  </Grid>
                  <Grid
                    item
                    xl
                    lg
                    md
                    sm={12}
                    xs={12}
                    className="tableCol"
                    style={{ margin: "10px 0" }}
                  >
                    <p className="heading">
                      {" "}
                      <Moment format="hh:mm">{trip.arrivalTime}</Moment>
                    </p>
                    {/*  <p className="Detail">Surat</p> */}
                  </Grid>
                </Grid>
                <Grid item xs={12} className="TabContainer">
                  <BasicTabs
                    availableSeats={bus[0]?.totalSeats}
                    busId={bus[0]?._id}
                    occupiedSeats={bus[0]?.occupiedSeats}
                    busPrice={trip?.price}
                    trip={trip}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </div>
    </>
  );
};
export default EachBusData;
