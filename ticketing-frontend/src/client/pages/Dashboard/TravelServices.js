import React, { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
import { addRequest } from "../../../actions/request";
import { connect } from "react-redux";
import propTypes from "prop-types";
import store from "../../../store";

const TravelServices = (service) => {
  const [values, setValues] = useState({
    category: service.service,
    name: "",
    email: "",
    mobnumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const Value = e.target.value;

    setValues({ ...values, [e.target.name]: Value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      category: service.service,
      name: values.name,
      email: values.email,
      mobnumber: values.mobnumber,
      message: values.message,
    };
    /*    data.append("category", service.service);
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("mobnumber", values.mobnumber);
    data.append("message", values.message); */

    store.dispatch(addRequest(data));
    setValues({
      category: "",
      name: "",
      email: "",
      mobnumber: "",
      message: "",
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="search-form-title">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your full name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="search-form-title">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="search-form-title">Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone Number"
            name="mobnumber"
            value={values.mobnumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="search-form-title">Your query</Form.Label>
          <Form.Control
            as="textarea"
            placeholder={`Enter your requirement for ${service.service}`}
            name="message"
            value={values.message}
            onChange={handleChange}
          />
        </Form.Group>
        <button className="senbtn" type="submit">
          Send
        </button>
      </Form>
    </div>
  );
};
TravelServices.propTypes = {
  addRequest: propTypes.func.isRequired,
};

export default connect(null, { addRequest })(TravelServices);
