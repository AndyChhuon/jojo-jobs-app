import "./JobPopup.less";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import Form from "react-bootstrap/Form";

export default function JobPopup(props) {
  const { info } = props;

  const {
    jobTitle,
    jobLocation,
    jobCompany,
    fullDescription,
    benefits,
    show,
    setShow,
  } = info;

  const handleClose = () => setShow(false);

  let { workType, workTime } = info;

  switch (workTime) {
    case "FullTime":
      workTime = "Full Time";
      break;
    case "PartTime":
      workTime = "Part Time";
      break;
    default:
      break;
  }

  switch (workType) {
    case "InPerson":
      workType = "In Person";
      break;
    default:
      break;
  }

  return (
    <Modal show={show} onHide={handleClose} className="popup">
      <Modal.Header closeButton>
        <Modal.Title>View Job</Modal.Title>
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
          style={{ marginBottom: "1rem" }}
        >
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
          {benefits.map((benefit) => (
            <span key={benefit} className="job-type-tag">
              {benefit}
            </span>
          ))}
        </div>
        <h3 className="padding-17">Full Job Description</h3>
        <span className="full-description p2">{fullDescription}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
