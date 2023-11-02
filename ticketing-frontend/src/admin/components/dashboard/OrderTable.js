import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import Status from "../table/Status";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { map } from "rsuite/esm/utils/ReactChildren";
import moment from "moment";
const OrderTable = ({ orders }) => {
  const recentBookings = useSelector(
    (state) => state?.userReducer?.recentBookingsAdminData?.data?.recentBookings
  );
  console.log("recentBookings", recentBookings);
  return (
    <>
      <TableBody>
        {/* {orders?.map((order) => ( */}
        {recentBookings != undefined &&
          recentBookings.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <span className="text-sm">{i}</span>
              </TableCell>

              <TableCell>
                <span className="text-sm">{item?.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item?.busId?.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item?.busId?.busNumber}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {/* {dayjs(order.createdAt).format('MMM D, YYYY')} */}
                  {moment(item?.createdAt).format("YYYY-MM-DD")}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm "> {item?.busId?.departureTime}</span>
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
                <Status status={"Yet To Depart"} />
              </TableCell>
            </TableRow>
          ))}
        {/* ))} */}
      </TableBody>
    </>
  );
};

export default OrderTable;
