DROP TABLE IF EXISTS shares CASCADE;

CREATE TABLE shares (
  owner_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  todo_id INTEGER REFERENCES todos(id) ON DELETE CASCADE NOT NULL,
  CONSTRAINT PK_Shares PRIMARY KEY (owner_user_id, receiver_user_id, todo_id)
);
