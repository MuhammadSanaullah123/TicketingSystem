import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import jwtDecode from "jwt-decode";
import { SERVER_URL } from "../ServerUrl";
import setAuthToken from "../admin/utils/setAuthToken";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import Form from "antd/lib/form/Form";

const cookies = new Cookies();

const setCurrentUserFromToken = (token) => {
  let user = null;
  if (token) {
    user = jwtDecode(token);
  }
  return user;
};

let localToken = cookies.get("role") == 2 ? "designertoken" : "usertoken";

const initialState = {
  currentUser: null || setCurrentUserFromToken(cookies.get(localToken)),
  users: [],
  designerUsers: [],
  userInformation: [],
  userdata: null,
  flagData: false,
  busData: [],
  busDataOperator: [],
  allCoupons: [],
  allCouponsAdmin: [],
  myBooking: [],
  operatorBooking: [],
  getCustomerAdminData: [],
  operatorListData: [],
  searchDataH2: [],
  priceDataH2: [],
  userDatae: [],
  recentBookingsOperatorData: [],
  recentBookingsAdminData: [],
  salesOverViewOperatorData: [],
  bookingBySearchData: [],
};

const initialStateFunction = () => ({
  currentUser: null || setCurrentUserFromToken(cookies.get(localToken)),
  users: [],
  designerUsers: [],
  userInformation: [],
  userdata: null,
  userdataOperator: null,
  adminLoginData: null,
  flagData: false,
  busData: [],
  busDataOperator: [],
  allCoupons: [],
  myBooking: [],
  operatorBooking: [],
  singleBusDetail: [],
  getReviewsData: [],

  adminBusData: [],
  adminBookingsData: [],
  getCustomerOperatorData: [],
  operatorReviewsData: [],
  getCustomerAdminData: [],
  salesOverViewOperatorData: [],
  salesOverViewAdminData: [],
  bookingId: [],
  addCouponDataOper: [],
  searchedData: [],
});

/// User SignUp
export const userSignUp = createAsyncThunk(
  "userSignUp",
  async (user, setStatus) => {
    console.log("check", user);
    try {
      const data = await axios.post(`${SERVER_URL}/auth/createUser`, user);

      console.log("DataRes", data.data);
      return data.data;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message,
      });
    }
  }
);

/// operator Login
export const operatorLoginCall = createAsyncThunk("login", async (user) => {
  try {
    const data = await axios.post(`${SERVER_URL}/operator/login`, user);
    cookies.set("auth", data?.data?.authToken);
    cookies.set("userID", data.data.operator._id);

    // console.log("dataLogin_id", data.data.user._id);
    console.log("NoLoginError1", data.data.operator._id);

    return data;
  } catch (err) {
    console.log("NoLoginError", err?.response);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err?.response?.data?.message,
    });
  }
});
/// Operator SignUp
export const signupOperator = createAsyncThunk(
  "signupOperator",
  async (user) => {
    try {
      const data = await axios.post(
        `${SERVER_URL}/operator/createOperator`,

        user
      );

      return data.data;
    } catch (err) {
      console.log("(err.message", err.response.data.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }
);

/// User social login
export const userSocialLogin = createAsyncThunk(
  "userSocialLogin",
  async (user) => {
    try {
      const data = await axios.post(`${SERVER_URL}/auth/login/success`, user);
      // cookies.set("auth", data?.data?.authToken);
      // cookies.set("userID", data.data.user._id);
      //   cookies.set("role", data?.data?.user?.role);
      console.log("dataLogin", data.data.user._id);

      return data.data;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message,
      });
    }
  }
);
/// User social login GoogleRedirect
export const userSocialLoginRedirect = createAsyncThunk(
  "userSocialLoginRedirect",
  async (user) => {
    try {
      const data = await axios.get(`${SERVER_URL}/auth/google/redirect`);
      // cookies.set("auth", data?.data?.authToken);
      // cookies.set("userID", data.data.user._id);
      //   cookies.set("role", data?.data?.user?.role);
      console.log("dataLogin", data.data.user._id);

      return data.data;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message,
      });
    }
  }
);

/// User Login
// export const login = createAsyncThunk("login", async (user) => {
//   try {
//     const data = await axios.post(
//       "SERVER_URL/auth/login",
//       user,
//       { withCredentials: true }
//     );
//     console.log("dataLogin", data.data.user._id);

//     cookies.set("auth", data?.data?.authToken, { path: "/", maxAge: 1000000 });
//     cookies.set("userID", data.data.user._id, { path: "/", maxAge: 1000000 });

