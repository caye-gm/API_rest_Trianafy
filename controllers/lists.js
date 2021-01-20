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




};

export  {
    listsController
}