import { Router } from 'express';
import { listsController } from '../controllers/lists';
import {token} from '../services/passport'


const router = Router();

router.get('/',token(), listsController.allLists)
router.get('/:id',token(), listsController.allListsID)


export default router;