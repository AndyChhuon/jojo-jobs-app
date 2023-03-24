//Sudent form component
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./UpdateProfile.less";
// import profile from "./../../Images/pfp.png";
import Header from "../../Components/Header/Header";
import { useContext, useRef } from "react";
import { userLogin } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Cookies from "universal-cookie";
import SetProfileImg from "../../Components/SetProfileImg/SetProfileImg";

export default function UpdateProfile() {
  const [context, setContext] = useContext(userLogin);
  const navigate = useNavigate();

  const errorRef = useRef(null);

  const [student, setStudent] = useState(context);

  //Detect if profile has changed
  const [profileHasChanged, setProfileHasChanged] = useState(false);

  //Data url of cropped image
  const [croppedImg, setCroppedImg] = useState(student?.profileImg);

  //If coming from sign up, display message
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);

  const [error, setError] = useState(
    parameters.get("initDisplayError") ? parameters.get("initDisplayError") : ""
  );
  const [success, setSuccess] = useState("");

  const [passwordChange, setPassordChange] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [resumeFile, setResumeFile] = useState(null);

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
    setResumeFile(event.target.files[0]);
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  async function sendToApi() {
    let newStudent = student;

    if (passwordChange !== "" && passwordConfirm !== "") {
      newStudent.password = passwordChange;
      console.log(passwordChange);
    }

    //If profile image was changed
    if (profileHasChanged) {
      //Convert data url to file (use math.random to avoid caching issue)
      const file = dataURLtoFile(croppedImg, Math.random() + "profile.png");

      // Create image form data
      const formData = new FormData();
      formData.append("formFile", file);

      // Send the form data to the server using fetch()
      let ImageUrl = await fetch(
        "https://jobapplicationsapi.azurewebsites.net/api/AwsAPI/ProfileImages?studentId=" +
          newStudent.id,
        {
          method: "POST",

          body: formData,
        }
      )
        .then((response) => response.text())
        .then((data) => {
          return data;
        });

      newStudent.profileImg = ImageUrl;
      console.log(ImageUrl);
    }

    const cookies = new Cookies();
    //If resume was changed
    if (resumeFile) {
      // Create resume form data from file
      const formData = new FormData();
      formData.append("formFile", resumeFile);

      // Send the form data to the server using fetch()
      let resumeURL = await fetch(
        "https://jobapplicationsapi.azurewebsites.net/api/AwsAPI/CV?studentId=" +
          newStudent.id,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.text())
        .then((data) => {
          return data;
        });
      newStudent.cv = resumeURL;
    }

    //Update applicant profile with new info
    fetch(
      "https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/" +
        newStudent.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("Jwt"),
        },
        body: JSON.stringify(newStudent),
      }
    )
      .then((response) => {
        if (response.ok) {
          setError("");
          setSuccess("Profile updated successfully.");
          setContext(newStudent);
        } else {
          setError("Error updating profile. Please try again.");
        }
      })
      .catch((error) => {
        setError("Error updating profile. Please try again.");
      });
  }

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

  useEffect(() => {
    if (error) {
      errorRef.current.scrollIntoView();
    }
  }, [error]);

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

                  <SetProfileImg
                    croppedImg={croppedImg}
                    setCroppedImg={setCroppedImg}
                    setProfileHasChanged={setProfileHasChanged}
                  ></SetProfileImg>
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
                  <div className="margin-top-2">
                    <label htmlFor="resume">Upload Resume: </label>
                  </div>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept="application/pdf"
                    className="form-control upload-resume"
                    required={student?.cv ? false : true}
                    onChange={handleResumeInputChange}
                  />
                  <span className="curr-resume">
                    {student?.cv ? (
                      <a
                        className="margin-left-5"
                        target="_blank"
                        href={student.cv}
                      >
                        {decodeURIComponent(
                          student.cv
                            .substring(student.cv.lastIndexOf("/") + 1)
                            .replace(/\+/g, " ")
                        ) + " - Current Resume"}
                      </a>
                    ) : (
                      <span className="margin-left-5">No resume uploaded</span>
                    )}
                  </span>
                  <div className="form-group margin-top-2">
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
                  <label htmlFor="education" className="margin-top-2">
                    Education:{" "}
                  </label>
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

              <div className="form-group margin-top-2">
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
                ref={errorRef}
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
