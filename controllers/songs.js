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

        let songs = await songsRepository.findById(req.params.id);
        if (songs != undefined) {
            res.json(songs);
        } else {
            res.sendStatus(404);
        }

    },
    nuevoSong: async (req, res) => {
        
        let songs = await songsRepository.create({
            
            title: req.body.title,
            artist: req.body.artist,
            album:req.body.album,
            year:req.body.year,
            
        })
        res.status(201).json(songs);
    }




};

export  {
    songController
}