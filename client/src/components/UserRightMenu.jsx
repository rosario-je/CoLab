import React from "react";

export const UserRightMenu = () => {
  return (
    <div className="w-1/5 self-end h-screen text-text-color">
      <ul className="menu bg-menu-colors w-full h-full">
        <li className="pl-0 border-none">
          <h2 className="text-text-color text-lg">Projects</h2>
          <ul className="pl-0 border-none">
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 1
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 2
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 3
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 4
              </a>
            </li>
          </ul>
        </li>
        <li className="pl-0 border-none">
          <h2 className="text-text-color text-lg">Messages</h2>
          <ul className="pl-0 border-none">
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow group-hover:animate-bounceSlow mr-2"></i>
                User 1
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow group-hover:animate-bounceSlow mr-2"></i>
                User 2
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow group-hover:animate-bounceSlow mr-2"></i>
                User 3
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:animate-sideToSide group-hover:text-website-purple group-hover:drop-shadow-white-glow group-hover:animate-bounceSlow mr-2"></i>
               User 4
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
