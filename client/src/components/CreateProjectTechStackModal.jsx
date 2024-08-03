import React, { useState, useEffect } from "react";

export const CreateProjectTechStackModal = ({
  handleTechStacksModal,
  handleAddTech,
  tech_names = [],
}) => {
  const [selectedFrontend, setSelectedFrontend] = useState([]);
  const [selectedBackend, setSelectedBackend] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState([]);
  const [selectedDevOps, setSelectedDevOps] = useState([]);
  const [selectedTesting, setSelectedTesting] = useState([]);

  // Combine all selected tech into a single state for easier management
  const [allSelectedTech, setAllSelectedTech] = useState(tech_names);

  const frontendOptions = [
    "React",
    "Angular",
    "Vue.js",
    "Next.js",
    "jQuery",
    "Bootstrap",
    "TailwindCSS",
  ];
  const backendOptions = [
    "Node.js",
    "Django",
    "Flask",
    "Ruby on Rails",
    "Express.js",
  ];
  const databaseOptions = [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "SQLite",
    "Microsoft SQL Server",
    "Firebase",
  ];
  const devOpsOptions = [
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud"
  ];
  const testingOptions = ["Jest", "Mocha", "Jasmine", "Cypress", "Chai"];

  const handleSelect = (setSelectedFunc, selectedTech, tech) => {
    setSelectedFunc((prevSelected) =>
      prevSelected.includes(tech)
        ? prevSelected.filter((t) => t !== tech)
        : [...prevSelected, tech]
    );

    // Update allSelectedTech state based on individual selections
    setAllSelectedTech((prevAllSelected) => {
      if (prevAllSelected.includes(tech)) {
        return prevAllSelected.filter((t) => t !== tech);
      } else {
        return [...prevAllSelected, tech];
      }
    });
  };

  const handleRemoveTech = (tech) => {
    // Update individual state slices and allSelectedTech
    setSelectedFrontend((prev) => prev.filter((t) => t !== tech));
    setSelectedBackend((prev) => prev.filter((t) => t !== tech));
    setSelectedDatabase((prev) => prev.filter((t) => t !== tech));
    setSelectedDevOps((prev) => prev.filter((t) => t !== tech));
    setSelectedTesting((prev) => prev.filter((t) => t !== tech));

    setAllSelectedTech((prevAllSelected) =>
      prevAllSelected.filter((t) => t !== tech)
    );
  };

  const handleAddTechStack = () => {
    // Remove duplicates from allSelectedTech
    const uniqueTechs = [...new Set(allSelectedTech)];

    // Add unique tech names to the project
    handleAddTech(uniqueTechs);

    // Reset allSelectedTech to an empty array
    setAllSelectedTech([]);

    handleTechStacksModal();
  };

  const isTechSelected = (tech) => allSelectedTech.includes(tech);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen"></div>
      <div className="relative bg-input-colors text-white rounded-lg p-8 shadow-lg w-1/2 h-3/4 overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-2xl hover:animate-spin hover:text-red mt-3 mr-6"
          onClick={handleTechStacksModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl mb-4">Add Tech Stack</h1>

        {[
          {
            title: "Frontend",
            options: frontendOptions,
            selected: selectedFrontend,
            setSelected: setSelectedFrontend,
          },
          {
            title: "Backend",
            options: backendOptions,
            selected: selectedBackend,
            setSelected: setSelectedBackend,
          },
          {
            title: "Database",
            options: databaseOptions,
            selected: selectedDatabase,
            setSelected: setSelectedDatabase,
          },
          {
            title: "DevOps",
            options: devOpsOptions,
            selected: selectedDevOps,
            setSelected: setSelectedDevOps,
          },
          {
            title: "Testing/Quality Assurance",
            options: testingOptions,
            selected: selectedTesting,
            setSelected: setSelectedTesting,
          },
        ].map(({ title, options, selected, setSelected }, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2">
              {options.map((tech) => (
                <div
                  key={tech}
                  className={`relative ${
                    isTechSelected(tech)
                      ? "bg-menu-colors text-white"
                      : "btn-ghost"
                  } btn`}
                  onClick={() => handleSelect(setSelected, selected, tech)}
                >
                  {tech}
                  {isTechSelected(tech) && (
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTech(tech);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="add-selected-btn flex justify-end mt-6">
          <button
            onClick={handleAddTechStack}
            className="btn bg-menu-colors text-white"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};
