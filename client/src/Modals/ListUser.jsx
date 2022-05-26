import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Axios from "axios";
import axios from "axios";
import { IconContext } from "react-icons";
import { BsTrash } from "react-icons/bs";
const ListUser = ({show, toggleShow}) => {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  

  const columns = [
    { field: "username", headerName: "Username", width: 200, flex: 2 },
    { field: "role", headerName: "Role", width: 200, flex: 2 },
    { field: "secret_id", headerName: "Secret Key", width: 200, flex: 2 },
    {
      field: "action",
      headerName: "Action",
      width: 40,
      flex: 1,
      headerAlign: "center",
      renderCell: (cellValues) => {
        console.log(cellValues);
        return (
          <Button
            variant="danger"
            onClick={() => {
              axios
                .delete(`http://localhost:3001/deleteUser/${cellValues.row.id}`)
                .then(() => {
                  window.location.reload();
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

  useEffect(() => {
    axios.get("http://localhost:3001/listUser").then((response) => {
      console.log("this is the response:", response);
      setData(response.data);
    });
  }, []);

  const openDeleteUserModal = () => {
    setShowDeleteModal(true);
  };

  return ReactDom.createPortal(
    <>
      {" "}
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        onHide={toggleShow}
      >
        <Modal.Header closeButton>
          <Modal.Title>User List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "40vh", width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </>,
    document.getElementById("modal-root")
  );
};

export default ListUser;
