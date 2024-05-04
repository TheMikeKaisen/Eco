import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/User.controller.js';
const UserRoute = express.Router();
// get routes
UserRoute.get('/all', getAllUsers);
// post routes
UserRoute.post('/new', newUser);
//delete routes
UserRoute.delete('/:id', deleteUser);
// dynamic routes
UserRoute.get('/:id', getUser);
export default UserRoute;
