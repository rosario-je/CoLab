import React from "react";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectList } from "../components/Projects/ProjectList";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <UserLeftMenu />
        <div className="flex flex-col flex-grow w-full">
          <div className="flex justify-center">
            <SearchBar />
          </div>
          <div className="flex-grow flex justify-center items-center">
            <ProjectList />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
