CREATE TABLE "users"(
    idUser SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "sessions"(
    idSession  SERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(idUser),
    "createdAt" TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE "url"(
    idUrl SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "urlShort" TEXT NOT NULL UNIQUE,
    "countVisit" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL REFERENCES users(idUser),
    "createdAt" TIMESTAMP DEFAULT NOW()
);

