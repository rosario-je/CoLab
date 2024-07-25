// CreateProject.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CreateProjectNavbar } from "../components/CreateProjectNavbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectCreateField } from "../components/Projects/ProjectCreateField";
import { SearchBar } from "../components/SearchBar";

export const CreateProject = ({ handleCoLabHome}) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isSignedIn) {
      navigate("/project/create");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <CreateProjectNavbar handleCoLabHome={handleCoLabHome}/>
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full bg-black overflow-hidden">
          <div className="flex-grow flex justify-center overflow-y-auto px-40">
            <ProjectCreateField/>
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};