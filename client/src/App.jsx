// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";
import ProtectedRoute from "./components/helper_component/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/project/:id"
          element={<ProtectedRoute element={<ProjectPage />} />}
        />
        <Route
          path="/project/create"
          element={<ProtectedRoute element={<CreateProject />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
