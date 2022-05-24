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
import Axios from "axios";
var randomString = require("random-string");

const CreateUser = () => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Dean");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const onFormSubmit = () => {
    const secret_id = randomString({
      length: 15,
      numeric: true,
      letters: true,
      special: true,
    });
    Axios.post("http://localhost:3001/register", {
      username: username,
      password: password,
      role: role,
      secret_id: secret_id,
    }).then((response) => {
      console.log(JSON.stringify(response));
      setMessage(response.data.message);
    });
  };
  return ReactDom.createPortal(
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select
                aria-label="formSelectRole"
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Dean</option>
                <option>Chairperson</option>
                <option>Encoder</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Text>{message}</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={onFormSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
    document.getElementById("modal-root")
  );
};

export default CreateUser;
