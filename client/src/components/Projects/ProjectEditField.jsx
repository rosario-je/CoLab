import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditProjectTechStackModal } from "../EditProjectTechStackModal";
import { AppContext } from "../../context/AppContext";

export const ProjectEditField = ({ project }) => {
  const { handleTechStacksModal, techModal } = useContext(AppContext);
  const [projectEditing, setProjectEditing] = useState(false);
  const [projectData, setProjectData] = useState(project);

  const {
    project_id,
    name,
    description,
    max_participants,
    cover_photo_path,
    github_repo,
    figma_link,
    trello_link,
    newPicture,
    tech_requirements: tech_names,
  } = project;

  useEffect(() => {
    setProjectData(project);
  }, [project]);

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
        tech_requirements: [...prevData.tech_requirements, techLanguage],
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

  const validateLink = (link, baseUrl) => {
    if (link.startsWith(baseUrl)) {
      return link;
    }
  };

  const editProject = async (e) => {
    e.preventDefault();
    const {
      name,
      description,
      max_participants,
      cover_photo_path,
      github_repo,
      figma_link,
      trello_link,
    } = e.target.elements;

    const bodyPayload = {
      name: name.value,
      description: description.value,
      max_participants: max_participants.value,
      cover_photo_path: cover_photo_path.value,
      github_repo: github_repo.value,
      figma_link: figma_link.value,
      trello_link: trello_link.value,
      tech_requirements: projectData.tech_requirements,
    };

    try {
      setProjectEditing(true);

      // Validate and prepend base URLs
      const validatedGithub_repo = validateLink(
        github_repo.value,
        "https://github.com"
      );
      const validatedFigma_link = validateLink(
        figma_link.value,
        "https://figma.com"
      );
      const validatedTrello_link = validateLink(
        trello_link.value,
        "https://trello.com"
      );

      if (
        !validatedGithub_repo ||
        !validatedFigma_link ||
        !validatedTrello_link
      ) {
        alert(
          "Please enter valid links starting with 'https' and ensure they do not contain the base URL."
        );
        setProjectEditing(false);
        return;
      }

      const updateResponse = await axios.put(
        `/api/projects/${project_id}/edit`,
        bodyPayload
      );

      const { id, owner_id } = updateResponse.data.project;

      setTimeout(() => {
        setProjectEditing(false);
        navigate(`/${owner_id}/project/${id}`);
      }, 3000);
    } catch (error) {
      console.error("Error editing project:", error.message, error.stack);
    }
  };

  return (
    <>
      {projectEditing && (
        <div className="project-loading-animation fixed z-20 h-screen w-screen bg-alt-grey/60 backdrop-blur-md top-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-screen-md">
            <h2 className="text-center mb-4 font-bold text-4xl text-text-color">
              Saving changes...
            </h2>
            <progress className="block mx-auto progress w-full"></progress>
          </div>
        </div>
      )}

      <form
        className="flex flex-col h-full w-full justify-around"
        onSubmit={editProject}
      >
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
              className="input input-bordered bg-navbar-color w-96"
              value={projectData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {techModal && (
          <EditProjectTechStackModal
            handleTechStacksModal={handleTechStacksModal}
            handleAddTech={handleAddTech}
            tech_requirements={projectData.tech_requirements}
            setTechRequirements={(tech_requirements) =>
              setProjectData((prevData) => ({ ...prevData, tech_requirements }))
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
              className="textarea textarea-bordered min-h-[150px] min-w-[50px] bg-navbar-color resize-none mb-5 self-center w-96"
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
              className="select select-bordered w-1/2 bg-navbar-color"
              name="max_participants"
              value={max_participants}
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
              className="btn btn-ghost hover:bg-navbar-color text-lg group mr-5 mb-5"
              type="button"
              onClick={handleTechStacksModal}
            >
              <i className="fa-solid fa-plus group-hover:animate-spin group-hover:text-white group-hover:drop-shadow-white-glow"></i>
              Add
            </button>
            <h2>
              (
              {projectData.tech_requirements &&
                projectData.tech_requirements.length}
              ) Selected
            </h2>
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
            {cover_photo_path && (
              <button
                type="button"
                className="text-text-color/90 mt-5 btn hover:bg-reject hover:border-reject text-lg group mr-5"
                onClick={handleRemoveCoverPhoto}
              >
                <i className="fa-solid fa-image group-hover:text-white group-hover:drop-shadow-white-glow"></i>
                {cover_photo_path}
              </button>
            )}
          </div>
          <div className="file-input-container w-1/3 flex flex-col justify-center items-end gap-5">
            {cover_photo_path.length > 0 ? (
              <>
                <input
                  type="url"
                  name="cover_photo_path"
                  value={cover_photo_path}
                  placeholder="Delete picture file first"
                  className="input input-bordered bg-disabled-input w-full"
                  disabled
                />
                <button
                  type="button"
                  className="btn bg-disabled-input text-white w-1/2"
                  disabled
                >
                  Add Picture
                </button>
              </>
            ) : (
              <>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  name="cover_photo_path"
                  value={newPicture}
                  onChange={handleInputChange}
                  className="input input-bordered bg-navbar-color w-full"
                />
                <button
                  type="button"
                  className="btn bg-alt-grey hover:bg-alt-grey-hover text-text-color/80 text-base w-1/2 border-2 border-project-border/35 hover:border-project-border/35"
                  onClick={handleAddCoverPhoto}
                >
                  Add Picture
                </button>
              </>
            )}
          </div>
        </div>

        {/* Project links */}
        <div className="project-links-container flex flex-col justify-around">
          <div className="project-links-container__header">
            <h3 className="text-white">Project Links</h3>
            <h6>
              Add any external links to your project, such as the Github
              repository, Figma file, and Trello board.
            </h6>
          </div>

          <div className="project-links-container__links grid grid-cols-1 gap-5 w-full my-5 py-4">
            <div className="project-links-container__github flex justify-between">
              <h3>Github Repository</h3>
              <input
                type="text"
                placeholder="/<username>/<repo>"
                name="github_repo"
                value={github_repo}
                onChange={handleInputChange}
                className="input input-bordered bg-navbar-color w-2/6"
              />
            </div>
            <div className="project-links-container__figma flex justify-between">
              <h3>Figma Link</h3>
              <input
                type="text"
                placeholder="/Figma Link"
                name="figma_link"
                value={figma_link}
                onChange={handleInputChange}
                className="input input-bordered bg-navbar-color w-2/6"
              />
            </div>
            <div className="project-links-container__trello flex justify-between">
              <h3>Trello Board</h3>
              <input
                type="text"
                placeholder="/Trello link"
                name="trello_link"
                value={trello_link}
                onChange={handleInputChange}
                className="input input-bordered bg-navbar-color w-2/6"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            className="btn bg-website-purple hover:bg-website-purple-hover text-white text-base rounded-full w-auto h-14 self-end border-none"
            disabled={projectEditing}
          >
            {projectEditing ? "Saving changes..." : "Apply Changes"}
          </button>
        </div>
      </form>
    </>
  );
};
