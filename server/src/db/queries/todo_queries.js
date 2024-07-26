import db from '../connection.js';

const createTodoList = async (project_id) => {
  try {
    const data = await db.query(
      `INSERT INTO todo_lists (project_id)
      VALUES ($1)
      RETURNING *`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { createTodoList };