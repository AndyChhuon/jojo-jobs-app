//Sudent form component
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ManagePosts.less";
import JobPost from "../../Components/JobPost/JobPost";
import Spinner from "react-bootstrap/Spinner";
import CreateJobPopup from "../../Components/CreateJobPopup/CreateJobPopup";
import Header from "../../Components/Header/Header";

export default function JobPosts() {
  const updatePosts = () => {
    fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI", {
      method: "GET", // default, so we can ignore
    })
      .then((response) => response.json())
      .then((data) => {
        let jobs = data.map((info) => (
          <JobPost
            key={info.jobId}
            info={{ updatePosts, icon: true, ...info }}
          />
        ));
        setJobPosts(jobs);
      });
  };

  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => setShowCreate(true);

  const loading = (
    <div className="jobs-loading-container">
      <span className="search-text">Searching...</span>
      <Spinner animation="border" size="sm" />
    </div>
  );

  const [jobPosts, setJobPosts] = useState([loading]);
  //Fetch api search state
  useEffect(() => {
    fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI", {
      method: "GET", // default, so we can ignore
    })
      .then((response) => response.json())
      .then((data) => {
        let jobs = data.map((info) => (
          <JobPost
            key={info.jobId}
            info={{ updatePosts, icon: true, ...info }}
          />
        ));
        setJobPosts(jobs);
      });
  }, []);

  return (
    <>
      <Header
        headerText="Manage Job Posts"
        subheaderText="View and edit your job postings "
      />
      <div className="ManagePosts">
        <Container className="ManageJobPosts">
          <Row>
            <Col md={3}>
              <div className="Jobs-Header">Showing 1-8 of 8 Results</div>
            </Col>
          </Row>
        </Container>

        <Container>
          {jobPosts.length > 0 ? (
            jobPosts
          ) : (
            <div className="no-found">
              <Container className="no-found">No jobs posted</Container>
            </div>
          )}
        </Container>
        <CreateJobPopup
          info={{ show: showCreate, setShowCreate, updatePosts }}
        />
        <Container className="createbtn">
          <button
            onClick={handleShowCreate}
            type="submit"
            className="btn btn-dark"
          >
            Create Job Post
          </button>
        </Container>
      </div>
    </>
  );
}
