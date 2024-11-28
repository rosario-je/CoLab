import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { AppContext } from "../context/AppContext";

//Components
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenuComponents/UserRightMenu";
import { Navbar } from "../components/Navbar";
import { NotificationsList } from "../components/Notifications/NotificationsList";

export const MyNotifications = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <UserLeftMenu />
        <div className="flex flex-col w-full h-full bg-project-background overflow-hidden pt-4">
          <div className="h-full mx-[300px]">
            <NotificationsList />
          </div>
        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
