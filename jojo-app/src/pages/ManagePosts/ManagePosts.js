// Sudent form component
import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./ManagePosts.less";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import JobPost from "../../Components/JobPost/JobPost";
import CreateJobPopup from "../../Components/CreateJobPopup/CreateJobPopup";
import Header from "../../Components/Header/Header";
import { userLogin } from "../../ContextProvider/AppContextProvider";

export default function JobPosts() {
  const [context, setContext] = useContext(userLogin);
  const navigate = useNavigate();

  const loading = (
    <div className="jobs-loading-container" key="loading">
      <span className="search-text">Searching...</span>
      <Spinner animation="border" size="sm" />
    </div>
  );

  const [jobPosts, setJobPosts] = useState([loading]);

  const updatePosts = () => {
    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/CreatedJobs/${context.id}`,
      {
        method: "GET", // default, so we can ignore
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const jobs = data.map((info) => (
          <JobPost
            key={info.jobId}
            info={{ updatePosts, icon: true, ...info }}
          />
        ));
        setJobPosts(jobs);
      });

    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/${context.id}`,
      {
        method: "GET",
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          setContext(json);
        });
      }
    });
  };

  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => setShowCreate(true);

  // useeffect to check if user is logged in
  useEffect(() => {
    if (!context) {
      navigate("/login");
    } else {
      if (context.profileType === "Applicant") {
        navigate("/UpdateProfile");
        return;
      }
      fetch(
        `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/CreatedJobs/${context.id}`,
        {
          method: "GET", // default, so we can ignore
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const jobs = data.map((info) => (
            <JobPost
              key={info.jobId}
              info={{ updatePosts, icon: true, ...info }}
            />
          ));
          setJobPosts(jobs);
        });
    }
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
            <div className="Jobs-Header">
              Showing {jobPosts.length === 0 ? "0" : "1"}-{jobPosts.length} of{" "}
              {jobPosts.length} Results
            </div>
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
