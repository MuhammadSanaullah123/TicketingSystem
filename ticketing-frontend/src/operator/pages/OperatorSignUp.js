import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";

import InputArea from "../components/form/InputArea";
import LabelArea from "../components/form/LabelArea";
import SelectRole from "../components/form/SelectRole";
import useLoginSubmit from "../hooks/useLoginSubmit";
import ImageLight from "../assets/img/create-account-office.jpeg";
import ImageDark from "../assets/img/create-account-office-dark.jpeg";
// API
import { operatorSignup } from "../../actions/auth";
// Redux
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../store";

const OperatorSignup = ({ operatorSignup }) => {
  const { onSubmit, register, loading } = useLoginSubmit();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let signupObj = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    operatorSignup(signupObj);
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                Create account
              </h1>

              <LabelArea label="Name" />
              <InputArea
                label="Name"
                name="name"
                type="text"
                placeholder="Admin"
                onChange={(e) => handleUser(e)}
              />

              <LabelArea label="Email" />
              <InputArea
                label="Email"
                name="email"
                type="email"
                placeholder="john@doe.com"
                onChange={(e) => handleUser(e)}
              />

              <LabelArea label="Password" />
              <InputArea
                label="Password"
                name="password"
                type="password"
                placeholder="***************"
                onChange={(e) => handleUser(e)}
              />

              <LabelArea label="Staff Role" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  label="Role"
                  name="role"
                  onChange={(e) => handleUser(e)}
                >
                  <option value="">Select Staff Role</option>
                  <option value="operator">Operator</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </Select>
              </div>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the{" "}
                  <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button
                disabled={loading}
                type="submit"
                className="mt-4 h-12 w-full"
                onClick={handleSubmit}
                block
              >
                Create account
              </Button>

              <hr className="my-10" />

              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
              >
                <ImFacebook className="w-4 h-4 mr-2" />{" "}
                <span className="ml-2">Login With Facebook</span>
              </button>
              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
              >
                <ImGoogle className="w-4 h-4 mr-2" />{" "}
                <span className="ml-2">Login With Google</span>
              </button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-500 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

OperatorSignup.propTypes = {
  operatorSignup: propTypes.func.isRequired,
};

export default connect(null, { operatorSignup })(OperatorSignup);
