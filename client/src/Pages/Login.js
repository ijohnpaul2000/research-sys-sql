import React, { useState, useEffect } from "react";
import NavigationBar from "../Components/NavigationBar";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/login.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
var dayjs = require("dayjs");

export let timeIn = "";
const Landing = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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

  const login = () => {
    const cookies = new Cookies();

    console.log(cookies.get("timeIn")); // Pacman

    Axios.post("http://192.168.254.100:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log("this is the response : " + JSON.stringify(response));
      if (response.data.message) {
        setErrorMessage(response.data.message);
        setTimeout(clearErrorMessage, 2000);
      } else {
        setIsDisabled(true);
        timeIn = dayjs().format("YYYY-MM-DD hh:mm:ss");
        setTimeout(timeout, 2000);
        setSuccessMessage("Success! Redirecting...");
        setRole(response.data[0].role);
        cookies.set("timeIn", timeIn, { path: "/" });
      }
    });
  };

  // useEffect(() => {
  //   Axios.get("http://192.168.254.100:3001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return (
    <>
      <NavigationBar />
      <Container
        fluid="md"
        className="guest_container d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col
            sm={12}
            md={6}
            className="landing_container d-flex flex-column justify-content-center"
          >
            <div className="p-4 box">
              <p className="login">Login</p>
              <p className="sub_title">
                Hello there! Log in to continue and get started
              </p>
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Text className="form-header">Username</Form.Text>
                  <Form.Control
                    placeholder="Username"
                    className="input mt-2"
                    autoComplete="on"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text className="form-header">Password</Form.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="input mt-2"
                    autoComplete="on"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <div className="d-grid gap-2 d-flex justify-content-end">
                  <Button
                    type="Submit"
                    className="landing-btns"
                    disabled={isDisabled}
                  >
                    Log In
                  </Button>
                </div>{" "}
              </Form>
              <div className="line-container">
                <span className="or-txt">or</span>
              </div>

              <div className="d-grid gap-4 mt-4 d-flex justify-content-center">
                <Link
                  to="/guest"
                  className="login_guest d-flex justify-content-center align-items-center"
                >
                  Login as Guest
                </Link>
              </div>
            </div>
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
        </Row>
      </Container>
    </>
  );
};

export default Landing;
