import React from "react";
import "./HomePageHeader.less";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <div className="HomePageHeader">
      <div className="overlayJobPosts">
        <Container className="overlayContent">
          <div className="header-text">
            <h1>Built For You</h1>
            <h1>Platform for your future</h1>

            <p>Your Future is in your Hands...</p>
          </div>
          <LinkContainer to="/JobPosts">
            <button type="button" className="btn btn-primary enter_btn">
              VIEW JOBS
            </button>
          </LinkContainer>
        </Container>
      </div>
    </div>
  );
}
