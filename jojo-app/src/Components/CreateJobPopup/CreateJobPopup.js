import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CreateJobPopup.less";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function CreateJobPopup(props) {
  const {
    info: { show, setShowCreate, updatePosts },
  } = props;
  const navigate = useNavigate();

  const [jobTitleCreate, setJobTitleCreate] = useState("");
  const [jobLocationCreate, setJobLocationCreate] = useState("");
  const [jobCompanyCreate, setJobCompanyCreate] = useState("");
  const [fullDescriptionCreate, setFullDescriptionCreate] = useState("");
  const [jobDescriptionCreate, setJobDescriptionCreate] = useState("");
  const [workTypeCreate, setWorkTypeCreate] = useState("Remote");
  const [jobCategoryCreate, setJobCategoryCreate] = useState("Software");
  const [jobDateCreate, setJobDateCreate] = useState("");
  const [workTimeCreate, setWorkTimeCreate] = useState("FullTime");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onWorkTypeChange = (e) => {
    setWorkTypeCreate(e.target.value);
  };

  const onJobTitleCreate = (e) => {
    setJobTitleCreate(e.target.value);
  };

  const onJobLocationCreate = (e) => {
    setJobLocationCreate(e.target.value);
  };
  const onJobCompanyCreate = (e) => {
    setJobCompanyCreate(e.target.value);
  };

  const onWorkTimeChange = (e) => {
    setWorkTimeCreate(e.target.value);
  };
  const onJobDateCreate = (e) => {
    setJobDateCreate(e.target.value);
  };
  const onJobCategoryCreate = (e) => {
    setJobCategoryCreate(e.target.value);
  };
  const onFullDescriptionCreate = (e) => {
    setFullDescriptionCreate(e.target.value);
  };
  const onJobDescriptionCreate = (e) => {
    setJobDescriptionCreate(e.target.value);
  };

  const [dentalCare, setDentalCare] = useState("");
  const [insurance, setInsurance] = useState("");
  const [timeOff, setTimeOff] = useState("");
  const [pension, setPension] = useState("");

  const handleClose = () => {
    setShowCreate(false);
    setShowSuccess(false);
    setShowError(false);
  };
  const handleCreate = (e) => {
    setShowSuccess(false);
    setShowError(false);

    e.preventDefault();
    const benefits = [];
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
      jobTitle: jobTitleCreate,
      jobLocation: jobLocationCreate,
      jobCompany: jobCompanyCreate,
      fullDescription: fullDescriptionCreate,
      jobDescription: jobDescriptionCreate,
      workType: workTypeCreate,
      jobCategory: jobCategoryCreate,
      benefits,
      jobDate: jobDateCreate.split("-").join("/"),
      workTime: workTimeCreate,
    };

    const cookies = new Cookies();
    const jwt = cookies.get("Jwt");
    if (!jwt) {
      navigate("/login");
      return;
    }

    fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(jobInfo),
    }).then((response) => {
      if (response.ok) {
        setShowSuccess(true);
        updatePosts();
      } else {
        setShowError(true);
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} className="popup">
      <Form onSubmit={handleCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create Job Posting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="padding-10-bottom">Job Title</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Job Title"
            value={jobTitleCreate}
            onChange={onJobTitleCreate}
            required
          />

          <h2 className="padding-10-bottom padding-top-3">Company Name</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Company Name"
            value={jobCompanyCreate}
            onChange={onJobCompanyCreate}
            required
          />
          <h2 className="padding-10-bottom padding-top-3">Location</h2>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Location"
            value={jobLocationCreate}
            onChange={onJobLocationCreate}
            required
          />

          <h3 className="job-detail">Job detail</h3>
          <span>&#x1F4BC; Job type</span>
          <Form.Select
            size="sm"
            value={workTimeCreate}
            onChange={onWorkTimeChange}
            required
          >
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
          </Form.Select>
          <Form.Select
            size="sm"
            value={workTypeCreate}
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
            value={jobCategoryCreate}
            onChange={onJobCategoryCreate}
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
            value={fullDescriptionCreate}
            onChange={onFullDescriptionCreate}
            required
          />
          <h3 className="job-detail">Short Description</h3>
          <Form.Control
            as="textarea"
            placeholder="Short Description"
            style={{ height: "60px" }}
            value={jobDescriptionCreate}
            onChange={onJobDescriptionCreate}
            required
          />
          <h3 className="job-detail">Job Due Date (YYYY-MM-DD)</h3>
          <Form.Control
            type="date"
            placeholder="Job Due Date"
            style={{ height: "30px" }}
            value={jobDateCreate}
            onChange={onJobDateCreate}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Alert
            variant="success"
            className="alert"
            style={showSuccess ? { display: "block" } : { display: "none" }}
          >
            Your job post has been created!
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
          <Button variant="primary" className="btn-info" type="submit">
            Create Job
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
