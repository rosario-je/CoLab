import express from 'express';
import { getAllProjects, getProjectsOwnedByMe, getProjectsIAmInById, getProjectsIdsIAmIn } from '../db/queries/project_queries.js';
const router = express.Router();

// http://localhost:5000/dashboard/
router.get('/', async (req, res) => {
  try {
    const projects = await getAllProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error in getting projects: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// http://localhost:5000/dashboard/my_projects/:id
router.get('/my_projects/:id', async (req, res) => {
  try {
    const user_id = req.params.id;
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

export default router;