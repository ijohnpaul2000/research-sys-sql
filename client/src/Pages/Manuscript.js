import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup
} from "react-bootstrap";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillEyeFill,
  BsTrash,
} from "react-icons/bs";
import { IconContext } from "react-icons";
import "../sass/pages/_manuscript.scss"
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NotAuthenticated from "../Components/NotAuthenticated";
import CreateGuest from "../Modals/CreateGuest";
import CreateThesis from "../Modals/CreateThesis"
import Audit from "../AuditTrails/Audit";
import { Chip, Stack, Avatar } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UpdateThesis from "../Modals/UpdateThesis";
import DeleteThesis from "../Modals/DeleteThesis";

var dayjs = require("dayjs");

const Manuscript = () => {
  //Modal States
  const [showModal, setShowModal] = useState(false);
  const [showAudits, setShowAudits] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //User States
  Axios.defaults.withCredentials = true;
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permittedBy, setPermittedBy] = useState("");
  let navigate = useNavigate();
  const [auditTimeIn, setAuditTimeIn] = useState("");

  //Thesis States
  const [thesisData, setThesisData] = useState([]);

  // Get Thesis ID
  const [thesisId, setThesisId] = useState("");

  //Get Single Thesis Record
  const [singleThesis, setSingleThesis] = useState([]);

  const [title, setTitle] = useState("");

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
            <Button
              variant="danger"
              onClick={() => {
                openDeleteModal(cellValues.row.thesis_id, cellValues.row.title);
              }}
            >
              <IconContext.Provider value={{ color: "#fff" }}>
                <div>
                  <BsTrash />
                </div>
              </IconContext.Provider>
            </Button>
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
    Axios.post("http://localhost:3001/addAudit", {
      accessedBy: role,
      timeIn: auditTimeIn,
      timeOut: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      deletedAt: dayjs(auditTimeIn).add(1, "w").format("YYYY-MM-DD HH:mm:ss"),
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
  };

  useEffect(() => {
    setAuditTimeIn(dayjs().format("YYYY-MM-DD hh:mm:ss"));

    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setIsAuthenticated(true);
        setRole(response.data.user[0].role);
        setPermittedBy(response.data.user[0].createdBy);
      } else {
      }
    });
  }, [role, isAuthenticated]);

  useEffect(() => {
    Axios.get("http://localhost:3001/manuscripts").then((response) => {
      // console.log(response);
      setThesisData(response.data);
    });
  }, []);

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
        year
      };
      setSingleThesis(data);
      setShowEditModal(true);
    };

    const openDeleteModal = (id, title) => {
      setThesisId(id);
      setTitle(title);
      setShowDeleteModal(true)
    }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Stack direction="row" spacing={1} className="m-2">
            <Chip
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
              label={"Currenly Signed in as " + role}
            />
            <Chip
              className={role === "Guest" ? "visibleEl" : "hiddenEl"}
              label={"Permitted by: " + permittedBy}
              variant="outlined"
            />
          </Stack>
          <Container fluid="md" className="manuscript_container">
            <Row>
              <Col className="manuscript-text mb-4">Manuscript List</Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end align-items-center">
                <DropdownButton id="dropdown-basic-button" title="Settings">
                  <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Create Guest Credentials
                    {showModal ? <CreateGuest createRole={role} /> : ""}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setShowAudits(true);
                    }}
                  >
                    System History
                    {showAudits ? <Audit permittedBy={permittedBy} /> : ""}
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button>Export Masterlist</Button>
                <Button>Import Masterlist</Button>
                <Button>Export PDFs</Button>
                <Button
                  onClick={() => {
                    setShowAddModal(true);
                    console.log("Add Modal Open");
                  }}
                >
                  Add Thesis
                  {showAddModal && <CreateThesis />}
                </Button>
              </Col>
            </Row>
          </Container>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={thesisData}
              columns={columns}
              getRowId={(row) => row.thesis_id}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  csvOptions: {
                    fields: [
                      "title",
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
                    fields: [
                      "title",
                      "authors",
                      "adviser",
                      "course",
                      "yearLevel",
                      "section",
                    ],
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
            <UpdateThesis singleThesis={singleThesis} thesisId={thesisId} />
          )}
          {showDeleteModal && (
            <DeleteThesis thesisTitle={title} thesisId={thesisId} />
          )}
        </>
      ) : (
        <NotAuthenticated />
      )}
    </>
  );
};

export default Manuscript;
