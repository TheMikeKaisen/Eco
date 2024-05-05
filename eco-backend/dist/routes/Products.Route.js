import express from 'express';
import { latestProducts, newProduct } from '../controllers/Product.controller.js';
import { adminOnly } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';
const ProductRouter = express.Router();
//get
ProductRouter.get('/latest', latestProducts);
// protected route
ProductRouter.post('/new', adminOnly, singleUpload, newProduct);
export default ProductRouter;
