import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import logo from "../assets/guest_credentials.png";
import Axios from "axios";
var dayjs = require("dayjs");
const Audit = ({ permittedBy }) => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const columns = [
    { field: "accessedBy", headerName: "Accessed By", width: 200, flex: 2 },
    { field: "timeIn", headerName: "Time In", width: 200, flex: 2 },
    { field: "timeOut", headerName: "Time Out", width: 200, flex: 2 },
    { field: "permittedBy", headerName: "Permitted By", width: 200, flex: 2 },
  ];
  useEffect(() => {
    Axios.post("http://localhost:3001/viewAudits").then((response) => {
      console.log(JSON.stringify(response));
      setData(response.data);
    });

    //* Uncomment this function if you wanted to delete the audits after a (1) week.
    // Axios.post("http://localhost:3001/deleteAudits").then((response) => {
    //   console.log(JSON.stringify(response));
    // })
  }, []);
  return ReactDom.createPortal(
    <div>
      <Container fluid>
        <Modal
          backdrop="static"
          show={show}
          size="lg"
          dialogClassName="AuditModal"
          keyboard={false}
          onHide={handleClose}
        >
          <Modal.Header closeButton></Modal.Header>
          <div style={{ height: "70vh", width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </Modal>
      </Container>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Audit;
