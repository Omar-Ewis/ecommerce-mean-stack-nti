// controllers/reports.controller.js أو .ts حسب مشروعك
import { asyncHandler } from "../../utils/response.js";
import { orderModel } from "../../database/models/Order.model.js";

export const getSalesReport = asyncHandler(async (req, res, next) => {
const report = await orderModel.aggregate([
    {
        $match: {
            isDeleted: false,
        },
        },
        {
        $facet: {
            summary: [
            {
                $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalSales: { $sum: "$total" },
                totalQuantitySold: {
                    $sum: {
                    $sum: "$orderItems.quantity",
                    },
                },
                },
            },
            ],
            topProducts: [
            { $unwind: "$orderItems" },
            {
                $group: {
                _id: "$orderItems.productId",
                quantitySold: { $sum: "$orderItems.quantity" },
                totalRevenue: {
                    $sum: {
                    $multiply: ["$orderItems.price", "$orderItems.quantity"],
                    },
                },
                },
            },
            {
                $lookup: {
                from: "products", // ✅ collection name
                localField: "_id",
                foreignField: "_id",
                as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                _id: 0,
                productId: "$product._id",
                name: "$product.name",
                imageURL: "$product.imageURL",
                quantitySold: 1,
                totalRevenue: 1,
                },
            },
            { $sort: { quantitySold: -1 } },
            { $limit: 5 },
            ],
            topCustomers: [
            {
                $group: {
                _id: "$userId",
                totalSpent: { $sum: "$total" },
                totalOrders: { $sum: 1 },
                },
            },
            {
                $lookup: {
                from: "users", // ✅ collection name
                localField: "_id",
                foreignField: "_id",
                as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                _id: 0,
                userId: "$user._id",
                name: "$user.name",
                phone: "$user.phone",
                totalSpent: 1,
                totalOrders: 1,
                },
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
            ],
            monthlySales: [
            {
                $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                totalSales: { $sum: "$total" },
                totalOrders: { $sum: 1 },
                },
            },
            {
                $project: {
                month: {
                    $concat: [
                    { $toString: "$_id.month" },
                    "-",
                    { $toString: "$_id.year" },
                    ],
                },
                totalSales: 1,
                totalOrders: 1,
                _id: 0,
                },
            },
            { $sort: { month: 1 } },
            ],
        },
        },
    ]);

    res.status(200).json({
        message: "Sales Report",
        data: report[0],
    });
});
