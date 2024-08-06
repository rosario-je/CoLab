import db from '../connection.js';

// This creates a group chat for a project
const createGroupChat = async (project_id) => {
  try {
    const data = await db.query(
      `INSERT INTO chat_rooms (project_id)
      VALUES ($1)
      RETURNING *`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Get the chat_id for a project
const getProjectChatId = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT chat_rooms.id AS chat_id FROM chat_rooms
      JOIN projects ON chat_rooms.project_id = projects.id
      WHERE projects.id = $1`
      , [project_id]
    );
    return data.rows[0].chat_id;
  } catch (error) {
    console.log(error);
  }
};

// This gets the chat history for a project
const getChatHistory = async (chat_id) => {
  try {
    const data = await db.query(
      `SELECT
        msg.id AS message_id,
        msg.sender_id AS sender_id,
        u.username,
        u.profile_pic,
        u.email,
        msg.message,
        msg.created_at
      FROM
        group_chat_messages msg
        LEFT JOIN users u ON msg.sender_id = u.id
      WHERE msg.chat_room_id = $1
      ORDER BY msg.created_at ASC;
      `,
      [chat_id]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

// Send a new message to chat
const newChatMessage = async (sender_id, chat_id, message) => {
  try {
    const data = await db.query(
      `INSERT INTO group_chat_messages (sender_id, chat_room_id, message) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [sender_id, chat_id, message]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Send a notification to user when they are added to a project or the request was rejected
const sendProjectNotification = async (sender_id, receiver_id, message) => {
  try {
    const data = await db.query(
      `INSERT INTO notifications (sender_id, receiver_id, message)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [sender_id, receiver_id, message]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

// Send a notification when a user requests to join a project
const sendJoinNotification = async (receiver_id, message) => {
  try {
    const data = await db.query(
      `INSERT INTO notifications (receiver_id, message)
      VALUES ($1, $2)
      RETURNING *`,
      [receiver_id, message]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

// Get all notifications for a user
const getNotifications = async (user_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM notifications
      WHERE receiver_id = $1
      ORDER BY created_at DESC`,
      [user_id]
    );
    return data.rows;
  }
  catch (error) {
    console.log(error);
  }
};

// For a user to delete a notification one they have read it
const dismissNotification = async (notification_id) => {
  try {
    const data = await db.query(
      `DELETE FROM notifications
      WHERE id = $1
      RETURNING *`,
      [notification_id]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

const getNewChatMessageInfo = async (chat_message_id) => {
  try {
    const data = await db.query(
      `SELECT
        msg.id AS message_id,
        msg.sender_id AS sender_id,
        u.username,
        u.profile_pic,
        u.email,
        msg.message,
        msg.created_at
      FROM
        group_chat_messages msg
        LEFT JOIN users u ON msg.sender_id = u.id
      WHERE msg.id = $1
      ORDER BY msg.created_at DESC;
      `,
      [chat_message_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};



export { 
createGroupChat, 
getChatHistory, 
newChatMessage, 
getProjectChatId,
sendProjectNotification,
dismissNotification,
getNotifications,
sendJoinNotification,
getNewChatMessageInfo
};