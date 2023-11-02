import React, { useState, useContext, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars";
import "./productDrawer.css";
import Title from "../form/Title";
import Cookies from "universal-cookie";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import SelectOption from "../form/SelectOption";
import SelectBusType from "../../../operator/components/form/SelectBusType";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useCouponSubmit from "../../hooks/useCouponSubmit";
import { useSelector, useDispatch } from "react-redux";
// import { add } from "../../../Redux/userReducer";
import { addCouponAdmin } from "../../../Redux/userReducer";
import { SidebarContext } from "../../context/SidebarContext";
import { updateCouponAdmin } from "../../../Redux/userReducer";

const cookies = new Cookies();

const CouponDrawer = ({ id, currentCoupon }) => {
  const dispatch = useDispatch();
  const userId = cookies.get("userID");

  const { toggleDrawer } = useContext(SidebarContext);
  const { register, handleSubmit, onSubmit, errors, setImageUrl, imageUrl } =
    useCouponSubmit(id);

  const coupanDataAdmin = useSelector(
    (state) => state?.userReducer?.allCouponsAdmin
  );

  const [coupon, setCoupon] = useState({
    name: currentCoupon ? currentCoupon.name : "",
    code: currentCoupon ? currentCoupon.code : "",
    validity: currentCoupon ? currentCoupon.validity : "",
    discount: currentCoupon ? currentCoupon.discount : "",
    busType: currentCoupon ? currentCoupon.busType : "",
  });
  useEffect(() => {
    if (id) {
      setCoupon({
        name: currentCoupon?.name,
        code: currentCoupon?.code,
        validity: currentCoupon?.validity,
        discount: currentCoupon?.discount,
        busType: currentCoupon?.busType,
      });
      setImage(currentCoupon?.image);
    } else {
      setCoupon({
        name: "",
        code: "",
        validity: "",
        discount: "",
        busType: "",
      });
      setImage();
    }
  }, [currentCoupon]);

  console.log(id);
  console.log(coupon);
  console.log(currentCoupon);
  const [image, setImage] = useState();

  const handleCouponData = (e) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value,
    });
    console.log("coupon", coupon);
  };
  const handleImageChange = (e) => {
    const selected = e.target.files[0];

    setImage(selected);
  };
  const addCouponClicked = (e) => {
    e.preventDefault();
    console.log("clicked");

    const data = new FormData();
    data.append("operatorId", userId);
    data.append("image", image);
    data.append("name", coupon.name);
    data.append("code", coupon.code);
    data.append("validity", coupon.validity);
    data.append("discount", coupon.discount);
    data.append("busType", coupon.busType);

    dispatch(addCouponAdmin({ data, coupanDataAdmin }));
  };

  const updateCouponClicked = (e) => {
    e.preventDefault();
    console.log("clicked", id);

    // const data = new FormData();
    // data.append("operatorId", userId);
    // data.append("image", image);
    // data.append("name", coupon.name);
    // data.append("code", coupon.code);
    // data.append("validity", coupon.validity);
    // data.append("discount", coupon.discount);
    // data.append("busType", coupon.busType);

    const data = {
      couponId: id,
      operatorId: userId,
      image: image,
      name: coupon.name,
      validity: coupon.validity,
      discount: coupon.discount,
      code: coupon.code,
      busType: coupon.busType,
    };

    dispatch(updateCouponAdmin({ data, coupanDataAdmin }));
  };
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
        {id ? (
          <Title
            title="Update Coupon"
            description="Updated your coupon and necessary information from here"
          />
        ) : (
          <Title
            title="Add Coupon"
            description="Add your coupon and necessary information from here"
          />
        )}
      </div>
      {id ? (
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
          <form>
            <div
              className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40"
              style={{ paddingBottom: "30px" }}
            >
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Coupon Banner Image" />
                <div className="col-span-8 sm:col-span-4">
                  {/* <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
                  <input
                    type="file"
                    accept="image/png , image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Campaign Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Coupon title"
                    name="name"
                    defaultValue={coupon.name}
                    onChange={handleCouponData}
                    type="text"
                    placeholder="Campaign Title"
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Campaign Code" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Coupon Code"
                    name="code"
                    defaultValue={coupon.code}
                    onChange={handleCouponData}
                    type="text"
                    placeholder="Coupon code"
                  />
                  <Error errorName={errors.couponCode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Coupon Validity Time" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Coupon Validation End Time"
                    name="validity"
                    defaultValue={coupon.validity}
                    onChange={handleCouponData}
                    type="datetime-local"
                    placeholder="Coupon validation end time"
                  />
                  <Error errorName={errors.endTime} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Discount Percentage" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    maxValue={90}
                    minValue={1}
                    label="Discount"
                    defaultValue={coupon.discount}
                    onChange={handleCouponData}
                    name="discount"
                    type="number"
                    placeholder="Discount percentage"
                  />

                  <Error errorName={errors.discountPercentage} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Type" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectOption
                    register={register}
                    label="Bus type"
                    defaultValue={coupon.busType}
                    onChange={handleCouponData}
                    name="busType"
                  />
                  <Error errorName={errors.productType} />
                </div>
              </div>
            </div>

            {/* <DrawerButton id={id} title="Coupon" style={{cursor:"pointer"}} onClick={addCouponClicked} /> */}
            <div onClick={toggleDrawer} style={{ marginLeft: "1.5rem" }}>
              <button
                className="addBusBtn"
                style={{ paddingLeft: "25px", color: "#c99a3c" }}
                onClick={updateCouponClicked}
              >
                Update Coupon
              </button>
            </div>
          </form>
        </Scrollbars>
      ) : (
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
          <form>
            <div
              className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40"
              style={{ paddingBottom: "30px" }}
            >
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Coupon Banner Image" />
                <div className="col-span-8 sm:col-span-4">
                  {/* <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
                  <input
                    type="file"
                    accept="image/png , image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Campaign Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Coupon title"
                    name="name"
                    defaultValue={coupon.name}
                    onChange={handleCouponData}
                    type="text"
                    placeholder="Campaign Title"
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Campaign Code" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Coupon Code"
                    name="code"
                    defaultValue={coupon.code}
                    onChange={handleCouponData}
                    type="text"
                    placeholder="Coupon code"
                  />
                  <Error errorName={errors.couponCode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Coupon Validity Time" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Coupon Validation End Time"
                    name="validity"
                    defaultValue={coupon.validity}
                    onChange={handleCouponData}
                    type="datetime-local"
                    placeholder="Coupon validation end time"
                  />
                  <Error errorName={errors.endTime} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Discount Percentage" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    maxValue={90}
                    minValue={1}
                    label="Discount"
                    defaultValue={coupon.discount}
                    onChange={handleCouponData}
                    name="discount"
                    type="number"
                    placeholder="Discount percentage"
                  />

                  <Error errorName={errors.discountPercentage} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Bus Type" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectBusType
                    register={register}
                    label="Bus type"
                    defaultValue={coupon.busType}
                    onChange={handleCouponData}
                    name="busType"
                  />
                  <Error errorName={errors.productType} />
                </div>
              </div>
            </div>

            {/* <DrawerButton id={id} title="Coupon" style={{cursor:"pointer"}} onClick={addCouponClicked} /> */}
            <div style={{ display: "flex", marginLeft: "1.5rem" }}>
              <div onClick={toggleDrawer}>
                <button
                  className="addBusBtn"
                  style={{ paddingLeft: "25px", color: "#c99a3c" }}
                  onClick={addCouponClicked}
                >
                  Add Coupon
                </button>
              </div>
              <div
                onClick={toggleDrawer}
                style={{
                  marginLeft: "10px",
                }}
              >
                <button
                  className="addBusBtn"
                  style={{ paddingLeft: "25px", color: "red" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Scrollbars>
      )}
    </>
  );
};

export default CouponDrawer;
