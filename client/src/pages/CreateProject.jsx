// CreateProject.jsx
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CreateProjectNavbar } from "../components/CreateProjectNavbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectCreateField } from "../components/Projects/ProjectCreateField";
import { CreateProjectTechStackModal } from "../components/CreateProjectTechStackModal";

export const CreateProject = ({
  handleCoLabHome,
  handleTechStacksModal,
  techModal,
}) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/project/create");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <CreateProjectNavbar handleCoLabHome={handleCoLabHome} />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-black overflow-hidden">
          <div className="flex-grow flex justify-center h-full">
            {techModal === true && (
              <CreateProjectTechStackModal
                handleTechStacksModal={handleTechStacksModal}
              />
            )}
            <ProjectCreateField handleTechStacksModal={handleTechStacksModal} />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
