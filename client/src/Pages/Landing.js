import React, { useEffect } from "react";
import NavigationBar from "../Components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import folder_logo from "../assets/folder_logo.png";
import Footer from "../Components/Footer";
const Landing = () => {
  useEffect(() => {
    var dayjs = require("dayjs");

    var display = dayjs().format("YYYY/MM/DD");

    let expired = dayjs(display).add(1, "day").format("YYYY/MM/DD");
    console.log("start at: " + display);
    console.log("expired at: " + expired);
  }, []);

  return (
    <>
      <NavigationBar />
      <Container
        fluid="md"
        className="container d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col
            s={12}
            md={6}
            className="
            d-flex 
            flex-column 
            justify-content-center 
            align-items-center
            "
          >
            <h1 className="title mb-4">CEIT Manuscript Information System</h1>
            <p className="description">
              We aim to keep and provide a clean track of information about the
              past and incoming capstone research mansucripts created by
              Pamantasan ng Lungsod ng Valenzuela's CEIT students.
            </p>
          </Col>
          <Col
            s={12}
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={folder_logo}
              alt="folder_logo"
              className="landing-logo img-fluid"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Landing;
