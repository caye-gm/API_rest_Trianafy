import { Router } from 'express';
import { listsController } from '../controllers/lists';



const router = Router();

router.get('/', listsController.allLists)
router.get('/:id', listsController.allListsID)


export default router;