//     return data.data;
//   } catch (err) {
//     console.log("NoLoginError", err?.response);
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: err?.response?.data?.message,
//     });
//   }
// });
/// User Login
export const login = createAsyncThunk("login", async (user) => {
  try {
    const data = await axios.post(
      `${SERVER_URL}/auth/login`,
      user
      // { withCredentials: true }
    );
    console.log("dataLogin", data.data.user);

    if (data.data.operator) {
      cookies.set("auth", data?.data?.authToken, {
        path: "/",
        maxAge: 1000000,
      });
      cookies.set("userID", data.data.user._id, { path: "/", maxAge: 1000000 });
    }
    if (data.data.user) {
      cookies.set("auth", data?.data?.authToken);
      cookies.set("userID", data?.data?.user._id);
    }

    return data.data;
  } catch (err) {
    console.log("NoLoginError", err?.response);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err?.response?.data?.message,
    });
  }
});
//add trip
export const trip = createAsyncThunk("trip", async ({ data, tripDataRed }) => {
  console.log("addTripData", data);
  const userId = cookies.get("userID");
  let Array = [...tripDataRed];
  console.log("userIDDDD", userId);

  const auth = cookies.get("auth");
  try {
    const response = await axios.post(`${SERVER_URL}/trip`, data, {
      headers: {
        auth: `${auth}`,
      },
    });

    console.log("responseAddTrip", response.data.trip);
    console.log("responseAddBus", response.data.trip);

    Array.push(response.data.trip);

    Swal.fire({
      icon: "correct",
      title: response?.data?.message,
      text: "",
    }).then(() => {
      // window.location.assign("/operator/buses");
    });

    return Array;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "",
      text: err.response.data.message,
    });

    console.log("responseAddBus");
  }
});

//add bus
export const bus = createAsyncThunk("bus", async ({ data, busDataRed }) => {
  console.log("addBusData", data);
  const userId = cookies.get("userID");
  let Array = [...busDataRed];
  console.log("userIDDDD", userId);

  const auth = cookies.get("auth");
  try {
    const response = await axios.post(`${SERVER_URL}/bus`, data, {
      headers: {
        auth: `${auth}`,
      },
    });

    console.log("responseAddBus", response.data.bus);
    console.log("responseAddBus", response.data.bus);
    Array.push(response.data.bus);
    Swal.fire({
      icon: "correct",
      title: response?.data?.message,
      text: "",
    }).then(() => {
      // window.location.assign("/operator/buses");
    });

    return Array;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "",
      text: err.response.data.message,
    });
    console.log("responseAddBus");
  }
});

//Update Bus
export const updateBus = createAsyncThunk(
  "updateBus",
  async ({ userData, busDataRed }) => {
    console.log("updateBus", userData);
    console.log("busDataRedbusDataRed", busDataRed);
    let Array = [...busDataRed];
    const auth = cookies.get("auth");
    const data = new FormData();
    data.append("operatorId", userData.operatorId);
    data.append("busNumber", userData.busNumber);
    data.append("busType", userData.busType);
    data.append("totalSeats", userData.totalSeats);
    data.append("price", userData.price);
    data.append("departureTime", userData.departureTime);
    data.append("arrivalTime", userData.arrivalTime);
    data.append("routeTo", userData.routeTo);
    data.append("routeFrom", userData.routeFrom);
    data.append("date", userData.date);
    data.append("baggage", userData.baggage);
    data.append("bus_facilities", JSON.stringify(userData.bus_facilities));
    data.append("image", userData.image);
    data.append("seatSelection", userData.seatSelection);
    console.log("busDataBeforeUpdate", busDataRed);

    try {
      const response = await axios.patch(
        `${SERVER_URL}/bus/${userData.busId}`,

        data,
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );
      console.log("busDataAfterUpdate", response.data.updatedBus);
      let index = 0;
      busDataRed.map((item, i) => {
        if (item._id === userData.busId) {
          index = i;
          console.log("indexResult", index);
        }
      });

      Array.splice(index, 1, response.data.updatedBus);
      Swal.fire({
        icon: "correct",
        title: response?.data?.message,
        text: "",
      }).then(() => {
        // window.location.assign("/operator/buses");
      });

      console.log("busDataAfterUpdate", Array);
      return Array;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.message,
      });
    }
  }
);

//Delete Bus
export const deleteBus = createAsyncThunk(
  "deleteBus",
  async ({ id, busDataRed }) => {
    console.log("idII", id);
    const auth = cookies.get("auth");
    let Array = [...busDataRed];

    try {
      const response = await axios.delete(`${SERVER_URL}/bus/${id}`, {
        headers: {
          auth: `${auth}`,
        },
      });

      console.log("responseDelete", response);

      console.log("busDataAfterUpdate", response?.data?.removedBus);
      let index = 0;
      busDataRed.map((item, i) => {
        if (item._id === id) {
          index = i;
          console.log("indexResult", index);
        }
      });

      // Array.splice(index, 1, response?.data?.removedBus);
      Array.splice(index, 1);

      console.log("ArrayRemoveBus", Array);

      return Array;
      // return response;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.message,
      });
    }
  }
);

