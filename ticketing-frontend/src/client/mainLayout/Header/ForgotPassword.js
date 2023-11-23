import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { BiLogoGoogle, BiLogoFacebookCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";

import { forgotPassword, resetPassword } from "../../../Redux/userReducer";
import { useHistory } from "react-router-dom";
const ForgotPassword = ({ status, setStatusToSignin, setStatusToSignup }) => {
  const [level, setLevel] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();

  console.log(status, setStatusToSignin, setStatusToSignup);
  const [email, setEmail] = useState();
  const [values, setValues] = useState({
    password: "",
    conpassword: "",
  });
  const handleForgotPassword = async (e) => {
    setLevel((prev) => prev + 1);
    e.preventDefault();
    try {
      const response = await dispatch(forgotPassword({ email, home: true }));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCode = () => {
    setLevel((prev) => prev + 1);
  };
  const handlePassword = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (values.password !== values.conpassword) {
      alert("Passwords do not match!");
      return;
    }
    const data = {
      newPass: values.password,
      resetToken: window.location.pathname.split("/")[3],
    };
    try {
      const response = await dispatch(resetPassword(data));
      console.log(response);
      if (!response?.payload) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Link Expired",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Password Changed",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (window.location.pathname.split("/")[3] !== "home") {
      setLevel(2);
    }
  }, []);

  return (
    <div className="width-wrap">
      <Grid container className="signup-wrapper">
        <Grid item xs={12} align="center" className="">
          <h3 className="forgot-welcome">Forgot your password</h3>
          <p className="signup-pre">We got you covered</p>

          {level === 0 ? (
            <div className="signup-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          ) : level === 1 ? (
            <div className="signup-form">
              <input
                type="text"
                placeholder="Enter 4 digit code sent to your email"
              />
            </div>
          ) : (
            <div className="signup-form">
              <input
                type="password"
                placeholder="New Password"
                value={values.password}
                name="password"
                onChange={handlePassword}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={values.conpassword}
                required
                name="conpassword"
                onChange={handlePassword}
              />
            </div>
          )}

          <button
            className="button-signup"
            onClick={
              level === 0
                ? handleForgotPassword
                : level === 1
                ? handleCode
                : handleChangePassword
            }
          >
            Submit
          </button>

          <Grid item xs={12} align="right">
            {level === 0 ? (
              <p className="forgot-pre">
                If you are not registered{" "}
                <span
                  onClick={setStatusToSignup}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  sign up
                </span>
              </p>
            ) : (
              level === 1 && (
                <p className="forgot-pre">
                  Didn't get code?
                  <span
                    onClick={setStatusToSignin}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    send again
                  </span>
                </p>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
