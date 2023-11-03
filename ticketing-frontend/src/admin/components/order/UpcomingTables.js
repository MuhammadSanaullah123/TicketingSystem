import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import Moment from "react-moment";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import EditDeleteButton from "../table/EditDeleteButton";
import Status from "../table/Status";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import BusDrawer from "../drawer/BusDrawer";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
// API
import { getBookings } from "../../../actions/bookings";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const UpcomingBookings = ({
  orders,
  bookings: { upcomingBookings },
  trips: { allTrips },
  buses: { buses },
}) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      {/* <MainDrawer>
        <BusDrawer id={serviceId} />
      </MainDrawer> */}

      <TableBody>
        {upcomingBookings != undefined &&
          upcomingBookings.map((item, index) => {
            const trip = allTrips.filter((trip) => trip._id === item.trip);
            const bus = buses.filter((bus) => bus._id === trip[0].busId);
            return (
              <TableRow key={index}>
                <TableCell>
                  <span className="text-sm">{item.bookingId}</span>
                </TableCell>
                {/*   <TableCell>
                <span className="text-sm">Faisal Movers</span>
              </TableCell> */}
                <TableCell>
                  <span className="text-sm">{bus[0].busType}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    <Moment format="DD/MM/YYYY ">{item.date}</Moment>
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm ">
                    <Moment format="DD/MM/YYYY hh:mm">
                      {trip[0].departureTime}
                    </Moment>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">
                    <Moment format="DD/MM/YYYY hh:mm">
                      {trip[0].arrivalTime}
                    </Moment>
                  </span>
                </TableCell>
                <TableCell>
                  {" "}
                  <span className="text-sm">Credit/Debit</span>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <span className="text-sm font-semibold">
                    {item?.price}
                  </span>{" "}
                </TableCell>
                <TableCell>
                  {/* <Status status={item.bookingStatus} /> */}
                  <span className="text-sm font-semibold">
                    {item.bookingStatus}
                  </span>{" "}
                </TableCell>
                <TableCell>
                  {item.isPaymentDone ? (
                    <span className="text-sm font-semibold">Done</span>
                  ) : (
                    <span className="text-sm font-semibold">Not Yet</span>
                  )}

                  {/* <EditDeleteButton
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              /> */}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </>
  );
};

UpcomingBookings.propTypes = {
  // addBus: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bookings: state.bookings,
  trips: state.trips,
  buses: state.buses,
});

export default connect(mapStateToProps, null)(UpcomingBookings);
