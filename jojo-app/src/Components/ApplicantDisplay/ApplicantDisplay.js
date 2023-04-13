import "./ApplicantDisplay.less";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../ContextProvider/AppContextProvider";

export default function ApplicantDisplay(props) {
  const [context] = useContext(userLogin);
  const navigate = useNavigate();

  const {
    info: {
      firstName,
      lastName,
      jobPosition,
      about,
      city,
      email,
      education,
      jobId,
      updatePosts,
      jobNotification,
    },
  } = props;

  const onButtonClick = () => {
    const cookies = new Cookies();
    const jwt = cookies.get("Jwt");
    if (!jwt) {
      navigate("/login");
      return;
    }
    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/inviteInterview/${context.id}?JobId=${jobId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${jwt}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        updatePosts();
      }
    });
  };

  return (
    <Container className="ApplicantDisplay">
      <Row>
        <Col xs={9} md={9} sm={9}>
          <Container>
            <Row className="top-row">
              <Col>
                <h6 className="job-title">{`${firstName} ${lastName}`}</h6>
              </Col>
              <Col>
                <h6 className="job-description">{jobPosition}</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="job-about">
                  About:&nbsp;
                  {about}
                </h6>
              </Col>
              <Col>
                <h6 className="job-about">
                  Located:&nbsp;
                  {city}
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="job-about">
                  Email:&nbsp;
                  {email}
                </h6>
              </Col>
              <Col>
                <h6 className="job-about">
                  Education:&nbsp;
                  {education}
                </h6>
              </Col>
            </Row>
          </Container>
        </Col>

        <Col xs={3} md={3} sm={3} className="center-button">
          {jobNotification[jobId]?.applicant ? (
            <Button
              className="button view-apps-btn selected-interview"
              variant="secondary"
              size="sm"
              onClick={onButtonClick}
              disabled
            >
              <span>Selected Interview</span>
            </Button>
          ) : (
            <Button
              className="button view-apps-btn"
              variant="secondary"
              size="sm"
              onClick={onButtonClick}
            >
              <span>Select to Interview</span>
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}