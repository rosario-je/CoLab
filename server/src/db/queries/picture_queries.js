import db from '../connection.js';

const addPicsToProject = async (project_id, picture_path, user_id) => {
  try {
    const data = await db.query(
      `INSERT INTO projects_pics (project_id, picture_path, uploaded_by)
      VALUES ($1, $2, $3)`,
      [project_id, picture_path, user_id]
    );
    return data.rows;
  }
  catch (error) {
    console.log(error);
  }
};

// Set the cover picture for a project on creation
const setCoverPic = async (picture_id) => {
  try {
    const data = await db.query(
      `UPDATE projects_pics
      SET is_cover = true
      WHERE id = $1`,
      [id]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

// To update a cover picture in a project
const updateCoverPic = async (picture_id) => {
  try {
    const data = await db.query(
      `UPDATE projects_pics
      SET is_cover = true
      WHERE id = $1
      RETURNING *`,
      [project_id]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

export { addPicsToProject, setCoverPic, updateCoverPic };