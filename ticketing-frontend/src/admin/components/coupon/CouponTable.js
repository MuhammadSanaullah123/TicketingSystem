import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Badge } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import CouponDrawer from "../drawer/CouponDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import { useSelector, useDispatch } from "react-redux";
import { deleteCoupon } from "../../../Redux/userReducer";
const CouponTable = ({ handleGetCouponAdmin }) => {
  const { serviceId, currentCoupon, handleModalOpen, handleUpdate } =
    useToggleDrawer();
  const couponData = useSelector(
    (state) => state?.userReducer?.allCouponsAdmin
  );
  const dispatch = useDispatch();
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const [currentDate, setCurrentDate] = useState();

  console.log("couponsData", couponData);

  const onClickDeleteCoupan = (id) => {
    console.log("ISNBIDEeeeeeeeeeeeeeeeeeeeee");
    console.log(id);

    dispatch(deleteCoupon({ id, couponData }));
    handleGetCouponAdmin();
  };
  return (
    <>
      {/*      <MainModal id={serviceId} /> */}
      <MainDrawer>
        <CouponDrawer id={serviceId} currentCoupon={currentCoupon} />
      </MainDrawer>

      <TableBody>
        {couponData != undefined &&
          couponData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="font-semibold uppercase text-xs">42435</span>
              </TableCell>
              <TableCell>
                <span className="text-sm"> 24/07/2022</span>
              </TableCell>
              <TableCell>
                <span className="text-sm"> {item.validity}</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="text-sm">{item.name}</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <span className="text-sm">{item.code}</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <span className="text-sm font-semibold">
                  {" "}
                  {item.discount}%
                </span>{" "}
              </TableCell>
              {/*  <TableCell>
                {" "}
                <span className="text-sm">{item.busType}</span>{" "}
              </TableCell> */}

              {/*   <TableCell className="align-middle ">
                <Badge type="success">Active</Badge>
              </TableCell> */}
              <TableCell>
                <EditDeleteButton
                  id={item._id}
                  code={item.code}
                  couponData={item}
                  handleUpdate={handleUpdate}
                  currentCoupon={item}
                  handleModalOpen={handleModalOpen}
                  onClickDeleteBus={() => onClickDeleteCoupan(item._id)}
                />
              </TableCell>
            </TableRow>
          ))}

        {/* ))} */}
      </TableBody>
    </>
  );
};

export default CouponTable;
