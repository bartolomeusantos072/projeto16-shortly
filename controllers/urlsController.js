import { nanoid } from 'nanoid'
import { urlsRepository } from "../repositories/urlsRepository.js";

export async function postURL(req, res) {
  const { tokensResult: { userId } } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await urlsRepository.postURL(userId, url, shortUrl);
    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getURL(req, res) {
  const { id } = req.params;

  try {
    const urlsResult = await urlsRepository.getURL(id);

    if (urlsResult.rowCount === 0) return res.sendStatus(404);
    const url = urlsResult.rows[0];

    res.status(200).send(url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openURL(req, res) {
  const { shortUrl } = req.params;
  try {
    const urlsResult = await urlsRepository.selectOpenURL(shortUrl);

    if (urlsResult.rowCount === 0) return res.sendStatus(404);

    await urlsRepository.insertOpenURL(shortUrl);

    const { url } = urlsResult.rows[0];
    res.redirect(302, url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteURL(req, res) {
  const { tokensResult: { userId } } = res.locals;
  const { id } = req.params;

  try {
    const urlsResult = await urlsRepository.selectDeleteURL(id);

    if (urlsResult.rowCount === 0) return res.sendStatus(404);

    const { userId: urlUserId } = urlsResult.rows[0];
    if (urlUserId !== userId) return res.sendStatus(401);

    await urlsRepository.deleteURL(id);
    res.sendStatus(204)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
