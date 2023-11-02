import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";

const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [currentCoupon, setCurrentCoupon] = useState("");

  const { toggleDrawer, isDrawerOpen, toggleModal } =
    useContext(SidebarContext);

  const handleUpdate = (id, currentCoupon) => {
    setCurrentCoupon(currentCoupon);
    setServiceId(id);
    console.log("HANDLEUPDTE");

    toggleDrawer();
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
  };
};

export default useToggleDrawer;
