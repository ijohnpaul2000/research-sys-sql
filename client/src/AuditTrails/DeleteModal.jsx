import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import { ExportToCsv } from "export-to-csv";

const DeleteModal = (props) => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const handleClose = () => {
    setShow(!show);
    window.location.reload();
  };

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/deleteAudits`)
      .then(() => {
        csvExporter.generateCsv(data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "Audits",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const csvExporter = new ExportToCsv(options);

  useEffect(() => {
    setData(props.data);
  }, []);

  return (
    <Modal
      show={show}
      keyboard={false}
      backdrop="static"
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Audits
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete all AUDITS?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
