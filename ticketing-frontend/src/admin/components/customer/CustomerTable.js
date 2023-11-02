import React, { useContext, useEffect, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import "./../../../admin/assets/css/custom.css";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { getCustomerAdmin } from "../../../Redux/userReducer";
import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import Swal from "sweetalert2";
import { SidebarContext } from "../../context/SidebarContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditDrawer from "../drawer/EditDrawer";

import { deleteUserByAdmin } from "../../../Redux/userReducer";
// CSS
import "../drawer/productDrawer.css";
// API
import { loadAllCustomers } from "../../../actions/auth";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const CustomerTable = ({ customers, auth: { users, usersLoading } }) => {
  const [deleteVeh, setDeleteVeh] = useState(0);
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState("");
  const { toggleModal } = useContext(SidebarContext);
  const [alertIndex, setAlertIndex] = useState();
  const [response, setResponse] = useState([]);

  const handleModalOpen = (id) => {
    setCustomerId(id);
    toggleModal();
  };

  useEffect(() => {
    store.dispatch(loadAllCustomers());
  }, []);

  const deleteClicked = (id) => {
    console.log("responseCustomerDataId", id);
    dispatch(deleteUserByAdmin({ id, users }));
  };
  const deleteIconClicked = (index) => {
    console.log("Clicked");
    setAlertIndex(index);

    setDeleteVeh(1);
  };
  const noClickedAlert = () => {
    setDeleteVeh(2);
  };

  return (
    <>
      <MainModal id={customerId} />
      <TableBody>
        {users == null ? (
          <div>Loading....</div>
        ) : (
          users.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link
                  to={`/admin/customer/${item._id}/travel-history`}
                  className="no-underline w-full normal-case"
                >
                  <span className="font-semibold uppercase text-xs  text-[#374151]">
                    {index}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/customer/${item._id}/travel-history`}
                  className="no-underline w-full normal-case"
                >
                  <span className="text-sm  text-[#374151]">
                    {moment(item.createdAt).format("DD MMM YY")}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/customer/${item._id}/travel-history`}
                  className="no-underline w-full normal-case"
                >
                  <span className="text-sm  text-[#374151]">
                    {item?.username}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/customer/${item._id}/travel-history`}
                  className="no-underline w-full normal-case"
                >
                  <span className="text-sm  text-[#374151]">{item?.email}</span>{" "}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/customer/${item._id}/travel-history`}
                  className="no-underline w-full normal-case"
                >
                  <span className="text-sm  text-[#374151]">
                    {item?.password?.slice(0, 12)}
                  </span>{" "}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/customer/${item._id}/travel-history`}
                  className="no-underline w-full normal-case"
                >
                  <span className="text-sm font-medium text-[#374151]">
                    {item?.phone}
                  </span>
                </Link>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex justify-end text-right">
                  <div className="p-2 cursor-pointer text-gray-400 hover:text-red-600 editDrawerCustomersTop">
                    <EditDrawer customerData={item} />
                    <div onClick={() => deleteIconClicked(index)}>
                      <Tooltip
                        id="delete"
                        Icon={FiTrash2}
                        title="Delete"
                        bgColor="#F87171"
                      />
                    </div>
                  </div>
                </div>
              </TableCell>

              {deleteVeh === 1 && alertIndex === index && (
                <div className="mainDeleteCardVehicle">
                  <div className="confirmTxtAlertVehDlt">
                    {" "}
                    You want to delete this customer?
                  </div>
                  <div className="topConfirmBtnDeltVeh">
                    <div className="noBtnAlertDltVeh" onClick={noClickedAlert}>
                      No
                    </div>
                    <div
                      className="yesBtnAlertDltVeh"
                      onClick={() => deleteClicked(item?._id)}
                    >
                      Yes
                    </div>
                  </div>
                </div>
              )}
            </TableRow>
          ))
        )}

        {/* ))} */}
      </TableBody>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(CustomerTable);
