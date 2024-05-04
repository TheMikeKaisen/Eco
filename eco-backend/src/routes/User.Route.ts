import express from 'express'
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/User.controller.js';
import { adminOnly } from '../middlewares/auth.js';

const UserRoute = express.Router()


// post routes
UserRoute.post('/new', newUser)

// protected routes
UserRoute.get('/all',  adminOnly, getAllUsers)   //get
UserRoute.delete('/:id',adminOnly, deleteUser)  //delete

// dynamic routes
UserRoute.get('/:id', getUser);

export default UserRoute;