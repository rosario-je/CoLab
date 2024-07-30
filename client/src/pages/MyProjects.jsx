import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";

export const MyProjects = ({ handleCoLabHome, currentUser, handleLogout }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const userId = currentUser.id;

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const userProjectData = await axios.get("/api/dashboard/projects");
      } catch (error) {
        console.error("Error in getting user projects: ", error.message);
      }
    }
    fetchUserProjects();
  }, [])

  return (
    <div className="flex flex-col h-screen">

      <Navbar handleCoLabHome={handleCoLabHome} currentUser={currentUser}/>
      
      <div className="flex flex-1 mt-16">
        <UserLeftMenu currentUser={currentUser}/>
      
        <div className="flex flex-col w-full bg-grey overflow-hidden mx-72">

        </div>
        <UserRightMenu currentUser={currentUser}/>
      </div>
    </div>
  );
};
