import React, { useContext, useState } from "react";
import { Button } from "@windmill/react-ui";
import { useDispatch } from "react-redux";
import "./EditProfile.css";
import { updateUser } from "../../Redux/userReducer";
import Swal from "sweetalert2";
import EditProfileMap from "./EditProfileMap";
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
import { getAllOperators } from "../../actions/operators";
import store from "../../store";
import { connect } from "react-redux";

const EditProfile = ({ operators: { operators } }) => {
  const dispatch = useDispatch();
  const userDataStore = useSelector(
    (state) => state?.userReducer?.userData?.user
  );
  let currentoperator = operators?.filter(
    (operator) => operator.userId === userDataStore?._id
  );
  if (currentoperator) {
    currentoperator = currentoperator[0];
  }

  console.log(currentoperator);
  /*   const [userData, setUserData] = useState(); */
  console.log("likeLikeOO", userDataStore);
  const [user, setUser] = useState({
    companyname: currentoperator ? currentoperator.companyname : "",
    username: currentoperator?.username ? currentoperator?.username : "",
    contactnumber: currentoperator?.contactnumber
      ? currentoperator?.contactnumber
      : "",
    email: currentoperator?.email ? currentoperator?.email : "",
    password: "",
    companyaddress: currentoperator?.companyaddress
      ? currentoperator?.companyaddress
      : "",
    companycontactnumber: currentoperator?.companycontactnumber
      ? currentoperator?.companycontactnumber
      : "",
    companylocation: currentoperator?.companylocation
      ? currentoperator?.companylocation
      : {
          lat: null,
          lng: null,
        },
  });
  /*   const [user, setUser] = useState({
    companyname: userData?.companyname,
    username: userData?.username ? userData?.username : "",
    contactnumber: userData?.contactnumber ? userData?.contactnumber : "",
    email: userData?.email ? userData?.email : "",
    password: "",
    companyaddress: userData?.companyaddress ? userData?.companyaddress : "",
    companycontactnumber: userData?.companycontactnumber
      ? userData?.companycontactnumber
      : "",
    companylocation: userData?.companylocation ? userData?.companylocation : "",
  }); */
  console.log("user", user);
  const [logo, setLogo] = useState();

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

  const submitUpdate = async () => {
    const dataImage = new FormData();
    dataImage.append("file", logo);
    dataImage.append("upload_preset", "u928wexc");
    dataImage.append("cloud_name", "dihkvficg");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dihkvficg/image/upload",
      {
        method: "post",
        body: dataImage,
      }
    );

    const resData = await res.json();
    const image_url = resData.url;

    const data = {
      image: image_url,
      companyname: user.companyname,
      username: user.username,
      contactnumber: user.contactnumber,
      email: user.email,
      password: user.password,
      companyaddress: user.companyaddress,
      companycontactnumber: user.companycontactnumber,
    };
    const response = await dispatch(updateOperator(data));

    console.log("responseUpdateOperator", response);

    if (response?.payload?.data?.success) {
      Swal.fire({
        icon: "success",
        title: "",
        text: "Operator Updated",
      });
    }
  };

  useEffect(() => {
    store.dispatch(getAllOperators());
    handleGetUserData();
  }, []);
  useEffect(() => {
    setUser({
      companyname: currentoperator ? currentoperator.companyname : "",
      username: currentoperator?.username ? currentoperator?.username : "",
      contactnumber: currentoperator?.contactnumber
        ? currentoperator?.contactnumber
        : "",
      email: userDataStore ? userDataStore?.email : "",
      password: "",
      companyaddress: currentoperator?.companyaddress
        ? currentoperator?.companyaddress
        : "",
      companycontactnumber: currentoperator?.companycontactnumber
        ? currentoperator?.companycontactnumber
        : "",
      companylocation: currentoperator?.companylocation
        ? currentoperator?.companylocation
        : {
            lat: null,
            lng: null,
          },
    });
  }, [currentoperator]);
  const handleGetUserData = async () => {
    store.dispatch(getUser());
    /*  console.log(res);
    const currentoperator = operators?.filter(
      (operator) => operator.userId === res.payload.user._id
    );
    if (currentoperator) {
      setUserData(currentoperator[0]);
    } */
  };
  return (
    <>
      <PageTitle>Edit Profile</PageTitle>
      <div className="container p-6 mx-auto bg-white rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Company Logo" />
              <div className="col-span-8 sm:col-span-4">
                <input
                  id="file-uploader"
                  style={{ display: "block" }}
                  type="file"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
                <img
                  src={currentoperator?.image}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
            {/*    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Username" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Username"
                  name="username"
                  defaultValue={user.username}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Username"
                />
                <Error errorName={errors.name} />
              </div>
            </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Email" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  /*    value={user.email} */
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
                  defaultValue={user.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Password"
                />
                <Error errorName={errors.role} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Contact Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Contact Number"
                  name="contactnumber"
                  defaultValue={user?.contactnumber}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Contact Number"
                />
                <Error errorName={errors.phone} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Company Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Company Name"
                  name="companyname"
                  defaultValue={user.companyname}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Company Name"
                />
                <Error errorName={errors.name} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Company Representative's Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Company Representative's Name"
                  name="username"
                  defaultValue={user.username}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Company Representative's Name"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Company Head Office Address" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Company Head Office Address"
                  name="companyaddress"
                  defaultValue={user.companyaddress}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Company Head Office Address"
                />
                <Error errorName={errors.name} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Company Head Office Phone Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Company Head Office Phone Number"
                  name="companycontactnumber"
                  defaultValue={user.companycontactnumber}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Company Head Office Phone Number"
                />
                <Error errorName={errors.name} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Company Head Office Location" />

              <EditProfileMap user={user} setUser={setUser} />
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

const mapStateToProps = (state) => ({
  operators: state.operators,
});

export default connect(mapStateToProps, null)(EditProfile);
