import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { UserErrorMessage } from "../components/AlertHandling/UserErrorMessage";

export const SignIn = () => {
  const navigate = useNavigate();
  const {error, setAppError, clearAppError} = useContext(AppContext);
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
const backendUrl = "https://colab-yx6w.onrender.com";
  const handleAccountLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/login`, formData);
      console.log("User logged in successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      setAppError(error.response.data);
      console.error("Error logging in user:", error.response.data);
      
      // Clear the error after 3 seconds
      setTimeout(() => {
        clearAppError();
      }, 2000); 
    }
  };

  return (
    <div className="hero bg-gradient-to-bl from-landing-gradient-one to-landing-gradient-two min-h-screen flex items-center flex-col justify-center space-y-16">
      {error && <UserErrorMessage error={error} />}
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <div className="w-1/2 flex flex-col items-center text-center p-8 ">
          <h1 className="text-5xl font-bold text-white">Welcome back to CoLab!</h1>
          <p className="py-6 text-2xl font-light text-white">
            Login to your account to start collaborating!
          </p>
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <div className="card bg-project-background w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4 text-text-color">Sign In</h2>
            <form className="w-full" onSubmit={handleAccountLogin}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full bg-navbar-color"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full bg-navbar-color"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-website-purple hover:bg-website-purple-hover w-full rounded-full text-base text-white border-2 border-project-border/25 hover:border-project-border/25">
                  Login
                </button>
              </div>
            </form>
            <div className="signup-btn mt-4">
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-link text-website-purple-hover"
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
