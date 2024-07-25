// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";
import { ProjectList } from "../components/Projects/ProjectList";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = ({ handleCoLabHome}) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar handleCoLabHome={handleCoLabHome}/>
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full bg-black overflow-hidden">
          <div className="z-10 bg-black">
            <SearchBar />
          </div>
          <div className="flex-grow flex justify-center overflow-y-auto px-40">
            <ProjectList />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
