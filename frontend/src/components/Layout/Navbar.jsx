import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FaMoon,
  FaSun,
  FaBell,
} from "react-icons/fa";

const Navbar = ({
  darkMode,
  setDarkMode,
}) => {
  const [show, setShow] = useState(false);
  const [showNotifications,
setShowNotifications] =
useState(false);
const notifications = [
  "Application Submitted Successfully",
  "Profile Updated",
  "New Job Posted",
];
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/hirehub-logo.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
        {user?.role === "Job Seeker" ? (
  <li>
    <Link to={"/job/getall"} onClick={() => setShow(false)}>
      ALL JOBS
    </Link>
  </li>
) : (
  <li>
    <Link to={"/job/me"} onClick={() => setShow(false)}>
      MY POSTED JOBS
    </Link>
  </li>
)}
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>

         {user && user.role === "Employer" ? (
  <>
    <li>
      <Link to={"/job/post"} onClick={() => setShow(false)}>
        POST NEW JOB
      </Link>
    </li>

   
  </>
) : (
  <>
    <li>
      <Link to={"/saved-jobs"} onClick={() => setShow(false)}>
        SAVED JOBS
      </Link>
    </li>
  </>
)}
<li>
  <button
    className="theme-btn"
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
  >
    <div className="bell-container">
  <FaBell />
  <span className="bell-badge">
    {notifications.length}
  </span>
</div>
  </button>
</li>
 <li>
  <Link
    to={"/profile"}
    onClick={() => setShow(false)}
  >
    PROFILE
  </Link>
</li>
<li>
  <button
    className="theme-btn"
    onClick={() =>
      setDarkMode(!darkMode)
    }
  >
    {darkMode ? (
      <FaSun />
    ) : (
      <FaMoon />
    )}
  </button>
</li>

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        {showNotifications && (
  <div className="notification-box">
    {notifications.map(
      (note, index) => (
        <p key={index}>
          {note}
        </p>
      )
    )}
  </div>
)}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
