CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE urls (
  id serial NOT NULL PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES users(id),
  url text NOT NULL,
  "shortUrl" text NOT NULL UNIQUE,
  "visitCount" integer NOT NULL DEFAULT 0,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE tokens (
  id serial NOT NULL PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES users(id),
  token text NOT NULL UNIQUE,
  status boolean NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);