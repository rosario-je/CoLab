import React from "react";

export const UserLeftMenu = () => {
  return (
    <div className="w-1/5 h-screen text-text-color">
      <ul className="menu bg-menu-colors w-full h-full">
        <li className="pl-0 border-none">
          <h2 className="text-text-color text-lg">Main Menu</h2>
          <ul className="pl-0 border-none">
            <li className="group">
              <a className="flex items-center">
                <i className="fa-solid fa-layer-group group-hover:animate-bounceSlow group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>Feed
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-solid fa-briefcase group-hover:animate-bounceSlow group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>Projects
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-solid fa-comments group-hover:animate-bounceSlow group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>Messages
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-solid fa-user group-hover:animate-bounceSlow group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>Profile
              </a>
            </li>
          </ul>
        </li>
        <li className="pl-0 border-none">
          <h2 className="text-text-color text-lg">Explore</h2>
          <ul className="pl-0 border-none">
            <li className="group">
              <a className="flex items-center">
                <i className="fa-solid fa-heart group-hover:animate-bounceSlow group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>Liked Projects
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-solid fa-bullseye group-hover:animate-bounceSlow group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>Recommended
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
