import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./DeleteJobPopup.less";
import Alert from "react-bootstrap/Alert";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../ContextProvider/AppContextProvider";

export default function DeleteJobPopup(props) {
  const {
    info: { show, setShowDelete, updatePosts, jobId, myApplications },
  } = props;
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [context] = useContext(userLogin);

  const handleClose = () => {
    setShowDelete(false);
    setShowSuccess(false);
    setShowError(false);
  };
  const handleEdit = (e) => {
    setShowSuccess(false);
    setShowError(false);

    e.preventDefault();
    const cookies = new Cookies();
    const jwt = cookies.get("Jwt");
    if (!jwt) {
      navigate("/login");
      return;
    }
    if (myApplications) {
      fetch(
        `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/removeJobs/${context.id}?JobId=${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          setShowSuccess(true);
          updatePosts();
        } else {
          setShowError(true);
        }
      });
    } else {
      fetch(
        `https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          setShowSuccess(true);
          updatePosts();
        } else {
          setShowError(true);
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="popup">
      <Form onSubmit={handleEdit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {myApplications ? "Delete Application" : "Delete Job Posting"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {myApplications ? "this application?" : " this job post?"}
        </Modal.Body>
        <Modal.Footer>
          <Alert
            variant="success"
            className="alert"
            style={showSuccess ? { display: "block" } : { display: "none" }}
          >
            {myApplications ? "Your application " : "Your job post "}
            has been deleted!
          </Alert>
          <Alert
            variant="danger"
            className="alert"
            style={showError ? { display: "block" } : { display: "none" }}
          >
            Something went wrong. Please try again.
          </Alert>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="btn-danger" type="submit">
            Delete {myApplications ? " Application" : "Job"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
