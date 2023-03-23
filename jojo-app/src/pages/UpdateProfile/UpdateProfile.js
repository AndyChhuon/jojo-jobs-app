//Sudent form component
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./UpdateProfile.less";
// import profile from "./../../Images/pfp.png";
import Header from "../../Components/Header/Header";
import { useContext } from "react";
import { userLogin } from "../../App";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { sha256 } from "js-sha256";

export default function UpdateProfile() {
  const [context, setContext] = useContext(userLogin);
  const navigate = useNavigate();

  const [student, setStudent] = useState(context);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordChange, setPassordChange] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordChange = (event) => {
    setPassordChange(event.target.value);
  };

  const handlePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleFirstNameInputChange = (event) => {
    setStudent({ ...student, firstName: event.target.value });
  };
  const handleLastNameInputChange = (event) => {
    setStudent({ ...student, lastName: event.target.value });
  };

  const handleCityInputChange = (event) => {
    setStudent({ ...student, city: event.target.value });
  };
  const handleStateInputChange = (event) => {
    setStudent({ ...student, state: event.target.value });
  };

  const handleProfileTypeChange = (event) => {
    setStudent({ ...student, profileType: event.target.value });
  };

  const handleWorkexpInputChange = (event) => {
    setStudent({ ...student, experience: event.target.value });
  };

  const handleAboutmeInputChange = (event) => {
    setStudent({ ...student, about: event.target.value });
  };

  const handleEducationInputChange = (event) => {
    setStudent({ ...student, education: event.target.value });
  };
  const handlejobPositionInputChange = (event) => {
    setStudent({ ...student, jobPosition: event.target.value });
  };

  const handleResumeInputChange = (event) => {
    setStudent({ ...student, resume: event.target.value });
  };

  const sendToApi = () => {
    let prevPass = student.password;
    let newStudent = student;
    //If password was changed
    if (passwordChange !== "") {
      newStudent.password = sha256(passwordChange);
    }
    console.log(newStudent);
    console.log(student.password);

    fetch(
      "https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/" +
        newStudent.id +
        "?Password=" +
        prevPass,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      }
    ).then((response) => {
      if (response.ok) {
        setError("");
        setSuccess("Profile updated successfully.");
        setContext(newStudent);
        console.log(newStudent);
      }
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    //Check password change
    if (passwordChange !== "") {
      if (passwordChange !== passwordConfirm) {
        setError("Passwords do not match.");
        return;
      }
      //Check password length above 8 characters and has at least one number
      else if (passwordChange.length < 8 || !/\d/.test(passwordChange)) {
        setError(
          "Password must be at least 8 characters and contain a number."
        );
        return;
      }
    }

    sendToApi();
  };
  //input fields for student form

  //useeffect to check if user is logged in
  useEffect(() => {
    if (!context) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header
        headerText="Setup Profile"
        subheaderText="Set up your profile to get started"
      />

      <section className="UpdateProfile">
        <Container>
          <h1 className="title">More About You</h1>
          <form onSubmit={submitHandler}>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  {/* First of three columns */}
                  {/* <img src="" alt="pfp" className="img-rounded"></img> */}

                  <div className="square rounded p-5 bg-secondary">
                    <small>profile image</small>
                  </div>
                </div>

                <div className="col-sm">
                  {/* Second of three columns */}

                  <label htmlFor="firstName">First Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                    value={student?.firstName}
                    onChange={handleFirstNameInputChange}
                  />

                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    required
                    value={student?.lastName}
                    onChange={handleLastNameInputChange}
                  />

                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    disabled
                    value={student?.email}
                  />
                  <span
                    style={
                      student?.password === "Google" ? { display: "none" } : {}
                    }
                  >
                    <label htmlFor="passwordChange">Change Password: </label>
                    <input
                      type="password"
                      id="passwordChange"
                      name="passwordChange"
                      className="form-control"
                      onChange={handlePasswordChange}
                    />
                  </span>
                </div>
                <div className="col-sm">
                  {/* Third of three columns */}

                  <label htmlFor="city">City: </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={student?.city}
                    required
                    onChange={handleCityInputChange}
                  />

                  <label htmlFor="state">State/Province: </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    value={student?.state}
                    required
                    onChange={handleStateInputChange}
                  />

                  <label htmlFor="jobPosition">Job Position</label>
                  <input
                    type="text"
                    id="jobPosition"
                    name="jobPosition"
                    className="form-control"
                    value={student?.jobPosition}
                    required
                    onChange={handlejobPositionInputChange}
                  />
                  <span
                    style={
                      student?.password === "Google" ? { display: "none" } : {}
                    }
                  >
                    <label htmlFor="passwordConfirm">Confirm Password: </label>
                    <input
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      className="form-control"
                      onChange={handlePasswordConfirm}
                    />
                  </span>
                </div>
              </div>
              <hr></hr>
              <div>
                <label htmlFor="profileType">Profile Type: </label>
                <select
                  id="profileType"
                  className="form-select"
                  aria-label="Default select example"
                  value={student?.profileType}
                  onChange={handleProfileTypeChange}
                >
                  <option value="Applicant">Applicant</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Hybrid">Hybrid (demo purposes)</option>
                </select>
              </div>

              {student?.profileType !== "Recruiter" ? (
                <>
                  <label htmlFor="resume">Upload Resume: </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    className="form-control"
                    required
                    onChange={handleResumeInputChange}
                  />
                  <div className="form-group">
                    <label htmlFor="workexp">Work Experience: </label>
                    <textarea
                      type="text"
                      id="workexp"
                      name="workexp"
                      className="form-control"
                      rows="5"
                      required
                      value={student?.experience}
                      onChange={handleWorkexpInputChange}
                    />
                  </div>
                  <label htmlFor="education">Education: </label>
                  <textarea
                    type="text"
                    id="education"
                    name="education"
                    className="form-control"
                    rows="4"
                    value={student?.education}
                    required
                    onChange={handleEducationInputChange}
                  />{" "}
                </>
              ) : (
                ""
              )}

              <div className="form-group">
                <label htmlFor="aboutme">About me: </label>
                <textarea
                  placeholder="Present yourself!"
                  type="text"
                  id="aboutme"
                  name="aboutme"
                  className="form-control"
                  rows="2"
                  value={student?.about}
                  required
                  onChange={handleAboutmeInputChange}
                />
              </div>

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

              <div className="mt-2 col-md-12">
                <div className="text-center">
                  <div className="d-grid gap-2 d-md-block">
                    <button type="submit" className="btn">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
