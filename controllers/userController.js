import { usersRepository } from "../repositories/usersRepository.js";

export async function getUser(req, res) {
  const { tokensResult: { userId } } = res.locals;
  const { id } = req.params;

  try {
    const usersResult = await usersRepository.getUser(id);

    if (usersResult.rowCount === 0) return res.sendStatus(404);
    if (userId !== parseInt(id)) return res.sendStatus(401);

    const shortenUrlResult = await usersRepository.getUserShortenURL(id);

    res.status(200).send(_createJSONUrl(usersResult, shortenUrlResult));
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

function _createJSONUrl(user, urls) {
  const { id, name, visitCount } = user.rows[0];
  const shortenedUrls = [];

  urls.rows.map(obj => {
    const { id, shortUrl, url, visitCount } = obj
    shortenedUrls.push({ id, shortUrl, url, visitCount });
  });

  const userReturn = {
    id, name, visitCount, shortenedUrls
  }

  return (userReturn);
}
