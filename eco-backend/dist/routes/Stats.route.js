import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { dashboardStats, getBarCharts, getLineCharts, getPieCharts } from '../controllers/Stats.controller.js';
const dashboardRoute = express.Router();
// Charts
dashboardRoute.get('/stats', adminOnly, dashboardStats);
dashboardRoute.get('/pie', adminOnly, getPieCharts);
dashboardRoute.get('/bar', adminOnly, getBarCharts);
dashboardRoute.get('/line', adminOnly, getLineCharts);
export default dashboardRoute;
