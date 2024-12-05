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
    <div className="  hidden lg:flex flex-col fixed top-0 right-0 w-[300px] h-full bg-menu-colors justify-between mt-5 pt-16">
      <ul className="menu">
        <li className="border-none">
          <h2 className="menu-title text-text-color text-lg pb-5">Projects</h2>
          <ul className="side-projects text-xl font-light pt-5 space-y-5">
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
