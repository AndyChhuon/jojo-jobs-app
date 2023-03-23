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
const userLogin = createContext();

function App() {
  const [context, setContext] = useState(null);
  useEffect(() => {
    //Warm up api (could also pay for Azure premium)
    fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI", {
      method: "GET", // default, so we can ignore
    }).then(() => {
      // console.log("api warmed up");
    });
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
