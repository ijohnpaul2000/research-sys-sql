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
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200,
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
//CHECK PASSWORD BOSS NAKS HSHSHS
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "manuscript_db",
});

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));

// app.get("/image/:id", (req, res) => {
//   const { id } = req.params;
//   const query = "Select file_data From file Where id = ?";
//   con.query(query, [id], (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     // console.log(Buffer.from(result[0].file_data).toString())
//     res.render("imageView", { name: result[0].file_data });
//   });
// });

// app.post("/store", (req, res) => {
//   const { image, fileName } = req.body;
//   const query =
//     "Insert Into file(file_name, file_data, created_by, created_on) Values(?,?,?,CURRENT_TIMESTAMP)";
//   con.query(query, [fileName, image, "Program"], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send({ msg: "SERVER_ERROR" });
//     }
//     res.status(200).send({ id: result.insertId });
//   });
// });

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
          res.send(result);
        } else {
          res.send({ message: "This data is existing and may be expired." });
        }
      }
    );
  });
});

//** Method for Login all actions but guest.
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

//** Method for deleting expired Audits.
app.post("/viewAudits", (req, res) => {
  const accessedBy = req.query.accessedBy;
  const timeIn = req.query.timeIn;
  const timeOut = req.query.timeOut;
  const deletedAt = req.query.deletedAt;

  db.query("SELECT * FROM tbl_audits ", (err, result) => {
    if (err) {
      res.send({ err: err });
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);
      console.log(result);
    }
  });
});

//** Method for inserting Audits */

app.post("/addAudit", (req, res) => {
  const accessedBy = req.body.accessedBy;
  const timeIn = req.body.timeIn;
  const timeOut = req.body.timeOut;
  const deletedAt = req.body.deletedAt;
  const permittedBy = req.body.permittedBy;
  db.query(
    "INSERT INTO tbl_audits (accessedBy, timeIn, timeOut, deletedAt, permittedBy) VALUES (?,?,?,?,?)",
    [accessedBy, timeIn, timeOut, deletedAt, permittedBy],
    (err, result) => {
      if (result) {
        res.send(result);
        console.log(result);
      } else {
        res.send({ message: "Operation Failed." });
      }
      if (err) {
        console.log(err);
      }
    }
  );
});

app.post("/deleteAudits", (req, res) => {
  const deletedAt = req.body.deletedAt;
  db.query("DELETE FROM tbl_audits where deletedAt < NOW()", (err, result) => {
    if (result) {
      console.log(result);
      console.log(deletedAt);
    } else {
      console.log(err);
      console.log(deletedAt);
    }
  });
});

// THESIS CONTENT MANAGEMENT SYSTEM

//Retrieving Manuscripts
app.get("/manuscripts", (req, res) => {
  let sql = "SELECT * FROM tbl_thesis";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Creating Thesis Content
app.post("/create", (req, res) => {
  const title = req.body.title;
  const course = req.body.course;
  const yearLevel = req.body.yearLevel;
  const section = req.body.section;
  const yearPublished = req.body.yearPublished;
  const authors = req.body.authors;
  const panelists = req.body.panelists;
  const copies = req.body.copies;
  const volume = req.body.volume;
  const grades = req.body.grades;
  const keywords = req.body.keywords;
  const adviser = req.body.adviser;
  const chairperson = req.body.chairperson;
  const dean = req.body.dean;
  const abstract = req.body.abstract;
  const journal = req.body.journal;
  const journal_name = req.body.journal_name;

  var sql =
    "INSERT INTO tbl_thesis (title, course, yearLevel, section, yearPublished, authors, panelists, copies, volume, grades, keywords, adviser, chairperson, dean, abstract,journal,journal_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      title,
      course,
      yearLevel,
      section,
      yearPublished,
      authors,
      panelists,
      copies,
      volume,
      grades,
      keywords,
      adviser,
      chairperson,
      dean,
      abstract,
      journal,
      journal_name,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("New Value Inserted");
      }
    }
  );
});

//Updating Thesis Content
app.put("/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const course = req.body.course;
  const yearLevel = req.body.yearLevel;
  const section = req.body.section;
  const yearPublished = req.body.yearPublished;
  const authors = req.body.authors;
  const panelists = req.body.panelists;
  const copies = req.body.copies;
  const volume = req.body.volume;
  const grades = req.body.grades;
  const keywords = req.body.keywords;
  const adviser = req.body.adviser;
  const chairperson = req.body.chairperson;
  const dean = req.body.dean;
  const abstract = req.body.abstract;

  var sql =
    "UPDATE tbl_thesis SET title = ? , course = ?, yearLevel = ?, section = ?, yearPublished = ?, authors = ? , panelists = ?, copies = ?, volume = ?, grades = ?, keywords = ? , adviser = ?, chairperson = ?, dean = ?, abstract = ? WHERE thesis_id = ?";

  db.query(
    sql,
    [
      title,
      course,
      yearLevel,
      section,
      yearPublished,
      authors,
      panelists,
      copies,
      volume,
      grades,
      keywords,
      adviser,
      chairperson,
      dean,
      abstract,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("New Value Updated");
      }
    }
  );
});

//Deleting Thesis Content
app.delete("/deleteThesis/:id", (req, res) => {
  const id = req.params.id;

  var sql = "DELETE FROM tbl_thesis WHERE thesis_id = ?";

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Value Deleted");
    }
  });
});

// SECTION
//Retrieving Sections
app.get("/sections", (req, res) => {
  let sql = "SELECT * FROM tbl_section";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Year Level
//Retrieving Year Level
app.get("/yearlevel", (req, res) => {
  let sql = "SELECT * FROM tbl_yearlevel";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("running server");
});
