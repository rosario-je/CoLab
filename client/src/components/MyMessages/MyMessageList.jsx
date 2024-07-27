import React from "react";
import { MyMessageListItems } from "./MyMessageListItems";

export const MyMessageList = () => {
  return (
    <div className="my-messages-list h-full w-full">
      <div className="bg-menu-colors p-5 fixed w-full z-10 ">
        <h1 className="text-white text-2xl">My Messages</h1>
      </div>
      <div className="messages pt-10">
        {/* map through the component when database is populated */}
        <MyMessageListItems />
        <MyMessageListItems />
        <MyMessageListItems />
        <MyMessageListItems />
        <MyMessageListItems />
        <MyMessageListItems />
      </div>
    </div>
  );
};
