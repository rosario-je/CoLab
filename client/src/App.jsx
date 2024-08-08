import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
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
import { useSocketManager } from "./manage_sockets.js";

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const { listen, emit, isConnected } = useSocketManager();

  // const handleTechStacksModal = () => {
  //   setTechModal(!techModal);
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/project/:projectId"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/project/create"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/project/:projectId/edit"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/:userId/myprojects"}
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:userId/myprojects/requests"
          element={
            <ProtectedRoute>
              <MyProjectRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/notifications"
          element={
            <ProtectedRoute>
              <MyNotifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
