import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/password/forgot",
        { email }
      );

      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

 return (
  <section className="forgotPasswordPage">
    <div className="forgotPasswordCard">
      <h3>Forgot Password</h3>

      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  </section>
);
};

export default ForgotPassword;