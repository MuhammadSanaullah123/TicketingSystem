import React from "react";
import pic1 from "./../../../assets/chatUserImages/bus.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, } from "react-router-dom";
import "./SingleBusDetail.css";

const SingleBusDetail = (props) => {


  
  const busData = useSelector(
    (state) => state?.userReducer?.singleBusDetail?.busDetails
  );

  console.log("busData?.bus_facilities",busData?.bus_facilities)

  return (
    <>
      <div>
        <div className="topBusImg">
          <img src={pic1} className="busDetailImg" />

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
              <td>{busData?.operatorId?.name}</td>
            </tr>
            <tr>
              <th>Departure</th>
              <td>{busData.departureTime}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>5hours</td>
            </tr>
            <tr>
              <th>Arrival</th>
              <td>{busData.arrivalTime}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{busData.price}</td>
            </tr>
            <tr>
              <th>Available Seats</th>
              <td>{busData.availableSeats}</td>
            </tr>
            <tr>
              <th>Baggage</th>
              <td>{busData.baggage}kg Allowed</td>
            </tr>
          </table>

          <table className="tableSingleBus">
            <p className="headingBusBusTable">Bus Facilities</p>
            <tr>
              <th>{busData?.bus_facilities[0]?.value}</th>
              <td>{busData?.bus_facilities[0]?.label}</td>
            </tr>
            <tr>
              <th>{busData?.bus_facilities[1]?.value}</th>
              <td>{busData?.bus_facilities[1]?.label}</td>
            </tr>
            <tr>
              <th>{busData?.bus_facilities[2]?.value}</th>
              <td>{busData?.bus_facilities[2]?.label}</td>
            </tr>
            <tr>
              <th>{busData?.bus_facilities[3]?.value}</th>
              <td>{busData?.bus_facilities[3]?.label}</td>
            </tr>
            <tr>
              <th>{busData?.bus_facilities[4]?.value}</th>
              <td>{busData?.bus_facilities[4]?.label}</td>
            </tr>
            <tr>
              <th>{busData?.bus_facilities[5]?.value}</th>
              <td>{busData?.bus_facilities[5]?.label}</td>
            </tr>
          </table>
          <Link 
          to={{
            pathname:"/client/review",
            state:busData
          }}
          
          >
            <button className="rateBtn">Rate us</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBusDetail;
