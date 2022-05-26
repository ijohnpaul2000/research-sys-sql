import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Alert,
} from "react-bootstrap";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillEyeFill,
  BsTrash,
} from "react-icons/bs";
import { IconContext } from "react-icons";
import "../sass/pages/_manuscript.scss";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NotAuthenticated from "../Components/NotAuthenticated";
import CreateGuest from "../Modals/CreateGuest";
import CreateThesis from "../Modals/CreateThesis";
import Audit from "../AuditTrails/Audit";
import { Chip, Stack, Avatar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UpdateThesis from "../Modals/UpdateThesis";
import DeleteThesis from "../Modals/DeleteThesis";
import { timeIn } from "./Login";
import Cookies from "universal-cookie";
import CreateUser from "../Modals/CreateUser";
import ListUser from "../Modals/ListUser";

var dayjs = require("dayjs");

const Manuscript = () => {
  let navigate = useNavigate();
  //Modal States
  const [showModal, setShowModal] = useState(false);
  const [showAudits, setShowAudits] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showListUserModal, setShowListUserModal] = useState(false);
  //User States
  Axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permittedBy, setPermittedBy] = useState("");

  const [auditTimeIn, setAuditTimeIn] = useState("");

  //Thesis States
  const [thesisData, setThesisData] = useState([]);

  // Get Thesis ID
  const [thesisId, setThesisId] = useState("");

  //Get Single Thesis Record
  const [singleThesis, setSingleThesis] = useState([]);

  const [title, setTitle] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  //Toggle States
  const toggleShow = () => setShowAddModal((p) => !p);
  const toggleUpdateShow = () => setShowEditModal((p) => !p);
  const toggleDeleteShow = () => setShowDeleteModal((p) => !p);
  const toggleCreateUserShow = () => setShowCreateUserModal((p) => !p);
  const toggleListUserShow = () => setShowListUserModal((p) => !p);

  const refreshToggle = () => setRefreshData(!refreshData);

  const columns = [
    { field: "thesis_id", headerName: "ID", width: 20, flex: 1 },
    { field: "title", headerName: "Title", width: 200, flex: 2 },
    { field: "authors", headerName: "Authors", width: 200, flex: 2 },
    { field: "panelists", headerName: "Panels", width: 200, flex: 2 },
    { field: "adviser", headerName: "Adviser", width: 200, flex: 2 },
    { field: "course", headerName: "Course", width: 200, flex: 2 },
    { field: "yearPublished", headerName: "Year Pub", width: 20, flex: 1 },
    { field: "yearLevel", headerName: "Year Lv", width: 20, flex: 1 },
    { field: "section", headerName: "Section", width: 20, flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      width: 20,
      flex: 1,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <ButtonGroup className="center-btn">
            <Button
              variant="primary"
              onClick={(event) => {
                console.log(cellValues);
                console.log("selected thesis : " + cellValues.row.thesis_id);
                openViewInfo(
                  cellValues.row.thesis_id,
                  cellValues.row.title,
                  cellValues.row.course,
                  cellValues.row.yearLevel,
                  cellValues.row.section,
                  cellValues.row.authors,
                  cellValues.row.panelists,
                  cellValues.row.copies,
                  cellValues.row.volume,
                  cellValues.row.grades,
                  cellValues.row.keywords,
                  cellValues.row.adviser,
                  cellValues.row.chairperson,
                  cellValues.row.dean,
                  cellValues.row.abstract,
                  cellValues.row.yearPublished
                );
              }}
            >
              <IconContext.Provider value={{ color: "#fff" }}>
                <div>
                  <BsFillEyeFill />
                </div>
              </IconContext.Provider>
            </Button>

            {role !== "Guest" && (
              <>
                <Button
                  variant="danger"
                  onClick={() => {
                    openDeleteModal(
                      cellValues.row.thesis_id,
                      cellValues.row.title
                    );
                  }}
                >
                  <IconContext.Provider value={{ color: "#fff" }}>
                    <div>
                      <BsTrash />
                    </div>
                  </IconContext.Provider>
                </Button>
              </>
            )}
          </ButtonGroup>
        );
      },
    },
  ];

  //*TODO: For getting the date object.
  const timeout = () => {
    navigate("/login");
  };

  const logoutUser = () => {
    const cookies = new Cookies();
    Axios.post("http://localhost:3001/addAudit", {
      accessedBy: username,
      timeIn: cookies.get("timeIn"),
      timeOut: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      deletedAt: dayjs(cookies.get("timeIn"))
        .add(1, "w")
        .format("YYYY-MM-DD HH:mm:ss"),
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

    cookies.remove("timeIn");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setIsAuthenticated(true);
        setUsername(response.data.user[0].username);
        setRole(response.data.user[0].role);
        setPermittedBy(response.data.user[0].createdBy);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/manuscripts").then((response) => {
      // console.log(response);
      setThesisData(response.data);
    });
  }, [refreshData]);

  //Open View Info Modal
  const openViewInfo = (
    id,
    title,
    course,
    yearLevel,
    section,
    authors,
    panelists,
    noOfCopies,
    volumeNo,
    grades,
    keywords,
    adviser,
    chairperson,
    dean,
    abstract,
    year
  ) => {
    setThesisId(id);

    const data = {
      id,
      title,
      course,
      yearLevel,
      section,
      authors,
      panelists,
      noOfCopies,
      volumeNo,
      grades,
      keywords,
      adviser,
      chairperson,
      dean,
      abstract,
      year,
    };
    setSingleThesis(data);
    toggleUpdateShow();
  };

  const openDeleteModal = (id, title) => {
    setThesisId(id);
    setTitle(title);
    toggleDeleteShow();
  };
  const openCreateUserModal = () => {
    toggleCreateUserShow();
  };
  const openListUserModal = () => {
    toggleListUserShow();
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <Stack direction="row" spacing={1} className="m-2">
            <Row>
              <Col lg={12} className="m--2">
                <Chip
                  className="m-2"
                  avatar={
                    <Avatar
                      alt={role}
                      src={
                        "https://avatars.dicebear.com/api/jdenticon/" +
                        Math.random() +
                        ".svg"
                      }
                    />
                  }
                  label={"Currenly Signed in as " + username}
                />
                <Chip
                  className="m-2"
                  avatar={
                    <Avatar
                      alt={role}
                      src={
                        "https://avatars.dicebear.com/api/jdenticon/" +
                        Math.random() +
                        ".svg"
                      }
                    />
                  }
                  label={"User Type: " + role}
                />
                <Chip
                  className={role === "Guest" ? "visibleEl m-2" : "hiddenEl"}
                  label={"Permitted by: " + permittedBy}
                  variant="outlined"
                />
              </Col>
            </Row>
          </Stack>
          <Container fluid="md" className="manuscript_container p">
            <Row>
              <Col className="manuscript-text mb-4">Manuscript List</Col>
            </Row>
            <Row>
              <Col
                md={12}
                className="d-flex justify-content-end align-items-center py-4"
              >
                {role === "Dean" ? (
                  <Button
                    className="mx-1"
                    onClick={() => {
                      openListUserModal();
                    }}
                  >
                    User Lists
                  </Button>
                ) : (
                  ""
                )}
                {showListUserModal && (
                  <ListUser
                    show={showListUserModal}
                    toggleShow={toggleListUserShow}
                  />
                )}
                {role === "Dean" ? (
                  <Button
                    className="mx-1"
                    onClick={() => {
                      openCreateUserModal();
                    }}
                  >
                    Create a User
                  </Button>
                ) : (
                  ""
                )}
                {showCreateUserModal && (
                  <CreateUser
                    show={showCreateUserModal}
                    toggleShow={toggleCreateUserShow}
                  />
                )}
                {role === "Encoder" || role === "Dean" ? (
                  <Button className="mx-1" onClick={toggleShow}>
                    Add Thesis
                  </Button>
                ) : (
                  ""
                )}
              </Col>
              <Col className="d-flex justify-content-end align-items-center ">
                {role === "Dean" || role === "Chairperson" ? (
                  <>
                    <Button
                      className="mx-1"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Create Guest Credentials
                      {showModal ? <CreateGuest createRole={username} /> : ""}
                    </Button>
                    <Button
                      className="mx-1"
                      onClick={() => {
                        setShowAudits(true);
                      }}
                    >
                      System History
                      {showAudits ? <Audit permittedBy={permittedBy} /> : ""}
                    </Button>
                  </>
                ) : (
                  ""
                )}{" "}
                <Button className="mx-1" onClick={logoutUser}>
                  Logout
                </Button>
              </Col>
            </Row>
          </Container>
          <div style={{ height: 600, width: "100%", padding: "40px" }}>
            <DataGrid
              rows={thesisData}
              columns={columns}
              getRowId={(row) => row.thesis_id}
              pageSize={10}
              rowsPerPageOptions={[10]}
              //* The toolbar will be hidden when the system is accessed by the guests.
              components={{ Toolbar: role !== "Guest" ? GridToolbar : null }}
              componentsProps={{
                toolbar: {
                  csvOptions: {
                    fields: [
                      "title",
                      "abstract",
                      "authors",
                      "adviser",
                      "course",
                      "yearLevel",
                      "section",
                      "yearPublished",
                      "panelists",
                    ],
                  },
                  printOptions: {
                    hideFooter: true,
                    hideToolbar: true,
                    //* Fields are only set to title since the masterlist are only (?) composed of title field.
                    fields: ["title"],
                  },
                },
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    thesis_id: false,
                    yearPublished: false,
                    panelists: false,
                  },
                },
              }}
            />
          </div>
          {showEditModal && (
            <UpdateThesis
              singleThesis={singleThesis}
              thesisId={thesisId}
              role={role}
              show={showEditModal}
              toggleShow={toggleUpdateShow}
              refreshToggle={refreshToggle}
            />
          )}
          {showDeleteModal && (
            <DeleteThesis
              thesisTitle={title}
              thesisId={thesisId}
              show={showDeleteModal}
              toggleShow={toggleDeleteShow}
              refreshToggle={refreshToggle}
            />
          )}
          {showAddModal && (
            <CreateThesis
              show={showAddModal}
              toggleShow={toggleShow}
              refreshToggle={refreshToggle}
            />
          )}
        </>
      ) : (
        <NotAuthenticated />
      )}
    </>
  );
};

export default Manuscript;
