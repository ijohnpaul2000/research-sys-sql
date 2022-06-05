import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const DeleteThesis = ({ thesisTitle, thesisId, show, toggleShow, refreshToggle, notifySuccess }) => {

  //Deletion
  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/deleteThesis/${thesisId}`)
      .then(() => {
        notifySuccess();
        toggleShow();
        refreshTableToggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Refresh table from Parent Component
  const refreshTableToggle = () => {
    refreshToggle(toggleShow);
  };

  return (
    <div>
      <Modal
        show={show}
        keyboard={false}
        backdrop="static"
        onHide={toggleShow}
        size="md"
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
          <Button onClick={toggleShow}>Close</Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteThesis;
