const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,

    //!remove this if cookie is needed.
    // cookie: {
    //   expires: 24 * 60 * 60 * 1000,
    // },
  })
);

//**  Instance of the database object.
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "manuscript_db",
});

//* * Method for getting the DEAN, CHAIRPERSON, ENCODER Sessions
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

//* * Method for getting the GUEST Sessions
app.get("/guestLogin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
//* * Method for logging out the users.

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    }
  });
});

//* *Method for creating guest Credentials with expiration and who created.
app.post("/createCredentials", (req, res) => {
  const guestUsername = req.body.guestUsername;
  const guestPassword = req.body.guestPassword;
  const createdAt = req.body.createdAt;
  const expiredAt = req.body.expiredAt;
  const createdBy = req.body.createdBy;

  bcrypt.hash(guestPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO tbl_credentials (username, password,createdAt,expiredAt,createdBy) VALUES (?,?,?,?,?)",
      [guestUsername, hash, createdAt, expiredAt, createdBy],
      (err, result) => {
        if (result) {
          console.log(result);
        } else {
          console.log(err);
        }
      }
    );
  });
});

//** Method for Loggin all actions but guest.
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM tbl_users WHERE username = ? ",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong credentials." });
          }
        });
      } else {
        res.send({ message: "User doesn't exist." });
      }
    }
  );
});

//** Method for Logging in the guests.
app.post("/guestLogin", (req, res) => {
  const guestUsername = req.body.guestUsername;
  const guestPassword = req.body.guestPassword;

  db.query(
    "SELECT * FROM tbl_credentials WHERE username = ? ",
    guestUsername,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(guestPassword, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong credentials." });
          }
        });
      } else {
        res.send({ message: "User doesn't exist." });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
