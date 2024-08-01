import express from 'express';
import { createNewProject, getProjectPage, getProjectById, getPendingJoinRequests } from '../db/queries/project_queries.js';
import { getUserById, askToJoinProject, approveJoinRequest, addUserToProject, isUserOwner, rejectJoinRequest, limitAccess } from '../db/queries/user_queries.js';
import { addTechToProject } from '../db/queries/tech_queries.js';
import { createGroupChat, getChatHistory, newChatMessage, getProjectChatId, sendProjectNotification } from '../db/queries/chat_queries.js';
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
    res.status(201).send('Project successfully created');
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).send('Error creating project');
  }
});

// Fetches a project by its ID
// http://localhost:8080/api/projects/:id
router.get('/:id', async (req, res) => {
  const { id: project_id } = req.params;
  const { id: user_id } = req.session.user;
  const checkUserAccess = await limitAccess(project_id, user_id);
  if (!checkUserAccess) {
    return res.status(403).json({ error: "Unauthorized to view this project" });
  };
  try {
    const project = await getProjectPage(project_id);
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
router.post('/:id/chat', async (req, res) => {
  const { id: project_id } = req.params;
  const { id: sender_id } = req.session.user;
  const { message } = req.body;
  const chat_room_id = await getProjectChatId(project_id);
  const checkUserAccess = await limitAccess(project_id, sender_id);

  if (!project_id) {
    return res.status(404).send('Project not found');
  }
  if (!checkUserAccess) {
    return res.status(403).json({ error: "Unauthorized to access this project and send messages" });
  };
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
// http://localhost:8080/api/projects/:id/join
router.post('/:id/join', async (req, res) => {
  const { id: project_id } = req.params;
  const { id: user_id } = req.session.user;
  const project = await getProjectById(project_id);
  try {
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!project_id) {
      return res.status(404).send('Project not found');
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

// Approves a join request and adds the user to the project
// http://localhost:8080/api/projects/approve_join_request
router.post('/approve_join_request', async (req, res) => {
  const { project_id, requesting_user_id } = req.body;
  const { id: user_id } = req.session.user;
  try {
    if (!project_id) {
      return res.status(404).send('Project not found');
    }
    const isCurrentUserOwner = await isUserOwner(user_id, project_id);
    if (!isCurrentUserOwner) {
      return res.status(403).json({ error: "Unauthorized to complete this action" });
    }
    const joinRequest = await approveJoinRequest(project_id, requesting_user_id);
    if (!joinRequest) {
      return res.status(500).send('Error approving join request');
    }
    const addToProject = await addUserToProject(project_id, requesting_user_id);
    const message = `Your request to join ${project_id} has been approved!`;
    const sendmsg = await sendProjectNotification(user_id, requesting_user_id, message);
    res.status(200).json(addToProject, sendmsg);
  } catch (error) {
    console.error('Error approving join request:', error.message);
    res.status(500).send('Error approving join request');
  }
});

// Rejects a join request and adds the user to the project
// http://localhost:8080/api/projects/reject_join_request
router.delete('/reject_join_request', async (req, res) => {
  const { project_id, requesting_user_id } = req.body;
  const { id: user_id } = req.session.user;
  try {
    if (!project_id) {
      return res.status(404).send('Project not found');
    }
    const isCurrentUserOwner = await isUserOwner(user_id, project_id);
    if (!isCurrentUserOwner) {
      return res.status(403).json({ error: "Unauthorized to complete this action" });
    }
    const rejectRequest = await rejectJoinRequest(project_id, requesting_user_id);
    if (!rejectRequest) {
      return res.status(500).send('Error deleting join request');
    }
    const message = `Your request to join ${project_id} has been rejected.`;
    const sendmsg = await sendProjectNotification(user_id, requesting_user_id, message);
    res.status(200).json(rejectRequest, sendmsg);
  } catch (error) {
    console.error('Error approving join request:', error.message);
    res.status(500).send('Error approving join request');
  }
});

export default router;