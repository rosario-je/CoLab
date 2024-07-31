DROP TABLE IF EXISTS chat_participants CASCADE;

CREATE TABLE chat_participants (
  id SERIAL PRIMARY KEY,
  chat_room_id INT NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);