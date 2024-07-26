import db from '../connection.js';

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

export { addOwnerToProject };