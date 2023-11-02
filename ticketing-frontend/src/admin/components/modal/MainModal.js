import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "../../context/SidebarContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
// import { deleteCoupon } from '../../../Redux/userReducer';
import { deleteCouponAdmin } from "../../../Redux/userReducer";
// import { deleteBus } from '../../../Redux/userReducer';
import { useDispatch } from "react-redux";
import { deleteBus } from "../../../Redux/userReducer";
// API
import { deleteTrip } from "../../../actions/trips";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const MainModal = ({ id, couponData, deleteTrip }) => {
  const dispatch = useDispatch();

  console.log("busDataModelcouponData", couponData);

  const busDataRed = useSelector(
    (state) => state?.userReducer?.busDataOperator
  );
  const coupanDataAdmin = useSelector(
    (state) => state?.userReducer?.allCouponsAdmin
  );
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const location = useLocation();

  console.log("idDeleteee", id);

  const handleDelete = () => {
    console.log("idDeleteeeOnClick", id);
    dispatch(deleteBus({ id, busDataRed }));

    dispatch(deleteCouponAdmin({ id, coupanDataAdmin }));
    deleteTrip(id);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-1">
            Are You Sure! Want to Delete This Record?
          </h2>
          <p>
            Do you really want to delete these records? You can't view this in
            your list anymore if you delete!
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            No, Keep It
          </Button>
          <div onClick={closeModal}>
            <Button
              onClick={handleDelete}
              className="w-full sm:w-auto addBusBtnHome"
            >
              Yes, Delete It
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

MainModal.propTypes = {
  deleteTrip: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buses: state.buses,
  trips: state.trips,
});

export default connect(mapStateToProps, { deleteTrip })(MainModal);
