import "./Signup.less";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import jojoLogo from "../../Images/jojo-black.png";
import { GoogleLogin } from "react-google-login";
import { LinkContainer } from "react-router-bootstrap";
import { gapi } from "gapi-script";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const clientId =
  "124118979451-5b03pb63uv3ogjgntaimga7tc4uirqcf.apps.googleusercontent.com";

export default function Signup() {
  //Initialise Google API
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  //If coming from login, display message
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const [connectedGoogle, setConnectedGoogle] = useState(false);

  //Send to api when connected to google
  useEffect(() => {
    if (connectedGoogle) {
      setConnectedGoogle(false);
      sendToApi();
    }
  }, [connectedGoogle]);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [termsAndConditions, settermsAndConditions] = useState(false);

  const [error, setError] = useState(
    parameters.get("initDisplayError") ? parameters.get("initDisplayError") : ""
  );

  //Send data to API
  const sendToApi = () => {
    const loginInfo = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      profileImg: profileImg,
    };

    fetch("https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    }).then((response) => {
      if (response.ok) {
        setError(false);
        navigate(
          "/login?initDisplaySuccess=Account created successfully. Please login."
        );
      } else if (response.status === 400) {
        response.text().then((text) => {
          navigate("/login?initDisplayError=" + text);
        });
      }
    });
  };

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return;
    }
    //Check password length above 8 characters and has at least one number
    else if (password.length < 8 || !/\d/.test(password)) {
      setError("Password must be at least 8 characters and contain a number.");
      return;
    }
    //Check email is valid
    else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    } else if (!termsAndConditions) {
      setError("Please accept the terms and conditions.");
      return;
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
  const onConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
  };

  const onSuccess = (response) => {
    setError("");

    const email = response.profileObj.email;
    const givenName = response.profileObj.givenName;
    const familyName = response.profileObj.familyName;
    const imageUrl = response.profileObj.imageUrl;

    if (!email) {
      setError("Something went wrong.");
      return;
    } else if (!termsAndConditions) {
      setError("Please accept the terms and conditions.");
      return;
    }
    setEmail(email);
    givenName ? setFirstName(givenName) : setFirstName("");
    familyName ? setLastName(familyName) : setLastName("");
    imageUrl ? setProfileImg(imageUrl) : setProfileImg("");
    setPassword("Google");
    setConnectedGoogle(true);
  };
  return (
    <div className="signup">
      <Row className="login-row">
        <Col md={7} sm={12} className="login-modal">
          <Container className="login-modal-container">
            <LinkContainer to="/">
              <div className="center-jojo">
                <img className="jojo-logo" src={jojoLogo}></img>
                <span className="jojo-text">Jobs For You.</span>
              </div>
            </LinkContainer>

            <form className="login-form-container" onSubmit={handleSubmit}>
              <div className="login-form">
                <h1>Create a new account</h1>
                <p>It's quick and easy.</p>
                <Alert
                  variant="danger"
                  className="alert"
                  style={error ? { display: "block" } : { display: "none" }}
                >
                  {error}
                </Alert>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign Up With Google"
                  onSuccess={onSuccess}
                  cookiePolicy={"single_host_origin"}
                  className="google-login"
                />
                <div className="separator_container">
                  <span className="separator sep1"></span>
                  or
                  <span className="separator sep2"></span>
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="email-input"
                  onChange={onEmailChange}
                  required
                ></input>

                <input
                  type="password"
                  placeholder="Password"
                  className="email-input pass-input"
                  onChange={onPasswordChange}
                  required
                ></input>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="email-input pass-input"
                  onChange={onConfirmPasswordChange}
                  required
                ></input>
                <div className="remember_forgot_container">
                  <span className="center-rem">
                    <input
                      className="remember-checkbox"
                      type="checkbox"
                      id="remember-checkbox"
                      onChange={() =>
                        settermsAndConditions(!termsAndConditions)
                      }
                    ></input>
                    <label htmlFor="remember-checkbox">
                      Accept
                      <LinkContainer to="/">
                        <a className="terms-cond">Terms and Conditions</a>
                      </LinkContainer>
                    </label>
                  </span>
                </div>

                <button type="submit" className="login-btn">
                  Sign Up
                </button>

                <div className="no-account-container">
                  Already have an account?
                  <LinkContainer to="/login">
                    <a>Login</a>
                  </LinkContainer>
                </div>
              </div>
            </form>
          </Container>
        </Col>

        <Col md={5} sm={0} className="login-text-col">
          <Container className="login-text-container">
            <h1>Turn your dreams into careers</h1>
            <p>Kickstart your career with just a click of a button.</p>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
