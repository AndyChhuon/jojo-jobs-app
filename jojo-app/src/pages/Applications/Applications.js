import "./Applications.less";
import Header from "../../Components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { userLogin } from "../../App";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import JobPost from "../../Components/JobPost/JobPost";

export default function Applications() {
  const [context, setContext] = useContext(userLogin);
  const navigate = useNavigate();

  const loading = (
    <div className="jobs-loading-container">
      <span className="search-text">Searching...</span>
      <Spinner animation="border" size="sm" />
    </div>
  );
  const [jobPosts, setJobPosts] = useState([loading]);

  const updatePosts = () => {
    fetch(
      "https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/AppliedJobs/" +
        context.id,
      {
        method: "GET", // default, so we can ignore
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let jobs = data.map((info) => (
          <JobPost
            key={info.jobId}
            info={{ icon: true, ...info, myApplications: true, updatePosts }}
          />
        ));
        setJobPosts(jobs);
      });
  };

  //useeffect to check if user is logged in
  useEffect(() => {
    if (!context) {
      navigate("/login");
    } else {
      if (context.profileType === "Recruiter") {
        navigate("/UpdateProfile");
      }

      //Get all jobs applied for
      updatePosts();
    }
  }, []);

  return (
    <>
      <Header
        headerText="Job Applications"
        subheaderText="View All Jobs You Have Applied For"
      />
      <div className="ManageApplications">
        <Container className="ManageJobApps">
          <Row>
            <div className="Jobs-Header">
              Showing {jobPosts.length == 0 ? "0" : "1"}-{jobPosts.length} of{" "}
              {jobPosts.length} Results
            </div>
          </Row>
        </Container>
        <Container>
          {jobPosts.length > 0 ? (
            jobPosts
          ) : (
            <div className="no-found">
              <Container className="no-found">No jobs applied</Container>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
