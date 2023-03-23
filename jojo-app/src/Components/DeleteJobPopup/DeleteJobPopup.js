import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./DeleteJobPopup.less";
import Alert from "react-bootstrap/Alert";
import Cookies from "universal-cookie";
import { userLogin } from "../../App";

export default function DeleteJobPopup(props) {
  let { show, setShowDelete, updatePosts, jobId, myApplications } = props.info;

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [context, setContext] = useContext(userLogin);

  const handleClose = () => {
    setShowDelete(false);
    setShowSuccess(false);
    setShowError(false);
  };
  const handleEdit = (e) => {
    setShowSuccess(false);
    setShowError(false);

    e.preventDefault();

    if (myApplications) {
      const cookies = new Cookies();

      fetch(
        "https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/removeJobs/" +
          context.id +
          "?JobId=" +
          jobId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("Jwt"),
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
        "https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI/" + jobId,
        {
          method: "DELETE",
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
