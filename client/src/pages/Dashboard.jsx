// Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectList } from "../components/Projects/ProjectList";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = ({ handleCoLabHome }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} />
      <div className="flex mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full bg-project-background overflow-hidden">
          <div className="z-10 bg-black">
            <SearchBar />
          </div>
          <div className="flex grow  justify-center overflow-y-auto mx-64 ">
            <ProjectList />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
