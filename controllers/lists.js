import { lists,listsRepository } from '../models/lists';


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

        let lists = await listsRepository.create({
            
            name: req.body.name,
            description: req.body.description,
            user:req.user.id,
            songs:req.body.songs,
            
        })
        res.status(201).json(lists);
    },
    eliminarListaReproduccion: async (req, res) => {
        let resul = await listsRepository.deleteList(req.params.id, req.user.id);
        resul.deletedCount>0 ? res.sendStatus(204) : res.sendStatus(404)
    },




};

export  {
    listsController
}