import React, { useState, useEffect } from "react";
import Axios from "axios";
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
  let expiredAt = dayjs(createdAt).add(1, "day").format("YYYY-MM-DD hh:mm:ss");

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

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setIsAuthenticated(true);
        setRole(response.data.user[0].role);
        console.log("current Role is: " + role);
      }
    });
  }, [role]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setGuestUsername(e.currentTarget.value);
            }}
          />
          <input
            type="texts"
            placeholder="Password"
            onChange={(e) => {
              setGuestPassword(e.currentTarget.value);
            }}
          />
          <button onClick={createGuestCredentials}>
            {" "}
            Create Guest Credentials
          </button>
        </>
      ) : (
        "You aren't authenticated."
      )}
    </>
  );
};

export default Manuscript;
