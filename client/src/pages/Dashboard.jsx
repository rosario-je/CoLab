import React from "react";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectList } from "../components/Projects/ProjectList";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = ({ handleCoLabHome, currentUser, handleLogout }) => {

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser}/>
      <div className="flex mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex flex-col w-full bg-project-background overflow-hidden">
          <div className="z-10 bg-black">
            <SearchBar />
          </div>
          <div className="flex grow justify-center overflow-y-auto mx-64">
            <ProjectList currentUser={currentUser} />
          </div>
        </div>
        <UserRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
