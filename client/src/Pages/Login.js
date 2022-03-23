import React from "react";
import NavigationBar from "../Components/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/login.png";
const Landing = () => {
  return (
    <>
      <NavigationBar />
      <Container
        fluid="md"
        className="landing_container d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col
            sm={12}
            md={6}
            className=" d-flex flex-column justify-content-center"
          >
            <div className="p-4 box">
              <p className="login">Login</p>
              <p className="sub_title">
                Hello there! Log in to continue and get started
              </p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Text className="form-header">Email Address</Form.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    className="input mt-2"
                    autoComplete="on"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text className="form-header">Password</Form.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="input mt-2"
                    autoComplete="on"
                  />
                </Form.Group>
                <div className="d-grid gap-2 d-flex justify-content-end">
                  <Button type="Submit" className="landing-btns">
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
            <div className="p-4 box mt-3 text-center">
              Forgot Password?{" "}
              <button className="reset-btn">Reset your password.</button>
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
