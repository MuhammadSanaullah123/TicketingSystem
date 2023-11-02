import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { FiEye, FiTrash2 } from "react-icons/fi";
// CSS
import "../drawer/productDrawer.css";
import "./../../../admin/assets/css/custom.css";
import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import { SidebarContext } from "../../context/SidebarContext";
import ShowHideButton from "../../../operator/components/table/ShowHideButton";
import EditOperatorDrawer from "../drawer/EditOperatorDrawer";
import { deleteUserByAdmin } from "../../../Redux/userReducer";
import AddBusOperator from "./AddBusOperator";
import AddTripOperator from "./AddTripOperator";
// API
import {
  getAllOperators,
  verifyOperator,
  deleteOperator,
} from "../../../actions/operators";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const AdminsTable = ({
  customers,
  operators: { operators },
  verifyOperator,
  deleteOperator,
}) => {
  const [customerId, setCustomerId] = useState("");
  const { toggleModal } = useContext(SidebarContext);
  const [alertIndex, setAlertIndex] = useState();
  const [deleteVeh, setDeleteVeh] = useState(0);

  const handleModalOpen = (id) => {
    setCustomerId(id);
    toggleModal();
  };

  const verifyClicked = async (id, index) => {
    // console.log("verifyClickedId",id)

    // const response = await dispatch(verifyOperator(id));
    // console.log("response", response);
    verifyOperator(id);
  };

  const deleteClicked = async (id, index) => {
    console.log("responseCustomerDataId", id);
    // const res = await dispatch(deleteUserByAdmin({id,customerData}));
    deleteOperator(id);
    // console.log("responseDelete", res);
    console.log("responseDeleteClicked");
    setAlertIndex(index);

    setDeleteVeh(2);
  };

  useEffect(() => {
    store.dispatch(getAllOperators());
  }, []);

  const deleteIconClicked = (index) => {
    // console.log("Clicked")
    setAlertIndex(index);

    setDeleteVeh(1);
  };

  const noClickedAlert = () => {
    setDeleteVeh(2);
  };

  return (
    <>
      {/* <MainModal id={customerId} /> */}

      <TableBody>
        {/* <AddBusByAdmin /> */}
        {operators != undefined &&
          operators.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="text-sm">12/12/22</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">ahmed@gmail.com</span>{" "}
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium">{item.contact}</span>
              </TableCell>
              <TableCell>
                {item.isVerified == true && (
                  <div>
                    <span className="text-sm font-medium">Verified </span>
                    {/* <div className="clickVerifyBtn" >Verified</div> */}
                  </div>
                )}

                {item.isVerified == false && (
                  <div>
                    <span className="text-sm font-medium">Not Verified </span>
                    <div
                      className="clickVerifyBtn"
                      onClick={() => verifyClicked(item._id)}
                    >
                      Click to Verify{" "}
                    </div>
                  </div>
                )}
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium">
                  <div className="topAddBusOperatorAdmin">
                    <div>Add Bus</div>

                    <AddBusOperator operatorId={item._id} />
                  </div>
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium">
                  <div className="topAddBusOperatorAdmin">
                    <div>Add Trip</div>

                    <AddTripOperator operatorId={item._id} />
                  </div>
                </span>
              </TableCell>

              <TableCell>
                <div className="flex justify-end text-right">
                  <div className="p-2 cursor-pointer text-gray-400 hover:text-red-600 editDrawerCustomersTop">
                    <EditOperatorDrawer operatorData={item} />
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
                    You want to delete this operator?
                  </div>
                  <div className="topConfirmBtnDeltVeh">
                    <div className="noBtnAlertDltVeh" onClick={noClickedAlert}>
                      No
                    </div>
                    <div
                      className="yesBtnAlertDltVeh"
                      onClick={() => deleteClicked(item.userId, index)}
                    >
                      Yes
                    </div>
                  </div>
                </div>
              )}
            </TableRow>
          ))}

        {/* ))} */}
      </TableBody>
    </>
  );
};

AdminsTable.propTypes = {
  verifyOperator: propTypes.func.isRequired,
  deleteOperator: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buses: state.buses,
  trips: state.trips,
  operators: state.operators,
});

export default connect(mapStateToProps, { verifyOperator, deleteOperator })(
  AdminsTable
);
