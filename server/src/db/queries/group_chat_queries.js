import db from '../connection.js';

const createGroupChat = async (project_id) => {
  try {
    const data = await db.query(
      `INSERT INTO group_chat (project_id)
      VALUES ($1)
      RETURNING *`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { createGroupChat };