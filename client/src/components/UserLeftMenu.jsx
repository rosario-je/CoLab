import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const UserLeftMenu = () => {
  const navigate = useNavigate();
  const { notifications, requests } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getUserData = (keys) =>
      keys.reduce((acc, key) => {
        acc[key] = localStorage.getItem(key);
        return acc;
      }, {});

    const { id, email, firstName, lastName, username, profile_pic } =
      getUserData([
        "id",
        "email",
        "firstName",
        "lastName",
        "username",
        "profile_pic",
      ]);

    setCurrentUser({
      id,
      email,
      firstName,
      lastName,
      username,
      profile_pic,
    });
  }, []);

  return (
    <div className="hidden lg:flex flex-col fixed top-20 left-0 lg:w-[200px] 2xl:w-[300px] h-screen bg-menu-colors justify-start">
      <div className="top-menu-items p-1">
        <ul className="menu w-full flex-1 flex flex-col justify-between lg:gap-y-5 xl:gap-y-10 2xl:gap-y-16">
          <li className="main-menu-left-menu">
            <h2 className="menu-title text-text-color xl:text-sm 2xl:text-lg pl-2 pb-5">
              Main Menu
            </h2>

            <ul className="menu-item xl:text-sm 2xl:text-xl font-light pt-5 space-y-3.5 list-none p-0 2xl:p-4 m-2 2xl:m-4">
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
                  onClick={() =>
                    currentUser && navigate(`/${currentUser.id}/myprojects`)
                  }
                >
                  <i className="fa-solid fa-briefcase group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  <p>My Projects</p>
                </a>
              </li>

              <li className="group create-project-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    currentUser && navigate(`/${currentUser.id}/project/create`)
                  }
                >
                  <i className="fa-solid fa-circle-plus group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                  <p>Create a project</p>
                </a>
              </li>

              <li className="group join-requests-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    currentUser &&
                    navigate(`/${currentUser.id}/myprojects/requests`)
                  }
                >
                  <div className="icon-container relative">
                    <i className="fa-solid fa-envelope group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                    {requests && requests.length > 0 && (
                      <div className="badge bg-confirm badge-xs absolute -top-1 -right-1 border-confirm" />
                    )}
                  </div>
                  <p>Join Requests</p>
                </a>
              </li>

              <li className="group notifications-btn">
                <a
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    currentUser && navigate(`/${currentUser.id}/notifications`)
                  }
                >
                  <div className="icon-container relative">
                    <i className="fa-solid fa-comments group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-0.5"></i>
                    {notifications && notifications.length > 0 && (
                      <div className="badge bg-confirm badge-xs absolute -top-1 -right-1 border-confirm" />
                    )}
                  </div>
                  <p>Notifications</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="explore-section-left-menu">
            <h2 className="menu-title text-text-color xl:text-sm 2xl:text-lg pl-2 pb-5">
              Explore
            </h2>

            <ul className="xl:text-sm 2xl:text-lg font-light pt-5 space-y-3.5 p-0 2xl:p-4 m-2 2xl:m-4">
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
        <div className="flex justify-center pb-20 flex-col items-center gap-y-5 ">
          <div className="flex flex-col xl:flex-row w-full space-y-1 items-center justify-center gap-x-4">
            {currentUser ? (
              currentUser.profile_pic ? (
                <img
                  src={`/profile_pics/${currentUser.profile_pic}`}
                  alt="profile"
                  className="rounded-full lg:h-16 lg:w-16 2xl:h-24 2xl:w-24 border-icon-purple border-4"
                />
              ) : (
                <div className="border-2 rounded-full bg-zinc-500 w-12 h-12 flex justify-center items-center">
                  <h3 className="font-bold text-xl text-text-color">
                    {currentUser?.firstName?.[0] ?? "N"}
                    {currentUser?.lastName?.[0] ?? "A"}
                  </h3>
                </div>
              )
            ) : (
              <div className="border-2 rounded-full bg-zinc-500 w-12 h-12 flex justify-start xl:justify-center items-center">
                <h3 className="font-bold text-xl text-text-color">N/A</h3>
              </div>
            )}
            <div className="flex flex-col space-y-1 text-center xl:text-start">
              {currentUser ? (
                <>
                  <h3 className="font-bold lg:text-lg xl:text-xl text-text-color">
                    @{currentUser.username}
                  </h3>
                  <h4 className="font-extralight text-xs xl:text-sm italic">
                    {currentUser.email}
                  </h4>
                </>
              ) : (
                <p className="font-light text-text-color">Not logged in</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
