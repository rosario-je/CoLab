import db from '../connection.js';

// This gets all the projects for the main dashboard
// COALESCE is used to return an empty array if there are no participants
// jsonb_agg is used to return the participants as a json array
// jsonb_build_object is used to return the participant data as an object
// DISTINCT is used to remove duplicates
// ARRAY_AGG is used to return the pictures and tech requirements as arrays
const getAllProjects = async () => {
  try {
    const data = await db.query(
      `SELECT 
        p.id AS project_id,
        p.name,
        p.description,
        p.owner_id,
        owner.username AS owner_username,
        owner.profile_pic AS owner_pic,
        owner.email AS owner_email,
        p.max_participants,
        p.cover_photo_path,
        p.github_repo,
        p.figma_link,
        p.trello_link,
        p.is_in_progress,
        p.created_at,
        COALESCE(
          jsonb_agg(
            DISTINCT jsonb_build_object(
              'participant_id', par.participant_id,
              'participant_pic', participant.profile_pic,
              'participant_username', participant.username,
              'participant_email', participant.email
            )
          ),
          '[]'
        ) AS participants,
        ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
      FROM 
        projects p
      LEFT JOIN 
        users owner ON p.owner_id = owner.id
      LEFT JOIN 
        projects_participants par ON p.id = par.project_id
      LEFT JOIN 
        users participant ON par.participant_id = participant.id
      LEFT JOIN 
        tech_requirements tech ON p.id = tech.project_id
      GROUP BY 
        p.id, owner.username, owner.profile_pic, owner.email
      ORDER BY 
        p.created_at DESC;`
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

// This gets all projects for the search page
const getAllProjectsById = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT 
        p.id AS project_id,
        p.name,
        p.description,
        p.owner_id,
        owner.username AS owner_username,
        owner.profile_pic AS owner_pic,
        owner.email AS owner_email,
        p.max_participants,
        p.cover_photo_path,
        p.github_repo,
        p.figma_link,
        p.trello_link,
        p.is_in_progress,
        p.created_at,
        COALESCE(
          jsonb_agg(
            DISTINCT jsonb_build_object(
              'participant_id', par.participant_id,
              'participant_pic', participant.profile_pic,
              'participant_username', participant.username,
              'participant_email', participant.email
            )
          ),
          '[]'
        ) AS participants,
        ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
      FROM 
        projects p
      LEFT JOIN 
        users owner ON p.owner_id = owner.id
      LEFT JOIN 
        projects_participants par ON p.id = par.project_id
      LEFT JOIN 
        users participant ON par.participant_id = participant.id
      LEFT JOIN 
        tech_requirements tech ON p.id = tech.project_id
      WHERE p.id = $1
      GROUP BY 
        p.id, owner.username, owner.profile_pic, owner.email
      ORDER BY 
        p.created_at DESC;`,
      [project_id]
    );
    return data.rows[0]; // Return a single project object
  } catch (error) {
    console.log(error);
  }
};

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
        owner.username AS owner_username,
        owner.profile_pic AS owner_pic,
        owner.email AS owner_email,
        p.max_participants,
        p.cover_photo_path,
        p.github_repo,
        p.figma_link,
        p.trello_link,
        p.is_in_progress,
        p.created_at,
        COALESCE(
          jsonb_agg(
            DISTINCT jsonb_build_object(
              'participant_id', par.participant_id,
              'participant_pic', participant.profile_pic,
              'participant_username', participant.username,
              'participant_email', participant.email
            )
          ),
          '[]'
        ) AS participants,
        ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
      FROM 
        projects p
      LEFT JOIN 
        users owner ON p.owner_id = owner.id
      LEFT JOIN 
        projects_participants par ON p.id = par.project_id
      LEFT JOIN 
        users participant ON par.participant_id = participant.id
      LEFT JOIN 
        tech_requirements tech ON p.id = tech.project_id
    WHERE p.owner_id = $1
    GROUP BY 
      p.id, owner.username, owner.profile_pic, owner.email
    ORDER BY 
        p.created_at DESC;`,
      [user_id]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

// This gets an array of project_ids that a user is a participant in
// The array is used in the next function to get the rest of the data for the projects
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
      owner.username AS owner_username,
      owner.profile_pic AS owner_pic,
      owner.email AS owner_email,
      p.max_participants,
      p.cover_photo_path,
      p.github_repo,
      p.figma_link,
      p.trello_link,
      p.is_in_progress,
      p.created_at,
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'participant_id', par.participant_id,
            'participant_pic', participant.profile_pic,
            'participant_username', participant.username,
            'participant_email', participant.email
          )
        ),
        '[]'
      ) AS participants,
      ARRAY_AGG(DISTINCT tech.tech_name) AS tech_requirements
    FROM 
      projects p
    LEFT JOIN 
      users owner ON p.owner_id = owner.id
    LEFT JOIN 
      projects_participants par ON p.id = par.project_id
    LEFT JOIN 
      users participant ON par.participant_id = participant.id
    LEFT JOIN 
      tech_requirements tech ON p.id = tech.project_id
    WHERE p.id = ANY($1)
    GROUP BY 
      p.id, owner.username, owner.profile_pic, owner.email
    ORDER BY 
      p.created_at DESC;`,
      [project_ids]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  };
};

// This creates a new project
const createNewProject = async (name, description, user_id, max_participants, cover_photo_path, github_repo, figma_link, trello_link) => {
  try {
    const data = await db.query(
      `INSERT INTO projects (name, description, owner_id, max_participants, cover_photo_path, github_repo, figma_link, trello_link)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [name, description, user_id, max_participants, cover_photo_path, github_repo, figma_link, trello_link]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};


