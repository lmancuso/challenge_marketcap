import { Router } from 'express';
import health from '../controller/health';

const router: Router = Router();

router.get('/ready', health);
router.get('/live', health);
router.get('/', health);

export = router;
