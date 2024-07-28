import db from '../connection.js';
import bcrypt from 'bcrypt';

const addOwnerToProject = async (project_id, user_id) => {
  try {
    await db.query(
      `INSERT INTO project_participants (project_id, participant_id, is_approved, is_pending_join)
      VALUES ($1, $2, FALSE, FALSE)
      ON CONFLICT DO NOTHING`,
      [project_id, user_id]
    );
    const data = await db.query(
      `UPDATE project_participants
      SET is_approved = TRUE
      WHERE project_id = $1 AND participant_id = $2
      RETURNING *`,
      [project_id, user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error adding owner to project:', error);
  }
};

const createUser = async (user) => {
  const { first_name, last_name, email, password, username, profile_pic, github_repo } = user;
  try {
    const data = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, username, profile_pic, github_repo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [first_name, last_name, email, password, username, profile_pic, github_repo]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error creating user:', error);
  }
}

const getUser = async (email, password) => {
  try {
    const data = await db.query(
      `SELECT * FROM users
      WHERE email = $1
      AND password = $2`,
      [email, password]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error getting user by email:', error);
  }
}




export { addOwnerToProject, createUser, getUser };