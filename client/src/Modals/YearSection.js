import React, { useState, useEffect } from "react";
import { Tabs, Tab, Form, Button, ButtonGroup, Alert } from "react-bootstrap";
import ReactDom from "react-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YearSection = ({ yearLevelData, sectionData, tabKey }) => {
  const [key, setKey] = useState(tabKey);
  const [yearLevel, setYearLevel] = useState("");
  const [section, setSection] = useState("");

  //messages
  const [message, setMessage] = useState("");

  const columnsYearLevel = [
    { field: "yearLevel", headerName: "Year Level", width: 200, flex: 2 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      flex: 2,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              axios
                .delete(
                  `http://localhost:3001/deleteYear/${cellValues.row.yearLevel_id}`
                )
                .then(() => {
                  // window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <IconContext.Provider value={{ color: "#fff" }}>
              <div>
                <BsTrash />
              </div>
            </IconContext.Provider>
          </Button>
        );
      },
    },
  ];

  const columnsSection = [
    { field: "section", headerName: "Section", width: 200, flex: 2 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      flex: 2,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              axios
                .delete(
                  `http://localhost:3001/deleteSec/${cellValues.row.section_id}`
                )
                .then(() => {
                  // window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <IconContext.Provider value={{ color: "#fff" }}>
              <div>
                <BsTrash />
              </div>
            </IconContext.Provider>
          </Button>
        );
      },
    },
  ];

  //For reset form
  const resetForm = () => {
    if (key === "yr") {
      document.getElementById("yr").reset();
    } else {
      document.getElementById("sec").reset();
    }
  };
  const clearErrorMessage = () => {
    setMessage("");
  };
  const addYearLevel = async () => {
    const data = {
      yearLevel: yearLevel,
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:3001/addyr",
        data: data,
      })
      .then((response) => {
        if (response.data.message) {
          console.log("The message is: ", response.data.message);
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error in Adding Year Level");
      });
    setTimeout(clearErrorMessage, 2000);
  };

  const addSection = async () => {
    const data = {
      section: section,
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:3001/addsec",
        data: data,
      })
      .then((response) => {
        if (response.data.message) {
          console.log("The message is: ", response.data.message);
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Error in Adding Section");
      });
    setTimeout(clearErrorMessage, 2000);
  };

  //Submit Function
  const handleYearSecForm = (event) => {
    event.preventDefault();

    if (key === "yr") {
      addYearLevel();
    } else {
      addSection();
    }
    resetForm();
  };
  useEffect(() => {
    console.log("rerender.");
  }, [yearLevelData, sectionData]);

  return (
    <div>
      <Tabs
        defaultActiveKey={tabKey}
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="yr" title="Year Level">
          <Form className="mb-2" id="yr" onSubmit={handleYearSecForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Year Level</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter new year level"
                onChange={(e) => setYearLevel(e.target.value)}
                required
              />
              {message === "Already exists." && (
                <Alert variant="danger" className="my-3">
                  {message}
                </Alert>
              )}{" "}
              {message === "Successful!" && (
                <Alert variant="success" className="my-3">
                  {message}
                </Alert>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>

          <DataGrid
            style={{ height: 300, width: "100%" }}
            rows={yearLevelData}
            columns={columnsYearLevel}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.yearLevel_id}
          />
        </Tab>
        <Tab eventKey="sec" title="Section">
          <Form className="mb-2" id="sec" onSubmit={handleYearSecForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter new section"
                onChange={(e) => setSection(e.target.value)}
                required
              />{" "}
              {message === "Already exists." && (
                <Alert variant="danger" className="my-3">
                  {message}
                </Alert>
              )}{" "}
              {message === "Successful!" && (
                <Alert variant="success" className="my-3">
                  {message}
                </Alert>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>{" "}
          </Form>

          <DataGrid
            style={{ height: 300, width: "100%" }}
            rows={sectionData}
            columns={columnsSection}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.section_id}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default YearSection;
