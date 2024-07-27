import db from '../connection.js';

// This gets all the projects for the main dashboard

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
        COALESCE(
          jsonb_agg(
            DISTINCT jsonb_build_object(
              'participant_id', par.participant_id,
              'participant_pic', u.profile_pic,
              'participant_username', u.username,
              'participant_email', u.email
            )
          ),
          '[]'
        ) AS participants,
        ARRAY_AGG(DISTINCT pic.picture_path) AS projects_pics,
        ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
      FROM 
        projects p
      LEFT JOIN 
        projects_participants par ON p.id = par.project_id
      LEFT JOIN 
        users u ON par.participant_id = u.id
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

// const getAllProjects = async () => {
//   try {
//     const data = await db.query(
//       `SELECT 
//         p.id AS project_id,
//         p.name,
//         p.description,
//         p.owner_id,
//         p.max_participants,
//         p.github_repo,
//         p.created_at,
//         p.is_accepting_users,
//         COALESCE(
//           jsonb_agg(
//             DISTINCT jsonb_build_object(
//               'participant_id', par.participant_id,
//               'participant_pic', par.participant_pic,
//               'participant_username', par.participant_username,
//               'participant_email', par.participant_email
//             )
//           ) FILTER (WHERE par.participant_id IS NOT NULL),
//           '[]'
//         ) AS participants,
//       ARRAY_AGG(DISTINCT pic.picture_path) AS projects_pics,
//       ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
//       FROM 
//         projects p
//       LEFT JOIN 
//         projects_participants par ON p.id = par.project_id
//       LEFT JOIN 
//         projects_pics pic ON p.id = pic.project_id
//       LEFT JOIN 
//         tech_requirements tech ON p.id = tech.project_id
//       GROUP BY 
//         p.id;`
//     );
//     return data.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

// The next 3 functions work together
// This gets all the projects that a user is the owner of
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
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'participant_id', par.participant_id,
            'participant_pic', par.participant_pic,
            'participant_username', par.participant_username,
            'participant_email', par.participant_email
          )
        ) FILTER (WHERE par.participant_id IS NOT NULL),
        '[]'
      ) AS participants,
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

// This gets and array of project_ids that a user is a participant in
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

// This gets the rest of the data for all the projects that a user is a participant in
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
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'participant_id', par.participant_id,
            'participant_pic', par.participant_pic,
            'participant_username', par.participant_username,
            'participant_email', par.participant_email
          )
        ) FILTER (WHERE par.participant_id IS NOT NULL),
        '[]'
      ) AS participants,
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
// Needs to be edited to include the participants, pictures, tech requirements, group chat, and todo list
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