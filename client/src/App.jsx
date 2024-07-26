// App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";
import { MyProjects } from "./pages/MyProjects";
import { MyProjectRequests } from "./pages/MyProjectRequests";
import { MyMessages } from "./pages/MyMessages"; 

function App() {
  const [techModal, setTechModal] = useState(false);

  const handleTechStacksModal = () => {
    setTechModal(!techModal);
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
        <Route path="/:id/myprojectrequests" element={<MyProjectRequests />} />
        <Route path="/:id/mymessages" element={<MyMessages />} />
      </Routes>
    </div>
  );
}

export default App;
