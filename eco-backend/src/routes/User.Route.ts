import express from 'express'
import { newUser } from '../controllers/User.controller.js';

const UserRoute = express.Router()

UserRoute.get('/new', newUser)


export default UserRoute;