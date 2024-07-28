import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
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
      console.log("User created successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating user:", error.response.data);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 h-screen w-full">
        <div className="flex-row-reverse flex w-screen items-center justify-center gap-x-72">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create a CoLab Account</h1>
            <p className="py-6">
              Join our community and start exploring exciting projects. Create
              an account to connect, collaborate, and contribute!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleAccountCreation}>
              <div className="form-control first-name">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Type your first name here"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control last-name">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Type your last name here"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control username">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control email">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control password">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Create an account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
