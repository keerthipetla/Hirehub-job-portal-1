import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { Application } from "../models/applicationSchema.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const totalCompanies = await User.countDocuments({
      role: "Employer",
    });

    const totalJobSeekers = await User.countDocuments({
      role: "Job Seeker",
    });

    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      totalJobs,
      totalCompanies,
      totalJobSeekers,
      totalApplications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};