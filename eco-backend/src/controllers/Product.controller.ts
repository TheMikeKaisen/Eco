import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/Product.Model.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;
    if (!photo) {
      return next(new ErrorHandler("photo not defined", 400));
    }

    if (!name || !price || !stock || !category) {
      // if any of the fields is empty, then delete the photo uploaded.
      rm(photo.path, () => {
        console.log("Deleted!");
      });
      return next(new ErrorHandler("empty fields", 400));
    }

    const newProduct = await Product.create({
      name,
      category: category.toLowerCase(),
      stock,
      price,
      photo: photo.path,
    });

    invalidateCache({product: true, admin: true}) // deleted the stored cache

    if (!newProduct) {
      return next(new ErrorHandler("Error while creating product", 500));
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      newProduct
    });
  }
);

export const latestProducts = TryCatch(async (req, res, next) => {

  let latest;

  if(myCache.has("latest-products")){
    latest = JSON.parse(myCache.get("latest-products") as string)
  }
  else{
    latest = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    if (!latest) {
      return next(new ErrorHandler("could not get the products", 500));
    }
    myCache.set("latest-products",  JSON.stringify(latest))
  }

    
    
    
  return res.status(201).json({
    success: true,
    latest,
  });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;
  if(myCache.has("categories")){
    categories = JSON.parse(myCache.get("categories") as string)
  } else{

    categories = await Product.distinct("category");
    if (!categories) {
      return next(new ErrorHandler("could not get categories", 500));
    }
    myCache.set("categories", JSON.stringify(categories));
  }
  return res.status(201).json({
    success: true,
    categories,
  });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;
  if(myCache.has("adminProducts")){
    products = JSON.parse(myCache.get("adminProducts") as string)
  } else {

    products = await Product.find({});
    
    if (!products) {
      return next(new ErrorHandler("could not get the products", 500));
    }
    myCache.set("adminProducts", JSON.stringify(products))
  }
  return res.status(201).json({
    success: true,
    products,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("id not specified", 400));
  }
  let product;

  if(myCache.has(`product-${id}`)){
    product = JSON.parse(myCache.get(`product-${id}`) as string)
  }else{

    product = await Product.findById(id);
    
    if (!product) {
      return next(new ErrorHandler("could not get the product", 500));
    }
    myCache.set(`product-${id}`, JSON.stringify(product))
  }
  return res.status(201).json({
    success: true,
    product,
  });
});

export const updateSingleProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("id not found", 404));
  }
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const { name, price, stock, category } = req.body;
  const photo = req.file;

  if (photo) {
    // incase a new photo is uploaded, then delete the path of old photo
    rm(product.photo!, () => {
      console.log("Deleted old photo");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock) product.stock = stock;

  await product.save();

  invalidateCache({product: true, productId: String(product._id), admin: true,})


  return res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("id not specified", 400));
  }
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("product not found.", 404));
  }
  rm(product.photo!, () => {
    console.log("photo deleted");
  });
  await product.deleteOne();

  invalidateCache({product: true, productId: String(product._id), admin: true})


  return res.status(201).json({
    success: true,
    message: "product successfully deleted!",
  });
});

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;

    const skip = (page - 1) * limit; // to skip the products for pagination

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search, // search for the keyword pattern in all elements
        $options: "i", // makes the search "case insensitive"
      };
    }

    if (price) {
      baseQuery.price = {
        $lte: Number(price), //returns all the products whose price is Lesser That Equal to the provided price
      };
    }

    if (category) baseQuery.category = category;

    const [] = await Promise.all([

    ])

    //products in one page
    const products = await Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 }) // sort based on product price
      .limit(limit) // limit the number of products in a page
      .skip(skip)

      // total number of filtered products
      const filteredOnlyProducts = await Product.find(baseQuery)
      
      //total pages required for filtered products
      const totalPage = Math.ceil(filteredOnlyProducts.length / limit)

      return res.status(200).json({
        success: true, 
        products, 
        totalPage, 
      })
  }
);
