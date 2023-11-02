import React, { useEffect, useState } from "react";
//mui
import Cookies from "universal-cookie";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import pic1 from "./../../../../assets/amentitiesAsset/booking.png";
import pic2 from "./../../../../assets/amentitiesAsset/bookingg.png";
import pic3 from "./../../../../assets/amentitiesAsset/carrying-bag.png";
import pic4 from "./../../../../assets/amentitiesAsset/carrying-bagg.png";
import pic5 from "./../../../../assets/amentitiesAsset/dinner.png";
import pic6 from "./../../../../assets/amentitiesAsset/dinnerg.png";
import pic7 from "./../../../../assets/amentitiesAsset/travel-bag.png";
import pic8 from "./../../../../assets/amentitiesAsset/travel-bagg.png";
import pic9 from "./../../../../assets/amentitiesAsset/waiting-room.png";
import pic10 from "./../../../../assets/amentitiesAsset/waiting-room-g.png";

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

const EachBusData = ({ data, busData, totalSeats, busId }) => {
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
  let {
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
  } = data;

  const [openSeats, setOpenSeats] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [showAmenties, setShowAmenties] = useState(false);
  const cookies = new Cookies();
  const handleCloseModal = () => setOpenModal(false);

  const isLogin = cookies.get("auth");

  const dispatch = useDispatch();

  console.log("busDatabusData", busData);
  const handleOpenModal = () => {
    setOpenModal(true);
    // console.log(open)
  };

  const singBusDetailClicked = async () => {
    const user = {
      busId: busData._id,
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
  useEffect(() => {
    // setLoading(false)
  }, [busData]);

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
              {busData?.operatorId?.name}
            </strong>
            <span className="result-each-data-name-type">Operator</span>
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-departure"
            flexDirection="column"
          >
            <span className="result-each-data-departure-time">
              {/* {moment(busData.departureTime).format("HH:mm")} */}
              {busData.departureTime}
            </span>
            <span className="result-each-data-departure-place">
              {/* {boarding_point[0].placename} */}
              {busData.routeFrom}
            </span>
          </Grid>
          <Grid item xs={1.71}>
            <span className="result-each-data-total-time">
              {/* {moment(busData.arrivalTime).diff(moment(busData.departureTime), "hours")} hr */}
              {/* {moment(busData?.arrivalTime).diff(moment(busData?.departureTime), "hours")} hr */}
              5hours
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
              {busData.arrivalTime}
            </span>
            <span className="result-each-data-arrival-place">
              {busData.routeTo}
            </span>
          </Grid>
          <Grid item xs={1.71}>
            <span className="result-each-data-price">
              <span style={{ fontWeight: 400 }}>$</span> {busData.price}
            </span>
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-extra"
            flexDirection="column"
          >
            <span className="result-each-data-extra-available">
              <span className="bold">{busData.totalSeats}</span> Available
            </span>
            <span className="result-each-data-extra-windows">
              <span className="bold">20</span> Windows
            </span>
          </Grid>
          <Grid
            item
            xs={1.71}
            className="result-each-data-extra"
            flexDirection="column"
          >
            <span className="result-each-data-extra-available">
              <span className="bold">{busData?.baggage}</span> Allowed
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
            {JSON.parse(busData?.bus_facilities).map((amenity, index) => (
              <div style={{ fontSize: "25px" }} key={index}>
                {amenity.value}
              </div>
            ))}
            {/* {console.log("busData.bus_facilities",busData.bus_facilities[0].value)} */}
          </Grid>
          <Grid item>
            <h3 className="rating-title">Customer Ratings</h3>
            <ReactStars count={5} size={24} activeColor="#ffd700" />
          </Grid>
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
                    <p className="heading">AK Tour & Travels</p>
                    <p className="Detail">AC Sleeper</p>
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
                    <p className="heading">12:00</p>
                    <p className="Detail">Middle</p>
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
                    <p className="heading">06h 32m</p>
                    <p className="Detail">12 Stops</p>
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
                    <p className="heading">05:15</p>
                    <p className="Detail">Surat</p>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="TabContainer">
                  <BasicTabs
                    availableSeats={busData?.totalSeats}
                    busId={busData?._id}
                    occupiedSeats={busData?.occupiedSeats}
                    busPrice={busData?.price}
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
