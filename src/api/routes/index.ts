import { Router } from "express";
import errorHandler from "../middleware/errorHandler";
import notFound from "../middleware/notFound";

import market from "./market";
import health from "./health";
import orders from "./orders";

const router: Router = Router();
router.use("/market/", market);
router.use("/orders/", orders);
router.use("/health", health);

router.use(errorHandler);
router.get("*", notFound);

export = router;
