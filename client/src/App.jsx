// App.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/project/create" element={<CreateProject />} />
      </Routes>
    </div>
  );
}

export default App;
