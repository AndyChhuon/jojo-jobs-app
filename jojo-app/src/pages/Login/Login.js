import "./Login.less";
import React, { useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { GoogleLogin } from "react-google-login";
import { LinkContainer } from "react-router-bootstrap";
import { gapi } from "gapi-script";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { userLogin } from "../../ContextProvider/AppContextProvider";
import jojoLogo from "../../Images/jojo-black.png";

const clientId =
  "124118979451-5b03pb63uv3ogjgntaimga7tc4uirqcf.apps.googleusercontent.com";

export default function Login() {
  const [context, setContext] = useContext(userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialise Google API
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  // If user is logged in, redirect to update profile
  useEffect(() => {
    if (context) {
      navigate("/UpdateProfile");
    }
  }, [context]);

  const [connectedGoogle, setConnectedGoogle] = useState(false);

  // If coming from sign up, display message
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);

  const [error, setError] = useState(
    parameters.get("initDisplayError") ? parameters.get("initDisplayError") : ""
  );
  const [success, setSuccess] = useState(
    parameters.get("initDisplaySuccess")
      ? parameters.get("initDisplaySuccess")
      : ""
  );

  // Login data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Send data to API
  const sendToApi = () => {
    const url = `?email=${email}&password=${password}`;

    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/login${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      }
    ).then((responseJwt) => {
      if (responseJwt.ok) {
        responseJwt.text().then((text) => {
          const decodedJwt = jwt(text);
          const cookieExp = new Date(parseInt(decodedJwt.exp) * 1000);
          // Store jwt as cookie
          const cookies = new Cookies();
          cookies.set("Jwt", text, {
            path: "/",
            expires: cookieExp,
          });

          // Fetch user info from api using id from jwt
          const applicantId =
            decodedJwt[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          // Fetch user info from api
          fetch(
            `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/${applicantId}`,
            {
              method: "GET",
            }
          ).then((responseApplicant) => {
            if (responseApplicant.ok) {
              responseApplicant.json().then((json) => {
                setContext(json);
              });
            }
          });
          setError(false);
          // navigate("/UpdateProfile");
        });
      } else if (responseJwt.status === 400) {
        responseJwt.text().then((text) => {
          setError(text);
        });
      } else if (responseJwt.status === 404) {
        navigate(
          "/signup?initDisplayError=Email address not found. Please sign up."
        );
      }
    });
  };

  // Send to api when connected to google
  useEffect(() => {
    if (connectedGoogle) {
      setConnectedGoogle(false);
      sendToApi();
    }
  }, [connectedGoogle]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check password length above 8 characters and has at least one number
    if (password.length < 8 || !/\d/.test(password)) {
      setError("Password must be at least 8 characters and contain a number.");
    } // Check email is valid
    else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      sendToApi();
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSuccess = (response) => {
    setError("");
    setSuccess("");

    const emailGoogle = response.profileObj.email;

    if (!emailGoogle) {
      setError("Something went wrong.");
      return;
    }

    setEmail(emailGoogle);
    setPassword("Google");
    setConnectedGoogle(true);
  };

  return (
    <div className="login">
      <Row className="login-row">
        <Col md={5} sm={0} className="login-text-col">
          <Container className="login-text-container">
            <h1>Turn your dreams into careers</h1>
            <p>Kickstart your career with just a click of a button.</p>
          </Container>
        </Col>
        <Col md={7} sm={12} className="login-modal">
          <Container className="login-modal-container">
            <LinkContainer to="/">
              <div className="center-jojo">
                <img className="jojo-logo" src={jojoLogo} alt="jojo logo" />
                <span className="jojo-text">Jobs For You.</span>
              </div>
            </LinkContainer>

            <form className="login-form-container" onSubmit={handleSubmit}>
              <div className="login-form">
                <h1>Login to your Account</h1>
                <p>Welcome back! Please enter your details.</p>
                <Alert
                  variant="danger"
                  className="alert"
                  style={error ? { display: "block" } : { display: "none" }}
                >
                  {error}
                </Alert>
                <Alert
                  variant="success"
                  className="alert"
                  style={success ? { display: "block" } : { display: "none" }}
                >
                  {success}
                </Alert>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Login With Google"
                  onSuccess={onSuccess}
                  cookiePolicy="single_host_origin"
                  className="google-login"
                />
                <div className="separator_container">
                  <span className="separator sep1" />
                  or
                  <span className="separator sep2" />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="email-input"
                  required
                  onChange={onEmailChange}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="email-input pass-input"
                  onChange={onPasswordChange}
                  required
                />
                <div className="remember_forgot_container">
                  <span className="center-rem">
                    <input
                      className="remember-checkbox"
                      type="checkbox"
                      id="remember-checkbox"
                    />
                    <label htmlFor="remember-checkbox">
                      Remember for 30 days
                    </label>
                  </span>
                  {/* <LinkContainer to="/">
                    <a className="forgot-pass">Forgot Password</a>
                  </LinkContainer> */}
                </div>

                <button type="submit" className="login-btn">
                  Log in
                </button>

                <div className="no-account-container">
                  Don't have an account?
                  <LinkContainer to="/signup">
                    <a href="/signup">Sign up for free</a>
                  </LinkContainer>
                </div>
              </div>
            </form>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
