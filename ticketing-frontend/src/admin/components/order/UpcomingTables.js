import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
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

const UpcomingBookings = ({ orders, bookings: { upcomingBookings } }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      {/* <MainDrawer>
        <BusDrawer id={serviceId} />
      </MainDrawer> */}

      <TableBody>
        {upcomingBookings != undefined &&
          upcomingBookings.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="text-sm">{43564542}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">Faisal Movers</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item?.busId?.busType}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">12/07/2022</span>
              </TableCell>

              <TableCell>
                <span className="text-sm ">{item?.busId?.departureTime}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm ">{item?.busId?.arrivalTime}</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="text-sm">Credit/Debit</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <span className="text-sm font-semibold">
                  {item?.busId?.price}
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
          ))}
      </TableBody>
    </>
  );
};

UpcomingBookings.propTypes = {
  // addBus: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bookings: state.bookings,
});

export default connect(mapStateToProps, null)(UpcomingBookings);
