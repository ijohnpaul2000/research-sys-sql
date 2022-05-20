import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import logo from "../assets/guest_credentials.png";
import Axios from "axios";
var dayjs = require("dayjs");

const CreateGuest = ({ createRole }) => {
  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // *TODO: guestCredentials button for chairperson and dean

  const [guestUsername, setGuestUsername] = useState("");
  const [guestPassword, setGuestPassword] = useState("");

  //*  For button

  const [isDisabled, setIsDisabled] = useState(false);

  let createdAt = dayjs().format("YYYY-MM-DD hh:mm:ss");
  let expiredAt = dayjs(createdAt).add(1, "days").format("YYYY-MM-DD hh:mm:ss");

  let navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  const timeout = () => {
    navigate("/manuscript");
  };
  const clearErrorMessage = () => {
    setErrorMessage("");
  };
  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };
  useEffect(() => {
    console.log(createRole);
  }, []);

  const createGuestCredentials = () => {
    if (guestUsername.length > 10 && guestPassword.length > 10) {
      Axios.post("http://localhost:3001/createCredentials", {
        guestUsername: guestUsername,
        guestPassword: guestPassword,
        createdAt: createdAt,
        expiredAt: expiredAt,
        createdBy: createRole,
      }).then((response) => {
        console.log(JSON.stringify(response));

        if (!response.data.message) {
          setSuccessMessage("Success, you may let the guest use this data.");
          setTimeout(clearSuccessMessage, 2000);
          setTimeout(handleClose, 2000);
          setIsDisabled(true);
        }

        if (response.data.message) {
          setErrorMessage(response.data.message);
        }
      });
    } else if (guestUsername.length < 10 && guestPassword.length < 10) {
      setErrorMessage("Enter more than 10 characters.");
      setTimeout(clearErrorMessage, 2000);
    } else {
      setErrorMessage(
        "Error found, please try again with different credentials."
      );
      setTimeout(clearErrorMessage, 2000);
    }
  };

  return ReactDom.createPortal(
    <div>
      <Container fluid>
        <Modal show={show} keyboard={false} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>

          <Col
            sm={12}
            className="d-flex flex-column justify-content-center align-items-center text-center mb-5 mt-5"
          >
            <img
              src={logo}
              className="ForgotPass_Modal-logo img-fluid w-50 h-50 "
            />
            <h1 className="fp_header">Create Guest Credentials</h1>

            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => {
                    setGuestUsername(e.currentTarget.value);
                  }}
                />
                <Form.Text>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setGuestPassword(e.currentTarget.value);
                  }}
                />
              </Form.Group>
              <Button
                onClick={createGuestCredentials}
                className="mb-3"
                disabled={isDisabled}
              >
                Submit
              </Button>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
            </Form>
          </Col>
        </Modal>
      </Container>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CreateGuest;
