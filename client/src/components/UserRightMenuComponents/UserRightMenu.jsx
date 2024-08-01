import React from "react";
import { UserMenuProject } from "./UserMenuProject";

export const UserRightMenu = () => {
  return (
    <div className="flex flex-col fixed top-0 right-0 w-[300px] h-full bg-menu-colors justify-between mt-20 pt-16">
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
