import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import SavedJobs from "./components/Job/SavedJobs";
import Profile from "./components/Profile/Profile";


const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const [darkMode, setDarkMode] =
  useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
  <div
    className={
      darkMode ? "dark-mode" : ""
    }
  >
      <BrowserRouter>
      <Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
        <Routes>
         <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route
  path="/password/forgot"
  element={<ForgotPassword />}
/>

<Route
  path="/password/reset/:token"
  element={<ResetPassword />}
/>
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />

<Route
  path="/saved-jobs"
  element={<SavedJobs />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
