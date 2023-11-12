import React from "react";
import Grid from "@mui/material/Grid";
import { BiLogoGoogle, BiLogoFacebookCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";
const Signup = ({ setStatusToSignin }) => {
  const history = useHistory();

  return (
    <div className="width-wrap">
      <Grid container className="signup-wrapper">
        <Grid item xs={12} align="center" className="">
          <h3 className="signup-welcome">Welcome!</h3>
          <p className="signup-pre">Sign up for an account</p>
          <div className="signup-form">
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Confirm Password" />
          </div>
          {/* <Grid item xs={12} align="end">
                    <p className="forgot-password">Forgot your password</p>
                </Grid> */}
          <button className="button-signup">Sign up</button>
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
            <div>Sign up with Google</div>
          </button>
          <button className="button-signup-facebook">
            <div className="">
              <BiLogoFacebookCircle
                style={{ color: "#fff", fontSize: "20px", marginRight: "5px" }}
              />
            </div>
            <div>Sign up with Facebook</div>
          </button>
          <Grid item xs={12} align="right">
            <p className="signin-pre">
              Already a member?{" "}
              <span
                onClick={setStatusToSignin}
                style={{
                  cursor: "pointer",
                }}
              >
                Go sign in
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

export default Signup;
