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

  const [allSelectedTech, setAllSelectedTech] = useState(tech_names);

  useEffect(() => {
    console.log("Live array of selected technologies:", allSelectedTech);
  }, [allSelectedTech]);

  const frontendOptions = [
    "React",
    "Angular",
    "Vue.js",
    "Next.js",
    "jQuery",
    "HTML5",
    "CSS3",
    "SASS",
    "JavaScript",
    "TypeScript",
    "Bootstrap",
    "TailwindCSS",
  ];
  
  const backendOptions = [
    "Node.js",
    "Django",
    "Flask",
    "Ruby on Rails",
    "Express.js",
    "Laravel",
    "PHP",
    "Java",
    "Spring Boot",
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
    "Google Cloud",
  ];
  
  const testingOptions = ["Jest", "Mocha", "Jasmine", "Cypress", "Chai"];
  

  const handleSelect = (setSelectedFunc, selectedTech, tech) => {
    setSelectedFunc((prevSelected) =>
      prevSelected.includes(tech)
        ? prevSelected.filter((t) => t !== tech)
        : [...prevSelected, tech]
    );

    setAllSelectedTech((prevAllSelected) => {
      if (prevAllSelected.includes(tech)) {
        return prevAllSelected.filter((t) => t !== tech);
      } else {
        return [...prevAllSelected, tech];
      }
    });
  };

  const handleRemoveTech = (tech) => {
    setSelectedFrontend((prev) => prev.filter((t) => t !== tech));
    setSelectedBackend((prev) => prev.filter((t) => t !== tech));
    setSelectedDatabase((prev) => prev.filter((t) => t !== tech));
    setSelectedDevOps((prev) => prev.filter((t) => t !== tech));
    setSelectedTesting((prev) => prev.filter((t) => t !== tech));
  
    setAllSelectedTech((prevAllSelected) =>
      prevAllSelected.filter((t) => t !== tech)
    );
  
    // Update parent component CreateProjectField.jsx
    handleAddTech((prevAllSelected) => prevAllSelected.filter((t) => t !== tech));
  };
  

  const handleAddTechStack = () => {
    // Ensure unique technologies
    const uniqueTechs = [...new Set(allSelectedTech)];
    handleAddTech(uniqueTechs);
    setAllSelectedTech([]);
    handleTechStacksModal();
  };

  const isTechSelected = (tech) => allSelectedTech.includes(tech);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen"></div>
      <div className="relative bg-alt-grey text-text-color/80 rounded-lg p-8 shadow-lg w-auto h-auto overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-2xl hover:animate-spin hover:text-reject mt-3 mr-6"
          onClick={handleTechStacksModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl mb-4 font-bold">Add Languages</h1>

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
                  className={`relative text-base ${
                    isTechSelected(tech)
                      ? "bg-confirm hover:bg-reject text-white"
                      : "btn-ghost"
                  } btn`}
                  onClick={() => handleSelect(setSelected, selected, tech)}
                >
                  {tech}
                  {isTechSelected(tech) && (
                    <button
                      className="absolute top-0 right-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTech(tech);
                      }}
                    >
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
            className="btn bg-menu-colors text-text-color hover:bg-project-border/25 border-2 border-project-border/25 hover:border-project-border/35 text-base group"
          >
            <i className="fa-solid fa-code group-hover:text-confirm"></i>
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};
