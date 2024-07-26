DROP TABLE IF EXISTS project_participants CASCADE;

CREATE TABLE project_participants (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  participant_id INT REFERENCES temp_users(id) ON DELETE CASCADE,
  is_approved BOOLEAN DEFAULT FALSE,
  is_pending_join BOOLEAN DEFAULT FALSE
);