import signUpRepository from "../repositories/signUpRepository";
import urlsRepository from '../repositories/urlsRepository.js';

async function getUserById(req, res) {
    
        const {id} = req.params;
        const {user} = res.locals;

        if (id != user.id) {
            return res.sendStatus(401);
        }

        try {
            const resultVisit = await urlsRepository.getVisitCountByUser(id);//tem que implementar
            const [countVisit] = resultVisit.rows;

            const resultUrls = await urlsRepository.getURLSbyUser(id);//tem que implementar
            const userUrls = resultUrls.rows;

            res.send({
                id: user.id,
                name: user.name,
                countVisit: countVisit.sum || 0,
                shortenedUrls: userUrls
            });

        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
 }
    async function getRanking(req, res) {
        try { 
            const resultRank = await signUpRepository.getUrlsRankingByUser();//tem que implementar
            res.send(resultRank.rows);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500); // server error
        }
    }

    const userController = {
        getUserById,
        getRanking
    }

    export default userController;
