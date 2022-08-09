import database from "../config/database.js";

async function getRanking() {
  return database.query(
    `SELECT 
      us.id, 
      us.name, 
      COALESCE(COUNT(ur."id")::INTEGER, 0) as "linksCount", 
      COALESCE(SUM(ur."visitCount")::INTEGER, 0) as "visitCount" 
    FROM 
      users us
      LEFT JOIN urls ur ON ur."userId" = us.id
    GROUP BY 
      us.id
    ORDER BY 
    "visitCount" DESC, "linksCount" DESC
    LIMIT 10`
  );
};

export const rankingRepository = {
  getRanking
};