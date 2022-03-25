import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NotAuthenticated from "../Components/NotAuthenticated";
var dayjs = require("dayjs");
const Manuscript = () => {
  Axios.defaults.withCredentials = true;
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // *TODO: guestCredentials button for chairperson and dean

  const [guestUsername, setGuestUsername] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  //*TODO: For getting the date object.

  let createdAt = dayjs().format("YYYY-MM-DD hh:mm:ss");
  let expiredAt = dayjs(createdAt).add(1, "m").format("YYYY-MM-DD hh:mm:ss");
  let navigate = useNavigate();

  const timeout = () => {
    navigate("/login");
  };

  const createGuestCredentials = () => {
    Axios.post("http://localhost:3001/createCredentials", {
      guestUsername: guestUsername,
      guestPassword: guestPassword,
      createdAt: createdAt,
      expiredAt: expiredAt,
      createdBy: role,
    }).then((response) => {
      console.log(response);
    });
  };
  const logoutUser = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      setIsAuthenticated(false);
    });
    setTimeout(timeout, 2000);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setIsAuthenticated(true);
        setRole(response.data.user[0].role);
        console.log("current Role is: " + role);
      } else {
      }
    });
  }, [role, isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <Container fluid="md" className="manuscript_container">
          <Row>
            <Col className="manuscript-text mb-4">Manuscript List</Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end align-items-center">
              <DropdownButton id="dropdown-basic-button" title="Settings">
                <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>Export Masterlist</Button>
              <Button>Import Masterlist</Button>
              <Button>Export PDFs</Button>
              <Button>Add Thesis</Button>
            </Col>
          </Row>
          <Row>{role}</Row>
        </Container>
      ) : (
        <NotAuthenticated />
      )}
    </>
  );
};

export default Manuscript;
