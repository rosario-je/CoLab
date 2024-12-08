import React, { useState, useEffect, useContext } from "react";
import { UserMenuProject } from "./UserMenuProject";
import axios from "axios";

import { AppContext } from "../../context/AppContext";

export const UserRightMenu = () => {
  const { currentUser, token } = useContext(AppContext);
  const [rightMenuProjects, setRightMenuProjects] = useState([]);

  useEffect(() => {
    const fetchRightUserMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `/api/dashboard/${currentUser.id}/my_projects`, config,
        );
        setRightMenuProjects(response.data);
      } catch (error) {
        console.error(
          "Error getting projects for the right user menu: ",
          error.message
        );
      }
    };
    fetchRightUserMenu();
  }, []);

  return (
    <div className="hidden lg:flex flex-col fixed top-20 right-0 lg:w-[200px] 2xl:w-[300px] h-screen bg-menu-colors justify-between">
      <ul className="menu">
        <li className="border-none">
          <h2 className="menu-title text-text-color lg:text-sm xl:text-lg pl-2 pb-5">Projects</h2>
          <ul className="side-projects text-xl font-light pt-5 lg:space-y-3 xl:space-y-5 p-0 m-2 xl:auto">
            {rightMenuProjects.map((project) => {
              return (
                <UserMenuProject
                  key={project.project_id}
                  project={project}
                  currentUser={currentUser.id}
                />
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};
