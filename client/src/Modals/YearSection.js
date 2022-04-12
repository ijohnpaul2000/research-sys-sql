import React from "react";
import { Tabs, Tab, Form, Button, ButtonGroup } from "react-bootstrap";
import ReactDom from "react-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons";

const YearSection = ({ yearLevel }) => {
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
              console.log("Deleted Sample");
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
    { field: "yearLevel", headerName: "Section", width: 200, flex: 2 },
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
              console.log("Deleted Sample");
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
  return (
    <div>
      <Tabs
        defaultActiveKey="yr"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="yr" title="Year Level">
          <Form className="mb-2">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Year Level</Form.Label>
              <Form.Control type="number" placeholder="Enter new year level" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>

          <DataGrid
            style={{ height: 300, width: "100%" }}
            rows={yearLevel}
            columns={columnsYearLevel}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.yearLevel_id}
          />
        </Tab>
        <Tab eventKey="sec" title="Section">
          <Form className="mb-2">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Section</Form.Label>
              <Form.Control type="number" placeholder="Enter new section" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>

          <DataGrid
            style={{ height: 300, width: "100%" }}
            rows={yearLevel}
            columns={columnsSection}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.yearLevel_id}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default YearSection;
