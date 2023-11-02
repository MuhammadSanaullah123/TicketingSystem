import React, { useContext, useState } from "react";
import { Button } from "@windmill/react-ui";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/userReducer";
import Swal from "sweetalert2";

import Error from "../components/form/Error";
import { useSelector } from "react-redux/es/exports";
import useStaffSubmit from "../hooks/useStaffSubmit";
import LabelArea from "../components/form/LabelArea";
import InputArea from "../components/form/InputArea";
import { AdminContext } from "../context/AdminContext";
import SelectRole from "../components/form/SelectRole";
// import { getUser } from "../../../Redux/userReducer";
import { getUser } from "../../Redux/userReducer";
import PageTitle from "../components/Typography/PageTitle";
import Uploader from "../components/image-uploader/Uploader";
import { useEffect } from "react";
import { updateOperator } from "../../Redux/userReducer";

const EditProfile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.userReducer?.userData?.user);
  console.log("likeLikeOO", userData);
  const [user, setUser] = useState({
    name: userData?.username,
    phone: userData?.phone,
    email: userData?.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const {
    state: { adminInfo },
  } = useContext(AdminContext);

  const { register, handleSubmit, onSubmit, errors, imageUrl, setImageUrl } =
    useStaffSubmit(adminInfo?._id);

  console.log("user", user);

  const submitUpdate = async () => {
    const data = new FormData();

    data.append("username", user.name);
    data.append("phone", user.phone);
    data.append("email", user.email);
    data.append("password", user.password);
    const response = await dispatch(updateOperator(data));

    console.log("responseUpdateOperator", response?.payload?.data?.message);

    if (response?.payload?.data?.message) {
      Swal.fire({
        icon: "correct",
        title: "",
        text: response?.payload?.data?.message,
      });
    }
  };



  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <PageTitle>Edit Profile</PageTitle>
      <div className="container p-6 mx-auto bg-white rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Profile Picture" />
              <div className="col-span-8 sm:col-span-4">
                {/* <Uploader imageUrl={imageUrl} onChange={setImageUrl} /> */}
                <input type="file" />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="User Name"
                  name="name"
                  defaultValue={user.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Username"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Contact Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Contact Number"
                  name="phone"
                  defaultValue={user?.phone}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Phone"
                />
                <Error errorName={errors.phone} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Email" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                  name="email"
                  defaultValue={user.email}
                  type="text"
                  placeholder="Email"
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Password" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Password"
                />
                <Error errorName={errors.role} />
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse pr-6 pb-6">
            <Button
              // type="submit"
              className="h-12 px-6 updateBtn"
              onClick={submitUpdate}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
