import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [requirements, setRequirements] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (salaryType === "default") {
      toast.error("Please select salary type");
      return;
    }

    try {
      const jobData =
        salaryType === "Fixed Salary"
          ? {
              title,
              companyName,
              companyWebsite,
              jobType,
              experience,
              requirements,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              companyName,
              companyWebsite,   
              jobType,
              experience,
              requirements,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            };

      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);

      setTitle("");
      setCompanyName("");
      setJobType("");
      setExperience("");
      setCompanyWebsite("");
      setDescription("");
      setRequirements("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>

        <form onSubmit={handleJobPost}>
          {/* Job Title & Company Name */}
     <div className="wrapper">
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Job Title"
  />

  <input
    type="text"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
    placeholder="Company Name"
  />
</div>

<input
  type="url"
  value={companyWebsite}
  onChange={(e) => setCompanyWebsite(e.target.value)}
  placeholder="Company Website"
/>

          {/* Category & Job Type */}
          <div className="wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN STACK Development
              </option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">
                MEAN STACK Development
              </option>
              <option value="MEVN Stack Development">
                MEVN STACK Development
              </option>
              <option value="Data Entry Operator">
                Data Entry Operator
              </option>
            </select>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
      <div className="wrapper">
  <select
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
  >

  <option value="">Select Experience</option>
  <option value="Fresher">Fresher</option>
  <option value="0-1 Years">0-1 Years</option>
  <option value="1-3 Years">1-3 Years</option>
  <option value="3-5 Years">3-5 Years</option>
  <option value="5+ Years">5+ Years</option>
</select>
</div>

          {/* Country & City */}
          <div className="wrapper">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>

          {/* Location */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />

          {/* Salary */}
          <div className="salary_wrapper">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>

            <div>
              {salaryType === "default" ? (
                <p>Please provide Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                />
              ) : (
                <div className="ranged_salary">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Job Requirements */}
<textarea
  rows="4"
  value={requirements}
  onChange={(e) => setRequirements(e.target.value)}
  placeholder="Job Requirements (Example: React.js, Node.js, MongoDB, Git)"
/>

{/* Description */}
<textarea
  rows="10"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Job Description"
/>

          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
