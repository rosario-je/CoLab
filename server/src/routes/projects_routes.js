import express from 'express';
import { createNewProject, getProjectPage, getProjectById, getPendingJoinRequests } from '../db/queries/project_queries.js';
import { getUserById, askToJoinProject } from '../db/queries/user_queries.js';
import { addTechToProject } from '../db/queries/tech_queries.js';
import { createGroupChat } from '../db/queries/group_chat_queries.js';
const router = express.Router();

// http://localhost:5000/api/projects/create
router.post('/create', async (req, res) => {
  const { id: user_id } = req.session.user;
  const { name, description, max_participants, cover_photo_path, github_repo, figma_link, trello_link, tech_names } = req.body;

  // Mandatory fields: name, description, user_id, max_participants, tech_names
  // Optional fields: github_repo, figma_link, trello_link, cover_photo_path
  // Owner should be able to add github_repo, figma_link, trello_link, cover_photo_path later

  if (!name || !description || !user_id || !max_participants || tech_names.length === 0) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const newProject = await createNewProject(name, description, user_id, max_participants, cover_photo_path, github_repo, figma_link, trello_link);
    if (!newProject) {
      return res.status(500).send('Error creating project');
    }
    const techPromises = tech_names.map(tech_name => addTechToProject(newProject.id, tech_name));
    await Promise.all(techPromises); // Loop through array of tech requirements and add them to the project
    await createGroupChat(newProject.id); // Create a group chat for the project
    res.redirect(`/api/projects/${newProject.id}`); // Redirect to the project page
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).send('Error creating project');
  }
});

// http://localhost:5000/api/projects/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await getProjectPage(id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project details:', error.message);
    res.status(500).send('Error fetching project details');
  }
});

// http://localhost:5000/api/projects/:id/join
router.post('/:id/join', async (req, res) => {
  const { id: project_id } = req.params;
  const project = await getProjectById(project_id);
  const { user_id } = req.body;
  try {
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!project_id) {
      return res.status(400).send('Project not found');
    }
    if (user_id === project.owner_id) {
      return res.status(400).send('Owner cannot join own project');
    }
    const existingRequest = await getPendingJoinRequests(project_id, user_id);
    if (existingRequest) {
      return res.status(400).send('Join request already exists');
    }
    const joinRequest = await askToJoinProject(project_id, user_id);
    if (!joinRequest) {
      return res.status(500).send('Error joining project');
    }
    res.status(200).json(joinRequest);
  } catch (error) {
    console.error('Error joining project:', error.message);
    res.status(500).send('Error joining project');
  }
});

export default router;