import { useContext } from "react";
import { Context } from "../../main";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import CountUp from "react-countup";

const HeroSection = () => {
  const { user } = useContext(Context);
  const [stats, setStats] = useState({
  totalJobs: 0,
  totalCompanies: 0,
  totalJobSeekers: 0,
  totalApplications: 0,
});
useEffect(() => {
  axios
    .get(`${API_BASE_URL}/api/v1/dashboard/stats`)
    .then((res) => {
      setStats(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
 const details = [
  {
    id: 1,
    title: stats.totalJobs,
    subTitle: "Live Jobs",
    icon: <FaSuitcase />,
  },
  {
    id: 2,
    title: stats.totalCompanies,
    subTitle: "Companies",
    icon: <FaBuilding />,
  },
  {
    id: 3,
    title: stats.totalJobSeekers,
    subTitle: "Job Seekers",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: stats.totalApplications,
    subTitle: "Applications",
    icon: <FaUserPlus />,
  },
];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
           <h2 className="welcome-user">
  {user?.role === "Job Seeker"
    ? "Your Career Starts Here 🚀"
    : "Hire Smarter, Build Stronger Teams👥"}
</h2>

<h1>
  {user?.role === "Job Seeker"
    ? "Find a job that suits"
    : "Hire the best candidates"}
</h1>

<h1>
  {user?.role === "Job Seeker"
    ? "your interests and skills"
    : "for your company"}
</h1>

<p>
  {user?.role === "Job Seeker"
    ? "Find your dream job, connect with top employers, and build a successful career with HireHub. Your next opportunity is just a click away."
    : "Post jobs, manage applications, and recruit the right talent with HireHub. Build your team faster and more efficiently."}
</p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                 <p>
  <CountUp
    end={element.title}
    duration={2}
  />
</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
