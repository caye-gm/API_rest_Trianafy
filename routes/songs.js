import { Router } from 'express';
import { songController } from '../controllers/songs';



const router = Router();

router.get('/', songController.allSongs)
router.get('/:id', songController.allSongsID)


export default router;