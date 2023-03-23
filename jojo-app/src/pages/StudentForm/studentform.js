//Sudent form component
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./studentform.less";
// import profile from "./../../Images/pfp.png";
import Header from "../../Components/Header/Header";

export default function StudentForm() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    state: "",
    school: "",
    rpassword: "",
    workexp: "",
    aboutme: "",
    education: "",
    username: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const handleFirstNameInputChange = (event) => {
    setStudent({ ...student, firstName: event.target.value });
  };
  const handleLastNameInputChange = (event) => {
    setStudent({ ...student, lastName: event.target.value });
  };
  const handleEmailInputChange = (event) => {
    setStudent({ ...student, email: event.target.value });
  };
  const handlePasswordInputChange = (event) => {
    setStudent({ ...student, phone: event.target.value });
  };

  const handleCityInputChange = (event) => {
    setStudent({ ...student, city: event.target.value });
  };
  const handleStateInputChange = (event) => {
    setStudent({ ...student, state: event.target.value });
  };

  const handleWorkexpInputChange = (event) => {
    setStudent({ ...student, workexp: event.target.value });
  };
  const handleRpasswordInputChange = (event) => {
    setStudent({ ...student, rpassword: event.target.value });
  };

  const handleAboutmeInputChange = (event) => {
    setStudent({ ...student, aboutme: event.target.value });
  };

  const handleEducationInputChange = (event) => {
    setStudent({ ...student, education: event.target.value });
  };
  const handleUsernameInputChange = (event) => {
    setStudent({ ...student, username: event.target.value });
  };

  const handleResumeInputChange = (event) => {
    setStudent({ ...student, resume: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    return false;
  };
  //input fields for student form

  return (
    <>
      <Header
        headerText="Student Profile"
        subheaderText="Set up your profile to get started"
      />

      <section className="StudentForm">
        <Container>
          <h2 className="title">More About You</h2>
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
                    value={student.firstName}
                    onChange={handleFirstNameInputChange}
                  />

                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    required
                    value={student.lastName}
                    onChange={handleLastNameInputChange}
                  />

                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    required
                    value={student.email}
                    onChange={handleEmailInputChange}
                  />

                  <label htmlFor="password">Password: </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    className="form-control"
                    required
                    value={student.password}
                    onChange={handlePasswordInputChange}
                  />
                </div>
                <div className="col-sm">
                  {/* Third of three columns */}

                  <label htmlFor="city">City: </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    required
                    value={student.city}
                    onChange={handleCityInputChange}
                  />

                  <label htmlFor="state">State/Province: </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    required
                    value={student.state}
                    onChange={handleStateInputChange}
                  />

                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    required
                    value={student.username}
                    onChange={handleUsernameInputChange}
                  />

                  <label htmlFor="rpassword">Re-enter password</label>
                  <input
                    type="text"
                    id="rpassword"
                    name="rpassword"
                    className="form-control"
                    required
                    value={student.rpassword}
                    onChange={handleRpasswordInputChange}
                  />
                </div>
              </div>
              <hr></hr>
              <div>
                <label htmlFor="resume">Upload Resume: </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  className="form-control"
                  required
                  value={student.resume}
                  onChange={handleResumeInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="workexp">Work Experience: </label>
                <textarea
                  type="text"
                  id="workexp"
                  name="workexp"
                  className="form-control"
                  rows="5"
                  required
                  value={student.workexp}
                  onChange={handleWorkexpInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="education">Education: </label>
                <textarea
                  type="text"
                  id="education"
                  name="education"
                  className="form-control"
                  rows="4"
                  value={student.education}
                  onChange={handleEducationInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="aboutme">About me: </label>
                <textarea
                  placeholder="Present yourself!"
                  type="text"
                  id="aboutme"
                  name="aboutme"
                  className="form-control"
                  rows="2"
                  value={student.aboutme}
                  onChange={handleAboutmeInputChange}
                />
              </div>

              <div className="mt-2 col-md-12">
                <div className="text-center">
                  <div className="d-grid gap-2 d-md-block">
                    <button type="submit" className="btn btn-success  ">
                      Create Profile
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
