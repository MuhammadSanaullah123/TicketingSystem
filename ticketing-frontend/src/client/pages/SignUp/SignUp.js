import React, { useState, useEffect } from "react";
import { Link,useHistory } from "react-router-dom";

// import Swal from "sweetalert2/dist/sweetalert2.js";
import Swal from 'sweetalert2';
//redux imports
import { useSelector, useDispatch } from "react-redux";
import { userSignUp } from "../../../Redux/userReducer";
//scss
import "./SignUp.scss";
//mui components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//react icons
import { RiFacebookCircleLine, RiGoogleFill } from "react-icons/ri";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";

const Signup = () => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    showConfirmPassword: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    showConfirmPassword: false,
    confirmPassword: "",
  });
const history=useHistory();
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // if (regexp.test(user.email)){

  // }
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });

  const [validClick, setValidClick] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          } else if (value && !regexp.test(user.email)) {
            stateObj[name] = "Please enter Correct Email.";
          }
          break;
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }

          break;

        case "phone":
          if (!value) {
            stateObj[name] = "Please enter Phone Number.";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (
            values.confirmPassword &&
            value !== values.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = values.confirmPassword
              ? ""
              : values.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (user.password && value !== user.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
    if (
      user.email &&
      user.username &&
      user.phone &&
      user.password &&
      values.confirmPassword
    ) {
      setValidClick(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
    if (
      user.email &&
      user.username &&
      user.phone &&
      user.password &&
      values.confirmPassword
    ) {
      setValidClick(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (
      user.email &&
      user.username &&
      user.phone &&
      user.password &&
      values.confirmPassword
    ) {
      setValidClick(false);
    }
  };

  const user1 = {
    name: "ali",
    password: "ali",
  };

  console.log("values", user);

  const signupClicked = async () => {
    if (
      !user.email ||
      !user.username ||
      !user.phone ||
      !user.password ||
      !values.confirmPassword
    ) {
      setValidClick(true);
    }

    if (
      user.email &&
      regexp.test(user.email) &&
      user.username &&
      user.phone &&
      user.password &&
      values.confirmPassword &&
      user.password == values.confirmPassword
    ) {
      const response=await dispatch(userSignUp(user));
      Swal.fire({
        icon: "correct",
        title: "Congradulation",
        text: response.payload.message,
      });

      if(response.payload.message)
      {
        history.push('/client/login')
      }


      console.log("response",response.payload.message);
    }
  };
  return (
    <>
      <Grid container className="loginContainer">
        <Grid container className="loginWrapper" align="center">
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className="semiCircle"
            alignSelf="center"
          >
            <Grid item xs={8} className="semiContent">
              <h2 className="heading">One of us ?</h2>
              <p className="subLine">
                Please Log In if you already have an account
              </p>
              <Link to="/client/login">
                <button className="signUpButton">Log In</button>
              </Link>
            </Grid>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className="signInDetails"
            alignSelf="center"
          >
            <Grid
              item
              xl={6}
              lg={6}
              md={7}
              sm={9}
              xs={11}
              className="rightWrapper"
            >
              <p className="heading">Sign Up</p>

              {validClick && (
                <p className="validTxt">Please Enter all Fields </p>
              )}
              <Grid item xs={12} className="inputWrapper">
                <Grid item>
                  <TextField
                    label="Email"
                    id="outlined-start-adornment"
                    onChange={handleInputChange}
                    onBlur={validateInput}
                    value={user.email}
                    name="email"
                    focused
                    sx={{
                      m: 2,
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon style={{ color: "black" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.email && <p className="validTxt">{error.email}</p>}
                <Grid item>
                  <TextField
                    label="Username"
                    id="outlined-start-adornment"
                    onChange={handleInputChange}
                    value={user.username}
                    onBlur={validateInput}
                    name="username"
                    focused
                    sx={{
                      m: 2,
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle style={{ color: "black" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.username && <p className="validTxt">{error.username}</p>}
                <Grid item>
                  <TextField
                    label="Phone Number"
                    id="outlined-start-adornment"
                    onChange={handleInputChange}
                    value={user.phone}
                    onBlur={validateInput}
                    name="phone"
                    focused
                    sx={{
                      m: 2,
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhoneIcon style={{ color: "black" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.phone && <p className="validTxt">{error.phone}</p>}
                <Grid item>
                  <TextField
                    type={values.showPassword ? "text" : "password"}
                    value={user.password}
                    label="Password"
                    onBlur={validateInput}
                    onChange={handleInputChange}
                    name="password"
                    style={{ marginTop: "20px" }}
                    // onChange={handleChange('password')}
                    id="outlined-start-adornment"
                    focused
                    sx={{
                      m: 1,
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon style={{ color: "black" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff style={{ color: "black" }} />
                            ) : (
                              <Visibility style={{ color: "black" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.password && (
                  <span className="validTxt">{error.password}</span>
                )}
                <Grid item>
                  <TextField
                    type={values.showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    label="Confirm Password"
                    onBlur={validateInput}
                    style={{ marginTop: "20px" }}
                    onChange={handleChange("confirmPassword")}
                    name="confirmPassword"
                    id="outlined-start-adornment"
                    focused
                    sx={{
                      m: 1,
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon style={{ color: "black" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showConfirmPassword ? (
                              <VisibilityOff style={{ color: "black" }} />
                            ) : (
                              <Visibility style={{ color: "black" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.confirmPassword && (
                  <span className="validTxt">{error.confirmPassword}</span>
                )}
                {/* <p className="validTxt">Please enter confirm password </p>
                <p className="validTxt">Password and confirm password are not matched</p> */}
              </Grid>
              {/* <Link to="/login"> */}
              <button className="loginBtn" onClick={signupClicked}>
                SignUp
              </button>
              {/* </Link> */}
            </Grid>
          </Grid>
          <div style={{ height: 0 }}>
            <div className="blueCircle" style={{ overflowX: "hidden" }} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
