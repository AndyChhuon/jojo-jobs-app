import "./Notifications.less";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { userLogin } from "../../ContextProvider/AppContextProvider";
import NotifcationEntry from "./NotificationEntry";
import ViewOnlyPopup from "../../Components/JobPopup/viewOnlyPopup";

export default function Notifications() {
  const [context, setContext] = useContext(userLogin);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    jobTitle: "",
    jobLocation: "",
    jobCompany: "",
    fullDescription: "",
    benefits: [],
    workType: "",
    workTime: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (context) {
      if (Object.keys(context?.jobNotification).length > 0) {
        setHasNotifications(true);
      } else {
        setHasNotifications(false);
      }
    } else {
      navigate("/login");
    }
  }, [context]);

  const displayJob = (jobId) => {
    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI/${jobId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setInfo(data);
        setShow(true);
      });
  };

  const acceptInterview = (jobId) => {
    setError(false);
    setSuccess(false);
    const cookies = new Cookies();
    console.log(jobId);

    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/acceptInterview/${context.id}?JobId=${jobId}`,
      {
        method: "PUT",
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${cookies.get("Jwt")}`,
        },
        body: JSON.stringify({
          JobId: jobId,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        setSuccess("Successfully accepted interview");
      } else {
        setError("Failed to accept interview");
      }
      fetch(
        `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/${context.id}`,
        {
          method: "GET",
        }
      ).then((responseGet) => {
        if (responseGet.ok) {
          responseGet.json().then((json) => {
            setContext(json);
          });
        }
      });
    });
  };

  const rejectInterview = (jobId) => {
    setError(false);
    setSuccess(false);
    const cookies = new Cookies();

    fetch(
      `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/declineInterview/${context.id}?JobId=${jobId}`,
      {
        method: "PUT",
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${cookies.get("Jwt")}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setSuccess("Successfully rejected interview");
      } else {
        setError("Failed to reject interview");
      }
      fetch(
        `https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/${context.id}`,
        {
          method: "GET",
        }
      ).then((responseGet) => {
        if (responseGet.ok) {
          responseGet.json().then((json) => {
            setContext(json);
          });
        }
      });
    });
  };

  return (
    <>
      <Header
        headerText="Notifications"
        subheaderText="View your notifications here"
      />
      <div className="Notifications">
        <div className="container">
          <header>
            <div className="notif_box">
              <h2 className="title">Notifications</h2>
              <span id="notifes">
                {hasNotifications
                  ? Object.keys(context?.jobNotification).length
                  : 0}
              </span>
            </div>
            <Alert
              variant="danger"
              style={error ? { display: "block" } : { display: "none" }}
            >
              {error}
            </Alert>
            <Alert
              variant="success"
              style={success ? { display: "block" } : { display: "none" }}
            >
              {success}
            </Alert>
          </header>
          <main>
            {console.log(context?.jobNotification)}
            {hasNotifications ? (
              Object.keys(context?.jobNotification).map((jobId) =>
                // For each key, get all entries (applicant, employer, or both) and value (invitedInterview, acceptedInterview, etc.)
                Object.entries(context?.jobNotification[jobId]).map(
                  ([profileType, status]) => (
                    <NotifcationEntry
                      key={jobId + profileType}
                      jobId={jobId}
                      profileType={profileType}
                      status={status}
                      displayJob={displayJob}
                      acceptInterview={acceptInterview}
                      rejectInterview={rejectInterview}
                    />
                  )
                )
              )
            ) : (
              <div className="notif_card unread"> No notifications</div>
            )}
          </main>
          <ViewOnlyPopup info={{ ...info, show, setShow }} />
        </div>
      </div>
    </>
  );
}
