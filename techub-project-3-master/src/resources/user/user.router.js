import {Router} from "express";
import {index, store} from './user.controller';

const router = new Router();

router.get('/', index);
router.post('/', store);

export default router;