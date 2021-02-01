import { lists,listsRepository } from '../models/lists';
import mongoose from 'mongoose';

const listsController = {

    allLists: async (req, res) => {
        const data = await listsRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },
    allListsID: async (req, res) => {

        let user = await listsRepository.findById(req.params.id);
        if (user != undefined) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }

    },
    newList: async (req, res) => {
        try{
            let listaNueva = await listsRepository.create({
                name: req.body.name,
                description: req.body.description,
                user_id: req.user.id
            });
            res.status(201).json(listaNueva);
        }catch(error){
            res.status(400).json({Error:`Se ha producido un error con su peticion :${error.message}`})
        }   
    },
    eliminarList: async (req, res) => {
        let resul = await listsRepository.deleteList(req.params.id, req.user.id);
        resul.deletedCount>0 ? res.sendStatus(204) : res.sendStatus(404)
    },

    editarList:async(req,res)=>{
        if(req.params.id!=undefined && mongoose.Types.ObjectId.isValid(req.params.id)){
            let list=await listsRepository.editList(req.params.id,{
                name:req.body.name,
                description:req.body.description,
                user_id:req.body.user_id,
                songs:req.body.songs
            });
            if(list==undefined){
                res.sendStatus(404);
            }else{
                res.sendStatus(204);
            }
        }else{
            res.sendStatus(409);
        }
    },
    updateList: async (req, res) => {
        if (req.params.id != undefined && mongoose.Types.ObjectId.isValid(req.params.id)) {
            let newList = await listsRepository.updateList(req.params.id, {
                name: req.body.name,
                description: req.body.description
            }, req.user.id);
            if (newList == undefined) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        } else {
            res.sendStatus(400);
        }
    },

    songOfList: async (req, res) => {
        console.log(req.user.id);
        let songs = await listsRepository.songOfList(req.params.idList, req.params.idSong, req.user.id);
        songs != null ? res.json(songs) : res.status(404).json({Error:"Not found"});
    },
    songsOfList: async (req, res) => {
        console.log(req.user.id);
        let songs = await listsRepository.songsOfList(req.params.idList, req.user.id);
        songs != null ? res.json(songs) : res.status(404).json({Error:"Not found"});
    },
    deleteSongOfList: async (req, res) => {
        let resul = await listsRepository.deleteSongOfList(req.params.idList, req.params.idSong, req.user.id);
        resul != null ? res.sendStatus(204) : res.sendStatus(404);
    },
    addSongOfList: async (req, res) => {
        let add = await listsRepository.addSongOfList(req.params.idList, req.params.idSong, req.user.id);
        add != null ? res.json(add) : res.sendStatus(404);
    }

};

export  {
    listsController
}