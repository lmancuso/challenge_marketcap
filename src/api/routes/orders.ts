import { Router } from 'express';

import getPrices from '../controller/orders';

const router: Router = Router();

router.get('/:pair/prices', getPrices);

export = router;
