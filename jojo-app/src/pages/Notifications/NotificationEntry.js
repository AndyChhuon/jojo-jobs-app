import React from "react";

export default function NotifcationEntry(props) {
  const {
    jobId,
    profileType,
    status,
    displayJob,
    acceptInterview,
    rejectInterview,
  } = props;
  let notifMessage = "";
  let acceptMessage = "";

  if (profileType === "applicant" && status === "InvitedInterview") {
    notifMessage = (
      <div>
        Congrats! You have been invited to an interview for{" "}
        <button
          type="button"
          className="bold_button"
          onClick={() => displayJob(jobId)}
        >
          this
        </button>{" "}
        job
      </div>
    );

    acceptMessage = (
      <p className="time">
        Click to{" "}
        <button
          type="button"
          className="bold_button accept"
          onClick={() => acceptInterview(jobId)}
        >
          Accept
        </button>{" "}
        or{" "}
        <button
          type="button"
          className="bold_button reject"
          onClick={() => rejectInterview(jobId)}
        >
          Reject
        </button>{" "}
      </p>
    );
  } else if (profileType === "applicant" && status === "acceptedInterview") {
    notifMessage = (
      <div>
        You have accepted an interview for{" "}
        <button
          type="button"
          className="bold_button"
          onClick={() => displayJob(jobId)}
        >
          this
        </button>{" "}
        job. Please wait for details!{" "}
      </div>
    );
  } else if (profileType === "applicant" && status === "declinedInterview") {
    notifMessage = (
      <div>
        You have rejected the interview for{" "}
        <button
          type="button"
          className="bold_button"
          onClick={() => displayJob(jobId)}
        >
          this
        </button>{" "}
        job!
      </div>
    );
  } else if (profileType === "recruiter" && status === "acceptedInterview") {
    notifMessage = (
      <div>
        The applicant has accepted the interview for{" "}
        <button
          type="button"
          className="bold_button"
          onClick={() => displayJob(jobId)}
        >
          this
        </button>{" "}
        job!
      </div>
    );
  } else if (profileType === "recruiter" && status === "declinedInterview") {
    notifMessage = (
      <div>
        The applicant has rejected the interview for{" "}
        <button
          type="button"
          className="bold_button"
          onClick={() => displayJob(jobId)}
        >
          this
        </button>{" "}
        job
      </div>
    );
  }

  return (
    <div className="notif_card unread">
      <div className="description">
        <div className="user_activity">{notifMessage}</div>
        {acceptMessage}
      </div>
    </div>
  );
}
