import express from 'express';
import { createNewProject, getProjectPage, getProjectById, getPendingJoinRequests, editProject } from '../db/queries/project_queries.js';
import { getUserById, askToJoinProject, getMoreJoinInfo } from '../db/queries/user_queries.js';
import { addTechToProject } from '../db/queries/tech_queries.js';
import { createGroupChat, getChatHistory, newChatMessage, getProjectChatId, sendJoinNotification, getNewChatMessageInfo } from '../db/queries/chat_queries.js';
import { io } from '../index.js';

const router = express.Router();

import authenticateToken from '../../utils/authMiddleware.js'

// Creates a new project
// http://localhost:8080/api/projects/create
router.post('/create', authenticateToken, async (req, res) => {
  const { id: user_id } = req.user;
  console.log('create projecte test: ', req.user)
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


/*------------------------------------------------------------------------------*/
// http://localhost:8080/api/projects/:projectId/chat
router.post('/:projectId/chat', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const sender_id = req.user.id;
  const { message } = req.body;

  if (!projectId) {
    return res.status(404).send('Project not found');
  }
  try {
    const chat_room_id = await getProjectChatId(projectId);
    const newMessage = await newChatMessage(sender_id, chat_room_id, message);
    const message_id = newMessage.id;
    const allMessageInfo = await getNewChatMessageInfo(message_id);
    //io.to(projectId).emit("receiveMessage", allMessageInfo);

    res.status(201).json({
      message: "Message sent successfully",
      data: {
        newMessage: allMessageInfo
      }
    });
  } catch (error) {
    console.error('This is the Error sending message:', error.message);
    res.status(500).send('Error sending message');
  }
});

/*------------------------------------------------------------------------------*/

// Creates a new join request for a project
// http://localhost:8080/api/projects/:projectId/join
router.post('/:projectId/join', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const user_id = req.user.id;

  try {
    const project = await getProjectById(projectId);
    console.log(user_id);

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
    const allJoinInfo = await getMoreJoinInfo(joinRequest.id);
    console.log("This is the join request:", allJoinInfo);
    if (!joinRequest) {
      return res.status(500).send('Error joining project');
    }
    const message = `You have requested to join the project: ${project.name}`;
    const sendmsg = await sendJoinNotification(user_id, message);
    console.log("Emitting receiveRequest with data:", allJoinInfo);
    io.to(project.owner_id).emit("receiveRequest", allJoinInfo);

    res.status(200).json({
      message: "Message sent successfully",
      data: {
        message: sendmsg,
        joinRequest: allJoinInfo
      }
    });
  } catch (error) {
    console.error('Error joining project:', error.message);
    res.status(500).send('Error joining project');
  }
});

// Edits and updates a project
// http://localhost:8080/api/projects/:projectId/edit
router.put('/:projectId/edit', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const user_id = req.user.id;
  const { name, description, max_participants, cover_photo_path, github_repo, figma_link, trello_link, tech_requirements } = req.body;

  try {
    const project = await getProjectById(projectId);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    if (user_id !== project.owner_id) {
      return res.status(403).send('Unauthorized to edit project');
    }
    const updateProject = await editProject(
      projectId,
      name,
      description,
      max_participants,
      cover_photo_path,
      github_repo,
      figma_link,
      trello_link,
      tech_requirements,
    );

    res.status(200).json({ message: 'Project updated successfully', project: updateProject });
  } catch (error) {
    console.error('Error editing project:', error.message);
    res.status(500).send('Error editing project');
  }
});

export default router;