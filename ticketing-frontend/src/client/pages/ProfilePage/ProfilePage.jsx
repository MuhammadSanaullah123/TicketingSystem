import React, { useContext, useState } from "react";
import { Button } from "@windmill/react-ui";
import { useDispatch } from "react-redux";
import "./ProfilePage.css";
import { updateUser } from "../../../Redux/userReducer";
import { useSelector } from "react-redux/es/exports";
import LabelArea from "../../../operator/components/form/LabelArea";

import InputArea from "../../../operator/components/form/InputArea";

import PageTitle from "../../../operator/components/Typography/PageTitle";

import { getUser } from "../../../Redux/userReducer";
import { useEffect } from "react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  // const userData =useSelector((state)=>state?.userReducer?.userdataOperator?.user); 
  const userData =useSelector((state)=>state?.userReducer?.userData?.user); 
 
  console.log("userDatauserData",userData);
  

  const [user, setUser] = useState({
    name:userData?.username,
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

  console.log("user", user);

  const submitUpdate = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", user.name);
    data.append("phone", user.phone);
    data.append("email", user.email);
    data.append("password", user.password);
    dispatch(updateUser(data));
  };

 

useEffect(()=>{
  dispatch(getUser());

},[]);
  return (
    <>
      <div className="topHeaderPG">
        <PageTitle className="headerText">Edit Profile</PageTitle>
      </div>
      <div className="container p-6 mx-auto bg-white rounded-lg">
        <form>
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
                  label="User Name"
  
                  name="name"
               
                  defaultValue={user.name}
       
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Contact Number" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  label="Contact Number"
                  name="phone"
                  defaultValue={user.phone}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Email" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  label="Email"
                  defaultValue={user.email}
                  onChange={(e) => handleChange(e)}
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Password" />
              <div className="col-span-8 sm:col-span-4">
                {/* <SelectRole register={register} label="Role" name="role" /> */}

                <InputArea
                  label="Password"
                  name="password"
                  type="password"
                  defaultValue={user.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse pr-6 pb-6">
            <Button
              type="submit"
              className="h-12 px-6 updateProfileBtn"
              onClick={submitUpdate}
            >
              {" "}
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