// get customers Operators
export const getCustomerOperator = createAsyncThunk(
  "getCustomerOperator",
  async (user) => {
    const auth = cookies.get("auth");

    try {
      const data = await axios.get(
        `${SERVER_URL}/operator/customer`,

        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("DetailBusResponse", data);
      return data.data;
    } catch (err) {
      Swal.fire({
        icon: "Error",
        title: "",
        text: err.response.message,
      });
    }
  }
);
//logout user
export const logout = createAsyncThunk("logout", async (user) => {
  const auth = cookies.get("auth");
  try {
    const data = await axios.get(
      `${SERVER_URL}/auth/logout`,

      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("dataLogin", data.data);

    return data.data;
  } catch (err) {
    // console.log("NoLoginError", err?.response?.data?.message);
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: err?.response?.data?.message,
    // });
  }
});

//get user
export const getUser = createAsyncThunk("getUser", async (user) => {
  const auth = cookies.get("auth");
  try {
    const data = await axios.get(
      `${SERVER_URL}/auth/getUser`,

      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("dataLogin", data.data);

    return data.data;
  } catch (err) {
    // console.log("NoLoginError", err?.response?.data?.message);
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: err?.response?.data?.message,
    // });
  }
});

//search Bus
export const searchBus = createAsyncThunk("searchBus", async (data) => {
  console.log("DataSearchBus", data.to);

  try {
    const response = await axios.get(
      `${SERVER_URL}/bus/?routeFrom=${data.from}&routeTo=${data.to}&date=${data.date}`,
      {
        routeFrom: data.from,
        routeTo: data.to,
        date: data.date,
      }
    );

    console.log("responseRed", response);

    return response;
  } catch (err) {
    console.log("errorrr", err);
    // Swal.fire({
    //   icon: "",
    //   title: "",
    //   text: "No Bus Found",
    // });
  }
});

//operator All buses
export const operatorAllBuses = createAsyncThunk(
  "operatorAllBuses",
  async (data) => {
    console.log("operatorAllBuses");
    const auth = cookies.get("auth");

    try {
      const response = await axios.get(`${SERVER_URL}/operator/bus`, {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      });

      console.log("response", response);

      return response.data.buses;
    } catch (err) {}
  }
);

// update user
export const updateUser = createAsyncThunk("updateUser", async (user) => {
  const userId = cookies.get("userID");
  const auth = cookies.get("auth");
  console.log("userIDRedux", userId);
  console.log("tokenOper", auth);
  console.log(`Bearer ${cookies.get("auth")}`);

  try {
    const data = await axios.patch(
      `${SERVER_URL}/auth/updateUser/${userId}`,

      user,
      {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      }
    );
    Swal.fire({
      icon: "correct",
      title: "",
      text: data.data.message,
    });
    console.log("DataRes", data.data.message);
    return data.data;
  } catch (err) {}
});
// update Bookigs
export const updateBooking = createAsyncThunk("updateBooking", async (user) => {
  const userId = cookies.get("userID");
  const auth = cookies.get("auth");
  console.log("userIDRedux", userId);
  console.log("tokenOper", auth);
  console.log(`Bearer ${cookies.get("auth")}`);
  const data = {
    email: user.email,
    price: user.price,
    phone: user.phone,
    seats: user.seat,
  };

  try {
    const response = await axios.patch(
      `${SERVER_URL}/bookings/${user.bookingId}`,

      data,
      {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      }
    );
    // Swal.fire({
    //   icon: "correct",
    //   title: "",
    //   text: data.data.message,
    // });
    // console.log("DataRes", data.data.message);
    return response.data;
  } catch (err) {}
});

// update operator
export const updateOperator = createAsyncThunk(
  "updateOperator",
  async (user) => {
    const userId = cookies.get("userID");
    const auth = cookies.get("auth");
    console.log("userIDRedux", userId);
    console.log("tokenOper", auth);
    console.log(`Bearer ${cookies.get("auth")}`);

    try {
      const data = await axios.patch(
        // api/operator
        `${SERVER_URL}/operator/${userId}`,

        user,
        {
          headers: {
            // Authorization: `Basic ${auth}` ,
            auth: `${auth}`,
          },
        }
      );

      console.log("DataRes", data);
      return data;
    } catch (err) {}
  }
);

/// Forgot Password
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (user) => {
    console.log("check", user);
    try {
      const data = await axios.post(`${SERVER_URL}/auth/forgotPassword`, user);

      console.log("DataRes", data.data);
      return data.data;
    } catch (err) {}
  }
);
/// Reset Password
// For Reset Password  (/api/auth/resetPassword) POST {resetToken, newPass}

export const resetPassword = createAsyncThunk("resetPassword", async (user) => {
  console.log("check", user);
  try {
    const data = await axios.post(`${SERVER_URL}/auth/resetPassword`, user);

    console.log("DataRes", data.data);
    return data.data;
  } catch (err) {}
});

//add coupon
export const addCoupon = createAsyncThunk(
  "addCoupon",
  async ({ data, couponData }) => {
    const userId = cookies.get("userID");

    let array = [...couponData];

    const auth = cookies.get("auth");
    try {
      const response = await axios.post(`${SERVER_URL}/operator/coupon`, data, {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      });

      array.push(response.data.coupon);

      Swal.fire({
        icon: "right",
        title: "",
        text: response.data.message,
      }).then(() => {
        // window.location.assign("/operator/coupons");
      });
      console.log("arrayResponse", array);

      return array;
    } catch (err) {
      console.log("addCouponError", err.response);

      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
      });
    }
  }
);
//add coupon Admin
export const addCouponAdmin = createAsyncThunk(
  "addCouponAdmin",
  async ({ data, coupanDataAdmin }) => {
    let array = [...coupanDataAdmin];

    const userId = cookies.get("userID");

    const auth = cookies.get("auth");
    try {
      const response = await axios.post(`${SERVER_URL}/admin/coupon`, data, {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      });

      array.push(response?.data?.coupon);

      Swal.fire({
        icon: "success",
        title: "",
        text: response.data.message,
      }).then(() => {
        // window.location.assign("/admin/coupons");
      });

      return array;
    } catch (err) {
      console.log("addCouponError", err.response);

      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
      });
    }
  }
);

