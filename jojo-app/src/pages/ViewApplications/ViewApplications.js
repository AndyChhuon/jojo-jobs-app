import "./ViewApplications.less";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { userLogin } from "../../ContextProvider/AppContextProvider";
import Header from "../../Components/Header/Header";
import ApplicantDisplay from "../../Components/ApplicantDisplay/ApplicantDisplay";

export default function ViewApplications() {
  const [context, setContext] = useContext(userLogin);

  // Get job id from url
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const jobId = parameters.get("jobId");

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
      `https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI/GetApplicants/${jobId}`,
      {
        method: "GET", // default, so we can ignore
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const jobs = data.map((applicant) => (
          <ApplicantDisplay
            key={applicant.id}
            info={{ ...applicant, updatePosts, jobId }}
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

  useEffect(() => {
    if (!context) {
      navigate("/login");
      return;
    }
    // Check if jobId was created by user
    if (!context?.createdPostings.includes(jobId)) {
      navigate("/JobsManager");
      return;
    }

    if (context.profileType === "Recruiter") {
      navigate("/UpdateProfile");
      return;
    }

    // Get all applicants for job
    updatePosts();
  }, []);

  return (
    <div className="ViewApplications">
      <Header
        headerText="View Job Applicants"
        subheaderText="Invite applicants to interview!"
      />
      <div>
        <Container className="ManageJobApps">
          <Row>
            <div className="Jobs-Header">
              Showing&nbsp;
              {jobPosts.length === 0 ? "0" : "1"}-{jobPosts.length}
              &nbsp;of&nbsp;
              {jobPosts.length} Results
            </div>
          </Row>
        </Container>

        <Container>
          {jobPosts.length > 0 ? (
            jobPosts
          ) : (
            <div className="no-found">
              <Container className="no-found">
                No Applicants to display
              </Container>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
