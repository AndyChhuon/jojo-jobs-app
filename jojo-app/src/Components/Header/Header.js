import React from "react";
import "./Header.less";
import Container from "react-bootstrap/Container";

export default function Header(props) {
  const { headerText, subheaderText } = props;
  return (
    <div className="JobPostsContainerHeader">
      <div className="overlayJobPosts">
        <Container className="overlayContent">
          <div className="header-text">
            <h1>{headerText}</h1>
            <p>{subheaderText}</p>
          </div>
        </Container>
      </div>
    </div>
  );
}
