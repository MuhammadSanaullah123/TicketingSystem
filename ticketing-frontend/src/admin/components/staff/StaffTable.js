import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Avatar } from "@windmill/react-ui";
import "./StaffTable.css";
import { connect } from "react-redux";
import Moment from "react-moment";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import StaffDrawer from "../drawer/StaffDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import ShowHideButton from "../table/ShowHideButton";
import Status from "../table/Status";
import { useDispatch } from "react-redux";
import store from "../../../store";
import { updateRequest } from "../../../actions/request";
import propTypes from "prop-types";

const StaffTable = ({ handleGetAllRequests, requests: { allRequests } }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const dispatch = useDispatch();
  const handleStatusChange = (id) => {
    store.dispatch(updateRequest(id));
    handleGetAllRequests();
  };

  console.log(allRequests);

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>
      {allRequests?.map((request, index) => (
        <TableBody key={index}>
          {/* {staffs?.map((staff) => ( */}
          <TableRow>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {" "}
                {/* {staff._id.substring(20, 24)} */}
                {request.requestId}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {" "}
                {/* {staff._id.substring(20, 24)} */}
                {request.category}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {/* <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image}
                  alt={staff.name} 
                /> */}
                <div>
                  <h2 className="text-sm">
                    {/* {staff.name} */}
                    {request.name}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {staff.email} */}
                {request.email}
              </span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {staff.email} */}
                {request.mobnumber}
              </span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">
                {/* {staff.phone} */}
                {request.message}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">
                {/* {dayjs(staff.joiningData).format('MMM D, YYYY')} */}

                <Moment format="DD/MM/YYYY">{request.date}</Moment>
              </span>
            </TableCell>
            <TableCell>
              <button
                className={`text-sm font-semibold ${
                  request.status === true ? "approve" : "notapprove"
                }`}
                onClick={() => handleStatusChange(request._id)}
              >
                {/* {staff.role} */}
                {/*  <Status status={"Processing"} /> */}
                {request.status ? "Approved" : "Not Approved"}
              </button>
            </TableCell>
            {/* <TableCell>
              <EditDeleteButton
                // id={staff._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell> */}
          </TableRow>
          {/* ))} */}
        </TableBody>
      ))}
    </>
  );
};

StaffTable.propTypes = {
  updateRequest: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  requests: state.request,
});

export default connect(mapStateToProps, { updateRequest })(StaffTable);
