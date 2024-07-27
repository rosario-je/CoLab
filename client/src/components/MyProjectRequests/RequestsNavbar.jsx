import React from "react";
import Vial from "../../images/vial.png";
import { useNavigate } from "react-router-dom";

export const RequestsNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar w-screen bg-navbar-color text-text-color fixed top-0 left-0 right-0 z-50 mb-6">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl group"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img
            src={Vial}
            className="h-7 mb-2 group-hover:animate-unstableBeaker"
          />
          CoLab
        </a>
      </div>
      <div className="pr-5">
        <button
          className="btn btn-square btn-ghost w-auto px-2 mx-1 group"
          onClick={() => {
            navigate("/project/create");
          }}
        >
          <i className="fa-solid fa-circle-plus group-hover:animate-bounceFast"></i>
          Create a project
        </button>
        <button
          className="btn btn-square btn-ghost w-auto px-2 mx-1 group"
          onClick={() => {
            navigate("/:id/mymessages");
          }}
        >
          <i className="fa-solid fa-comments group-hover:animate-sideToSide"></i>
          Messages
        </button>
      </div>
    </div>
  );
};