import { rankingRepository } from "../repositories/rankingRepository.js";

export async function getRanking(req, res) {

  try {
    const rankingResult = await rankingRepository.getRanking();
    const ranking = rankingResult.rows

    res.status(200).send(ranking);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}