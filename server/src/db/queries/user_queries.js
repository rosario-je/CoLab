import db from '../connection.js';

// Get the owner of a project by their user_id
const getOwnerById = async (owner_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM users
      JOIN projects ON users.id = projects.owner_id 
      WHERE id = $1`,
      [owner_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Get the owner of a project by their project_id
const getOwnerByProjectId = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM users
      JOIN projects ON users.id = projects.owner_id 
      WHERE projects.id = $1`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Get the participants of a project
const getProjectParticipants = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM users
      JOIN projects_participants ON users.id = projects_participants.participant_id
      WHERE projects_participants.project_id = $1`,
      [project_id]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

const askToJoinProject = async (project_id, user_id) => {
  try {
    const data = await db.query (
      `INSERT INTO join_requests (project_id, user_id)
      VALUES ($1, $2)
      RETURNING *`,
      [project_id, user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};
    
const createUser = async (user) => {
  const {first_name, last_name, email, password, username, profile_pic, github_repo} = user;
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

const getUserByEmail = async (email) => {
  try {
    const data = await db.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error getting user by email:', error);
  }
}




export { getOwnerById, getOwnerByProjectId, getProjectParticipants, askToJoinProject , createUser, getUserByEmail};