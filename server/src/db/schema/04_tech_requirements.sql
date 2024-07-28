DROP TABLE IF EXISTS tech_requirements CASCADE;

CREATE TABLE tech_requirements (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tech_name VARCHAR NOT NULL
);