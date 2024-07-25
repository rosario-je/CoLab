import db from '../connection.js';

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

// This will be the improved version of the getAllProjects function
// const getAllProjects = async (user_id) => {
//   try {
//     const data = await db.query(
//       `SELECT * FROM projects
//       WHERE NOT user_id = $1
//       ORDER BY projects.created_at ASC`,
//       [user_id]
//     );
//     return data.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

//This will be to get the projects that a logged in user has created
// const getMyProjects = async (user_id) => {
//   try{
//     const data = await db.query(
//       `SELECT * FROM projects
//       WHERE user_id = $1
//       ORDER BY projects.created_at ASC`,
//       [user_id]
//     );
//     return data.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

// This will be for creating a new project

// const createNewProject = async (name, description, user_id, max_participants, github_repo) => {
//   try {
//     const data = await db.query(
//       `INSERT INTO projects (name, description, owner_id, max_participants, github_repo)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *`,
//       [name, description, user_id, max_participants, github_repo]
//     );
//     return data.rows[0];
//   } catch (error) {
//     console.log(error);
//   }
// };

// This will be for updating a project when the owner doesn't want to add more participants; only the owner can do this
// const noNewParticipants = async (project_id, user_id) => {
//   try {
//     const data = await db.query(
//       `UPDATE projects
//       SET is_accepting_users = false
//       WHERE project_id = $1
//       AND owner_id = $2
//       RETURNING *`,
//       [project_id]
//     );
//     return data.rows[0];
//   } catch (error) {
//     console.log(error);
//   }
// };

// This will be for updating a project when it is completed; only the owner can do this
// const projectCompleted = async (project_id, user_id) => {
//   try {
//     const data = await db.query(
//       `UPDATE projects
//       SET is_completed = true
//       WHERE project_id = $1
//       AND owner_id = $2
//       RETURNING *`,
//       [project_id]
//     );
//     return data.rows[0];
//   } catch (error) {
//     console.log(error);
//   }
// };

export { getAllProjects };