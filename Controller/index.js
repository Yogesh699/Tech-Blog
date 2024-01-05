import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import homeRoutes from './home.js';
import dashboardRoutes from './dashboard.js';

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
