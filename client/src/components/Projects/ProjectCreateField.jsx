//ProjectCreateField.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const ProjectCreateField = () => {
  return (
    <div className="flex flex-col justify-evenly gap-[30px] h-full w-full">
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Project Title</h3>
          <h5 className="">Choose a title for your new project</h5>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered bg-input-colors w-full max-w-xs"
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Project Description</h3>
          <h5 className="">Provide a description about the project</h5>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <textarea
            className="textarea textarea-bordered min-h-[100px] w-full max-w-xs bg-input-colors"
            placeholder="Decsription..."
          ><p className="self-end">200</p></textarea>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Tech Stack</h3>
          <h5 className="">Choose the tech stack this project will utilize</h5>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <button className="btn btn-ghost hover:bg-input-colors text-xl group mr-5">
            <i class="fa-solid fa-plus group-hover:animate-spin group-hover:text-white group-hover:drop-shadow-white-glow"></i>{" "}
            Add
          </button>
          <h2>(0)Selected</h2>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">User Capacity</h3>
          <h5 className="">
            Pick the maximum amount of users that can request to join this
            project
          </h5>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <select className="select select-bordered w-1/4 max-w-xs flex justify-center items-center bg-input-colors">
            <option disabled selected>
              Capacity
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white"></h3>
          <h5 className=""></h5>
        </div>
        <div className="w-1/2 flex justify-center items-center"></div>
      </div>
    </div>
  );
};
