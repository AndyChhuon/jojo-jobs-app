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

export default function JobPopup(props) {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  const {
    jobTitle = "test",
    jobLocation,
    jobCompany,
    fullDescription,
    benefits,
    icon = false,
  } = props.info;

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

  return (
    <>
      <Col xs={3} md={3} sm={3} className="center-button">
        {icon ? (
          <>
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
          </>
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
          <Modal.Title>Apply to Job</Modal.Title>
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
          <Form.Group controlId="formFileSm" className="mb-3 upload">
            <p className="padding-5">📝 Cover Letter (PDF)</p>

            <Form.Control type="file" accept="application/pdf" size="sm" />
          </Form.Group>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {icon ? (
            ":"
          ) : (
            <Button variant="primary" onClick={handleClose}>
              Apply Now
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
