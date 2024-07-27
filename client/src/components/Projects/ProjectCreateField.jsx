import React, { useState } from "react";

export const ProjectCreateField = ({ handleTechStacksModal }) => {
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(""); // Manage selected value for the <select> element

  const maxChars = 200;

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= maxChars) {
      setDescription(e.target.value);
    }
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const createProject = (event) => {
    event.preventDefault();
    console.log("Project created");
  };

  return (
    <div className="flex flex-col justify-evenly gap-[30px] h-full w-full my-5">
      <div className="flex justify-between items-center w-full mb-10">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Project Title</h3>
          <h6>Choose a title for your new project</h6>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered bg-input-colors w-full max-w-xs"
          />
        </div>
      </div>
      <div className="flex items-start w-full mb-10">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Project Description</h3>
          <h6>Provide a description about the project</h6>
        </div>
        <div className="w-1/2 flex flex-col items-start">
          <textarea
            className="textarea textarea-bordered min-h-[150px] w-full max-w-xs bg-input-colors resize-none mb-5 self-center"
            placeholder="Description..."
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <h6 className="self-start ml-[18%]">
            {maxChars - description.length}
          </h6>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mb-10">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Tech Stack</h3>
          <h6>Choose the tech stack this project will utilize</h6>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <button
            className="btn btn-ghost hover:bg-input-colors text-lg group mr-5"
            onClick={handleTechStacksModal}
          >
            <i className="fa-solid fa-plus group-hover:animate-spin group-hover:text-white group-hover:drop-shadow-white-glow"></i>{" "}
            Add
          </button>
          <h2>(0) Selected</h2>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mb-10">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">User Capacity</h3>
          <h6>
            Pick the maximum amount of users that can request to join this
            project
          </h6>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <select
            className="select select-bordered w-1/4 max-w-xs flex justify-center items-center bg-input-colors"
            value={capacity}
            onChange={handleCapacityChange}
          >
            <option value="" disabled>
              Capacity
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mb-10">
        <div className="w-1/2 flex flex-col justify-start items-start pl-10">
          <h3 className="text-white">Images</h3>
          <h6>
            Choose images to showcase the design or what might represent the
            design of the project
          </h6>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <button
        onClick={createProject}
        className="btn bg-website-purple hover:bg-create hover:text-white group w-1/5 self-end my-[7%] mr-[8%]"
      >
        <i className="fa-solid fa-wand-magic-sparkles group-hover:text-wand group-hover:animate-bounceFast group-hover:drop-shadow-white-glow"></i>
        Create project
      </button>
    </div>
  );
};
