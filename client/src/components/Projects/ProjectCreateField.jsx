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
    <section className="flex flex-col h-full w-full justify-around">
      <div className="project-title flex justify-between py-4">
        <div className="w-auto ">
          <h3 className="text-white">Project Title</h3>
          <h6>Choose a title for your new project</h6>
        </div>
        <div className="w-auto">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered bg-input-colors w-96"
          />
        </div>
      </div>

      <div className="project-description flex items-start w-full mb-10 justify-between py-4">
        <div className="w-auto">
          <h3 className="text-white">Project Description</h3>
          <h6>Provide a description about the project</h6>
        </div>
        <div className="flex flex-col">
          <textarea
            className="textarea textarea-bordered min-h-[150px] min-w-[50px] bg-input-colors resize-none mb-5 self-center w-96"
            placeholder="Description..."
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <h6 className="text-input-value">{maxChars - description.length}</h6>
        </div>
      </div>

      <div className="tech-stack flex justify-between py-4">
        <div className="w-auto ">
          <h3 className="text-white">Tech Stack</h3>
          <h6>Choose the tech stack this project will utilize</h6>
        </div>
        <div className="tech-stack-select w-auto gap-y-3">
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

      <div className="user-capacity-container flex justify-between py-4">
        <div className="w-auto">
          <h3 className="text-white">User Capacity</h3>
          <h6>
            Pick the maximum amount of users that can request to join this
            project
          </h6>
        </div>
        <div className="user-capacity w-auto ">
          <select
            className="select select-bordered w-96 bg-input-colors"
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

      <div className="images-input flex justify-between items-center w-full mb-10 py-4">
        <div className="choose-file w-auto">
          <h3 className="text-white">Images</h3>
          <h6>
            Choose images to showcase the design or what might represent the
            design of the project
          </h6>
        </div>
        <div className="file-input-container w-auto">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-lg bg-input-colors"
          />
        </div>
      </div>

      <div className="create-project-btn-container flex flex-row justify-center border-t-2 border-slate-700 pt-11">
        <button
          onClick={createProject}
          className="create-project btn bg-website-purple hover:bg-create hover:text-white w-5/12"
        >
          <i className="fa-solid fa-wand-magic-sparkles group-hover:text-wand group-hover:animate-bounceFast group-hover:drop-shadow-white-glow"></i>
          Create project
        </button>
      </div>

    </section>
  );
};
