import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/user/saved-jobs`,
          {
            withCredentials: true,
          }
        );

        setJobs(data.jobs);

      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedJobs();
  }, []);
  const unsaveJob = async (jobId) => {
  try {

    const { data } = await axios.put(
      `${API_BASE_URL}/api/v1/user/unsave-job/${jobId}`,
      {},
      {
        withCredentials: true,
      }
    );

    alert(data.message);

    setJobs(
      jobs.filter(
        (job) => job._id !== jobId
      )
    );

  } catch (error) {

    alert(
      error.response?.data?.message
    );
  }
};

  return (
    <section className="jobs page">
      <div className="container">
        <h1>MY SAVED JOBS</h1>

        <div className="banner">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                className="card"
                key={job._id}
              >
                <p>{job.title}</p>
                <p>{job.category}</p>
                <p>{job.country}</p>

               <div className="saved-job-actions">

  <Link
    to={`/job/${job._id}`}
  >
    Job Details
  </Link>

  <button
    onClick={() =>
      unsaveJob(job._id)
    }
  >
    ❌ Remove
  </button>

</div>
              </div>
            ))
          ) : (
            <h2>
              No Saved Jobs Yet
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedJobs;