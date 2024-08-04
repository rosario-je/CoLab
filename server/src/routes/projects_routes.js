import express from 'express';
import { createNewProject, getProjectPage, getProjectById, getPendingJoinRequests, updateCoverPhoto, updateFigmaLink, updateGithubRepo, updateTrelloLink } from '../db/queries/project_queries.js';
import { getUserById, askToJoinProject, limitAccess } from '../db/queries/user_queries.js';
import { addTechToProject } from '../db/queries/tech_queries.js';
import { createGroupChat, getChatHistory, newChatMessage, getProjectChatId, sendJoinNotification } from '../db/queries/chat_queries.js';
const router = express.Router();

// Creates a new project
// http://localhost:8080/api/projects/create
router.post('/create', async (req, res) => {
  const { id: user_id } = req.session.user;
  console.log(req.session.user);
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
    res.status(201).json({
      message: 'Project successfully created',
      projectData: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).send('Error creating project');
  }
});

// Fetches a project by its ID
// http://localhost:8080/api/projects/:projectId
router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { id: user_id } = req.session.user;
  // console.log("This is the userId:", user_id);
  // console.log("This is the projectId:", projectId);
  // const checkUserAccess = await limitAccess(projectId, user_id);
  // if (!checkUserAccess) {
  //   return res.status(403).json({ error: "Unauthorized to view this project" });
  // };
  try {
    const project = await getProjectPage(projectId);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    const projectChat = await getChatHistory(project.chat_id);
    const projectWithChat = { ...project, chat: projectChat };
    res.status(200).json(projectWithChat);
  } catch (error) {
    console.error('Error fetching project details:', error.message);
    res.status(500).send('Error fetching project details');
  }
});

// Approved user can send a message to a chat
// http://localhost:8080/api/projects/:id/chat
router.post('/:projectId/chat', async (req, res) => {
  const { projectId } = req.params;
  const { id: sender_id } = req.session.user;
  const { message } = req.body;
  const chat_room_id = await getProjectChatId(projectId);
  // const checkUserAccess = await limitAccess(projectId, sender_id);

  if (!projectId) {
    return res.status(404).send('Project not found');
  }
  // if (!checkUserAccess) {
  //   return res.status(403).json({ error: "Unauthorized to access this project and send messages" });
  // };
  try {
    const newMessage = await newChatMessage(sender_id, chat_room_id, message);
    res.status(201).json({
      message: "Message sent successfully",
      data: {
        chat_room_id: chat_room_id,
        newMessage: newMessage
      }
    });
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).send('Error sending message');
  }
});

// Creates a new join request for a project
// http://localhost:8080/api/projects/:projectId/join
router.post('/:projectId/join', async (req, res) => {
  const { projectId } = req.params;
  const { id: user_id } = req.session.user;
  const project = await getProjectById(projectId);
  try {
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!projectId) {
      return res.status(404).send('Project not found');
    }
    if (user_id === project.owner_id) {
      return res.status(400).send('Owner cannot join own project');
    }
    const existingRequest = await getPendingJoinRequests(projectId, user_id);
    if (existingRequest) {
      return res.status(400).send('Join request already exists');
    }
    const joinRequest = await askToJoinProject(projectId, user_id);
    if (!joinRequest) {
      return res.status(500).send('Error joining project');
    }
    const message = `You have requested to join the project: ${project.name}`;
    const sendmsg = await sendJoinNotification(user_id, message);
    res.status(200).json({
      message: "Message sent successfully",
      data: {
        message: sendmsg,
        joinRequest: joinRequest
      }
    });
  } catch (error) {
    console.error('Error joining project:', error.message);
    res.status(500).send('Error joining project');
  }
});

// http://localhost:8080/api/projects/:projectId/github_repo
// Edit a project github_repo
router.patch('/:projectId/github_repo', async (req, res) => {
  const { projectId } = req.params;
  const { id: user_id } = req.session.user;
  const { github_repo } = req.body;
  const project = await getProjectById(projectId);
  if (!project) {
    return res.status(404).send('Project not found');
  }
  if (user_id !== project.owner_id) {
    return res.status(403).send('Unauthorized to edit project');
  }
  try {
    const updatedProject = await updateGithubRepo(projectId, github_repo);
    res.status(200).json({
      message: 'Project github_repo updated successfully',
      projectData: updatedProject
    });
  } catch (error) {
    console.error('Error updating project github_repo:', error.message);
    res.status(500).send('Error updating project github_repo');
  }
});
// http://localhost:8080/api/projects/:projectId/figma_link
// Edit a figma_link
router.patch('/:projectId/figma_link', async (req, res) => {
  const { projectId } = req.params;
  const { id: user_id } = req.session.user;
  const { figma_link } = req.body;
  const project = await getProjectById(projectId);
  if (!project) {
    return res.status(404).send('Project not found');
  }
  if (user_id !== project.owner_id) {
    return res.status(403).send('Unauthorized to edit project');
  }
  try {
    const updatedProject = await updateFigmaLink(projectId, figma_link);
    res.status(200).json({
      message: 'Project figma_link updated successfully',
      projectData: updatedProject
    });
  } catch (error) {
    console.error('Error updating project figma_link:', error.message);
    res.status(500).send('Error updating project figma_link');
  }
});
// http://localhost:8080/api/projects/:projectId/trello_link
// Edit a trello_link
router.patch('/:projectId/trello_link', async (req, res) => {
  const { projectId } = req.params;
  const { id: user_id } = req.session.user;
  const { trello_link } = req.body;
  const project = await getProjectById(projectId);
  if (!project) {
    return res.status(404).send('Project not found');
  }
  if (user_id !== project.owner_id) {
    return res.status(403).send('Unauthorized to edit project');
  }
  try {
    const updatedProject = await updateTrelloLink(projectId, trello_link);
    res.status(200).json({
      message: 'Project trello_link updated successfully',
      projectData: updatedProject
    });
  } catch (error) {
    console.error('Error updating project trello_link:', error.message);
    res.status(500).send('Error updating project trello_link');
  }
});
// http://localhost:8080/api/projects/:projectId/cover_photo_path
// Edit a cover_photo_path
router.patch('/:projectId/cover_photo_path', async (req, res) => {
  const { projectId } = req.params;
  const { id: user_id } = req.session.user;
  const { cover_photo_path } = req.body;
  const project = await getProjectById(projectId);
  if (!project) {
    return res.status(404).send('Project not found');
  }
  if (user_id !== project.owner_id) {
    return res.status(403).send('Unauthorized to edit project');
  }
  try {
    const updatedProject = await updateCoverPhoto(projectId, cover_photo_path);
    res.status(200).json({
      message: 'Project cover_photo_path updated successfully',
      projectData: updatedProject
    });
  } catch (error) {
    console.error('Error updating project cover_photo_path:', error.message);
    res.status(500).send('Error updating project cover_photo_path');
  }
});



export default router;