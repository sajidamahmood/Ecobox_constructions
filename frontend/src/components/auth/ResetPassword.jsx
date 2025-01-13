import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true); // Start loading

    // Password validation
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setLoading(false); // Stop loading on error
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false); // Stop loading on error
      return;
    }

    try {
      // Send POST request to reset password
      const response = await axiosInstance.post("/reset-password", {
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setStatus(response.data.message);
      setPassword(""); // Clear password fields on success
      setPasswordConfirmation(""); // Clear confirmation field
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <p>Token: {token}</p> 
      {status && <p className="success-text">{status}</p>}
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        <button type="submit" disabled={loading}>Reset Password</button>
        {loading && <p>Resetting your password...</p>} {/* Show loading state */}
      </form>
    </div>
  );
};

export default ResetPassword;
