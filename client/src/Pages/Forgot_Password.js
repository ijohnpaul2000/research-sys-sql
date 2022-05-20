import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormText, Row } from "react-bootstrap";
import Axios from "axios";

const Forgot_Password = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret_id, setSecret_id] = useState("");

  const [message, setMessage] = useState("");

  const [isValid, setIsValid] = useState(false);

  const onFormSubmit = () => {
    Axios.post("http://localhost:3001/forgot", {
      username: username,
      password: password,
      secret_id: secret_id,
    }).then((response) => {
      setMessage(response.data.message);
    });
  };

  useEffect(() => {
    if (password.length > 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password]);

  return (
    <Container fluid className="register">
      <div className="register__container shadow">
        <h1 className="register__header">Forgot Password</h1>
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
                console.log(username);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Secret ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              onChange={(e) => {
                setSecret_id(e.currentTarget.value);
                console.log(secret_id);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                console.log(password);
              }}
            />
          </Form.Group>
          <Form.Group className="my-4 ">
            <Form.Text className="font-weight-bold">{message}</Form.Text>
          </Form.Group>

          <Button
            type="submit"
            className="register__button"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Forgot_Password;
