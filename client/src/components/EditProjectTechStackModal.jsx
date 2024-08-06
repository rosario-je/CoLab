import React, { useState } from "react";

export const EditProjectTechStackModal = ({
  handleTechStacksModal,
  handleAddTech,
  tech_requirements,
  setTechRequirements,
}) => {
  const [newTech, setNewTech] = useState("");

  const handleRemoveTech = (index) => {
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPP", index) 
    const updatedTechRequirements = tech_requirements.filter(
      (_, i) => i !== index
    );
    setTechRequirements(updatedTechRequirements);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen"></div>
      <div className="relative bg-alt-grey text-text-color/80 rounded-lg p-8 shadow-lg w-1/2 h-1/2">
        <button
          className="absolute top-4 right-4 text-2xl hover:animate-spin hover:text-reject mt-3 mr-6"
          onClick={handleTechStacksModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl mb-4 font-bold">Add Languages</h1>
        <div className="w-full flex justify-evenly items-center space-y-4">
          <input
            type="text"
            placeholder="Search Language"
            name="tech_names"
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
            <i className="fa-solid fa-code group-hover:text-confirm group-hover:drop-shadow-white-glow"></i>
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-10 gap-2">
          {tech_requirements.map((tech, index) => (
            <div
              key={index}
              className="bg-confirm text-white px-2 py-3 rounded-md text-base font-semibold cursor-pointer h-1/5 hover:bg-reject"
              onClick={() => handleRemoveTech(index)}
            >
              <span className="h-3 p-3 capitalize">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
