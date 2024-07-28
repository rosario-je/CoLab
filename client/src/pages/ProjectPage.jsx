// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { ProjectPageDetails } from "../components/GroupProjectPage/ProjectPageDetails";
import { ProjectRightMenu } from "../components/GroupProjectPage/ProjectRightMenu";

export const ProjectPage = ({currentUser, handleLogout}) => {
  const { isSignedIn } = useUser();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser}/>
        <div className="flex grow  justify-center overflow-y-auto mx-1">
          <ProjectPageDetails currentUser={currentUser}/>
        </div>
        <ProjectRightMenu currentUser={currentUser}/>
      </div>
    </div>
  );
};
