import db from '../db/connection.js';

const getAllProjects = async () => {
  try {
    const data = await db.query(
      `SELECT * FROM projects`,
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

export { getAllProjects };