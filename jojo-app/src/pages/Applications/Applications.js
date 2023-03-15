import "./Applications.less";
import Header from "../../Components/Header/Header";
import { useContext, useEffect } from "react";
import { userLogin } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Applications() {
  const [context, setContext] = useContext(userLogin);
  const navigate = useNavigate();

  //useeffect to check if user is logged in
  useEffect(() => {
    if (!context) {
      navigate("/login");
    } else {
      if (context.profileType === "Recruiter") {
        navigate("/UpdateProfile");
      }
    }
  }, []);

  return (
    <>
      <Header
        headerText="Job Applications"
        subheaderText="View All Jobs You Have Applied For"
      />
    </>
  );
}
