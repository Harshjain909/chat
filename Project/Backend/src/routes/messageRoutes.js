import express from 'express'
import { protectRoute } from '../Middlewares/authMiddleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../Controllers/messageController.js';
 
const router = express.Router();

router.get('/users',protectRoute,getUsersForSidebar); // shows all users on sidebar

router.get('/:id',protectRoute, getMessages);

router.post('/send/:id',protectRoute, sendMessage);


export default router;