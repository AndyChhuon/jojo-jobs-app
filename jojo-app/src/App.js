import Navbar from "./Components/Navbar/JojoNavbar";
//import route and routes
import { Route, Routes } from "react-router-dom";
//import UpdateProfile
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import JobPosts from "./pages/JobPosts/JobPosts";
import ManagePosts from "./pages/ManagePosts/ManagePosts";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Applications from "./pages/Applications/Applications";
import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const userLogin = createContext();

function App() {
  const cookies = new Cookies();
  const [context, setContext] = useState(null);
  const checkJwtAndLogin = () => {
    if (!context) {
      if (cookies.get("Jwt")) {
        const decodedJwt = jwt(cookies.get("Jwt"));
        const applicantId =
          decodedJwt[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        //Fetch user info from api using id from jwt
        fetch(
          "https://jobapplicationsapi.azurewebsites.net/api/JobApplicantsAPI/" +
            applicantId,
          {
            method: "GET",
          }
        ).then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              setContext(json);
            });
          }
        });
      } else {
        console.log("no cookie");
      }
    }
  };

  useEffect(() => {
    //If user has logged in before, check if jwt is still valid
    if (cookies.get("Jwt")) {
      checkJwtAndLogin();
    } else {
      //Warm up api (could also pay for Azure premium)
      fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI", {
        method: "GET", // default, so we can ignore
      }).then(() => {
        // console.log("api warmed up");
      });
    }
  }, []);
  return (
    <userLogin.Provider value={[context, setContext]}>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<JobPosts />} />

        <Route path="/UpdateProfile" element={<UpdateProfile />} />
        <Route path="/JobsManager" element={<ManagePosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </userLogin.Provider>
  );
}

export default App;
export { userLogin };
