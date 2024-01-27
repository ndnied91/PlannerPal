import { Router } from 'express';
const router = Router();

import { getCurrentUser } from '../controllers/userController.js';

router.get('/current-user', getCurrentUser); //gets actual url from server.js

export default router;
