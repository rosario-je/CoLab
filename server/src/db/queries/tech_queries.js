import db from '../connection.js';

const addTechToProject = async (project_id, tech_name) => {
  try {
    const data = await db.query(
      `INSERT INTO tech_requirements (project_id, tech_name)
      VALUES ($1, $2)`,
      [project_id, tech_name]
    );
    return data.rows;
  }
  catch (error) {
    console.log(error);
  }
};

export { addTechToProject };