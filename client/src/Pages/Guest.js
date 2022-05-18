import React, { useEffect, useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/login.png";
import Cookies from "universal-cookie";
import Axios from "axios";
var dayjs = require("dayjs");
export let timeIn = "";
const Guest = () => {
  let today = dayjs().format("YYYY-MM-DD hh:mm:ss");
  const [guestUsername, setGuestUsername] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //* Button State
  const [isDisabled, setIsDisabled] = useState(false);
  Axios.defaults.withCredentials = true;

  const timeout = () => {
    navigate("/manuscript");
  };
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  let navigate = useNavigate();

  const guestLogin = () => {
    const cookies = new Cookies();
    Axios.post("http://192.168.254.100:3001/guestLogin", {
      guestUsername: guestUsername,
      guestPassword: guestPassword,
    }).then((response) => {
      if (response.data.message) {
        setErrorMessage(response.data.message);
        setTimeout(clearErrorMessage, 2000);
      } else {
        setCreatedBy(response.data[0].createdBy);
        let expirationDate = dayjs(response.data[0].expiredAt).format(
          "YYYY-MM-DD hh:mm:ss"
        );
        if (dayjs(today).isAfter(dayjs(expirationDate))) {
          setErrorMessage("This account is expired.");
          setTimeout(clearErrorMessage, 2000);
        } else {
          timeIn = dayjs().format("YYYY-MM-DD hh:mm:ss");
          setIsDisabled(true);
          setTimeout(timeout, 2000);
          setSuccessMessage("Success! Redirecting...");
          cookies.set("timeIn", timeIn, { path: "/" });
        }
      }
    });
  };

  return (
    <>
      <NavigationBar />
      <Container fluid="sm" className="guest_container">
        <Row>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex justify-content-center flex-column"
          >
            <h2 className="login">Guest Login</h2>
            <p className="sub_title text-start">
              Before you can have an official guest access to CEIT Manuscript
              Information System, you may request and get the{" "}
              <strong>Email & Password</strong> from the <strong>dean</strong>{" "}
              or <strong>chairperson</strong> of the CEIT Department.
            </p>
            <p className="sub_title text-start">
              Once you already have the <strong>credentials</strong> from the
              Dean or Chairperson of the CEIT Department, please enter the{" "}
              <strong>credentials</strong> below.
            </p>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                guestLogin();
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="form-header">Username</Form.Text>
                <Form.Control
                  type="Username"
                  placeholder="Username"
                  className="input mt-2"
                  onChange={(e) => setGuestUsername(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Text className="form-header">Password</Form.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input mt-2"
                  onChange={(e) => setGuestPassword(e.currentTarget.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2 d-flex justify-content-end">
                <Button
                  variant="primary"
                  type="Submit"
                  className="landing-btns"
                  disabled={isDisabled}
                >
                  Log In
                </Button>
              </div>{" "}
            </Form>
          </Col>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex justify-content-center flex-column "
          >
            <div className="image-fluid mb-4  d-flex justify-content-center">
              <img src={logo} alt="PLV Logo" className="login-logo" />
            </div>
            <div className="text d-flex flex-column justify-content-center align-items-center">
              <div className="right-header mb-4 ">
                Browsing manuscripts made easier!
              </div>
              <div className="description">
                Through CEIT Manuscript Information System, everything is made
                clean, less time-consuming and easy to maintain. Be sure to
                login to gain special permissions.
              </div>
            </div>
          </Col>
          {createdBy}
          {errorMessage}
        </Row>
      </Container>
    </>
  );
};

export default Guest;
