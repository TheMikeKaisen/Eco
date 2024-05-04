import express from 'express';
import UserRoute from './routes/User.Route.js';
const PORT = 3000;
const app = express();
// Routes
app.use('/api/v1/user', UserRoute);
app.listen(PORT, () => {
    console.log(`Express is working on port : ${PORT}`);
});
