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

const getTechByName = async (tech_name) => {
  try {
    const data = await db.query(
      `SELECT 
      p.id AS project_id
    FROM 
      projects p
    LEFT JOIN 
      tech_requirements tech ON p.id = tech.project_id
    WHERE tech.tech_name ILIKE $1
    GROUP BY 
      p.id;`,
      [`%${tech_name}%`]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};


export { addTechToProject, getTechByName };