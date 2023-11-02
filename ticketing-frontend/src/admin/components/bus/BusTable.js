import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ImWarning } from "react-icons/im";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  TableCell,
  TableBody,
  TableRow,
  Badge,
  Avatar,
} from "@windmill/react-ui";
import { FiEye } from "react-icons/fi";
// Hooks
import useToggleDrawer from "../../hooks/useToggleDrawer";
// Components
import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import EditDrawerBusAdmin from "../drawer/EditDrawerBusAdmin";
import ShowHideButton from "../table/ShowHideButton";
import EditDeleteButton from "../table/EditDeleteButton";
// API
import { getAllBuses, deleteBus } from "../../../actions/buses";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";
// Assets
import AC from "../../assets/air-conditioner.svg";
import WC from "../../assets/headphones (1).svg";
import Sleeper from "../../assets/headphones (2).svg";
import TV from "../../assets/headphones (3).svg";
import Food from "../../assets/headphones (4).svg";
import Emergency from "../../assets/plastic-bottle (1).svg";
import Drinks from "../../assets/plastic-bottle.svg";
import Charging from "../../assets/phone-charger.svg";
import Headphones from "../../assets/headphones.svg";
import Wifi from "../../assets/wifi.svg";

const BusTable = ({ products, buses: { busesLoading, buses } }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  useEffect(() => {
    store.dispatch(getAllBuses());
  }, []);

  const onClickDeleteBus = (id) => {
    console.log("ISNBIDEeeeeeeeeeeeeeeeeeeeee");
    console.log(id);
    store.dispatch(deleteBus(id));
    handleGetAllBus();
  };
  const handleGetAllBus = () => {
    setTimeout(() => {
      store.dispatch(getAllBuses());
    }, 2000);
  };

  return (
    <>
      {/* <MainModal id={serviceId} /> */}
      {/* <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer> */}
      <TableBody>
        {buses != undefined &&
          buses.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {console.log("item._id", item._id)}
                <span className="text-xs uppercase font-semibold">
                  {" "}
                  {item.busNumber}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2 className="text-xs font-medium">{item.busType}</h2>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold">{item.totalSeats}</span>
              </TableCell>
              <TableCell>
                {/* <span className="text-sm font-semibold">📶 🔋🔌 🎧 ❄️</span> */}
                <span className="text-sm font-semibold topFacSpan flex">
                  {item.bus_facilities != undefined &&
                    item.bus_facilities.map((dataFac) => {
                      console.log("facility>>>>>>", dataFac);
                      return (
                        <>
                          {dataFac == "ac" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={AC} width="25px" />
                            </span>
                          )}
                          {dataFac == "wc" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={WC} width="25px" />
                            </span>
                          )}
                          {dataFac == "sleeper" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={Sleeper} width="25px" />
                            </span>
                          )}
                          {dataFac == "tv" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={TV} width="25px" />
                            </span>
                          )}
                          {dataFac == "food" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={Food} width="25px" />
                            </span>
                          )}
                          {dataFac == "emergency" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={Emergency} width="25px" />
                            </span>
                          )}
                          {dataFac == "drinks" && (
                            <span className="text-sm font-semibold topFacSpan  mx-1">
                              <img src={Drinks} width="25px" />
                            </span>
                          )}
                          {dataFac == "charging" && (
                            <span className="text-sm font-semibold topFacSpan  mx-1">
                              <img src={Charging} width="25px" />
                            </span>
                          )}
                          {dataFac == "headphones" && (
                            <span className="text-sm font-semibold topFacSpan  mx-1">
                              <img src={Headphones} width="25px" />
                            </span>
                          )}
                          {dataFac == "wifi" && (
                            <span className="text-sm font-semibold topFacSpan mx-1">
                              <img src={Wifi} width="25px" />
                            </span>
                          )}
                        </>
                      );
                    })}
                </span>
              </TableCell>

              <TableCell>
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
                {/* <Tooltip
                id="view"
                Icon={FiEye}
                title="View Order"
                bgColor="#34D399"
              /> */}
              </TableCell>
              <TableCell className="topEditDeleteButtonBusTable">
                <div className="topEditBusDrawer">
                  <EditDrawerBusAdmin
                    selectedBus={item}
                    handleGetAllBus={handleGetAllBus}
                  />
                </div>

                <EditDeleteButton
                  id={item._id}
                  busData={buses}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  onClickDeleteBus={() => onClickDeleteBus(item._id)}
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

BusTable.propTypes = {
  // addLike: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  buses: state.buses,
});

export default connect(mapStateToProps, null)(BusTable);
