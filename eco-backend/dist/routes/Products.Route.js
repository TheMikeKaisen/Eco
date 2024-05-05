import express from "express";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getSingleProduct, latestProducts, newProduct, updateSingleProduct, } from "../controllers/Product.controller.js";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
const ProductRouter = express.Router();
//get
ProductRouter.get("/latest", latestProducts); // latest 5 products
ProductRouter.get("/categories", getAllCategories); // distinct categories
ProductRouter.get("/all", getAllProducts); // search for all the products with filter.
// protected route
ProductRouter.get("/admin-products", adminOnly, getAdminProducts); // admin can access all the products
ProductRouter.post("/new", adminOnly, singleUpload, newProduct); // create new product
ProductRouter.route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateSingleProduct)
    .delete(adminOnly, deleteProduct);
export default ProductRouter;
