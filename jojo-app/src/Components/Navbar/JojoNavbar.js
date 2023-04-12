import "./Navbar.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { userLogin } from "../../ContextProvider/AppContextProvider";
import jojoLogo from "../../Images/jojo-black.png";

export default function JojoNavbar() {
  const [context, setContext] = useContext(userLogin);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    if (context) {
      if (Object.keys(context?.jobNotification).length > 0) {
        setHasNotifications(true);
      } else {
        setHasNotifications(false);
      }
    } else {
      setHasNotifications(false);
    }
  }, [context]);

  const navDropdownTitle = (
    <span style={{ color: "white" }}>
      <span>
        <FontAwesomeIcon
          className={hasNotifications && context ? "" : "pad-right-5"}
          icon={faUser}
        />
        {hasNotifications && context ? (
          <span className="badge">
            {Object.keys(context?.jobNotification).length}
          </span>
        ) : (
          ""
        )}
      </span>
      profile
    </span>
  );

  const signOut = () => {
    setContext(null);
    const cookies = new Cookies();
    cookies.remove("Jwt", { path: "/" });
  };

  return (
    <div className="jojo-navbar">
      <Navbar expand="lg">
        <Container className="nav-container">
          <LinkContainer to="/">
            <Navbar.Brand style={{ padding: 0, margin: 0 }}>
              <div className="center-jojo">
                <img
                  src={jojoLogo}
                  height="35"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <span className="jojo-text">Jobs For You.</span>
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer
            className="small-screen-login"
            to="/login"
            style={context ? { display: "none" } : {}}
          >
            <Nav.Link className="">
              <button className="button-login" type="button">
                <FontAwesomeIcon className="pad-right-5" icon={faUserPlus} />
                Login
              </button>
            </Nav.Link>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={context ? { marginLeft: "auto" } : {}}
          />
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-items">
            <Nav>
              <LinkContainer to="/">
                <Nav.Link className="background-grey nav-text">Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/">
                <Nav.Link className="background-grey nav-text">
                  Explore Jobs
                </Nav.Link>
              </LinkContainer>

              <LinkContainer
                to="/JobsManager"
                style={
                  context && context?.profileType !== "Applicant"
                    ? {}
                    : { display: "none" }
                }
              >
                <Nav.Link className="background-grey nav-text">
                  Add Jobs
                </Nav.Link>
              </LinkContainer>

              <LinkContainer
                to="/Applications"
                style={
                  context && context?.profileType !== "Recruiter"
                    ? {}
                    : { display: "none" }
                }
              >
                <Nav.Link className="background-grey nav-text">
                  My Applications
                </Nav.Link>
              </LinkContainer>

              <NavDropdown
                style={context ? {} : { display: "none" }}
                title={navDropdownTitle}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/notifications">
                  <NavDropdown.Item>Notifications</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/UpdateProfile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/login">
                  <NavDropdown.Item onClick={signOut}>
                    Sign Out
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <LinkContainer
            className="big-screen-login"
            to="/login"
            style={context ? { display: "none" } : {}}
          >
            <Nav.Link>
              <button className="button-login" type="button">
                <FontAwesomeIcon className="pad-right-5" icon={faUserPlus} />
                Login
              </button>
            </Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </div>
  );
}
