// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { ProjectPageDetails } from "../components/GroupProjectPage/ProjectPageDetails";
import { ProjectRightMenu } from "../components/GroupProjectPage/ProjectRightMenu";

export const ProjectPage = ({ currentUser, handleLogout, handleCoLabHome }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser} />
        <div className="flex grow  justify-center overflow-y-auto mx-72 w-screen">
          <ProjectPageDetails currentUser={currentUser} />
        </div>
        <ProjectRightMenu currentUser={currentUser} />
      </div>
    </div>
  );
};
