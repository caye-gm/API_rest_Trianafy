import { songs,songsRepository } from '../models/songs';
import mongoose from 'mongoose';

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
    editarSong:async(req,res)=>{
        if(req.params.id!=undefined && mongoose.Types.ObjectId.isValid(req.params.id)){
            let song=await songsRepository.editSong(req.params.id,{
                title:req.body.title,
                artist:req.body.artist,
                album:req.body.album,
                year:req.body.year
            });
            if(song==undefined){
                res.sendStatus(404);
            }else{
                res.sendStatus(204);
            }
        }else{
            res.sendStatus(409);
        }
    }
};
export  {
    songController
}