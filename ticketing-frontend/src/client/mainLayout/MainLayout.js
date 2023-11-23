import React, { Children } from "react";
//main layout
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Header2 from "./Header/Header2";
import Header3 from "./Header/Header3";

const mainLayout = (props) => {
  const pathname = window.location.pathname;

  return (
    <>
      {pathname === "/client/bus-listing2/home" ? <Header3 /> : <Header3 />}
      {props.children}
      <Footer />
    </>
  );
};

export default mainLayout;
