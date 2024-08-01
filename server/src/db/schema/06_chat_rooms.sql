DROP TABLE IF EXISTS chat_rooms CASCADE;

CREATE TABLE chat_rooms (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);