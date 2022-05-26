import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormText } from "react-bootstrap";
import Axios from "axios";
var randomString = require("random-string");

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Dean");
  const [message, setMessage] = useState("");
  console.log(role);

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

  return (
    <Container fluid className="register">
      <div className="register__container shadow">
        <h1 className="register__header">Create Account</h1>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit();
          }}
        >
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
          <Button type="submit" className="register__button">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
