import database from "../config/database.js";

async function postURL(userId, url, shortUrl) {
  return database.query(
    `INSERT INTO 
      urls ("userId" ,url, "shortUrl") 
    VALUES 
      ($1, $2, $3)`,
    [userId, url, shortUrl]
  );
};

async function getURL(id) {
  return database.query(
    `SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]
  );
};

async function selectOpenURL(shortUrl) {
  const whereClause = `WHERE "shortUrl" = $1`;
  return database.query(
    `SELECT url FROM urls ${whereClause}`, [shortUrl]
  );
};

async function insertOpenURL(shortUrl) {
  const whereClause = `WHERE "shortUrl" = $1`;
  return database.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 ${whereClause}`, [shortUrl]
  );
};

async function selectDeleteURL(id) {
  return database.query(
    `SELECT * FROM urls WHERE id = $1`, [id]
  );
};

async function deleteURL(id) {
  return database.query(`DELETE FROM urls WHERE id = $1`, [id]);
};

export const urlsRepository = {
  postURL,
  getURL,
  selectOpenURL,
  insertOpenURL,
  selectDeleteURL,
  deleteURL
};