import React from "react";
import { useNavigate } from "react-router-dom";

export const UserLeftMenu = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col fixed top-0 left-0 w-[300px] h-full bg-menu-colors justify-between mt-5 pt-16">
      <div className="top-menu-items p-1">
        <ul className="menu w-full flex-1 flex flex-col justify-between gap-y-24">
          <li className="main-menu-left-menu">
            <h2 className="menu-title text-text-color text-lg pb-5">
              Main Menu
            </h2>

            <ul className="menu-item text-xl font-light pt-5 space-y-3.5">
              <li className="group feed-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/dashboard`);
                  }}
                >
                  <i className="fa-solid fa-layer-group group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Feed
                </a>
              </li>

              <li className="group projects-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/${currentUser.id}/myprojects`);
                  }}
                >
                  <i className="fa-solid fa-briefcase group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  <p>My Projects</p>
                </a>
              </li>

              <li className="group create-project-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/${currentUser.id}/project/create`);
                  }}
                >
                  <i className="fa-solid fa-circle-plus group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                  <p>Create a project</p>
                </a>
              </li>

              <li className="group join-requests-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/${currentUser.id}/myprojects/requests`);
                  }}
                >
                  <div className="icon-container relative">
                    <i className="fa-solid fa-envelope group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                    {/* {requests.length > 0 && ( */}
                      <div className="badge bg-confirm badge-xs absolute -top-1 -right-1 border-confirm" />
                    {/* )} */}
                  </div>
                  <p>Join Requests</p>
                </a>
              </li>

              <li className="group notifications-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(`/${currentUser.id}/notifications`);
                  }}
                >
                  <i className="fa-solid fa-comments group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                  <p>Notifications</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="explore-section-left-menu">
            <h2 className="menu-title text-text-color text-lg">Explore</h2>

            <ul className="text-lg font-light pt-5 space-y-3.5">
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

      <div className="bottom-user-menu justify-center">
        <div className="flex justify-center pb-20 flex-col items-center gap-y-5 h-80">
          <div className="flex flex-row w-full space-y-1 items-center justify-center gap-x-4">
            <img
              src={`/profile_pics/${currentUser.profile_pic}`}
              alt="profile"
              className="rounded-full h-24 w-24 border-icon-purple border-4"
            />
            <div className="flex flex-col space-y-1">
              <h3 className="font-bold text-xl">@{currentUser.username}</h3>
              <h4 className="font-extralight text-sm italic">
                {currentUser.email}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
