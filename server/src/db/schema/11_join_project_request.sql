DROP TABLE IF EXISTS join_requests CASCADE;

CREATE TABLE join_requests (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  is_accepted BOOLEAN DEFAULT FALSE
);