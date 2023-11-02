import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";

const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [currentCoupon, setCurrentCoupon] = useState("");
  const { toggleDrawer, isDrawerOpen, toggleModal, closeDrawer } =
    useContext(SidebarContext);

  const handleUpdate = (id, currentCoupon) => {
    console.log("HANDLEUPDATE");
    setCurrentCoupon(currentCoupon);

    setServiceId(id);
    toggleDrawer();
  };
  const handleCloseDrawer = () => {
    closeDrawer();
  };
  const handleModalOpen = (id, currentCoupon) => {
    setCurrentCoupon(currentCoupon);
    console.log("HANDLEMODALAOPEN");
    setServiceId(id);
    toggleModal();
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId();
      setCurrentCoupon();
    }
  }, [isDrawerOpen]);

  return {
    serviceId,
    currentCoupon,
    handleModalOpen,
    handleUpdate,
    handleCloseDrawer,
  };
};

export default useToggleDrawer;
