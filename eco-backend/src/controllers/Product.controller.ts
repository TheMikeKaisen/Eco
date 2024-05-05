import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/Product.Model.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
    async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
        const {name, price, stock, category} = req.body;
        
        const photo = req.file;
        if(!photo){
            return next(new ErrorHandler("photo not defined", 400))
        }

        if(!name || !price || !stock || !category){

            // if any of the fields is empty, then delete the photo uploaded.
            rm(photo.path, ()=> {
                console.log("Deleted!")
            })
            return next(new ErrorHandler("empty fields", 400))
        }

    const newProduct = await Product.create({
        name, 
        category: category.toLowerCase(),
        stock, 
        price,
        photo: photo.path
    })

    if(!newProduct){
        return next(new ErrorHandler("Error while creating product", 500))
    }

    return res.status(201).json({
        success: true, 
        message: "Product created successfully"
    })
  }
);

export const latestProducts = TryCatch(
    async (req, res, next) => {
        
        const latest = await Product.find({}).sort({createdAt: -1})

        if(!latest){
            return next(new ErrorHandler("could not get the products", 500))
        }
    return res.status(201).json({
        success: true, 
        latest
    })
  }
);
