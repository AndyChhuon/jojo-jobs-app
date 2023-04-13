// Sudent form component
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./JobPosts.less";
import Spinner from "react-bootstrap/Spinner";
import JobPost from "../../Components/JobPost/JobPost";
import Header from "../../Components/Header/Header";
import SearchJob from "../../Components/SearchJob/SearchJob";

export default function JobPosts() {
  // Blur Search bar
  const [search, setSearch] = useState({ data: [], url: "" });

  const onSearchChange = (searchChange) => {
    setSearch(searchChange);
  };

  const loading = (
    <div key="loading" className="jobs-loading-container">
      <span className="search-text">Searching...</span>
      <Spinner animation="border" size="sm" />
    </div>
  );

  const [jobPosts, setJobPosts] = useState([loading]);
  // Fetch api search state
  useEffect(() => {
    setJobPosts([loading]);
    if (search.url === "") {
      fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI", {
        method: "GET", // default, so we can ignore
      })
        .then((response) => response.json())
        .then((data) => {
          const jobs = data.map((info) => (
            <JobPost key={info.jobId} info={info} />
          ));
          setJobPosts(jobs);
        });
    } else {
      fetch(
        `https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI/search${search.url}`,
        {
          method: "POST", // default, so we can ignore
          headers: {
            "Content-Type": "application/json",
          },
          body: search.data.length > 0 ? JSON.stringify(search.data) : null,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const jobs = data.map((info) => (
            <JobPost key={info.jobId} info={info} />
          ));
          setJobPosts(jobs);
        });
    }
  }, [search]);

  return (
    <>
      <Header
        headerText="Job Listings"
        subheaderText="Search Your Career Opportunity Through Our High Quality Jobs"
      />

      <div className="JobPostsContainer">
        <Row className="jobPostsRow">
          <Col md={4}>
            <SearchJob onSearchParent={onSearchChange} />
          </Col>
          <Col md={8}>
            {jobPosts.length > 0 ? (
              <>
                <div className="Jobs-Header">
                  Showing 1-{jobPosts.length} of {jobPosts.length} Results
                </div>
                <div className="padding-0">{jobPosts}</div>
              </>
            ) : (
              <div className="no-found">
                <div className="Jobs-Header">Showing 0-0 of 0 Results</div>
                <Container className="no-found">No jobs found</Container>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
