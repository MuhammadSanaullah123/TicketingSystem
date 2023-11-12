import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ImWarning } from "react-icons/im";
import Moment from "react-moment";

// import Tooltip from "../tooltip/Tooltip";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  TableCell,
  TableBody,
  TableRow,
  Badge,
  Avatar,
} from "@windmill/react-ui";
import { FiEye } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ProductDrawer from "../drawer/BusDrawer";
import ShowHideButton from "../table/ShowHideButton";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import { map } from "rsuite/esm/utils/ReactChildren";
import EditDrawerTripAdmin from "../drawer/EditDrawerTripAdmin";
// Redux
import { getExclusiveTrips, getRegularTrips } from "../../../actions/trips";
import store from "../../../store";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { deleteTrip } from "../../../actions/trips";

const ExclusiveTripsTable = ({
  trips: { loadingExclusive, exclusiveTrips },
  products,
}) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  useEffect(() => {
    store.dispatch(getExclusiveTrips());
  }, []);

  const onClickDeleteTrip = (id) => {
    console.log("ISNBIDEeeeeeeeeeeeeeeeeeeeee");
    console.log("id");
    console.log(id);

    store.dispatch(deleteTrip(id));
    handleGetExclusiveTrip();
  };

  const handleGetExclusiveTrip = () => {
    setTimeout(() => {
      store.dispatch(getExclusiveTrips());
    }, 2000);
  };

  return (
    <>
      {/*  <MainModal id={serviceId} /> */}
      {/* <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer> */}
      <TableBody>
        {exclusiveTrips != undefined &&
          exclusiveTrips.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item._id}</TableCell>
              <TableCell>
                {console.log("item._id", item._id)}
                <span className="text-xs uppercase font-semibold">
                  {" "}
                  {item.busId.busNumber}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">{item.price}</span>
              </TableCell>
              {/* <TableCell>
                <span className="text-xs font-medium">
                  {item.routeFrom} To {item.routeTo}
                </span>
              </TableCell> */}
              <TableCell>
                <span className="text-sm font-semibold">
                  {item.routeFrom}-{" "}
                  <Moment format="hh:mm A">{item.departureTime}</Moment>
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {item.routeTo}-{" "}
                  <Moment format="hh:mm A">{item.arrivalTime}</Moment>
                </span>
              </TableCell>
              {/* <TableCell>
       
      
                {item.status}
            </TableCell> */}

              {/* <TableCell>
                <span className="text-sm font-semibold">{item.totalSeats}</span>
              </TableCell> */}
              {/* <TableCell>
                <span className="text-sm font-semibold topFacSpan">
                  {item.bus_facilities != undefined &&
                    item.bus_facilities.map((dataFac) => (
                      <span className="text-sm font-semibold topFacSpan">
                        {dataFac.value}
                      </span>
                    ))}
                </span>
              </TableCell> */}

              {/* <TableCell align="center">
                {item.seatSelection === true ? (
                  <label class="switch1">
                    <input type="checkbox" checked />
                    <span class="sliderBus roundBus"></span>
                  </label>
                ) : (
                  <label class="switch1">
                    <input type="checkbox" disabled />
                    <span class="sliderBus roundBus"></span>
                  </label>
                )}
                
              </TableCell> */}
              <TableCell className="topEditDeleteButtonBusTable">
                <div className="topEditBusDrawer">
                  <EditDrawerTripAdmin
                    selectedTrip={item}
                    handleGetExclusiveTrip={handleGetExclusiveTrip}
                  />
                </div>

                <EditDeleteButton
                  id={item._id}
                  busData={exclusiveTrips.busId}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  onClickDeleteBus={() => onClickDeleteTrip(item._id)}
                />

                {/* <div className="alertBoxCancelBooking">
            <ImWarning className="warningIcon" />
            <p>You want to cancel Booking?</p>
            <div className="topYesNO"> 
              <p className="noTxtAlert" >No</p>
              <p className="yesTxtAlert" >Yes</p>
            </div>
          </div> */}

                {/* <div className="flex justify-end text-right topTrashIcon">
                  <div
                    onClick={() => handleModalOpen(id)}
                    className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                  >
                    <Tooltip
                      id="delete"
                      Icon={FiTrash2}
                      title="Delete"
                      bgColor="#EF4444"
                    />
                  </div>
                </div> */}
              </TableCell>
            </TableRow>
          ))}

        {/* ))} */}
      </TableBody>
    </>
  );
};

ExclusiveTripsTable.propTypes = {
  // trips: propTypes.func.isRequired,
  // trip: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.trips,
});

export default connect(mapStateToProps, null)(ExclusiveTripsTable);
