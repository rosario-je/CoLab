DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  max_participants INT NOT NULL,
  github_repo VARCHAR DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_accepting_users BOOL DEFAULT TRUE,
  is_in_progress BOOL DEFAULT TRUE
);