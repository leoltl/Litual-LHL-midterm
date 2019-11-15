DROP TABLE IF EXISTS orders CASCADE;
-- DROP TYPE IF EXISTS orderStatus CASCADE;

-- CREATE TYPE orderStatus AS ENUM ('pending', 'accepted', 'rejected', 'done');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id SMALLINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  deleted BOOLEAN DEFAULT FALSE,
  status orderStatus
);
