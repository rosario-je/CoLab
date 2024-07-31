import express from 'express';
import { newChatMessage, getProjectChatId } from '../db/queries/chat_queries.js';
const router = express.Router();

// Send a message to a chat
// http://localhost:8080/api/projects/:id/chat

// router.post('/:id/chat', async (req, res) => {
//   const { id: project_id } = req.params;
//   const { id: sender_id } = req.session.user;
//   const { message } = req.body;
//   const chat_id = await getProjectChatId(project_id);
//   const checkUserAccess = await limitAccess(project_id, sender_id);

//   if (!checkUserAccess) {
//     return res.status(403).json({ error: "Unauthorized to view this project" });
//   };
//   try {
//     const newMessage = await newChatMessage(sender_id, chat_id, message);
//     res.status(201).json({
//       message: "Message sent successfully",
//       data: {
//         chat_id: chat_id,
//         newMessage: newMessage
//       }
//     });
//   } catch (error) {
//     console.error('Error sending message:', error.message);
//     res.status(500).send('Error sending message');
//   }
// });

export default router;