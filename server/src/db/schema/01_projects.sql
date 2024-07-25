DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  owner_id INT NOT NULL,
  max_participants INT NOT NULL,
  github_repo VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_accepting_users BOOL DEFAULT TRUE,
  is_in_progress BOOL DEFAULT TRUE,
  to_do_list_id INT,
  group_chat_id INT
);