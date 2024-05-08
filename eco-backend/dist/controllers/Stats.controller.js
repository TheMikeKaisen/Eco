import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/Order.Model.js";
import { Product } from "../models/Product.Model.js";
import { User } from "../models/User.Model.js";
import { calculatePercentage } from "../utils/features.js";
export const dashboardStats = TryCatch(async (req, res, next) => {
    let stats = {};
    if (myCache.has("admin-stats")) {
        stats = JSON.parse(myCache.get("admin-stats"));
    }
    else {
        const today = new Date();
        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
        const thisMonth = {
            start: new Date(today.getFullYear(), today.getMonth(), 1), // date of start of current month
            end: today,
        };
        const lastMonth = {
            start: new Date(today.getFullYear(), today.getMonth() - 1, // last month
            1), // date of start of last month
            end: new Date(today.getFullYear(), today.getMonth(), 0), // date of start of last month
        };
        const thisMonthProductsPromise = Product.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const lastMonthProductsPromise = Product.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end,
            },
        });
        const thisMonthUserPromise = User.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const lastMonthUsersPromise = User.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end,
            },
        });
        const thisMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const lastMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end,
            },
        });
        const lastSixMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: sixMonthAgo,
                $lte: today,
            },
        });
        const latestTransactionPromise = Order.find({})
            .select(["orderItems", "discount", "total", "status"])
            .limit(4);
        const [thisMonthProducts, thisMonthOrders, thisMonthUsers, lastMonthOrders, lastMonthProducts, lastMonthUsers, productsCount, UsersCount, allOrders, lastSixMonthOrders, categories, femaleUserCount, maleUserCount, latestTransaction,] = await Promise.all([
            thisMonthProductsPromise,
            thisMonthOrdersPromise,
            thisMonthUserPromise,
            lastMonthOrdersPromise,
            lastMonthProductsPromise,
            lastMonthUsersPromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total"),
            lastSixMonthOrdersPromise,
            Product.distinct("category"),
            User.countDocuments({ gender: "female" }),
            User.countDocuments({ gender: "male" }),
            latestTransactionPromise
        ]);
        const thisMonthRevenue = thisMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
        const lastMonthRevenue = lastMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
        const changePercent = {
            revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
            product: calculatePercentage(thisMonthProducts.length, lastMonthProducts.length),
            user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
            order: calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
        };
        const revenue = allOrders.reduce((total, order) => total + (order.total || 0), 0);
        const count = {
            revenue,
            products: productsCount,
            users: UsersCount,
            orders: allOrders.length,
        };
        const orderMonthCounts = new Array(6).fill(0);
        const monthlyRevenue = new Array(6).fill(0);
        lastSixMonthOrders.forEach((order) => {
            const creationDate = order.createdAt;
            const monthDiff = today.getMonth() - creationDate.getMonth();
            if (monthDiff < 6) {
                orderMonthCounts[5 - monthDiff] += 1;
                monthlyRevenue[5 - monthDiff] += order.total;
            }
        });
        const categoriesCountPromise = await categories.map(async (element) => Product.countDocuments({ category: element }));
        let categoriesCount = await Promise.all(categoriesCountPromise);
        const categoryCount = [];
        // calculating the percentage of each category.
        categories.forEach((category, i) => {
            categoryCount.push({
                [category]: Math.round((categoriesCount[i] / productsCount) * 100), // without square brackets, category would be read as a string.
            });
        });
        const userRatio = {
            male: maleUserCount,
            female: femaleUserCount,
        };
        const modifiedLatestTransaction = latestTransaction.map((i) => ({
            _id: i._id,
            discount: i.discount,
            amount: i.total,
            quantity: i.orderItems.length,
            status: i.status
        }));
        stats = {
            categoryCount,
            categoriesCount,
            changePercent,
            count,
            chart: {
                orderMonthCounts,
                monthlyRevenue,
            },
            userRatio,
            latestTransaction: modifiedLatestTransaction,
        };
        myCache.set('admin-stats', JSON.stringify(stats));
    }
    return res.status(200).json({
        success: true,
        stats,
    });
});
export const getPieCharts = TryCatch(async (req, res, next) => { });
export const getBarCharts = TryCatch(async (req, res, next) => { });
export const getLineCharts = TryCatch(async (req, res, next) => { });
