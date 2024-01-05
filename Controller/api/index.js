import { Router } from 'express';
const router = Router();
import userApi from './user-api.js';
import postApi from './post-api.js';
import commentApi from './comments-api.js';


router.use('/users', userApi);
router.use('/posts', postApi);
router.use('/comments', commentApi);

export default router ;
