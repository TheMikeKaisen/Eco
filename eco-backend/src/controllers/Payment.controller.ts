import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import Coupon from "../models/Coupon.Model.js";
import ErrorHandler from "../utils/utility-class.js";



export const newCoupon = TryCatch(async(req, res, next) => {
    const {code, amount} = req.body


    if(!code || !amount){
        return next(new ErrorHandler("coupon/amount not found", 404))
    }

    const couponExists = await Coupon.findOne({code: code})
    if(couponExists){
        return next(new ErrorHandler("Coupon already Exists", 400))
    }

    const newCoupon = await Coupon.create({
        code,
        amount
    })

    return res.status(200).json({
        success: true, 
        message: `Coupon ${code} created successfully`, 
        newCoupon
    })

    
})

export const applyDiscount = TryCatch(async(req, res, next) => {
    const {coupon} = req.query;
    const discount = await Coupon.findOne({code: coupon})

    if(!discount){
        return next ( new ErrorHandler("invalid coupon code", 400))
    }


    return res.status(200).json({
        success: true, 
        discount: discount.amount,
    })

    
})

export const allCoupon = TryCatch(async(req, res, next) => {
    

    const coupons = await Coupon.find({})

    if(!coupons){
        return next ( new ErrorHandler("No discount found", 400))
    }


    return res.status(200).json({
        success: true, 
        coupons
    })

    
})

export const deleteCoupon = TryCatch(async(req, res, next) => {
    
    const {id} = req.params;

    const coupon = await Coupon.findById(id);
    if(!coupon){
        return next(new ErrorHandler("Coupon not found", 404))
    }

    await coupon.deleteOne();

    return res.status(200).json({
        success: true, 
        message: `Coupon ${coupon.code} deleted successfully!`
    })

    
})

export const createPaymentIntent = TryCatch(async(req, res, next)=>{
    const {amount} = req.body

    if(!amount){
        return next(new ErrorHandler("amount not found", 404))
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount)*100, // takes amount value in smallest unit(here, paise)... 1 rupee = 100 paise
        currency: "inr"
    })

    return res.status(200).json({
        success: true, 
        clientSecret: paymentIntent.client_secret
    })

})

