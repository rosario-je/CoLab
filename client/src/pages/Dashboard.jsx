import React from "react";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectList } from "../components/Projects/ProjectList";

export const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <Navbar />
      <div className="flex justify-space-between items-center w-screen">
        <UserLeftMenu />
        <div className="flex-grow">
          <ProjectList />
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
