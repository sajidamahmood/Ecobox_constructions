import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import { Link } from "react-router-dom";
import './ForgotPassword.css';




const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    try {
      const response = await axiosInstance.post("/forgot-password", { email });
      setStatus(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Mot de Passe Oublié</h2>
      {status && <p className="success-text">{status}</p>}
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>
      <Link to="/login">Retour à la connexion</Link>
    </div>
  );
};

export default ForgotPassword;
