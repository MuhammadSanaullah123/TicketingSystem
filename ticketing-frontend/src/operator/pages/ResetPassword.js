import { Button, Input } from "@windmill/react-ui";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/userReducer";
import Error from "../components/form/Error";
import LabelArea from "../components/form/LabelArea";
import { notifyError, notifySuccess } from "../utils/toast";
import ImageLight from "../assets/img/forgot-password-office.jpeg";
import ImageDark from "../assets/img/forgot-password-office-dark.jpeg";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const password = useRef("");
  const confirm_password = useRef("");

  const [loading, setLoading] = useState(false);
  const {
    register,

    watch,
    formState: { errors },
  } = useForm();

  confirm_password.current = watch("confirm_password");

  password.current = watch("newPassword");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirm_password.current !== password.current) {
      alert("Passwords do not match!");
      return;
    }
    const data = {
      newPass: password.current,
      resetToken: token,
    };
    try {
      const response = await dispatch(resetPassword(data));
      Swal.fire({
        icon: "success",
        title: "",
        text: "Password Changed",
      });
      setTimeout(() => {
        window.location.assign("/client/login");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(confirm_password.current);
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Reset password
              </h1>

              <form onSubmit={handleSubmit}>
                <LabelArea label="Password" />
                <Input
                  label="Password"
                  name="newPassword"
                  type="password"
                  placeholder="Password"
                  {...register("newPassword", {
                    required: "You must specify a password",
                    minLength: {
                      value: 10,
                      message: "Password must have at least 10 characters",
                    },
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                />
                <Error errorName={errors.newPassword} />
                <div className="mt-6"></div>
                <LabelArea label="Confirm Password" />
                <Input
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                />
                <Error errorName={errors.confirm_password} />

                <Button
                  disabled={loading}
                  type="submit"
                  block
                  className="mt-4 h-12"
                >
                  Reset
                </Button>
              </form>
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

export default ResetPassword;
