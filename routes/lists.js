import { Router } from 'express';
import { listsController } from '../controllers/lists';
import {token} from '../services/passport'


const router = Router();

router.get('/',token(), listsController.allLists)
router.get('/:id',token(), listsController.allListsID)
router.post('/',token(), listsController.newList)
router.post('/:idList/songs/:idSong',token(),listsController.addSongOfList)
router.delete('/:id',token(),listsController.eliminarList);
router.get('/:idList/songs/:idSong',token(),listsController.songOfList);
router.get('/:idList/songs/',token(),listsController.songsOfList);
router.delete('/:idList/songs/:idSong',token(),listsController.deleteSongOfList);
router.put('/:id',token(),listsController.updateList);

export default router;