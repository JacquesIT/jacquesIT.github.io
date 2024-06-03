import {Router} from 'express';
import {getAllUsers, getUserByEmail, addUser, deleteUser, updateUser} from "../controllers/user_controller.js"
import { isLoggedIn } from "../middleware/authenticate.js"

const router = Router();

router.get('/', getAllUsers)
router.get('/:email', getUserByEmail)
router.post('/', addUser)
router.patch('/:email',  isLoggedIn, updateUser)
router.delete('/:email', isLoggedIn, deleteUser)

export default router;
