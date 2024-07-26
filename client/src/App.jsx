// App.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/project/create" element={<CreateProject />} />
      </Routes>
    </div>
  );
}


export default App;
