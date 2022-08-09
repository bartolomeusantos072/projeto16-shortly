CREATE TABLE urls (
  id serial NOT NULL PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES users(id),
  url text NOT NULL,
  "shortUrl" text NOT NULL UNIQUE,
  "visitCount" integer NOT NULL DEFAULT 0,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);