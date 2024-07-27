import React from "react";

export const UserRightMenu = () => {
  return (
    <div className="w-72 text-text-color self-start  bg-menu-colors h-full fixed right-0 z-10 top-16 pt-16">
      <ul className="menu">
        <li className="border-none">
          <h2 className="text-lg text-text-color">Projects</h2>
          <ul className="text-xl font-light pt-5">
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 1
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 2
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 3
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-square text-2xl group-hover:animate-sideToSide group-hover:text-icon-purple group-hover:drop-shadow-white-glow mr-2"></i>
                Project 4
              </a>
            </li>
          </ul>
        </li>
        <li className="text-xl font-light mt-10">
          <h2 className="text-lg text-text-color">Messages</h2>
          <ul className="pt-5 ">
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:text-icon-purple group-hover:drop-shadow-white-glow group-hover:animate-sideToSide mr-2"></i>
                User 1
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:text-icon-purple group-hover:drop-shadow-white-glow group-hover:animate-sideToSide mr-2"></i>
                User 2
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:text-icon-purple group-hover:drop-shadow-white-glow group-hover:animate-sideToSide mr-2"></i>
                User 3
              </a>
            </li>
            <li className="group">
              <a className="flex items-center">
                <i className="fa-regular fa-circle text-2xl group-hover:text-icon-purple group-hover:drop-shadow-white-glow group-hover:animate-sideToSide mr-2"></i>
                User 4
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
