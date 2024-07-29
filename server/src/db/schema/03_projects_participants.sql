DROP TABLE IF EXISTS projects_participants CASCADE;

CREATE TABLE projects_participants (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  participant_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);