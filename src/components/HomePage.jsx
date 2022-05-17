import React, { useEffect, useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";

function HomePage(props) {
  const [contactData, setContactData] = useState([]);
  const [disable, setDisable] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("contactData")) || [];
    data = data.sort((a, b) => {
      let fa = a.Name.toLowerCase(),
          fb = b.Name.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });
    setContactData(data);
  }, [contactData]);
  const columns = [
    {
      dataField: "Name",
      text: "Name",
      formatter: (cellContent, row, editor) => {
        if (cellContent) {
          return cellContent
        }
        return (
          <h5 style = {{color : "#c11324", fontStyle: 'italic'}}>
            N/A
          </h5>
        );
      },
    },
    {
      dataField: "Number",
      text: "Number",
      formatter: (cellContent, row, editor) => {
        if (cellContent) {
          return cellContent
        }
        return (
          <h5 style = {{color : "#c11324", fontStyle: 'italic'}}>
            N/A
          </h5>
        );
      },
    },
    {
      dataField: "isWhatsApp",
      text: "Whats App",
      formatter: (cellContent, row, editor) => {
        if (cellContent) {
          return (
            <h5>
              <Badge color="success">Active</Badge>
            </h5>
          );
        }
        return (
          <h5>
            <Badge color="danger">Not Active</Badge>
          </h5>
        );
      },
    },
    {
      dataField: "type",
      text: "Type",
      formatter: (cellContent, row, editor) => {
        if (cellContent) {
          return cellContent
        }
        return (
          <h5 style = {{color : "#c11324", fontStyle: 'italic'}}>
            N/A
          </h5>
        );
      },
    },


    {
      dataField: "file",
      text: "Profile",
      formatter: (cellContent, row, editor) => {
        if (cellContent) {
          return <ImagePopup src={row.file} />;
        } else
          return (
            <h5 style = {{color : "#c11324", fontStyle: 'italic'}}>
             N/A
            </h5>
          );
      },
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    hideSelectColumn: true,
    bgColor: "lightGray",
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        setDisable(false);
        setSelectedData(row);
      } else {
        setDisable(true);
        setSelectedData();
      }
    },
    headerColumnStyle: (status) => {
      return {
        width: "40px",
      };
    },
  };

  const toggle = () => {
    setDeleteModal(!deleteModal);
  };
  const deleteContact = () => {
    let filtered = contactData.filter(function (value, index, arr) {
      return selectedData.id !== value.id;
    });
    localStorage.setItem("contactData", JSON.stringify(filtered));
    setContactData(filtered);
    toggle();
  };
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "600px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          margin: "20px",

        }}
      >
        <Link to="/addContact">
          {" "}
          <button type="button" className="btn btn-primary">
            Add Contact
          </button>
        </Link>
      {selectedData &&  <button
          type="button"
          className="btn btn-danger"
          disabled={disable}
          onClick={toggle}
        >
          Delete Contact
        </button>}
      { selectedData && <Link to={`/editContact/${selectedData?.id}`}>
          <button
            type="button"
            className="btn btn-success"
            disabled={disable}
            onClick={toggle}
          >
            Edit Contact
          </button>
        </Link>}
        <Modal isOpen={deleteModal} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle} charCode="Y">
            Delete Contact
          </ModalHeader>
          <ModalBody>Do You want to Delete this Contact</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteContact}>
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div style={{ margin: "60px" }}>
        {contactData.length ? (
          <BootstrapTable
            keyField="id"
            selectRow={selectRow}
            data={contactData}
            columns={columns}
            responsive={true}
          />
        ) : (
          <h3 style = {{marginLeft : "40%", color : "#c11324", fontStyle: 'italic'}}> Press Add Contact to Add Data</h3>
        )}
      </div>
    </div>
  );
}

export default HomePage;
const ImagePopup = ({ src }) => {
  const [show, setShow] = useState(false);
  if (!src) {
    return "No image";
  }
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      // onClick={()=>setShow(s=>!s)}
    >
      <FontAwesomeIcon
        className="mt-2"
        icon={faImage}
        size="2x"
        color="crimson"
      />
      {show && (
        <img
          src={src}
          alt={"Profile"}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
      )}
    </div>
  );
};
