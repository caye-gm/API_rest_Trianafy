import { Router } from 'express';
import { songController } from '../controllers/songs';
import {token} from '../services/passport'


const router = Router();

router.get('/',token(), songController.allSongs)
router.get('/:id',token(), songController.allSongsID)
router.post('/',token(), songController.newSong)
router.delete('/:id',token(), songController.eliminarSong)
export default router;