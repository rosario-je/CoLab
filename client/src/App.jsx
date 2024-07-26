// App.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";

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
        <Route path="/" element={<Landing handleCoLabHome={handleCoLabHome}/>} />
        <Route path="/dashboard" element={<Dashboard handleCoLabHome={handleCoLabHome}/>} />
        <Route path="/project/:id" element={<ProjectPage handleCoLabHome={handleCoLabHome}/>} />
        <Route path="/project/create" element={<CreateProject  handleCoLabHome={handleCoLabHome} handleTechStacksModal={handleTechStacksModal} techModal={techModal}/>} />
      </Routes>
    </div>
  );
}


export default App;