//get coupen
export const getCoupon = createAsyncThunk("getCoupon", async (data) => {
  console.log("operatorAllBuses");
  const auth = cookies.get("auth");
  const array = [...data];

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  try {
    const response = await axios.get(`${SERVER_URL}/operator/coupon`, {
      headers: {
        // Authorization: `Basic ${auth}` ,
        auth: `${auth}`,
      },
    });

    return response.data.coupons;
  } catch (err) {}
});
//get Admin coupen
export const getCouponAdmin = createAsyncThunk(
  "getCouponAdmin",
  async (data) => {
    const auth = cookies.get("auth");

    if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }
    try {
      const response = await axios.get(`${SERVER_URL}/admin/coupon`, {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      });
      console.log("responseAdminCoupon", response.data.coupons);

      return response.data.coupons;
    } catch (err) {
      console.error(err);
    }
  }
);

//Update admin
export const updateCouponAdmin = createAsyncThunk(
  "updateCouponAdmin",
  async ({ data, coupanDataAdmin }) => {
    console.log("UpdateCoupon", data);
    const auth = cookies.get("auth");
    const formData = new FormData();

    let array = [...coupanDataAdmin];
    formData.append("operatorId", data.operatorId);
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("validity", data.validity);
    formData.append("discount", data.discount);
    formData.append("busType", data.busType);

    try {
      const response = await axios.patch(
        `${SERVER_URL}/admin/coupon/${data.couponId}`,

        formData,
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );
      let index = 0;
      coupanDataAdmin.map((item, i) => {
        if (item._id === data.couponId) {
          index = i;
          console.log("indexResult", index);
        }
        // const result = item.filter(_id => item._id === data.couponId);
      });

      array.splice(index, 1, response.data.updatedCoupon);

      console.log("responseUpdate", response);

      if (response.data.success) {
        Swal.fire({
          icon: "Correct",
          title: "",
          text: "Coupon Updated",
        }).then(() => {
          // window.location.assign("/admin/coupons");
        });
      }
      return array;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.message,
      });
    }
  }
);
//Update Coupon
export const updateCoupon = createAsyncThunk(
  "updateCoupon",
  async ({ data, couponData }) => {
    console.log("UpdateCoupon", data);
    const auth = cookies.get("auth");
    const formData = new FormData();
    let array = [...couponData];
    // formData.append("operatorId", data.operatorId);
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("validity", data.validity);
    formData.append("discount", data.discount);
    formData.append("busType", data.busType);

    try {
      const response = await axios.patch(
        `${SERVER_URL}/operator/coupon/${data.couponId}`,

        formData,
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );
      console.log("couponDatacouponData", response.data.updatedCoupon);
      console.log("couponDatacouponData", response);
      let index = 0;
      couponData.map((item, i) => {
        if (item._id === data.couponId) {
          index = i;
          console.log("indexResult", index);
        }
        // const result = item.filter(_id => item._id === data.couponId);
      });

      array.splice(index, 1, response.data.updatedCoupon);

      if (response?.data?.success) {
        Swal.fire({
          icon: "Correct",
          title: "",
          text: "Coupon Updated",
        }).then(() => {
          // window.location.assign("/operator/coupons");
        });
      }
      return array;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.message,
      });
    }
  }
);

//delete coupen
export const deleteCoupon = createAsyncThunk(
  "deleteCoupon",
  async ({ id, couponData }) => {
    const auth = cookies.get("auth");
    let array = [...couponData];

    try {
      const response = await axios.delete(
        `${SERVER_URL}/operator/coupon/${id}`,
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Coupon Deleted",
        }).then(() => {
          /*  window.location.reload(); */
        });
      }

      return array;
    } catch (err) {
      Swal.fire({
        icon: "",
        title: "",
        text: "Failed",
      });
    }
  }
);

