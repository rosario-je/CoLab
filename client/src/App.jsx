import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";
import { EditProject } from "./pages/EditProject";
import { MyProjects } from "./pages/MyProjects";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { MyProjectRequests } from "./pages/MyProjectRequests";
import { MyNotifications } from "./pages/MyNotifications";

axios.defaults.withCredentials = true;
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Project sections */}
        <Route path={"/:userId/myprojects"} element={<MyProjects />} />
        <Route path="/:userId/project/create" element={<CreateProject />} />
        <Route path="/:userId/project/:projectId" element={<ProjectPage />} />
        <Route
          path="/:userId/project/:projectId/edit"
          element={<EditProject />}
        />

        {/* notifications and requests */}
        <Route
          path="/:userId/myprojects/requests"
          element={<MyProjectRequests />}
        />
        <Route path="/:userId/notifications" element={<MyNotifications />} />
      </Routes>
    </div>
  );
}

export default App;
