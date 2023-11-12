import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { BiLogoGoogle, BiLogoFacebookCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";
import { login } from "../../../Redux/userReducer";

const Signin = ({
  status,
  setStatusToSignup,

  setStatusToForgot,
}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleInput = (e) => {
    const Value = e.target.value;
    setUser({ ...user, [e.target.name]: Value });
  };
  console.log(user);
  const loginClicked = async () => {
    let response = false;
    /*     if (!user.email || !user.password) {
      setValidClick(true);
    } */
    if (user.email && user.password && regexp.test(user.email)) {
      response = await dispatch(login(user));
      // console.log("responseLogin", response.payload.success);
      console.log("responseLogin", response?.payload?.user?.role);
    }

    // console.log("isLogin",isLogin?.payload?.user?.role)

    if (response?.payload?.user?.role === "operator") {
      Swal.fire({
        icon: "correct",
        title: "Successfully Logged in",
        text: "",
      }).then((data) => {
        if (data) {
          // history.push("/operator/dashboard")
          window.location.assign("/operator/dashboard");
        }
      });
    }
    if (response?.payload?.user?.role === "customer") {
      Swal.fire({
        icon: "correct",
        title: "Successfully Logged in",
        text: "",
      }).then((data) => {
        if (data) {
          // history.push("/client/bus-service")
          window.location.assign("/client/bus-listing2");
        }
      });
    }
  };

  return (
    <div className="width-wrap">
      <Grid container className="signup-wrapper">
        <Grid item xs={12} align="center" className="">
          <h3 className="signup-welcome">Welcome Back!</h3>
          <p className="signup-pre">Sign in for an account</p>
          <div className="signup-form">
            <input
              name="email"
              type="email"
              value={user.email}
              placeholder="Email"
              onChange={handleInput}
              required
            />
            <input
              name="password"
              type="password"
              value={user.password}
              placeholder="Password"
              onChange={handleInput}
              required
            />
          </div>
          <Grid item xs={12} align="end">
            <p className="forgot-password" onClick={setStatusToForgot}>
              Forgot your password
            </p>
          </Grid>
          <button className="button-signup" onClick={loginClicked}>
            Sign in
          </button>
          <p className="or-text">OR</p>
          <button className="button-signup-google">
            <div className="">
              <BiLogoGoogle
                style={{
                  color: "#4889F4",
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              />
            </div>
            <div>Sign in with Google</div>
          </button>
          <button className="button-signup-facebook">
            <div className="">
              <BiLogoFacebookCircle
                style={{ color: "#fff", fontSize: "20px", marginRight: "5px" }}
              />
            </div>
            <div>Sign in with Facebook</div>
          </button>
          <Grid item xs={12} align="right">
            <p className="signin-pre">
              Not a member yet?{" "}
              <span
                onClick={setStatusToSignup}
                style={{
                  cursor: "pointer",
                }}
              >
                Go sign up
              </span>
            </p>
            <p className="signin-pre">
              Are you a Transport Company? Go
              <span
                onClick={() => history.push("/operator/login")}
                style={{
                  cursor: "pointer",
                }}
              >
                {" sign in "}
              </span>
              or
              <span
                onClick={() => history.push("/operator/signup")}
                style={{
                  cursor: "pointer",
                }}
              >
                {" Sign up "}
              </span>
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
