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
    newSong: async (req, res) => {
        
        let songs = await songsRepository.create({
            
            title: req.body.title,
            artist: req.body.artist,
            album:req.body.album,
            year:req.body.year,
            
        })
        res.status(201).json(songs);
    },
    eliminarSong: async (req, res) => {
        let resul = await songsRepository.deleteSong(req.params.id, req.user.id);
        resul.deletedCount>0 ? res.sendStatus(204) : res.sendStatus(404)
    },




};

export  {
    songController
}