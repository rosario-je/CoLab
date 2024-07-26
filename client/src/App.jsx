// App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";
import { MyProjects } from "./pages/MyProjects";

function App() {
  const [techModal, setTechModal] = useState(false);

  const handleTechStacksModal = () => {
    setTechModal(!techModal);
  };

  const navigate = useNavigate();
  const handleCoLabHome = () => {
    navigate("/");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route
          path="/project/create"
          element={
            <CreateProject
              handleTechStacksModal={handleTechStacksModal}
              techModal={techModal}
            />
          }
        />
        <Route path="/:id/myprojects" element={<MyProjects />} />
      </Routes>
    </div>
  );
}

export default App;
