import express from 'express';
import { getAllProjects, getProjectsOwnedByMe, getProjectsIAmInById, getProjectsIdsIAmIn, getProjectById, projectFull, getAllProjectsById, projectCompleted } from '../db/queries/project_queries.js';
import { getTechByName } from '../db/queries/tech_queries.js';
import { getAllJoinRequests, isUserOwner, approveJoinRequest, addUserToProject, rejectJoinRequest } from '../db/queries/user_queries.js';
import { getNotifications, dismissNotification, sendProjectNotification } from '../db/queries/chat_queries.js';

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
// http://localhost:8080/api/dashboard/:userId/my_projects
router.get('/:userId/my_projects', async (req, res) => {
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

// Complete a project you own
// http://localhost:8080/api/dashboard/my_projects/:project_id
router.put('/my_projects/:project_id', async (req, res) => {
  const { id: user_id } = req.session.user;
  const { project_id } = req.params;
  try {
    const isCurrentUserOwner = await isUserOwner(user_id, project_id);
    if (!isCurrentUserOwner) {
      return res.status(403).json({ error: "Unauthorized to complete this project" });
    }
    const completeProject = await projectCompleted(project_id);
    return res.status(200).json({
      message: "Project Completed!",
      data: completeProject
    });

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
      const inProgress = project.is_in_progress === true; // Explicitly check if the project is in progress
      return { ...request, project, participants: Number(participants.count), inProgress };
    }));

    // Filter the completed results based on your conditions
    const filteredRequests = requestsWithProjects.filter(({ project, participants, inProgress }) => {
      return project.max_participants > participants && inProgress;
    });

    return res.status(200).json(filteredRequests);
  } catch (error) {
    console.error("Error in getting join requests: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Approves a join request and adds the user to the project
// http://localhost:8080/api/dashboard/manage_requests/approve_join_request
router.post('/manage_requests/approve_join_request', async (req, res) => {
  const { project_id, requesting_user_id } = req.body;
  const { id: user_id } = req.session.user;
  try {
    const project = await getProjectById(project_id);
    const isCurrentUserOwner = await isUserOwner(user_id, project_id);
    if (!isCurrentUserOwner) {
      return res.status(403).json({ error: "Unauthorized to complete this action" });
    }
    const joinRequest = await approveJoinRequest(project_id, requesting_user_id);
    if (!joinRequest) {
      return res.status(500).send('Error approving join request');
    }
    const addToProject = await addUserToProject(project_id, requesting_user_id);
    const message = `Your request to join project ${project.name} has been approved!`;
    const sendmsg = await sendProjectNotification(user_id, requesting_user_id, message);

    res.status(201).json({
      message: sendmsg,
      joinRequest: joinRequest,
      addToProject: addToProject
    });
  } catch (error) {
    console.error('Error approving join request:', error.message);
    res.status(500).send('Error approving join request');
  }
});

// Rejects a join request and adds the user to the project
// http://localhost:8080/api/dashboard/manage_requests/reject_join_request
router.delete('/manage_requests/reject_join_request', async (req, res) => {
  const { project_id, requesting_user_id } = req.body;
  const { id: user_id } = req.session.user;
  try {
    const project = await getProjectById(project_id);
    const isCurrentUserOwner = await isUserOwner(user_id, project_id);
    if (!isCurrentUserOwner) {
      return res.status(403).json({ error: "Unauthorized to complete this action" });
    }
    const rejectRequest = await rejectJoinRequest(project_id, requesting_user_id);
    if (!rejectRequest) {
      return res.status(500).send('Error deleting join request');
    }
    const message = `Your request to join project ${project.name} has been rejected.`;
    const sendmsg = await sendProjectNotification(user_id, requesting_user_id, message);
    res.status(201).json({
      message: sendmsg,
      data: rejectRequest
    });
  } catch (error) {
    console.error('Error approving join request:', error.message);
    res.status(500).send('Error approving join request');
  }
});

// Search for projects by tech name
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

// Get notifications about project join requests
// http://localhost:8080/api/dashboard/notifications
router.get('/notifications', async (req, res) => {
  const { id: user_id } = req.session.user;
  try {
    const notifications = await getNotifications(user_id);
    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getting notifications: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Dismiss a read notification
// http://localhost:8080/api/dashboard/notifications/:notification_id
router.delete('/notifications/:notification_id', async (req, res) => {
  const { notification_id } = req.params;
  try {
    const deleteNotification = await dismissNotification(notification_id);
    return res.status(200).json(deleteNotification);
  } catch (error) {
    console.error("Error in dismissing notification: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;