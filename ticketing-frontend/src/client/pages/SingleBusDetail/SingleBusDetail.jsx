import React from "react";
import pic1 from "./../../../assets/chatUserImages/bus.png";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import moment from "moment";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SingleBusDetail.css";

const SingleBusDetail = ({
  props,
  trips: { allTrips },
  operators: { operators },
}) => {
  const busData = useSelector(
    (state) => state?.userReducer?.singleBusDetail?.busDetails
  );

  console.log("busData?.bus_facilities", busData?.bus_facilities);

  const currentTrip = allTrips?.filter((trip) => trip.busId === busData._id);
  const currentOperator = operators?.filter((operator) =>
    operator.busId.includes(busData._id)
  );
  console.log(currentTrip);
  console.log(currentOperator);

  return (
    <>
      <div>
        <div className="topBusImg">
          <img src={busData} className="busDetailImg" />

          <div className="textPartBusDetail">
            <p className="headingBusBusTable">About Bus</p>
            <p>
              The main terminal is located at the outskirts of Mingora city,
              lies at Fizagat Park, which is situated on the river bank. The
              terminal and the above mentioned vicinity represents a picturesque
              view and an admirably pleasant atmosphere. Moreover, this
              particular venue is also attracting the tourist to travel through
              this service because at a near distance hotel facilities are also
              available. Furthermore, this road leads towards Malam Jabba, a
              summer camping resort, as well as towards Madyan, Bahrain and
              Kalam valleys. In this regard, very particularly during the summer
              season, the company is also providing facilities to the tourist to
              visit the above stated beautiful valleys.
            </p>
          </div>
        </div>

        <div className="topBusDataDiv">
          <table className="tableSingleBus">
            <p className="headingBusBusTable">Bus Data</p>
            <tr>
              <th>Operator</th>
              <td>{currentOperator && currentOperator[0]?.operatorName}</td>
            </tr>
            {/*  <tr>
              <th>Departure</th>
              <td>
                <Moment format="DD/MM/YYYY hh:mm">
                  {currentTrip?.departureTime}
                </Moment>
              </td>
            </tr> */}
            {/*  <tr>
              <th>Duration</th>
              <td>
                {" "}
                {moment(currentTrip?.arrivalTime).diff(
                  moment(currentTrip?.departureTime),
                  "hours"
                ) / 60}{" "}
                Hours
              </td>
            </tr> */}
            {/*  <tr>
              <th>Arrival</th>
              <td>
                {" "}
                <Moment format="DD/MM/YYYY hh:mm">
                  {currentTrip?.arrivalTime}
                </Moment>
              </td>
            </tr> */}
            {/*   <tr>
              <th>Price</th>
              <td>{currentTrip?.price}</td>
            </tr> */}
            <tr>
              <th>Bus Type</th>
              <td>{busData?.busType}</td>
            </tr>
            <tr>
              <th>Total Seats</th>
              <td>{busData?.totalSeats}</td>
            </tr>
            <tr>
              <th>Available Seats</th>
              <td>{busData?.availableSeats}</td>
            </tr>
            <tr>
              <th>Baggage</th>
              <td>{busData?.baggage}kg Allowed</td>
            </tr>
          </table>
          <table className="tableSingleBus">
            <p className="headingBusBusTable">Bus Facilities</p>

            {busData?.bus_facilities?.map((item, index) => (
              <tr key={index}>
                <th>{item}</th>
              </tr>
            ))}
          </table>

          <Link
            to={{
              pathname: "/client/review",
              state: busData,
            }}
            style={{
              height: "fit-content",
            }}
          >
            <button className="rateBtn">Rate us</button>
          </Link>
        </div>
      </div>
    </>
  );
};

SingleBusDetail.propTypes = {
  // addLike: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  buses: state.buses,
  trips: state.trips,
  operators: state.operators,
});

export default connect(mapStateToProps, null)(SingleBusDetail);
