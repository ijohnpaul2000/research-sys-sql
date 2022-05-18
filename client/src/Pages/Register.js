import React, { useState } from "react";
import { Button, Container, Form, FormText } from "react-bootstrap";
import Axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Chairperson");
  console.log(role);

  const onFormSubmit = () => {
    Axios.post("http://192.168.254.100:3001/register", {
      username: username,
      password: password,
      role: role,
    }).then((response) => {
      console.log(JSON.stringify(response));
    });
  };

  return (
    <Container fluid className="register">
      <div className="register__container shadow">
        <h1 className="register__header">Create Guest Credentials</h1>

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
          <Button type="submit" className="register__button">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
