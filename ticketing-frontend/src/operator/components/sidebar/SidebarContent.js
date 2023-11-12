import React, { useContext } from "react";
import { NavLink, Route } from "react-router-dom";
// import Cookies from 'js-cookie';
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";
import logoDark from "../../assets/img/logo/logo-dark.svg";
import logoLight from "../../assets/img/logo/logo-light.svg";

import sidebar from "../../routes/sidebar";

import { AdminContext } from "../../context/AdminContext";

const SidebarContent = () => {
  const cookies = new Cookies();

  const isLogin = cookies.get("auth");
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);

  const handleLogOut = () => {
    // dispatch({ type: 'USER_LOGOUT' });
    // Cookies.remove('adminInfo');

    Swal.fire({
      icon: "warning",
      title: "",
      text: "You want to sign out!",
    }).then((data) => {
      // localStorage.clear();
      // cookies.clear();
      if (data) {
        window.location.assign("/operator/login");
        // navigate("/")
        var allCookies = document.cookie.split(";");
        for (var i = 0; i < allCookies.length; i++)
          document.cookie =
            allCookies[i] + "=;expires=" + new Date(0).toUTCString();
      }
    });
  };

  return (
    <div className="py-4 text-gray-500">
      <a className="text-gray-900" href="/operator/dashboard">
        <h1 style={{ marginLeft: "1.5rem", fontSize: "1.3rem" }}>
          Operator's Panel
        </h1>
      </a>
      <ul className="mt-8">
        {sidebar.map((route) => (
          <li className="relative" key={route.name}>
            <NavLink
              exact
              to={route.path}
              className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700"
              activeClassName="text-green-500"
            >
              <Route path={route.path} exact={route.exact}>
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg addBusBtnHomeIndi"
                  aria-hidden="true"
                ></span>
              </Route>
              <route.icon className="w-5 h-5" aria-hidden="true" />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button
          onClick={handleLogOut}
          size="large"
          className="w-full addBusBtnHome"
        >
          <span className="flex items-center">
            <IoLogOutOutline
              className="mr-3 text-lg"
              style={{ color: "#FFF" }}
            />
            <span className="text-sm">Log out </span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;
