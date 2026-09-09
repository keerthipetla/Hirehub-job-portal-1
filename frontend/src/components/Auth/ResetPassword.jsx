import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/user/password/reset/${token}`,
        { password }
      );

      toast.success(data.message);

      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <section className="loginPage">
      <div className="container">
        <h3>Reset Password</h3>

        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;