// This gets all the data for a single project, minus the chat history
const getProjectPage = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT
        p.id AS project_id,
        p.name,
        p.description,
        p.owner_id,
        owner.username AS owner_username,
        owner.profile_pic AS owner_pic,
        owner.email AS owner_email,
        p.cover_photo_path,
        p.github_repo,
        p.figma_link,
        p.trello_link,
        c.id AS chat_id,
        ARRAY_AGG(DISTINCT tr.tech_name) AS tech_requirements,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object(
            'participant_id', par.participant_id,
            'participant_pic', participant.profile_pic,
            'participant_username', participant.username,
            'participant_email', participant.email
          )) FILTER (WHERE par.participant_id IS NOT NULL),
          '[]'
        ) AS participants
      FROM
        projects p
        LEFT JOIN tech_requirements tr ON p.id = tr.project_id
        LEFT JOIN chat_rooms c ON p.id = c.project_id
        LEFT JOIN users owner ON p.owner_id = owner.id
        LEFT JOIN projects_participants par ON p.id = par.project_id
        LEFT JOIN users participant ON par.participant_id = participant.id
      WHERE p.id = $1
      GROUP BY
        p.id, p.name, p.description, p.owner_id, owner.username, owner.profile_pic, owner.email, p.cover_photo_path, p.github_repo, p.figma_link, p.trello_link, c.id;
      `,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Get a project by its id
const getProjectById = async (project_id) => {
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

// Get all join requests for projects that a user owns
const getPendingJoinRequests = async (project_id, user_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM join_requests
      WHERE project_id = $1
      AND user_id = $2
      ORDER BY created_at DESC`,
      [project_id, user_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Get the number of participants in a project
const projectFull = async (project_id) => {
  try {
    const data = await db.query(
      `SELECT COUNT(*) FROM projects_participants
      WHERE project_id = $1`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

//Update a project when it is completed; only the owner can do this
const projectCompleted = async (project_id) => {
  try {
    const data = await db.query(
      `UPDATE projects
      SET is_in_progress = false
      WHERE id = $1
      RETURNING *`,
      [project_id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Update cover_photo_path
const updateCoverPhoto = async (project_id, cover_photo_path) => {
  try {
    const data = await db.query(
      `UPDATE projects
      SET cover_photo_path = $2
      WHERE id = $1
      RETURNING *`,
      [project_id, cover_photo_path]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

// Update github_repo
const updateGithubRepo = async (project_id, github_repo) => {
  try {
    const data = await db.query(
      `UPDATE projects
      SET github_repo = $2
      WHERE id = $1
      RETURNING *`,
      [project_id, github_repo]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

// Update figma_link
const updateFigmaLink = async (project_id, figma_link) => {
  try {
    const data = await db.query(
      `UPDATE projects
      SET figma_link = $2
      WHERE id = $1
      RETURNING *`,
      [project_id, figma_link]
    );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

// Update trello_link
const updateTrelloLink = async (project_id, trello_link) => {
  try {
    const
      data = await db.query(
        `UPDATE projects
      SET trello_link = $2
      WHERE id = $1
      RETURNING *`,
        [project_id, trello_link]
      );
    return data.rows[0];
  }
  catch (error) {
    console.log(error);
  }
};

export { 
  getAllProjects, 
  createNewProject, 
  getProjectPage, 
  getProjectsIdsIAmIn, 
  getProjectsIAmInById, 
  getProjectsOwnedByMe, 
  getProjectById, 
  getPendingJoinRequests, 
  projectFull, 
  getAllProjectsById, 
  projectCompleted,
  updateCoverPhoto,
  updateGithubRepo,
  updateFigmaLink,
  updateTrelloLink
};