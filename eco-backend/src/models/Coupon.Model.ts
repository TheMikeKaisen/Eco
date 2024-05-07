import mongoose, { Schema } from "mongoose";

const CouponSchema = new Schema({
    code: {
        type:String, 
        required: [true, "Enter the coupon code"], 
        unique: true
    },
    amount: {
        type: Number, 
        required: [true, "Enter the Discount Amount"]
    }

})

const Coupon = mongoose.model("Coupon", CouponSchema)
export default Coupon