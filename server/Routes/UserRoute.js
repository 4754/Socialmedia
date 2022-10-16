import express from 'express';

import { getUser, updateUser, deleteUser, followUser, unFollowUser, getAllUsers} from '../Controllers/UserController.js';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';
const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id' ,updateUser);
router.delete('/:id',deleteUser);
router.put('/:id/follow',followUser);
router.put('/:id/unfollow', unFollowUser);



export default router;