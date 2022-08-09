CREATE TABLE tokens (
  id serial NOT NULL PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES users(id),
  token text NOT NULL UNIQUE,
  status boolean NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);