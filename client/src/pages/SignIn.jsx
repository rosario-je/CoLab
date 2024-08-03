import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserAuthMessage } from "../components/ErrorHandling/UserAuthMessage";

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAccountLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData);
      console.log("User logged in successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data);
      console.error("Error logging in user:", error.response.data);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center flex-col justify-center space-y-16">
      {error && <UserAuthMessage error={error} />}
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <div className="w-1/2 flex flex-col items-center text-center p-8">
          <h1 className="text-5xl font-bold">Welcome back to CoLab!</h1>
          <p className="py-6 text-2xl font-light">
            Login to your account to start collaborating!
          </p>
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <div className="card bg-base-100 w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4">Sign In</h2>
            <form className="w-full" onSubmit={handleAccountLogin}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>
            <div className="signup-btn mt-4">
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-link"
              >
                Don't have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
