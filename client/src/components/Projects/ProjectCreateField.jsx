import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CreateProjectTechStackModal } from "../CreateProjectTechStackModal";

export const ProjectCreateField = ({ handleTechStacksModal, techModal }) => {
  const [projectCreating, setProjectCreating] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    max_participants: 1,
    cover_photo_path: "",
    github_repo: "",
    figma_link: "",
    trello_link: "",
    tech_names: [],
    newPicture: "",
  });

  const maxChars = 300;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxChars) {
      setProjectData((prevData) => ({ ...prevData, description: value }));
    }
  };

  const handleAddTech = (techLanguage) => {
    if (techLanguage.trim() !== "") {
      setProjectData((prevData) => ({
        ...prevData,
        tech_names: [...prevData.tech_names, techLanguage],
      }));
    }
  };

  const isValidImageUrl = (url) => {
    return /\.(jpg|jpeg|png)$/i.test(url);
  };

  const handleAddCoverPhoto = () => {
    if (
      projectData.newPicture.trim() &&
      isValidImageUrl(projectData.newPicture)
    ) {
      setProjectData((prevData) => ({
        ...prevData,
        cover_photo_path: projectData.newPicture,
        newPicture: "",
      }));
    } else {
      alert("Please enter a valid image URL (e.g., .jpg, .png, .jpeg)");
    }
  };

  const handleRemoveCoverPhoto = () => {
    setProjectData((prevData) => ({ ...prevData, cover_photo_path: "" }));
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      setProjectCreating(true);
      const project = await axios.post("/api/projects/create", projectData);
      //console.log("Project created successfully:", project.data);
      const { projectData: { id: projectId, owner_id: ownerId } } = project.data;
      
      setTimeout(() => {
        setProjectCreating(false);
        navigate(`/${ownerId}/project/${projectId}`);
      }, 3000);
    } catch (error) {
      console.error("Error creating project:", error.response.data);
    }
  };

  return (
    <>
      {projectCreating && (
        <div className="project-loading-animation fixed z-20 h-screen w-screen bg-slate-800/80 backdrop-blur-md top-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-screen-md">
            <h2 className="text-center mb-4 font-bold text-4xl">
              Creating Project...
            </h2>
            <progress className="block mx-auto progress w-full"></progress>
          </div>
        </div>
      )}

      <section className="flex flex-col h-full w-full justify-around">
        {/* PROJECT TITLE */}
        <div className="project-title flex justify-between py-4 mt-5 mb-10">
          <div className="w-auto">
            <h3 className="text-white">Project Title</h3>
            <h6>Choose a title for your new project</h6>
          </div>
          <div className="w-auto">
            <input
              type="text"
              name="name"
              placeholder="Title"
              className="input input-bordered bg-input-colors w-96"
              value={projectData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {techModal && (
          <CreateProjectTechStackModal
            handleTechStacksModal={handleTechStacksModal}
            handleAddTech={handleAddTech}
            tech_names={projectData.tech_names}
            setTechRequirements={(tech_names) =>
              setProjectData((prevData) => ({ ...prevData, tech_names }))
            }
          />
        )}

        {/* PROJECT DESCRIPTION */}
        <div className="project-description flex items-start w-full mb-10 justify-between py-4">
          <div className="w-auto">
            <h3 className="text-white">Project Description</h3>
            <h6>Provide a description about the project</h6>
          </div>
          <div className="flex flex-col">
            <textarea
              className="textarea textarea-bordered min-h-[150px] min-w-[50px] bg-input-colors resize-none mb-5 self-center w-96"
              placeholder="Description..."
              value={projectData.description}
              onChange={handleDescriptionChange}
              name="description"
            ></textarea>
            <h6 className="text-input-value">
              {maxChars - projectData.description.length}
            </h6>
          </div>
        </div>

        {/* USER CAPACITY */}
        <div className="user-capacity-container flex justify-between py-4 mb-10">
          <div className="w-auto">
            <h3 className="text-white">User Capacity</h3>
            <h6>
              Pick the maximum amount of users that can request to join this
              project
            </h6>
          </div>
          <div className="user-capacity w-1/3 flex flex-col justify-center items-end">
            <select
              className="select select-bordered w-1/2 bg-input-colors"
              name="max_participants"
              value={projectData.max_participants}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Capacity
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="tech-stack flex justify-between py-4 mb-10">
          <div className="w-auto">
            <h3 className="text-white">Tech Stack</h3>
            <h6>Choose the tech stack this project will utilize</h6>
          </div>
          <div className="tech-stack-select w-auto gap-y-3">
            <button
              className="btn btn-ghost hover:bg-input-colors text-lg group mr-5 mb-5"
              onClick={handleTechStacksModal}
            >
              <i className="fa-solid fa-plus group-hover:animate-spin group-hover:text-white group-hover:drop-shadow-white-glow"></i>
              Add
            </button>
            <h2>({projectData.tech_names.length}) Selected</h2>
          </div>
        </div>

        {/* COVER PHOTO */}
        <div className="images-input flex justify-between items-center w-full mb-10 py-4">
          <div className="choose-file w-auto self-start">
            <h3 className="text-white">Cover Photo</h3>
            <h6>
              Choose images to showcase the design or what might represent the
              design of the project
            </h6>
            {projectData.cover_photo_path && (
              <button
                className="text-white mt-5 btn hover:bg-red text-lg group mr-5"
                onClick={handleRemoveCoverPhoto}
              >
                <i className="fa-solid fa-image group-hover:text-white group-hover:drop-shadow-white-glow"></i>
                {projectData.cover_photo_path}
              </button>
            )}
          </div>
          <div className="file-input-container w-1/3 flex flex-col justify-center items-end gap-5">
            {projectData.cover_photo_path.length > 0 ? (
              <>
                <input
                  type="url"
                  placeholder="Delete picture file to add new one"
                  className="input input-bordered bg-input-colors w-full max-w-lg"
                  disabled
                />
                <button
                  type="button"
                  onClick={handleAddCoverPhoto}
                  className="btn btn-ghost hover:bg-input-colors text-lg group mr-5"
                  disabled
                >
                  <i className="fa-solid fa-image group-hover:text-white group-hover:drop-shadow-white-glow"></i>
                  Add
                </button>
              </>
            ) : (
              <>
                <input
                  type="url"
                  placeholder="Image URL"
                  name="newPicture"
                  value={projectData.newPicture}
                  onChange={handleInputChange}
                  className="input input-bordered bg-input-colors w-full max-w-lg"
                />
                <button
                  type="button"
                  onClick={handleAddCoverPhoto}
                  className="btn btn-ghost hover:bg-input-colors text-lg group mr-5"
                >
                  <i className="fa-solid fa-image group-hover:text-white group-hover:drop-shadow-white-glow"></i>
                  Add
                </button>
              </>
            )}
          </div>
        </div>

        {/* PROJECT LINKS */}
        <div className="project-link-inputs flex justify-between items-center w-full mb-10 py-4">
          <div className="w-1/2 self-start">
            <h3 className="text-white">Project Links</h3>
            <h6>
              Choose images to showcase the design or what might represent the
              design of the project
            </h6>
          </div>

          <div className="w-1/2 flex flex-col items-end">
            <label className="input input-bordered w-4/5 flex justify-between items-center gap-2 p-0 mb-2">
              <div className="flex justify-center items-center border-solid border-white border-2 rounded-lg w-2/5 h-10 bg-white">
                <i className="fa-brands fa-github text-black"></i>
              </div>
              <input
                className="input w-full h-10 bg-input-colors p-3"
                name="githubRepo"
                value={projectData.githubRepo}
                onChange={handleInputChange}
                placeholder="Github Repo URL"
                type="url"
              />
            </label>

            <label className="input input-bordered w-4/5 flex justify-between items-center gap-2 p-0 mb-2">
              <div className="flex justify-center items-center border-solid border-white border-2 rounded-lg w-2/5 h-10 bg-white">
                <i className="fa-brands fa-figma text-black"></i>
              </div>
              <input
                className="input w-full h-10 bg-input-colors p-3"
                name="figmaLink"
                value={projectData.figmaLink}
                onChange={handleInputChange}
                placeholder="Figma URL"
                type="url"
              />
            </label>

            <label className="input input-bordered w-4/5 flex justify-between items-center gap-2 p-0 mb-2">
              <div className="flex justify-center items-center border-solid border-white border-2 rounded-lg w-2/5 h-10 bg-white">
                <i className="fa-brands fa-trello text-black"></i>
              </div>
              <input
                className="input w-full h-10 bg-input-colors p-3"
                name="trelloLink"
                value={projectData.trelloLink}
                onChange={handleInputChange}
                placeholder="Trello URL"
                type="url"
              />
            </label>
          </div>
        </div>

        {/* CREATE PROJECT BUTTON */}

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
    </>
  );
};
