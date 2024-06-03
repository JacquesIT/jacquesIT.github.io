import {Router} from 'express';
import {checkLogin} from "../controllers/login_controller.js"

const router = Router();

router.post('/', checkLogin)

export default router;
