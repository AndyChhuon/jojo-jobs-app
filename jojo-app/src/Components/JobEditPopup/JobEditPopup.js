import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./JobEditPopup.less";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function JobEditPopup(props) {
  const navigate = useNavigate();

  let {
    jobId,
    jobTitle,
    jobLocation,
    jobCompany,
    fullDescription,
    jobDescription,
    workType,
    jobCategory,
    benefits,
    jobDate,
    workTime,
    show,
    setShowEdit,
    updatePosts,
  } = props.info;

  const [jobTitleEdit, setJobTitleEdit] = useState(jobTitle);
  const [jobLocationEdit, setJobLocationEdit] = useState(jobLocation);
  const [jobCompanyEdit, setJobCompanyEdit] = useState(jobCompany);
  const [fullDescriptionEdit, setFullDescriptionEdit] =
    useState(fullDescription);
  const [jobDescriptionEdit, setJobDescriptionEdit] = useState(jobDescription);
  const [workTypeEdit, setWorkTypeEdit] = useState(workType);
  const [jobCategoryEdit, setJobCategoryEdit] = useState(jobCategory);
  const [jobDateEdit, setJobDateEdit] = useState(jobDate.split("/").join("-"));
  const [workTimeEdit, setWorkTimeEdit] = useState(workTime);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onWorkTypeChange = (e) => {
    setWorkTypeEdit(e.target.value);
  };

  const onJobTitleEdit = (e) => {
    setJobTitleEdit(e.target.value);
  };

  const onJobLocationEdit = (e) => {
    setJobLocationEdit(e.target.value);
  };
  const onJobCompanyEdit = (e) => {
    setJobCompanyEdit(e.target.value);
  };

  const onWorkTimeChange = (e) => {
    setWorkTimeEdit(e.target.value);
  };
  const onJobDateEdit = (e) => {
    setJobDateEdit(e.target.value);
  };
  const onJobCategoryEdit = (e) => {
    setJobCategoryEdit(e.target.value);
  };
  const onFullDescriptionEdit = (e) => {
    setFullDescriptionEdit(e.target.value);
  };
  const onJobDescriptionEdit = (e) => {
    setJobDescriptionEdit(e.target.value);
  };

  let DentalCare = benefits.includes("Dental Care");
  let Insurance = benefits.includes("Insurance");
  let TimeOff = benefits.includes("Paid Time Off");
  let Pension = benefits.includes("Pension");

  const [dentalCare, setDentalCare] = useState(DentalCare);
  const [insurance, setInsurance] = useState(Insurance);
  const [timeOff, setTimeOff] = useState(TimeOff);
  const [pension, setPension] = useState(Pension);

  const handleClose = () => {
    setShowEdit(false);
    setShowSuccess(false);
    setShowError(false);
  };
  const handleEdit = (e) => {
    setShowSuccess(false);
    setShowError(false);

    e.preventDefault();
    let benefits = [];
    if (dentalCare) {
      benefits.push("Dental Care");
    }
    if (insurance) {
      benefits.push("Insurance");
    }
    if (timeOff) {
      benefits.push("Paid Time Off");
    }
    if (pension) {
      benefits.push("Pension");
    }
    const jobInfo = {
      jobTitle: jobTitleEdit,
      jobLocation: jobLocationEdit,
      jobCompany: jobCompanyEdit,
      fullDescription: fullDescriptionEdit,
      jobDescription: jobDescriptionEdit,
      workType: workTypeEdit,
      jobCategory: jobCategoryEdit,
      benefits: benefits,
      jobDate: jobDateEdit.split("-").join("/"),
      workTime: workTimeEdit,
    };

    const cookies = new Cookies();
    const jwt = cookies.get("Jwt");
    if (!jwt) {
      navigate("/login");
    }

    fetch(
      "https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI/" + jobId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(jobInfo),
      }
    ).then((response) => {
      if (response.ok) {
        setShowSuccess(true);
        updatePosts();
      } else {
        setShowError(true);
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} className="jobEditPopup">
      <Form onSubmit={handleEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="padding-10-bottom">Job Title</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Job Title"
            value={jobTitleEdit}
            onChange={onJobTitleEdit}
            required
          />

          <h2 className="padding-10-bottom padding-top-3">Company Name</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Company Name"
            value={jobCompanyEdit}
            onChange={onJobCompanyEdit}
            required
          />
          <h2 className="padding-10-bottom padding-top-3">Location</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Location"
            value={jobLocationEdit}
            onChange={onJobLocationEdit}
            required
          />

          <h3 className="job-detail">Job detail</h3>
          <span>&#x1F4BC; Job type</span>
          <Form.Select
            size="sm"
            value={workTimeEdit}
            onChange={onWorkTimeChange}
            required
          >
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
          </Form.Select>
          <Form.Select
            size="sm"
            value={workTypeEdit}
            onChange={onWorkTypeChange}
            required
          >
            <option value="Remote">Remote</option>
            <option value="InPerson">In Person</option>
            <option value="Hybrid">Hybrid</option>
          </Form.Select>

          <h2 className="padding-10 padding-3-bottom">Benefits</h2>
          <div className="job-type-tags">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Dental Care"
              checked={dentalCare}
              onChange={() => setDentalCare(!dentalCare)}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Insurance"
              checked={insurance}
              onChange={() => setInsurance(!insurance)}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Paid Time Off"
              checked={timeOff}
              onChange={() => setTimeOff(!timeOff)}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Pension"
              checked={pension}
              onChange={() => setPension(!pension)}
            />
          </div>
          <h3 className="job-detail">Category</h3>
          <Form.Select
            size="sm"
            required
            value={jobCategoryEdit}
            onChange={onJobCategoryEdit}
          >
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Database Design">Database Design</option>
          </Form.Select>
          <h3 className="padding-17">Full Job Description</h3>
          <Form.Control
            as="textarea"
            placeholder="Full Description"
            style={{ height: "150px" }}
            value={fullDescriptionEdit}
            onChange={onFullDescriptionEdit}
            required
          />
          <h3 className="job-detail">Short Description</h3>
          <Form.Control
            as="textarea"
            placeholder="Short Description"
            style={{ height: "60px" }}
            value={jobDescriptionEdit}
            onChange={onJobDescriptionEdit}
            required
          />
          <h3 className="job-detail">Job Due Date (YYYY-MM-DD)</h3>
          <Form.Control
            type="date"
            placeholder="Job Due Date"
            style={{ height: "30px" }}
            value={jobDateEdit}
            onChange={onJobDateEdit}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Alert
            variant="success"
            className="alert"
            style={showSuccess ? { display: "block" } : { display: "none" }}
          >
            Your job post has been updated!
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
          <Button variant="primary" className="btn-green" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
