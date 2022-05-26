import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import Axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../sass/modals/_createthesis.scss";
import YearSection from "./YearSection";
import axios from "axios";

const CreateThesis = ({ show, toggleShow, refreshToggle }) => {
  //Use States for Modal
  // const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [yearSection, setYearSection] = useState(false);

  //Use States for Thesis Content
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("Information Technology");
  const [yearLevel, setYearLevel] = useState("3");
  const [section, setSection] = useState("1");
  const [yearPublished, setYearPublished] = useState("2022");
  const [authors, setAuthors] = useState("");
  const [panelists, setPanelists] = useState("");
  const [noOfCopies, setNoOfCopies] = useState(0);
  const [volumeNo, setVolumeNo] = useState(0);
  const [grades, setGrades] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [adviser, setAdviser] = useState("");
  const [chairperson, setChairperson] = useState("");
  const [dean, setDean] = useState("");
  const [abstract, setAbstract] = useState("");
  const [journal, setJournal] = useState("");
  const [journal_name, setJournal_Name] = useState("");
  const [softcopy, setSoftcopy] = useState("");
  const [softcopy_name, setSoftcopy_Name] = useState("");

  const [sectionData, setSectionData] = useState([]);
  const [yearLevelData, setYearLevelData] = useState([]);

  const [key, setKey] = useState("");

  let navigate = useNavigate();
  let currentYear = new Date().getFullYear();

  //List Years (10 years ago)
  let yearList = [];
  for (let yr = currentYear; yr > currentYear - 10; yr--) {
    yearList.push(yr);
  }

  //FOR FDF AND WORD

  //Toast Controller
  const notifySuccess = () =>
    toast.success("Success! New Data was added", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error("Something went wrong.", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // const handleClose = () => {
  //   setShow(!show);
  //   childToParent(!show)
  //   //window.location.reload();
  // };

  //Refresh table from Parent Component
  const refreshTableToggle = () => {
    refreshToggle(toggleShow);
  }

  //For reset form
  const resetForm = () => {
    document.getElementById("addFormId").reset();
  };

  const addYearLev = () => {
    setYearSection(!yearSection);
    setKey("yr");
  };

  const addSec = () => {
    setYearSection(!yearSection);
    setKey("sec");
  };

  //Add Data to MySql
  const addThesisData = async () => {
    const data = {
      title: title,
      course: course,
      yearLevel: yearLevel,
      section: section,
      yearPublished: yearPublished,
      authors: authors,
      panelists: panelists,
      copies: noOfCopies,
      volume: volumeNo,
      grades: grades,
      keywords: keywords,
      adviser: adviser,
      chairperson: chairperson,
      dean: dean,
      abstract: abstract,
    };

    Axios.request({
      method: "post",
      url: "http://localhost:3001/create",
      data: data,
    })
      .then((data) => {
        notifySuccess();
      })
      .catch((error) => {
        notifyError();
      });
  };

  //Submit Function
  const handleAddForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("Inputs invalid");
      setValidated(true);
      return;
    }

    addThesisData();
    resetForm();
    setValidated(false);
    refreshTableToggle();
  };

  //Retrieving Year Level/Sections
  useEffect(() => {
    Axios.get("http://localhost:3001/sections").then((response) => {
      // console.log(response);
      setSectionData(response.data);
    });

    Axios.get("http://localhost:3001/yearlevel").then((response) => {
      // console.log(response);
      setYearLevelData(response.data);
    });

    //Source: https://stackoverflow.com/a/65007703/13848366
    return () => {
      setSectionData({}); // This not worked for me (Check mo na lng boss)
      setYearLevelData({});
    };
  }, []);

  return ReactDom.createPortal(
    <div className="container">
      <div>
        <ToastContainer
          position="top-center"
          autoClose={3001}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={toggleShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="AddModal"
      >
        <Modal.Header closeButton>
          {!yearSection ? "Add Thesis Details" : "Edit Year/Section"}
        </Modal.Header>
        <Modal.Body className={!yearSection ? "visibleEl" : "hiddenEl"}>
          <Form
            noValidate
            validated={validated}
            id="addFormId"
            onSubmit={handleAddForm}
          >
            <Row>
              <Col md={7} sm={12}>
                <Form.Group as={Col} className="mb-3" controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a title.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGridStateCours"
                >
                  <Form.Label>Course</Form.Label>
                  <Form.Select
                    onChange={(e) => setCourse(e.target.value)}
                    value={course}
                  >
                    <option>Information Technology</option>
                    <option>Engineering</option>
                  </Form.Select>
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group as={Col} controlId="formGridStateYear">
                      <Form.Label>Year Lv</Form.Label>
                      <Form.Select
                        onChange={(e) => setYearLevel(e.target.value)}
                        value={yearLevel}
                      >
                        {yearLevelData.map((val) => {
                          return (
                            <option key={val.yearLevel_id}>
                              {val.yearLevel}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Text className="text-muted">
                        <Button
                          variant="link"
                          style={{ fontSize: "smaller", paddingLeft: "0" }}
                          onClick={addYearLev}
                        >
                          + Add Year Level
                        </Button>
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridStateSec">
                      <Form.Label>Section</Form.Label>
                      <Form.Select
                        onChange={(e) => setSection(e.target.value)}
                        value={section}
                      >
                        {sectionData.map((val) => {
                          return (
                            <option key={val.section_id}>{val.section}</option>
                          );
                        })}
                      </Form.Select>
                      <Form.Text className="text-muted">
                        <Button
                          variant="link"
                          style={{ fontSize: "smaller", paddingLeft: "0" }}
                          onClick={addSec}
                        >
                          + Add Section
                        </Button>
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridStatePub">
                      <Form.Label>Year Published</Form.Label>
                      <Form.Select
                        onChange={(e) => setYearPublished(e.target.value)}
                        value={yearPublished}
                      >
                        {yearList.map((val) => {
                          return <option key={val}>{val}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Group as={Col}>
                      <Form.Label htmlFor="basic-url">Authors</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => setAuthors(e.target.value)}
                        placeholder="Authors"
                        rows={2}
                        required
                      />
                      <Form.Text className="text-muted">
                        Names must be separated by a comma.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Please enter atleast 1 member.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridPanel">
                      <Form.Label>Panelists</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        onChange={(e) => setPanelists(e.target.value)}
                        placeholder="Panelists"
                        required
                      />
                      <Form.Text className="text-muted">
                        Names must be separated by a comma.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Please enter atleast 1 panel.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group as={Col} controlId="formGridCopy">
                      <Form.Label>No. Of Copies</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        onChange={(e) => setNoOfCopies(e.target.value)}
                        placeholder="No. of Copies"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter valid number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridVol">
                      <Form.Label>Volume No.</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        onChange={(e) => setVolumeNo(e.target.value)}
                        placeholder="Volume No."
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter valid Volume Number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridGr">
                      <Form.Label>Grades</Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => setGrades(e.target.value)}
                        placeholder="Grades"
                        required
                        step={0.01}
                        min={1}
                        max={5}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid Grade (1.00-5.00).
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group as={Col} className="mb-3" controlId="formGridKey">
                  <Form.Label>Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Keywords"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Keyword.
                  </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group as={Col} controlId="formGridAdv">
                      <Form.Label>Adviser</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setAdviser(e.target.value)}
                        placeholder="Adviser"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Adviser.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridChair">
                      <Form.Label>Chairperson</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setChairperson(e.target.value)}
                        placeholder="Chairperson"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Chairperson.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formGridDean">
                      <Form.Label>Dean</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setDean(e.target.value)}
                        placeholder="Dean"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Dean.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={5} className="h-auto">
                <Form.Group
                  className="mb-3 abstract"
                  controlId="formGridAbstract"
                >
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setAbstract(e.target.value)}
                    rows={10}
                    placeholder="Enter Abstract Details"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Abstract Details.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group>
                  <Form.Label>For Journal</Form.Label>
                  <Form.Control
                    type="file"
                    id="file-input"
                    accept="*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const journal_name = e.target.files[0].name;
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      console.log(
                        "the file is: ",
                        file,
                        "\n the journal is:",
                        journal_name
                      );
                      reader.onload = () => {
                        fetch("http://localhost:3001/create", {
                          method: "POST",
                          body: {
                            journal: setJournal(reader.result),
                            journal_name: setJournal_Name(journal_name),
                          },
                        })
                          .then(async (res) => {
                            const result = await res.json();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      };
                      reader.onerror = () => {
                        console.log(reader.error);
                      };
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label style={{ marginTop: "1.5rem" }}>
                    For Softcopy
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="file-input"
                    accept="*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const softcopy_name = e.target.files[0].name;
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      console.log(
                        "the file is: ",
                        file,
                        "\n the softcopy is:",
                        softcopy_name
                      );
                      reader.onload = () => {
                        fetch("http://localhost:3001/create", {
                          method: "POST",
                          body: {
                            journal: setSoftcopy(reader.result),
                            journal_name: setSoftcopy_Name(softcopy_name),
                          },
                        })
                          .then(async (res) => {
                            const result = await res.json();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      };
                      reader.onerror = () => {
                        console.log(reader.error);
                      };
                    }}
                  />
                </Form.Group> */}
              </Col>
            </Row>

            <div className="d-flex mt-4 justify-content-end align-items-center">
              <Button type="Submit">Add Details</Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Body className={!yearSection ? "hiddenEl" : "visibleEl"}>
          {yearSection && (
            <YearSection
              yearLevelData={yearLevelData}
              sectionData={sectionData}
              tabKey={key}
            />
          )}
        </Modal.Body>
        <Modal.Footer className={!yearSection ? "hiddenEl" : "visibleEl"}>
          <Button
            className="mt-2"
            variant="primary"
            onClick={() => setYearSection(!yearSection)}
          >
            Back to Adding
          </Button>
        </Modal.Footer>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CreateThesis;
