DROP TABLE IF EXISTS group_chat_messages CASCADE;

CREATE TABLE group_chat_messages (
  id SERIAL PRIMARY KEY,
  chat_room_id INT NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);