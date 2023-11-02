import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom"
import { Button } from '@windmill/react-ui';
import { ImFacebook, ImGoogle } from 'react-icons/im';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';
import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import useLoginSubmit from '../hooks/useLoginSubmit';
// API
import { loginOperator } from "../../actions/auth"
// Redux
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import store from "../../store"

const OperatorLogin = ({ loginOperator }) => {
  const history = useHistory()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  
  const handleUserData = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleLoginSubmit = () => {
    let loginObj = {
      email: user.email,
      password: user.password,
    }
    console.log(loginObj)
    loginOperator({loginObj, history})
  }
  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                  Login
                </h1>
                <form>
                  <LabelArea label="Email" />
                  <InputArea
                    value={user.email}
                    onChange={(e) => handleUserData(e)}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                  />
                  <div className="mt-6"></div>
                  <LabelArea label="Password" />
                  <InputArea
                    value={user.password}
                    onChange={(e) => handleUserData(e)}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="***************"
                  />
                    <Button
                      className="mt-4 h-12 w-full"
                      onClick={handleLoginSubmit}
                    >
                      Log in
                    </Button>
                  <hr className="my-10" />
                  <button
                    disabled
                    className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
                  >
                    <ImFacebook className="w-4 h-4 mr-2" />{' '}
                    <span className="ml-2">Login With Facebook</span>
                  </button>
                  <button
                    disabled
                    className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                  >
                    <ImGoogle className="w-4 h-4 mr-2" />{' '}
                    <span className="ml-2">Login With Google</span>
                  </button>
                </form>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-green-500 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-green-500 hover:underline"
                    to="/operator/signup"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

OperatorLogin.propTypes = {
  loginOperator: propTypes.func.isRequired
}

export default connect(null, { loginOperator })(OperatorLogin);

