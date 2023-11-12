import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { BiLogoGoogle, BiLogoFacebookCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";
const ForgotPassword = ({ status, setStatusToSignin, setStatusToSignup }) => {
  const [level, setLevel] = useState(0);
  const history = useHistory();
  console.log(status, setStatusToSignin, setStatusToSignup);

  const handleForgotPassword = () => {
    setLevel((prev) => prev + 1);
  };
  const handleCode = () => {
    setLevel((prev) => prev + 1);
  };
  const handleChangePassword = () => {};
  return (
    <div className="width-wrap">
      <Grid container className="signup-wrapper">
        <Grid item xs={12} align="center" className="">
          <h3 className="forgot-welcome">Forgot your password</h3>
          <p className="signup-pre">We got you covered</p>

          {level === 0 ? (
            <div className="signup-form">
              <input type="text" placeholder="Email" />
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
              <input type="text" placeholder="New Password" />
              <input type="text" placeholder="Confirm Password" />
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
