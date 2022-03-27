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
import CreateGuest from "../Modals/CreateGuest";
import Audit from "../AuditTrails/Audit";
var dayjs = require("dayjs");
const Manuscript = () => {
  Axios.defaults.withCredentials = true;
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAudits, setShowAudits] = useState(false);
  const [permittedBy, setPermittedBy] = useState("");
  let navigate = useNavigate();

  const [auditTimeIn, setAuditTimeIn] = useState("");

  //*TODO: For getting the date object.

  const timeout = () => {
    navigate("/login");
  };

  const logoutUser = () => {
    Axios.post("http://localhost:3001/addAudit", {
      accessedBy: role,
      timeIn: auditTimeIn,
      timeOut: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      deletedAt: dayjs(auditTimeIn).add(1, "w").format("YYYY-MM-DD HH:mm:ss"),
      permittedBy: permittedBy,
    }).then((response) => {
      console.log(
        JSON.stringify("ADD AUDIT RESPONSE: " + JSON.stringify(response))
      );
    });

    Axios.get("http://localhost:3001/logout").then((response) => {
      setIsAuthenticated(false);
    });
    setTimeout(timeout, 1000);
  };

  useEffect(() => {
    setAuditTimeIn(dayjs().format("YYYY-MM-DD hh:mm:ss"));

    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setIsAuthenticated(true);
        setRole(response.data.user[0].role);
        setPermittedBy(response.data.user[0].createdBy);
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
                <Dropdown.Item
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Create Guest Credentials
                  {showModal ? <CreateGuest createRole={role} /> : ""}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setShowAudits(true);
                  }}
                >
                  System History
                  {showAudits ? <Audit permittedBy={permittedBy} /> : ""}
                </Dropdown.Item>
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
          <Row>This guest is permitted by : {permittedBy}</Row>
        </Container>
      ) : (
        <NotAuthenticated />
      )}
    </>
  );
};

export default Manuscript;
