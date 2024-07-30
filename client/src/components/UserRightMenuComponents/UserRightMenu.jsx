import React from "react";
import { UserMenuProject } from "./UserMenuProject";

export const UserRightMenu = () => {
  return (
    <div className="w-72 text-text-color self-start  bg-menu-colors h-full fixed right-0 z-10 top-20 pt-16">
      <ul className="menu">
        <li className="border-none">
          <h2 className="menu-title text-text-color text-lg pb-5">Projects</h2>
          <ul className="text-xl font-light pt-5">
            <UserMenuProject projectName="Project 1" />
            <UserMenuProject projectName="Project 2" />
            <UserMenuProject projectName="Project 3" />
            <UserMenuProject projectName="Project 4" />
          </ul>
        </li>
      </ul>
    </div>
  );
};