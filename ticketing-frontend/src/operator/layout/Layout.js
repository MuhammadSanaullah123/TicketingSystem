import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import './adminsOperator.css'
import Main from "./Main";
import routes from "../routes";
// import routesClient from "../routes/routesClient";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { SidebarContext } from "../context/SidebarContext";
import ThemeSuspense from "../components/theme/ThemeSuspense";
// API
import { getOperatorById } from "../../actions/operators"
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"
//const Page404 = lazy(() => import("../pages/404"));
const Layout = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  
  let location = useLocation();
  
  const params = window.location.href.split("/");
  
  useEffect(() => {
    closeSidebar();
    console.log('layout triggered')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  
  console.log("params", params);
  
  return (
    <>
      {params[3] == "user" ? (
        <Suspense fallback={<ThemeSuspense />}>
          <Switch>
            {routes.map((route, i) => {
              return route.component ? (
                <Route
                  key={i}
                  exact={true}
                  path={`${route.path}`}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
            <Redirect exact from="/" to="/operator/dashboard" />
            <Redirect exact from="/operator/" to="/operator/dashboard" />
            {/*<Route component={Page404} />*/}
          </Switch>
        </Suspense>
      ) : (
        <>
          <div
            className={`flex h-screen bg-gray-50 ${
              isSidebarOpen && "overflow-hidden"
            }`}
          >
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />

              <Main>
                <Suspense fallback={<ThemeSuspense />}>
                  <Switch>
                    {routes.map((route, i) => {
                      return route.component ? (
                        <Route
                          key={i}
                          exact={true}
                          path={`${route.path}`}
                          render={(props) => <route.component {...props} />}
                        />
                      ) : null;
                    })}
                    <Redirect exact from="/" to="/admin/dashboard" />
                    {/*<Route component={Page404} />*/}
                  </Switch>
                </Suspense>
              </Main>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Layout.propTypes = {
  getOperatorById: propTypes.func.isRequired
}

const mapStateToProps = state => ({
  operator: state.operator
})

export default connect(mapStateToProps, { getOperatorById })(Layout);

