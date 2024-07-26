import React from "react";

export const ProjectRightMenu = () => {
  return (
    <div className="w-96 text-text-color self-start  bg-menu-colors h-full flex gap-x-5 p-5 justify-between">
      <div className="to-do-list bg-project-left-menu w-60 h-screen flex flex-col items-center rounded-xl p-4">
          <h1>To-Do List</h1>
      </div>
      <div className="to-do-list bg-project-left-menu w-22 h-screen flex flex-col items-center rounded-xl p-4 gap-y-7">
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
          <div  className="bg-white w-16 h-16 rounded-2xl"/>
      </div>
    </div>
  );
};
