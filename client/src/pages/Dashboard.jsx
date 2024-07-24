import React from "react";
import { Navbar } from "../components/Navbar";
import { UserLeftMenu } from "../components/UserLeftMenu";
import { UserRightMenu } from "../components/UserRightMenu";

export const Dashboard = () => {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <UserLeftMenu />
        <div className="">

        </div>
        <UserRightMenu />
      </div>
    </div>
  );
};
