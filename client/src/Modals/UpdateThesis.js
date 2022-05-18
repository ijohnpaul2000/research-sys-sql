import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import ImportPDF from "../Components/ImportPDF";
import "../sass/modals/_updatethesis.scss";

const UpdateThesis = ({ thesisId, singleThesis }) => {
  const navigate = useNavigate();
  //Use States for Modal
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);

  //Use States for Thesis Content
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [section, setSection] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [authors, setAuthors] = useState("");
  const [panelists, setPanelists] = useState("");
  const [noOfCopies, setNoOfCopies] = useState("");
  const [volumeNo, setVolumeNo] = useState("");
  const [grades, setGrades] = useState("");
  const [keywords, setKeywords] = useState("");
  const [adviser, setAdviser] = useState("");
  const [chairperson, setChairperson] = useState("");
  const [dean, setDean] = useState("");
  const [abstract, setAbstract] = useState("");
  const [journal, setJournal] = useState("");
  const [journalName, setJournalName] = useState("");
  const [sectionData, setSectionData] = useState([]);
  const [yearLevelData, setYearLevelData] = useState([]);

  const [fileBlob, setFileBlob] = useState();
  const [link, setLink] = useState();
  let currentYear = new Date().getFullYear();

  //List Years (10 years ago)
  let yearList = [];
  for (let yr = currentYear; yr > currentYear - 10; yr--) {
    yearList.push(yr);
  }

  //Edit Mode
  const [checked, setChecked] = useState(false);

  //Toast Controller
  const notifySuccess = () =>
    toast.success("Success! The Data is updated", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => handleClose(),
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

  const handleClose = () => {
    setShow(!show);
    window.location.reload();
  };

  //For reset form
  const resetForm = () => {
    document.getElementById("updateFormId").reset();
  };

  //Update Data to MYSQL
  const updateThesisData = async () => {
    const data = {
      id: thesisId,
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
      journal: journal,
      journal_name: journalName,
    };

    Axios.request({
      method: "put",
      url: "http://192.168.254.100:3001/update",
      data: data,
    })
      .then((data) => {
        notifySuccess();
      })
      .catch((error) => {
        notifyError();
      });
  };

  const setData = () => {
    setTitle(singleThesis.title);
    setCourse(singleThesis.course);
    setYearLevel(singleThesis.yearLevel);
    setSection(singleThesis.section);
    setYearPublished(singleThesis.year);
    setAuthors(singleThesis.authors);
    setPanelists(singleThesis.panelists);
    setNoOfCopies(singleThesis.noOfCopies);
    setVolumeNo(singleThesis.volumeNo);
    setGrades(singleThesis.grades);
    setKeywords(singleThesis.keywords);
    setAdviser(singleThesis.adviser);
    setChairperson(singleThesis.chairperson);
    setDean(singleThesis.dean);
    setAbstract(singleThesis.abstract);
    setJournal(singleThesis.journal);
    setJournalName(singleThesis.journal_name);
  };

  // const downloadFile = (blob, fileName) => {
  //   const link = document.createElement("a");
  //   // create a blobURI pointing to our Blob
  //   link.href = URL.createObjectURL(blob);
  //   link.download = fileName;
  //   // some browser needs the anchor to be in the doc
  //   document.body.append(link);
  //   link.click();
  //   link.remove();
  //   // in case the Blob uses a lot of memory
  //   setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  // };
  // downloadFile(new Blob([{ journal }]), "myfile.pdf");
  // function download(pdfUrl) {
  //   fetch(pdfUrl)
  //     .then((resp) => resp.arrayBuffer())
  //     .then((resp) => {
  //       // set the blog type to final pdf
  //       const file = new Blob([resp], { type: "application/pdf" });

  //       // process to auto download it
  //       const fileURL = URL.createObjectURL(file);
  //       setFileBlob(fileURL);
  //       const link = document.createElement("a");
  //       link.href = fileURL;
  //       link.download = "FileName" + new Date() + ".pdf";
  //       link.click();

  //       console.log("file from updatethesis", file);
  //     });
  // }

  useEffect(() => {
    setData();
    console.log("JOURNAL_BLOB: ", journal);
  }, []);

  //Retrieving Year Level/Sections
  useEffect(() => {
    Axios.get("http://192.168.254.100:3001/sections").then((response) => {
      // console.log(response);
      setSectionData(response.data);
    });

    Axios.get("http://192.168.254.100:3001/yearlevel").then((response) => {
      // console.log(response);
      setYearLevelData(response.data);
    });
  }, []);

  //Import PDF
  const importAsPDF = () => {
    navigate("/view", {
      state: {
        title: title,
        abstract: abstract,
        authors: authors,
        adviser: adviser,
        panelists: panelists,
        course: course,
        year: yearPublished,
        chairperson: chairperson,
      },
    });
  };

  //Submit Function
  const handleUpdateForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("Inputs invalid");
      setValidated(true);
      return;
    }

    updateThesisData();
  };

  return ReactDom.createPortal(
    <div className="container">
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
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
        keyboard={false}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="AddModal"
      >
        <Modal.Header closeButton>Update Thesis Data</Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            id="updateFormId"
            onSubmit={handleUpdateForm}
          >
            <fieldset disabled={!checked}>
              <Row>
                <Col md={7} sm={12}>
                  {" "}
                  <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title"
                      required
                      value={title}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a title.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      onChange={(e) => setCourse(e.target.value)}
                      value={course}
                    >
                      <option>Information Technology</option>
                      <option>Engineering</option>
                    </Form.Select>
                  </Form.Group>
                  <Row>
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
                              <option key={val.section_id}>
                                {val.section}
                              </option>
                            );
                          })}
                        </Form.Select>
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
                  <Row>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label htmlFor="basic-url">Authors</Form.Label>
                        <Form.Control
                          as="textarea"
                          onChange={(e) => setAuthors(e.target.value)}
                          placeholder="Authors"
                          rows={2}
                          required
                          value={authors}
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
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Panelists</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          onChange={(e) => setPanelists(e.target.value)}
                          placeholder="Panelists"
                          required
                          value={panelists}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter atleast 1 panel.{" "}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>No. Of Copies</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          onChange={(e) => setNoOfCopies(e.target.value)}
                          placeholder="Number of Copies"
                          required
                          value={noOfCopies}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter valid number.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Volume Number</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          onChange={(e) => setVolumeNo(e.target.value)}
                          placeholder="Volume Number"
                          required
                          value={volumeNo}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter valid Volume Number.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      {" "}
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Grades</Form.Label>
                        <Form.Control
                          type="number"
                          onChange={(e) => setGrades(e.target.value)}
                          placeholder="Grades"
                          required
                          step={0.01}
                          min={1}
                          max={5}
                          value={grades}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid Grade (1.00-5.00).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group as={Col} controlId="formGridAdviser">
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Keywords"
                      required
                      value={keywords}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a Keyword.
                    </Form.Control.Feedback>
                  </Form.Group>{" "}
                  <Row>
                    <Col>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Adviser</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setAdviser(e.target.value)}
                          placeholder="Adviser"
                          required
                          value={adviser}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter Adviser.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Chairperson</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setChairperson(e.target.value)}
                          placeholder="Chairperson"
                          required
                          value={chairperson}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter Chairperson.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Dean</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setDean(e.target.value)}
                          placeholder="Dean"
                          required
                          value={dean}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter Dean.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col></Col>
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
                      value={abstract}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Abstract Details.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <a id="journal-link" download={`${journalName}`}>
                      {journalName}
                    </a>
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>
            <Row className="mt-3">
              <Col>
                <ButtonGroup>
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant={checked ? "danger" : "primary"}
                    checked={checked}
                    value="1"
                    onChange={(e) => setChecked(e.currentTarget.checked)}
                  >
                    {checked ? "Cancel Editing" : "Edit"}
                  </ToggleButton>
                  <Button
                    type="Submit"
                    variant="success"
                    className={checked ? "visibleEl" : "hiddenEl"}
                  >
                    Save Changes
                  </Button>
                </ButtonGroup>
              </Col>
              <Col className="d-flex flex-row-reverse">
                <Button
                  variant="danger"
                  className={!checked ? "visibleEl" : "hiddenEl"}
                  onClick={importAsPDF}
                >
                  Print as PDF
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>,
    document.getElementById("modal-root")
  );
};

export default UpdateThesis;
