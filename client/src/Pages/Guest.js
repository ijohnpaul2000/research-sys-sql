import React from "react";
import NavigationBar from "../Components/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/login.png";

const Guest = () => {
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
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="form-header">Email Address</Form.Text>
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="input mt-2"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Text className="form-header">Password</Form.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input mt-2"
                />
              </Form.Group>
              <div className="d-grid gap-2 d-flex justify-content-end">
                <Button
                  variant="primary"
                  type="Submit"
                  className="landing-btns"
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
              <div className="header mb-4 ">
                Browsing manuscripts made easier!
              </div>
              <div className="description">
                Forget flipping pages! You can search and download the research
                abstract of the manuscript you need using this system.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Guest;
