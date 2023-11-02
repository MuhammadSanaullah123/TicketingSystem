import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import './OperatorLogin.css'
import Swal from "sweetalert2";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
//scss
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
//cookies
import Cookies from 'universal-cookie';
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types';
import { adminLogin } from '../../../actions/auth'


const AdminLoginPage = ({ adminLogin }) => {
  const history = useHistory(); 

  const cookies = new Cookies();

  
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const isLogin = cookies.get("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    if (user.email && user.password) {
      setValidClick(false);
    }
  };
  const [validClick, setValidClick] = useState(false);
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  console.log("userLogin", user);
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
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          }

          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const loginClicked = async () => {
    let response = false;
    if (!user.email || !user.password) {
      setValidClick(true);
    }
    if (user.email && user.password && regexp.test(user.email)) {
      adminLogin({
        email: user.email,
        password: user.password,
        history
      });
    }


   
  };

  // console.log("store.userReducer.userdata",store.userReducer.userdata)
  // if (store.userReducer.userdata) {
  //   history.push("/operator/buses")
  // }
  const responseGoogle = async (response) => {
    console.log("responseGoogle", response);
    if (response) {
    
    }
  };


  return (
    <>
      <Grid container className="loginContainer">
        <Grid container className="loginWrapper" align="center">
          <div style={{ height: "0" }}>
            <div className="blueCircleLeft" />
          </div>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className="semiCircle" alignSelf="center">
            <Grid item xs={8} className="semiContent">
              <h2 className="heading">Admin</h2>
              <p className="subLine">You can login here</p>
              <Link to="/sign-up">
                {/* <button className="signUpButton">Sign up</button> */}
              </Link>
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className="signInDetails" alignSelf="center">
            <Grid item xl={6} lg={6} md={7} sm={9} xs={11} className="rightWrapper">
              <p className="heading">Sign in</p>
              {validClick && (
                <p className="validTxt">Please Enter all Fields </p>
              )}
              <Grid item xs={12} className="inputWrapper">
                <Grid item className="topInputEmailField">
                  <TextField
                    label="Email"
                    id="outlined-start-adornment"
                    onChange={handleInputChange}
                    onBlur={validateInput}
                    name="email"
                    value={user.email}
                    focused
                    sx={{
                      m: 4,
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon style={{color:"black"}} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.email && <p className="validTxt">{error.email}</p>}

                <Grid item>
                  <TextField
                    type={values.showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={handleInputChange}
                    onBlur={validateInput}
                    label="Password"
                    // onChange={handleChange('password')}

                    name="password"
                    id="outlined-start-adornment"
                    focused
                    sx={{ m: 4, width: "100%", margin: "0" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle style={{color:"black"}}/>
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
                              <VisibilityOff style={{color:"black"}}/>
                            ) : (
                              <Visibility style={{color:"black"}}/>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {error.password && <p className="validTxt">{error.password}</p>}
              </Grid>
              <Grid item xs={12} className="forgotContainer">
                <p className="forgotPassword" style={{cursor:"pointer"}}>Forgot Password ?</p>
              </Grid>
              {/* <Link to="/home"> */}
              <button className="loginBtn" onClick={loginClicked}>
                Login
              </button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

AdminLoginPage.propTypes = {
  adminLogin: propTypes.func.isRequired // react/no-typos
}

export default connect(null, { adminLogin })(AdminLoginPage);

