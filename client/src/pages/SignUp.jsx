import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserErrorMessage } from "../components/AlertHandling/UserErrorMessage";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
    profile_pic: "",
    github_repo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAccountCreation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", formData);

      const { token, id, email, firstName, lastName, username, profile_pic } =
        response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("email", email);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("username", username);
      localStorage.setItem("profile_pic", profile_pic);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data);
      console.error("Error creating user:", error.response.data);
    }
  };

  return (
    <div className="hero bg-gradient-to-bl from-landing-gradient-one to-landing-gradient-two w-full flex items-center">
      {error && <UserErrorMessage error={error} />}
      <div className="container h-screen mx-auto flex flex-col lg:flex-row justify-evenly lg:justify-between items-center px-4 pt-5 lg:pt-0">
        <div className="flex flex-col items-center w-full lg:w-1/2 max-w-md bg-project-background p-4 lg:p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-text-color ">Sign Up</h2>
          <form className="w-full" onSubmit={handleAccountCreation}>
            <div className="form-control lg:mb-4">
              <label className="label">
                <span className="label-text text-white">First Name</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Type your first name here"
                className="input input-bordered w-full bg-navbar-color"
                required
              />
            </div>
            <div className="form-control lg:mb-4">
              <label className="label">
                <span className="label-text text-white">Last Name</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Type your last name here"
                className="input input-bordered w-full bg-navbar-color"
                required
              />
            </div>
            <div className="form-control lg:mb-4">
              <label className="label">
                <span className="label-text text-white">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className="input input-bordered w-full bg-navbar-color"
                required
              />
            </div>
            <div className="form-control lg:mb-4">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className="input input-bordered w-full bg-navbar-color"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white text-base">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-bordered w-full bg-navbar-color"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-website-purple hover:bg-website-purple-hover w-full rounded-full text-base text-white border-2 border-project-border/25 hover:border-project-border/25"
              >
                Create an account
              </button>
            </div>
          </form>
          <div className="mt-4 justify-center">
            <button
              onClick={() => navigate("/signin")}
              className="btn btn-link text-website-purple-hover"
            >
              Already have an account?
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center text-center   pt-4 lg:p-8">
          <h1 className="text-xl lg:text-5xl font-bold text-white">
            Create a CoLab Account
          </h1>
          <p className="pt-2 lg:py-6 text-xl lg:text-2xl font-light text-white">
            Join our community and start exploring exciting projects. Create an
            account to connect, collaborate, and contribute!
          </p>
        </div>
      </div>
    </div>
  );
};
