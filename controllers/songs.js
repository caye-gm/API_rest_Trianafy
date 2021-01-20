import { songs,songsRepository } from '../models/songs';


const songController = {

    allSongs: async (req, res) => {
        const data = await songsRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },
    allSongsID: async (req, res) => {

        let user = await songsRepository.findById(req.params.id);
        if (user != undefined) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }

    },




};

export  {
    songController
}