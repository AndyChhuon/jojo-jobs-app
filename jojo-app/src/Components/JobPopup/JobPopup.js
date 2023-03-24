import "./JobPopup.less";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import JobEditPopup from "../JobEditPopup/JobEditPopup";
import DeleteJobPopup from "../DeleteJobPopup/DeleteJobPopup";
import { useContext } from "react";
import { userLogin } from "../../App";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Cookies from "universal-cookie";

export default function JobPopup(props) {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [context, setContext] = useContext(userLogin);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  const handleCoverLetterInputChange = (event) => {
    setCoverLetterFile(event.target.files[0]);
  };

  const {
    jobTitle = "test",
    jobLocation,
    jobCompany,
    fullDescription,
    jobId,
    benefits,
    icon = false,
    myApplications = false,
  } = props.info;

  const handleViewApps = () => {
    navigate("/ViewApplications?jobId=" + jobId);
  };

  let { workType, workTime } = props.info;

  switch (workTime) {
    case "FullTime":
      workTime = "Full Time";
      break;
    case "PartTime":
      workTime = "Part Time";
      break;
  }

  switch (workType) {
    case "InPerson":
      workType = "In Person";
      break;
  }

  async function handleApply() {
    const cookies = new Cookies();
    setError("");
    setSuccess("");
    if (!context) {
      navigate("/login?initDisplayError=Please login to apply for this job.");
    }
    if (!cookies.get("Jwt")) {
      navigate(
        "/login?initDisplayError=You have been disconnected. Please login again."
      );
    }
    if (context?.profileType === "Recruiter") {
      navigate(
        "/UpdateProfile?initDisplayError=Recruiters cannot apply for jobs. Change profile type."
      );
    }
    if (!context?.cv) {
      navigate(
        "/UpdateProfile?initDisplayError=Please setup Profile and CV to apply for this job."
      );
    }
    if (!coverLetterFile) {
      setError("Please upload a cover letter.");
      return;
    }

    // Create cover letter form data from file
    const formData = new FormData();
    formData.append("formFile", coverLetterFile);

    // Send the form data to the server using fetch()
    let resumeURL = await fetch(
      "https://jobapplicationsapi.azurewebsites.net/api/AwsAPI/CoverLetter?studentId=" +
        context.id +
        "&jobPostId=" +
        jobId,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((data) => {
        return data;
      });

    // Update appliedTo array
    fetch(
      "https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/updateJobs/" +
        context.id +
        "?JobId=" +
        jobId,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + cookies.get("Jwt"),
          accept: "text/plain",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setSuccess("Job Application sent successfully.");
        } else {
          setError("Error applying to job. Please try again.");
        }
      })
      .catch((error) => {
        setError("Error applying to job. Please try again.");
      });
  }

  return (
    <>
      <Col xs={3} md={3} sm={3} className="center-button">
        {icon ? (
          myApplications ? (
            <div>
              <div>
                <Button
                  className="button edit-btn width-100"
                  variant="secondary"
                  size="sm"
                  onClick={handleShow}
                >
                  Edit <FontAwesomeIcon icon={faEdit} />
                </Button>
              </div>
              <div>
                <Button
                  className="button delete-btn width-100"
                  variant="secondary"
                  size="sm"
                  onClick={handleShowDelete}
                  style={{ marginTop: "5px" }}
                >
                  Delete <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <Button
                  className="button edit-btn"
                  variant="secondary"
                  size="sm"
                  onClick={handleShowEdit}
                  style={{ width: "35px", padding: "5px", marginRight: "3px" }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  className="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleShow}
                  style={{ width: "35px", padding: "5px", marginRight: "3px" }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button
                  className="button delete-btn"
                  variant="secondary"
                  size="sm"
                  onClick={handleShowDelete}
                  style={{ width: "35px", padding: "5px" }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </div>
              <div>
                <Button
                  className="button view-apps-btn"
                  variant="secondary"
                  size="sm"
                  onClick={handleViewApps}
                >
                  <span>View Apps</span>
                </Button>
              </div>
            </div>
          )
        ) : (
          <Button
            className="button"
            variant="secondary"
            size="sm"
            onClick={handleShow}
          >
            <span>View More</span>
          </Button>
        )}
      </Col>
      <JobEditPopup info={{ show: showEdit, setShowEdit, ...props.info }} />
      <DeleteJobPopup
        info={{ show: showDelete, setShowDelete, ...props.info }}
      />

      <Modal show={show} onHide={handleClose} className="popup">
        <Modal.Header closeButton>
          <Modal.Title>
            {myApplications ? "Edit Job Application" : "Apply to Job"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{jobTitle}</h2>

          <div className="subtitle-container">
            <p className="padding-5">{jobCompany}</p>
          </div>
          <span className="p1">
            {jobLocation} • {workType}
          </span>
          <span className="new-line p1">{workTime}</span>
          <Form.Group
            controlId="formFileSm"
            className="upload"
            style={
              myApplications
                ? { marginBottom: "none" }
                : { marginBottom: "1rem" }
            }
          >
            <p className="padding-5">📝 Cover Letter (PDF)</p>

            <Form.Control
              type="file"
              onChange={handleCoverLetterInputChange}
              accept="application/pdf"
              size="sm"
            />
          </Form.Group>
          {myApplications ? (
            <a
              target="_blank"
              className="cover-letter-link"
              href={`https://jobapplicants-bucket.s3.us-east-2.amazonaws.com/Cover_letter/${jobId}/${context.id}.pdf`}
            >
              Cover Letter - Current
            </a>
          ) : (
            ""
          )}
          <h3 className="job-detail">Job detail</h3>
          <span>&#x1F4BC; Job type</span>
          <div className="job-type-tags">
            <span className="job-type-tag">{workTime}</span>
            <span className="job-type-tag">{workType}</span>
          </div>

          <h2 className="padding-5 padding-3-bottom">Benefits</h2>
          <div className="job-type-tags">
            {benefits.map((benefit) => {
              return (
                <span key={benefit} className="job-type-tag">
                  {benefit}
                </span>
              );
            })}
          </div>
          <h3 className="padding-17">Full Job Description</h3>
          <span className="full-description p2">{fullDescription}</span>
        </Modal.Body>
        <Modal.Footer>
          <Alert
            variant="danger"
            className="alert"
            style={error ? { display: "block" } : { display: "none" }}
          >
            {error}
          </Alert>
          <Alert
            variant="success"
            className="alert"
            style={success ? { display: "block" } : { display: "none" }}
          >
            {success}
          </Alert>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {myApplications ? (
            <Button variant="primary" onClick={handleApply}>
              Edit Application
            </Button>
          ) : icon ? (
            <></>
          ) : (
            <Button variant="primary" onClick={handleApply}>
              Apply Now
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
