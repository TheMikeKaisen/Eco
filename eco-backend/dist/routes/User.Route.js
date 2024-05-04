import express from 'express';
import { newUser } from '../controllers/User.controller.js';
const UserRoute = express.Router();
UserRoute.get('/', (req, res, next) => res.status(200).json({ message: 'welcome' }));
UserRoute.post('/new', newUser);
export default UserRoute;
