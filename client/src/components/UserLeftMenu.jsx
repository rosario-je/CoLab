import React from "react";
import { useNavigate } from "react-router-dom";

export const UserLeftMenu = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 flex flex-col justify-between text-text-color bg-menu-colors h-screen fixed left-0 z-10 inset-16 pt-16">
      <div className="top-menu-items p-1">
        <ul className="menu w-full flex-1 flex flex-col justify-between gap-y-24">
          <li>
            <h2 className="text-text-color text-lg pb-5">Main Menu</h2>
            <ul className="text-xl font-light pt-5">
              <li className="group">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <i className="fa-solid fa-layer-group group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Feed
                </a>
              </li>
              <li className="group">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/${currentUser.id}/myprojects`);
                  }}
                >
                  <i className="fa-solid fa-briefcase group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  <p>Projects</p>
                </a>
              </li>
              <li className="group">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/${currentUser.id}/mymessages`);
                  }}
                >
                  <i className="fa-solid fa-comments group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                  <p>Messages</p>
                </a>
              </li>
              <li className="group">
                <a className="flex items-center cursor-pointer">
                  <i className="fa-solid fa-user group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Profile
                </a>
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-text-color text-lg">Explore</h2>
            <ul className="text-lg font-light pt-5">
              <li className="group">
                <a className="flex items-center cursor-pointer">
                  <i className="fa-solid fa-heart group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Liked Projects
                </a>
              </li>
              <li className="group">
                <a className="flex items-center cursor-pointer">
                  <i className="fa-solid fa-bullseye group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Recommended
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex justify-center pb-44">
        <div className="pl-2 space-y-1">
          <h3 className="font-bold">@{currentUser.id}</h3>
          <h4 className="font-light">{currentUser.email}</h4>
        </div>
      </div>
    </div>
  );
};
