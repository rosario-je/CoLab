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

// Create a join request to a project
const askToJoinProject = async (project_id, user_id) => {
  try {
    const data = await db.query(
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

// Get all join requests a user has for their projects
const getAllJoinRequests = async (user_id) => {
  try {
    const data = await db.query(
      `SELECT 
        join_requests.*, 
        projects.id AS project_id, 
        projects.name AS project_name,
        requester.username AS requester_username,
        requester.email AS requester_email,
        requester.profile_pic AS requester_pic,
        projects.owner_id AS owner_id
      FROM 
        join_requests
      JOIN 
        projects ON join_requests.project_id = projects.id
      JOIN 
        users AS owner ON projects.owner_id = owner.id
      JOIN 
        users AS requester ON join_requests.user_id = requester.id
      WHERE
        join_requests.is_accepted = false
      AND 
        projects.owner_id = $1
        ORDER BY join_requests.id DESC
        `,
      [user_id]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

// Approve a specific join request
const approveJoinRequest = async (project_id, requesting_user_id) => {
  try {
    const data = await db.query(
      `UPDATE join_requests
      SET is_accepted = true
      WHERE project_id = $1
      AND user_id = $2
      RETURNING *`,
      [project_id, requesting_user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Reject a specific join request
const rejectJoinRequest = async (project_id, requesting_user_id) => {
  try {
    const data = await db.query(
      `DELETE FROM join_requests
      WHERE project_id = $1
      AND user_id = $2
      RETURNING *`,
      [project_id, requesting_user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
}


// Add the approved user to the project
const addUserToProject = async (project_id, user_id) => {
  try {
    const data = await db.query(
      `INSERT INTO projects_participants (project_id, participant_id)
      VALUES ($1, $2)
      RETURNING *`,
      [project_id, user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Check if the current logged in user is the owner of a project
const isUserOwner = async (user_id, project_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM projects 
       WHERE owner_id = $1 AND id = $2`,
      [user_id, project_id]
    );
    return data.rows.length > 0; // Return true if the user is the owner
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Create a new user
const createUser = async (user) => {
  const { first_name, last_name, email, password, username, profile_pic } = user;
  try {
    const data = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, username, profile_pic)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [first_name, last_name, email, password, username, profile_pic]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error creating user:', error);
  }
};

// Get a user by their email
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
};

// Get a user by their user_id
const getUserById = async (user_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM users
      WHERE id = $1`,
      [user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error getting user by id:', error);
  }
};

const limitAccessToProject = async (project_id, user_id) => {
  try {
    const data = await db.query(
      `SELECT pp.participant_id, pp.project_id, p.owner_id
      FROM projects_participants pp
      JOIN projects p ON pp.project_id = p.id
      WHERE pp.project_id = $1 
      AND (pp.participant_id = $2 OR p.owner_id = $2)`,
      [project_id, user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log('Error limiting access to project:', error);
  }
};


export {
  getOwnerById, 
  getOwnerByProjectId,
  getProjectParticipants, 
  askToJoinProject,
  createUser, 
  getUserByEmail,
  getUserById,
  getAllJoinRequests, 
  approveJoinRequest,
  addUserToProject, 
  isUserOwner, 
  rejectJoinRequest,
  limitAccessToProject
};