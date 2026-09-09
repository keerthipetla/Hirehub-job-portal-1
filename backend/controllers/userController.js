import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { Job } from "../models/jobSchema.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!", 400));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password and role.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});
export const forgotPassword = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findOne({
      email: req.body.email,
      
    });
    console.log("Forgot password email:", req.body.email);
console.log("User found:", user);
console.log("User role:", user?.role)

    if (!user) {
      return next(
        new ErrorHandler("User not found", 404)
      );
    }

    const resetToken =
      user.getResetPasswordToken();

    await user.save({
      validateBeforeSave: false,
    });

  const resetPasswordUrl =
  `http://localhost:5173/password/reset/${resetToken}`;
  console.log("RESET LINK SENT:", resetPasswordUrl);

    await sendEmail(
      user.email,
      "HireHub Password Reset",
      `Reset your password using this link:

${resetPasswordUrl}

This link expires in 15 minutes.`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  }
);
export const resetPassword = catchAsyncErrors(
  async (req, res, next) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    }).select("+password");

    if (!user) {
      return next(
        new ErrorHandler(
          "Reset token invalid or expired",
          400
        )
      );
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
    });
  }
);
export const saveJob = catchAsyncErrors(
  async (req, res, next) => {

    const { jobId } = req.params;

    const user = await User.findById(req.user._id);

    const job = await Job.findById(jobId);

    if (!job) {
      return next(
        new ErrorHandler("Job not found", 404)
      );
    }

    if (user.savedJobs.includes(jobId)) {
      return next(
        new ErrorHandler(
          "Job already saved",
          400
        )
      );
    }

    user.savedJobs.push(jobId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Job Saved Successfully",
    });
  }
);
export const getSavedJobs = catchAsyncErrors(
  async (req, res, next) => {

    const user = await User.findById(
      req.user._id
    ).populate("savedJobs");

    res.status(200).json({
      success: true,
      jobs: user.savedJobs,
    });
  }
);
export const unsaveJob = catchAsyncErrors(
  async (req, res, next) => {

    const { jobId } = req.params;

    const user = await User.findById(req.user._id);

    user.savedJobs = user.savedJobs.filter(
      (id) => id.toString() !== jobId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Job Removed From Saved Jobs",
    });
  }
);
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
export const updateProfile = catchAsyncErrors(
  async (req, res, next) => {

    const user = await User.findById(
      req.user._id
    );

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile Updated Successfully",
    });
  }
);