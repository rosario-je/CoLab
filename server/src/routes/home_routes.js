import express from 'express';
import { getAllProjects, getProjectsOwnedByMe, getProjectsIAmInById, getProjectsIdsIAmIn, getProjectById, projectFull, getAllProjectsById } from '../db/queries/project_queries.js';
import { getTechByName } from '../db/queries/tech_queries.js';
import { getAllJoinRequests } from '../db/queries/user_queries.js';
const router = express.Router();

// View all projects
// http://localhost:8080/api/dashboard/projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error in getting projects: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// View all projects you own and are a part of
// http://localhost:8080/api/dashboard/my_projects
router.get('/:id/my_projects', async (req, res) => {
  const { id: user_id } = req.session.user;
  try {
    const myOwnedProjects = await getProjectsOwnedByMe(user_id);
    const myJoinedProjectsIdArray = await getProjectsIdsIAmIn(user_id);
    const projectsIdArray = myJoinedProjectsIdArray.map(project => project.project_id);
    const myJoinedProjects = await getProjectsIAmInById(projectsIdArray);
    return res.status(200).json(myOwnedProjects.concat(myJoinedProjects));
  } catch (error) {
    console.error("Error in getting user projects: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// View all join requests for projects you own
// http://localhost:8080/api/dashboard/manage_requests
router.get('/manage_requests', async (req, res) => {
  const { id: user_id } = req.session.user;
  try {
    const joinRequests = await getAllJoinRequests(user_id);    
    // Create an array of promises to fetch project data and participant count
    const requestsWithProjects = await Promise.all(joinRequests.map(async (request) => {
      const project = await getProjectById(request.project_id);
      const participants = await projectFull(project.id);  
      return { ...request, project, participants: Number(participants.count) };
    }));
    // Filter the completed results based on your condition
    const filteredRequests = requestsWithProjects.filter(({ project, participants }) => {
      return project.max_participants > participants;
    });
       
    return res.status(200).json(filteredRequests);
  } catch (error) {
    console.error("Error in getting join requests: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// http://localhost:8080/api/dashboard/search
router.post('/search', async (req, res) => {
  const { tech_name } = req.body;
  try {
    // get array of project ids that have the tech
    const techResults = await getTechByName(tech_name);
    // get array of projects that have the tech
    const projectsIdArray = techResults.map(result => result.project_id);
    // get array of full project details that have the tech
    const projectPromises = projectsIdArray.map(project_id => getAllProjectsById(project_id));
    const searchResults = await Promise.all(projectPromises);
    return res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error in searching by tech: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;