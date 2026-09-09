import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Context } from "../../main";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }
    const handleCopyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success("Job link copied!");
};

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: job.title,
        text: `Check out this job at ${job.companyName}`,
        url: window.location.href,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied! Share it anywhere.");
  }
};
const isNewJob =
  job.jobPostedOn &&
  (new Date() - new Date(job.jobPostedOn)) /
    (1000 * 60 * 60 * 24) <
    7;
  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>

        <div className="banner">
           <div className="job-summary">
  <h4>Job Summary</h4>

  <p>📍 {job.city}, {job.country}</p>

  <p>💼 {job.jobType}</p>

  <p>🧑‍💻 {job.experience}</p>

  <p>
    💰 {job.fixedSalary
      ? `₹${job.fixedSalary}`
      : `₹${job.salaryFrom} - ₹${job.salaryTo}`}
  </p>

  <p>👀 {views} Views</p>

  <p>⭐ 4.8 / 5</p>

  
</div>
         <p>
  <strong>Title:</strong> {job.title}

  {isNewJob && (
    <span className="new-job-badge">
      🆕 NEW
    </span>
  )}
</p>

          <p><strong>Company:</strong> {job.companyName}</p>
          <p>
  <strong>Views:</strong> 👀 {views}
</p>

          {/* NEW */}
          <p>
            <strong>Company Website:</strong>{" "}
            {job.companyWebsite ? (
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="company-link"
              >
                Visit Website ↗
              </a>
            ) : (
              "Not Available"
            )}
          </p>

          <p><strong>Category:</strong> {job.category}</p>
          <p>
           <strong>Experience:</strong> {job.experience}
                  </p>

          <p><strong>Country:</strong> {job.country}</p>

          <p><strong>City:</strong> {job.city}</p>

          <p><strong>Location:</strong> {job.location}</p>

          <p>
  <strong>Requirements:</strong>
</p>

<ul className="requirements-list">
  {job.requirements
    ?.split(",")
    .map((item, index) => (
      <li key={index}>✔ {item.trim()}</li>
    ))}
</ul>

<p>
  <strong>Description:</strong> {job.description}
</p>

          <p>
            <strong>Job Posted On:</strong>{" "}
            {new Date(job.jobPostedOn).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            {job.fixedSalary
              ? `₹${job.fixedSalary}`
              : `₹${job.salaryFrom} - ₹${job.salaryTo}`}
          </p>

          {user && user.role !== "Employer" && (
           <div className="job-actions">
  <Link to={`/application/${job._id}`}>
    Apply Now
  </Link>

  <button onClick={handleCopyLink}>
    📋 Copy Link
  </button>

  <button onClick={handleShare}>
    📤 Share Job
  </button>
</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;