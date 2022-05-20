import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const NotAuthenticated = () => {
  return (
    <>
      <div className="notauth_container">
        <div className="lock"></div>
        <div className="message">
          <h1>Access to this page is restricted</h1>
          <p>Please contact the dean for the credentials.</p>
          <Link to="/" className="link_homepage">
            Back to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotAuthenticated;
