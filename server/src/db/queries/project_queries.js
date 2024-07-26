import db from '../connection.js';

const getAllProjects = async () => {
  try {
    const data = await db.query(
      `SELECT 
        p.id AS project_id,
        p.name,
        p.description,
        p.owner_id,
        p.max_participants,
        p.github_repo,
        p.created_at,
        p.is_accepting_users,
        p.is_in_progress,
      ARRAY_AGG(DISTINCT par.participant_id) AS projects_participants,
      ARRAY_AGG(DISTINCT pic.picture_path) AS projects_pics,
      ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
      FROM 
        projects p
      LEFT JOIN 
        projects_participants par ON p.id = par.project_id
      LEFT JOIN 
        projects_pics pic ON p.id = pic.project_id
      LEFT JOIN 
        tech_requirements tech ON p.id = tech.project_id
      GROUP BY 
        p.id;`
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

const getProjectsOwnedByMe = async (user_id) => {
  try {
    const data = await db.query(
      `SELECT 
      p.id AS project_id,
      p.name,
      p.description,
      p.owner_id,
      p.max_participants,
      p.github_repo,
      p.created_at,
      p.is_accepting_users,
      p.is_in_progress,
    ARRAY_AGG(DISTINCT par.participant_id) AS projects_participants,
    ARRAY_AGG(DISTINCT pic.picture_path) AS projects_pics,
    ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
    FROM 
      projects p
    LEFT JOIN 
      projects_participants par ON p.id = par.project_id
    LEFT JOIN 
      projects_pics pic ON p.id = pic.project_id
    LEFT JOIN 
      tech_requirements tech ON p.id = tech.project_id
    WHERE p.owner_id = $1
    GROUP BY 
      p.id;`,
      [user_id]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

const getProjectsIdsIAmIn = async (user_id) => {
  try {
    const data = await db.query(
      `SELECT 
      p.id AS project_id
    FROM 
      projects p
    LEFT JOIN 
      projects_participants par ON p.id = par.project_id
    LEFT JOIN 
      projects_pics pic ON p.id = pic.project_id
    LEFT JOIN 
      tech_requirements tech ON p.id = tech.project_id
    WHERE par.participant_id = $1
    GROUP BY 
      p.id;`,
      [user_id]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

const getProjectsIAmInById = async (project_ids) => { 
  try {
    const data = await db.query(
    `SELECT 
      p.id AS project_id,
      p.name,
      p.description,
      p.owner_id,
      p.max_participants,
      p.github_repo,
      p.created_at,
      p.is_accepting_users,
      p.is_in_progress,
    ARRAY_AGG(DISTINCT par.participant_id) AS projects_participants,
    ARRAY_AGG(DISTINCT pic.picture_path) AS projects_pics,
    ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
    FROM 
      projects p
    LEFT JOIN 
      projects_participants par ON p.id = par.project_id
    LEFT JOIN 
      projects_pics pic ON p.id = pic.project_id
    LEFT JOIN 
      tech_requirements tech ON p.id = tech.project_id
    WHERE p.id = ANY($1)
    GROUP BY 
      p.id;`,
      [project_ids]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  };
};

// This will be for creating a new project
const createNewProject = async (name, description, user_id, max_participants, github_repo) => {
  try {
    const data = await db.query(
      `INSERT INTO projects (name, description, owner_id, max_participants, github_repo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [name, description, user_id, max_participants, github_repo]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// This will be for getting a single project page
const getProjectPage = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM projects
      WHERE id = $1`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

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

export { getAllProjects, createNewProject, getProjectPage, getProjectsIdsIAmIn, getProjectsIAmInById, getProjectsOwnedByMe };