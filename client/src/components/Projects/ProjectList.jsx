import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProjectCard } from "./ProjectCard";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await axios.get("/api/dashboard/projects");
        setProjects(projectData.data);
        console.log("Projects: ", projectData.data);
      } catch (error) {
        console.error("Error in getting projects: ", error.message);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-11/12">
      {projects.map((project) => (
        <ProjectCard
          key={project.project_id}
          name={project.name}
          description={project.description}
          participants={project.participants}
          techStack={project.tech_requirements}
          acceptingUsers={project.is_accepting_users}
        />
      ))}
    </div>
  );
};
