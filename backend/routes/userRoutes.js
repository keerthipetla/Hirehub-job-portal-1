import express from "express";
import {
  login,
  register,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  saveJob,
  getSavedJobs,
  unsaveJob,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put(
  "/save-job/:jobId",
  isAuthenticated,
  saveJob
);
router.put(
  "/unsave-job/:jobId",
  isAuthenticated,
  unsaveJob
);
router.get(
  "/saved-jobs",
  isAuthenticated,
  getSavedJobs
);
router.put(
  "/update-profile",
  isAuthenticated,
  updateProfile
);

export default router;