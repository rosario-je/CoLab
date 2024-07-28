DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  max_participants INT NOT NULL,
  cover_photo_path VARCHAR DEFAULT NULL,
  github_repo VARCHAR DEFAULT NULL,
  figma_link VARCHAR DEFAULT NULL,
  trello_link VARCHAR DEFAULT NULL,
  is_accepting_users BOOL DEFAULT TRUE,
  is_in_progress BOOL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);