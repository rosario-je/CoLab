import React from "react";

export const UserLeftMenu = () => {
  return (
    <div className="w-1/5 flex flex-col justify-between h-screen text-text-color">
      <div className="bg-menu-colors">
        <ul className="menu  w-full flex-1 flex flex-col justify-between">
          <li className="pl-0 border-none">
            <h2 className="text-text-color text-lg">Main Menu</h2>
            <ul className="pl-0 border-none">
              <li className="group">
                <a className="flex items-center">
                  <i className="fa-solid fa-layer-group group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Feed
                </a>
              </li>
              <li className="group">
                <a className="flex items-center">
                  <i className="fa-solid fa-briefcase group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Projects
                </a>
              </li>
              <li className="group">
                <a className="flex items-center">
                  <i className="fa-solid fa-comments group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Messages
                </a>
              </li>
              <li className="group">
                <a className="flex items-center">
                  <i className="fa-solid fa-user group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Profile
                </a>
              </li>
            </ul>
          </li>
          <li className="pl-0 border-none mt-10">
            <h2 className="text-text-color text-lg">Explore</h2>
            <ul className="pl-0 border-none">
              <li className="group">
                <a className="flex items-center">
                  <i className="fa-solid fa-heart group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Liked Projects
                </a>
              </li>
              <li className="group">
                <a className="flex items-center">
                  <i className="fa-solid fa-bullseye group-hover:animate-bounceSlow group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                  Recommended
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex flex-grow bg-menu-colors pt-10 justify-center gap-[5px] items-center w-full">
        <i className="fa-regular fa-circle text-4xl mr-2"></i>
        <div className="flex flex-col">
          <h2>User</h2>
          <h5>user@colab.com</h5>
        </div>
        <a className="">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
    </div>
  );
};