//delete coupen admin
export const deleteCouponAdmin = createAsyncThunk(
  "deleteCouponAdmin",
  async ({ id, coupanDataAdmin }) => {
    console.log("idII", id);
    let array = [...coupanDataAdmin];
    const auth = cookies.get("auth");

    try {
      const response = await axios.delete(`${SERVER_URL}/admin/coupon/${id}`, {
        headers: {
          auth: `${auth}`,
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "correct",
          title: "",
          text: "Coupon Deleted",
        }).then(() => {
          window.location.reload();
        });
      }

      return array;
    } catch (err) {
      // Swal.fire({
      //   icon: "error",
      //   title: "",
      //   text: err.response.message,
      // });
    }
  }
);
//Book Seats
export const bookSeats = createAsyncThunk("bookSeats", async (data) => {
  console.log("bookSeats", data);
  // const userId = cookies.get("userID");
  // console.log("userIDDDD", userId);

  const auth = cookies.get("auth");
  try {
    const response = await axios.post(
      `${SERVER_URL}/bookings/bookSeats`,
      data,
      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("responseBookSeats", response);
    if (response?.data?.message) {
    }

    return response;
  } catch (err) {}
});
//Book Seats
export const bookSeatsWithoutLogin = createAsyncThunk(
  "bookSeatsWithoutLogin",
  async (data) => {
    console.log("bookSeats", data);
    // const userId = cookies.get("userID");
    // console.log("userIDDDD", userId);

    const auth = cookies.get("auth");
    try {
      const response = await axios.post(
        `${SERVER_URL}/bookings/bookSeatsGuest`,

        data
      );

      console.log("responseBookSeats", response);
      if (response?.data?.message) {
      }

      return response;
    } catch (err) {}
  }
);
//my Bookings
export const myBookings = createAsyncThunk("myBookings", async (data) => {
  console.log("myBookings", data);
  // const userId = cookies.get("userID");
  // console.log("userIDDDD", userId);

  const auth = cookies.get("auth");
  try {
    const response = await axios.get(`${SERVER_URL}/bookings/myBookings`, {
      headers: {
        auth: `${auth}`,
      },
    });

    console.log("responseBookSeats", response);

    return response;
  } catch (err) {}
});

//Operator Bookings
export const operatorBookings = createAsyncThunk(
  "operatorBookings",
  async (data) => {
    console.log("addBusData", data);
    const userId = cookies.get("userID");
    console.log("userIDDDD", userId);

    const auth = cookies.get("auth");
    try {
      const response = await axios.get(
        `${SERVER_URL}/operator/bookings`,

        {
          headers: {
            // Authorization: `Basic ${auth}` ,
            auth: `${auth}`,
          },
        }
      );

      console.log("responseAddBus", response);

      return response;
    } catch (err) {}
  }
);

//Add Reviews
export const addReviews = createAsyncThunk("addReviews", async (user) => {
  const auth = cookies.get("auth");
  console.log("user.busId", user.busId);

  try {
    const data = await axios.post(
      `${SERVER_URL}/review/${user.busId}`,

      {
        review: user.review,
        rating: user.rating,
        operatorId: user.operatorId,
      },
      {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      }
    );
    Swal.fire({
      icon: "correct",
      title: "",
      text: data.data.message,
    });
    console.log("DataRes", data.data.message);
    return data.data;
  } catch (err) {}
});

// get Single Bus  Detail
export const busDetail = createAsyncThunk("busDetail", async (user) => {
  const auth = cookies.get("auth");

  try {
    const data = await axios.get(
      `${SERVER_URL}/bus/busDetails/${user.busId}`,

      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("DetailBusResponse", data);
    return data.data;
  } catch (err) {
    // Swal.fire({
    //   icon: "correct",
    //   title: "",
    //   text: err.response.message,
    // });
  }
});

// get reviews
export const getReviews = createAsyncThunk("getReviews", async (user) => {
  const auth = cookies.get("auth");

  try {
    const data = await axios.get(
      `${SERVER_URL}/review/${user.busId}`,

      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("DetailBusResponse", data);
    return data.data;
  } catch (err) {
    // Swal.fire({
    //   icon: "correct",
    //   title: "",
    //   text: err.response.message,
    // });
  }
});

// Admin Login
export const adminLogin = createAsyncThunk("adminLogin", async (user) => {
  try {
    const data = await axios.post(`${SERVER_URL}/admin/login`, user);
    cookies.set("auth", data?.data?.authToken);
    cookies.set("userID", data?.data?.user?._id);

    console.log("NoLoginError1", data);

    return data;
  } catch (err) {
    console.log("NoLoginError", err?.response);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err?.response?.data?.message,
    });
  }
});

// get customers Admin
export const getCustomerAdmin = createAsyncThunk(
  "getCustomerAdmin",
  async (user) => {
    const auth = cookies.get("auth");

    try {
      const data = await axios.get(
        `${SERVER_URL}/admin/customer`,

        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("DetailBusResponse", data.data.Customers);
      return data.data.Customers;
    } catch (err) {
      Swal.fire({
        icon: "correct",
        title: "",
        text: err.response.message,
      });
    }
  }
);

//admin bus
export const adminBus = createAsyncThunk("adminBus", async (data) => {
  console.log("adminBus");
  const auth = cookies.get("auth");

  try {
    const response = await axios.get(`${SERVER_URL}/admin/bus`, {
      headers: {
        // Authorization: `Basic ${auth}` ,
        auth: `${auth}`,
      },
    });

    console.log("responseAdminBuses", response?.data?.Buses);

    return response?.data?.Buses;
  } catch (err) {}
});

//admin bookings
export const adminBookings = createAsyncThunk("adminBookings", async (data) => {
  console.log("adminBus");
  const auth = cookies.get("auth");

  try {
    const response = await axios.get(
      `${SERVER_URL}/admin/bookings`,

      {
        headers: {
          // Authorization: `Basic ${auth}` ,
          auth: `${auth}`,
        },
      }
    );

    return response;
  } catch (err) {}
});

//All operator Reviews
export const operatorReviews = createAsyncThunk(
  "operatorReviews",
  async (user) => {
    const auth = cookies.get("auth");
    const userID = cookies.get("userID");

    try {
      // /review/operator-review/:id

      const data = await axios.get(
        `${SERVER_URL}/review/operator-review/${userID}`,

        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("AllReviewsResponse", data);
      return data.data;
    } catch (err) {
      // Swal.fire({
      //   icon: "correct",
      //   title: "",
      //   text: err.response.message,
      // });
    }
  }
);

//Admin edit customer
export const editAdminCustomers = createAsyncThunk(
  "editAdminCustomers",
  async ({ user1, dataCusComp }) => {
    let array = [...dataCusComp];
    // console.log("D3213", data);
    console.log("arrayBeforeUpdate", array);
    const auth = cookies.get("auth");

    try {
      const response = await axios.patch(
        `${SERVER_URL}/admin/update-user/${user1.userId}`,

        {
          username: user1.name,
          phone: user1.phone,
          email: user1.email,
          password: user1.password,
        },
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("responseDelete", response.data.updatedUser);
      console.log("responseDelete", response);
      let index = 0;
      dataCusComp.map((item, i) => {
        if (item._id === user1.userId) {
          index = i;
          console.log("indexResult", index);
        }
        // const result = item.filter(_id => item._id === data.couponId);
      });

      array.splice(index, 1, response.data.updatedUser);

      console.log("arrayAfterUpdate", array);
      Swal.fire({
        icon: "correct",
        title: "",
        text: response?.data?.message,
      }).then(() => {
        // window.location.assign("/admin/customers");
      });
      return array;
    } catch (err) {}
  }
);

//All opertors by admin
export const operatorList = createAsyncThunk("operatorList", async (user) => {
  const auth = cookies.get("auth");

  try {
    const data = await axios.get(
      `${SERVER_URL}/admin/operatorList`,

      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("DetailBusResponse", data.data.operators);

    return data.data.operators;
  } catch (err) {}
});

//Admin edit operator
export const editAdminOperators = createAsyncThunk(
  "editAdminOperators",
  async ({ userData, operatorData }) => {
    console.log("D3213", userData);
    let array = [...operatorData];
    const auth = cookies.get("auth");

    try {
      const response = await axios.patch(
        `${SERVER_URL}/admin/update-operator/${userData.userId}`,

        {
          name: userData.name,
          contact: userData.contact,
          address: userData.address,
          password: userData.password,
        },
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("editAdminOperatorsCoupon", response?.data?.message);
      let index = 0;
      operatorData.map((item, i) => {
        if (item._id === userData.userId) {
          index = i;
          console.log("indexResult", index);
        }
        // const result = item.filter(_id => item._id === data.couponId);
      });

      array.splice(index, 1, response?.data?.updatedOperator);

      Swal.fire({
        icon: "correct",
        title: "",
        text: response?.data?.message,
      }).then(() => {
        // window.location.assign("/admin/customers");
      });

      return array;
    } catch (err) {}
  }
);

//Admin edit operator
export const verifyOperator = createAsyncThunk("verifyOperator", async (id) => {
  console.log("verifyClickedId", id);
  const auth = cookies.get("auth");

  console.log("auth", auth);

  try {
    const response = await axios.post(
      `${SERVER_URL}/admin/verifyOperator/${id}`,
      "",

      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    console.log("responseDelete", response);
    return response;
  } catch (err) {}
});

//Operator Recent Bookings
export const recentBookingsOperator = createAsyncThunk(
  "recentBookingsOperator",
  async (data) => {
    console.log("myBookings", data);

    const auth = cookies.get("auth");
    try {
      const response = await axios.get(
        `${SERVER_URL}/operator/recentBookings`,
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("responseBookSeats", response);

      return response;
    } catch (err) {}
  }
);
//Admin Recent Bookings
export const recentBookingsAdmin = createAsyncThunk(
  "recentBookingsAdmin",
  async (data) => {
    console.log("myBookings", data);

    const auth = cookies.get("auth");
    try {
      const response = await axios.get(`${SERVER_URL}/admin/recentBookings`, {
        headers: {
          auth: `${auth}`,
        },
      });

      console.log("responseBookSeats", response);

      return response;
    } catch (err) {}
  }
);

//Sales Overview Admin
export const salesOverViewAdmin = createAsyncThunk(
  "salesOverViewAdmin",
  async (data) => {
    console.log("myBookings", data);

    const auth = cookies.get("auth");
    try {
      const response = await axios.get(`${SERVER_URL}/admin/salesOverview`, {
        headers: {
          auth: `${auth}`,
        },
      });

      console.log("responseBookSeats", response);

      return response;
    } catch (err) {}
  }
);
//Sales Overview Operator
export const salesOverViewOperator = createAsyncThunk(
  "salesOverViewOperator",
  async (data) => {
    console.log("myBookings", data);

    const auth = cookies.get("auth");
    try {
      const response = await axios.get(`${SERVER_URL}/operator/salesOverview`, {
        headers: {
          auth: `${auth}`,
        },
      });

      console.log("responseBookSeats", response);

      return response;
    } catch (err) {}
  }
);

//get Particular booking on the base of the search
export const bookingBySearch = createAsyncThunk(
  "bookingBySearch",
  async (data) => {
    console.log("myBookings", data);

    // GET Particular Booking Done (/api/bookings/:id) GET

    const auth = cookies.get("auth");
    try {
      const response = await axios.get(`${SERVER_URL}/bookings/${data}`, {
        headers: {
          auth: `${auth}`,
        },
      });

      console.log("responseBookSeats", response.data.booking);

      return response.data.booking;
    } catch (err) {}
  }
);

// /api/admin/deleteUser/:id

//Delete user(customer operator) by admin
export const deleteUserByAdmin = createAsyncThunk(
  "deleteUserByAdmin",
  async ({ id, customerData }) => {
    console.log("idII", id);
    const auth = cookies.get("auth");
    let array = [...customerData];

    try {
      const response = await axios.delete(
        `${SERVER_URL}/admin/deleteUser/${id}`,
        {
          headers: {
            auth: `${auth}`,
          },
        }
      );

      console.log("responseDeleteCus", response);

      Swal.fire({
        icon: "correct",
        title: "",
        text: response?.data?.message,
      });

      let index = 0;
      customerData.map((item, i) => {
        if (item._id === id) {
          index = i;
          console.log("indexResult", index);
        }
      });

      console.log("arrayBefore", array);

      // array.splice(index, 1, response.data.deletedCoupon);
      array.splice(index, 1);
      return array;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.message,
      });
    }
  }
);

//client Cancel Booking
export const cancelUserBooking = createAsyncThunk("deleteBus", async (id) => {
  console.log("idII", id);
  const auth = cookies.get("auth");

  try {
    const response = await axios.patch(
      `${SERVER_URL}/bookings/cancelBooking/${id}`,
      "",
      {
        headers: {
          auth: `${auth}`,
        },
      }
    );

    return response;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "",
      text: err.response.message,
    });
  }
});

//google loging succuess
export const loginGoogleResult = createAsyncThunk(
  "loginGoogleResult",
  async (id) => {
    console.log("idII", id);
    // const auth = cookies.get("auth");

    try {
      const response = await axios.get(`${SERVER_URL}/auth/login/success`, {
        withCredentials: true,
      });

      console.log("responseresponsegoogle", response);

      return response;
    } catch (err) {
      console.log("responseresponsegoogleError", err);
      // Swal.fire({
      //   icon: "error",
      //   title: "",
      //   text: err.response.message,
      // });
    }
  }
);

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialStateFunction(),
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    sendSearchData(state, action) {
      console.log("showSearchedData", action.payload);
      state.searchDataH2 = action.payload;
    },
    sendPriceData(state, action) {
      console.log("showSearchedData", action.payload);
      state.priceDataH2 = action.payload;
    },
    bookingIdStore(state, action) {
      console.log("showSearchedData", action.payload);
      state.bookingId = action.payload;
    },
    couponAddIncr(state, action) {
      console.log("action.payloadAddC", action.payload);
      state.allCoupons = action.payload;
    },
    setSearchedData(state, action) {
      console.log("action.payloadAddC", action.payload);
      state.searchedData = action.payload;
    },

    resetState: (state) => initialStateFunction(),
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.userdata = action.payload;
    },
    [operatorLoginCall.fulfilled]: (state, action) => {
      state.userdataOperator = action.payload;
    },
    [searchBus.fulfilled]: (state, action) => {
      state.busData = action.payload;
    },
    [operatorAllBuses.fulfilled]: (state, action) => {
      state.busDataOperator = action.payload;
    },
    [getCoupon.fulfilled]: (state, action) => {
      state.allCoupons = action.payload;
    },
    [getCouponAdmin.fulfilled]: (state, action) => {
      state.allCouponsAdmin = action.payload;
    },
    [myBookings.fulfilled]: (state, action) => {
      state.myBooking = action.payload;
    },
    [operatorBookings.fulfilled]: (state, action) => {
      state.operatorBooking = action.payload;
    },
    [busDetail.fulfilled]: (state, action) => {
      state.singleBusDetail = action.payload;
    },
    [getReviews.fulfilled]: (state, action) => {
      state.getReviewsData = action.payload;
    },
    [adminLogin.fulfilled]: (state, action) => {
      state.adminLoginData = action.payload;
    },
    [getCustomerAdmin.fulfilled]: (state, action) => {
      console.log("getCustomerAdmin", action.payload);
      state.getCustomerAdminData = action.payload;
    },
    [adminBus.fulfilled]: (state, action) => {
      state.adminBusData = action.payload;
    },
    [adminBookings.fulfilled]: (state, action) => {
      state.adminBookingsData = action.payload;
    },
    [getCustomerOperator.fulfilled]: (state, action) => {
      state.getCustomerOperatorData = action.payload;
    },
    [operatorList.fulfilled]: (state, action) => {
      state.operatorListData = action.payload;
    },
    [operatorReviews.fulfilled]: (state, action) => {
      state.operatorReviewsData = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userData = action.payload;
    },
    [recentBookingsOperator.fulfilled]: (state, action) => {
      state.recentBookingsOperatorData = action.payload;
    },
    [recentBookingsAdmin.fulfilled]: (state, action) => {
      state.recentBookingsAdminData = action.payload;
    },
    [salesOverViewOperator.fulfilled]: (state, action) => {
      state.salesOverViewOperatorData = action.payload;
    },
    [salesOverViewAdmin.fulfilled]: (state, action) => {
      state.salesOverViewAdminData = action.payload;
    },
    [bookingBySearch.fulfilled]: (state, action) => {
      state.bookingBySearchData = action.payload;
    },
    [addCoupon.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);

      if (action.payload != undefined) {
        state.allCoupons = action.payload;
      }
    },
    [updateCoupon.fulfilled]: (state, action) => {
      if (action.payload != undefined) {
        state.allCoupons = action.payload;
      }
    },
    [deleteCoupon.fulfilled]: (state, action) => {
      if (action.payload != undefined) {
        state.allCoupons = action.payload;
      }
    },
    [bus.fulfilled]: (state, action) => {
      if (action.payload != undefined) {
        state.busDataOperator = action.payload;
        state.adminBusData = action.payload;
      }
    },
    [updateBus.fulfilled]: (state, action) => {
      if (action.payload != undefined) {
        state.busDataOperator = action.payload;

        state.adminBusData = action.payload;
      }
    },
    [deleteBus.fulfilled]: (state, action) => {
      if (action.payload != undefined) {
        state.busDataOperator = action.payload;
        state.adminBusData = action.payload;
      }
    },
    [editAdminCustomers.fulfilled]: (state, action) => {
      console.log("editAdminCustomers", action.payload);
      if (action.payload != undefined) {
        state.getCustomerAdminData = action.payload;
        // state.adminBusData = action.payload;
      }
    },
    [deleteUserByAdmin.fulfilled]: (state, action) => {
      console.log("editAdminCustomers", action.payload);
      if (action.payload != undefined) {
        state.getCustomerAdminData = action.payload;
        state.operatorListData = action.payload;
        // state.adminBusData = action.payload;
      }
    },
    [editAdminOperators.fulfilled]: (state, action) => {
      console.log("editAdminCustomers", action.payload);
      if (action.payload != undefined) {
        state.operatorListData = action.payload;
        // state.adminBusData = action.payload;
      }
    },
    [addCouponAdmin.fulfilled]: (state, action) => {
      console.log("editAdminCustomers", action.payload);
      if (action.payload != undefined) {
        state.allCouponsAdmin = action.payload;
        // state.adminBusData = action.payload;
      }
    },
    [updateCouponAdmin.fulfilled]: (state, action) => {
      console.log("editAdminCustomers", action.payload);
      if (action.payload != undefined) {
        state.allCouponsAdmin = action.payload;
        // state.adminBusData = action.payload;
      }
    },
    [deleteCouponAdmin.fulfilled]: (state, action) => {
      console.log("editAdminCustomers", action.payload);
      if (action.payload != undefined) {
        state.allCouponsAdmin = action.payload;
        // state.adminBusData = action.payload;
      }
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

const user = userReducer.reducer;

// Action creators are generated for each case reducer function
export const {
  setCurrentUser,
  resetState,
  sendSearchData,
  sendPriceData,
  bookingIdStore,
  couponAddIncr,
  setSearchedData,
} = userReducer.actions;
export default persistReducer(persistConfig, user);
