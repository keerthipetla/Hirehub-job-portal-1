import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const { isAuthorized,user } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }
  const saveJob = async (jobId) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/user/save-job/${jobId}`,
      {},
      {
        withCredentials: true,
      }
    );

    toast.success(data.message);

  } catch (error) {
   toast.error(
  error.response?.data?.message ||
  "Failed to save job"
);
  }
};

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <input
  type="text"
  placeholder="Search jobs by title..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-job"
/>
        <div className="banner">
          {jobs.jobs &&
  jobs.jobs
    .filter((job) =>
      job.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <div className="job-actions">

  <Link to={`/job/${element._id}`}>
    Job Details
  </Link>

 {user?.role === "Job Seeker" && (
  <button
    onClick={() => saveJob(element._id)}
  >
     ❤️Save Job
  </button>
)}

</div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
