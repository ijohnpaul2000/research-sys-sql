import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const DeleteThesis = ({ thesisTitle, thesisId }) => {
  const [show, setShow] = useState(true);

  //Magic Rerenderer AHAHAHAAA
  const handleClose = () => {
    setShow(!show);
    window.location.reload();
  };

  //Deletion
  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/deleteThesis/${thesisId}`)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      show={show}
      keyboard={false}
      backdrop="static"
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete <strong>{thesisTitle}</strong>??
        </p>
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

export default DeleteThesis;
