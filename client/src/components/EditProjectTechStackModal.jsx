import React, { useState } from "react";

export const EditProjectTechStackModal = ({
  handleTechStacksModal,
  handleAddTech,
  tech_names,
  setTechRequirements,
}) => {
  const [newTech, setNewTech] = useState("");

  const handleRemoveTech = (index) => {
    const updatedTechRequirements = techRequirements.filter(
      (_, i) => i !== index
    );
    setTechRequirements(updatedTechRequirements);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen"></div>
      <div className="relative bg-input-colors text-white rounded-lg p-8 shadow-lg w-1/2 h-1/2">
        <button
          className="absolute top-4 right-4 text-2xl hover:animate-spin hover:text-red mt-3 mr-6"
          onClick={handleTechStacksModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl mb-4">Add Languages</h1>
        <div className="w-full flex justify-evenly items-center space-y-4">
          <input
            type="text"
            placeholder="Search Language"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="input input-bordered w-full max-w-xs ml-10 mt-4"
          />
          <button
            type="button"
            onClick={() => {
              if (newTech.trim() !== "") {
                handleAddTech(newTech);
                setNewTech("");
              }
            }}
            className="btn btn-ghost hover:bg-menu-colors text-lg group mt-0 mr-5"
          >
            <i className="fa-solid fa-code group-hover:text-green group-hover:drop-shadow-white-glow"></i>
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-10 gap-5">
          {tech_names.map((tech, index) => (
            <div
              key={index}
              className="bg-website-purple text-white px-2 py-1 rounded-md cursor-pointer h-1/5 hover:bg-red"
              onClick={() => handleRemoveTech(index)}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
