import { asyncHandler } from "../../utils/response.js";
import { cartModel } from "../../database/models/Cart.model.js";
import { orderModel } from "../../database/models/Order.model.js";
import { userModel } from "../../database/models/User.model.js";
import {productModel} from "../../database/models/Product.model.js";

export const placeOrder = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return next(new Error("Your cart is empty", { cause: 400 }));
        }
        const user = await userModel.findById(userId);
        const shippingAddress = req.body.shippingAddress;
        if (!shippingAddress || !shippingAddress.city || !shippingAddress.street) {
            return next(new Error("Shipping address is required", { cause: 400 }));
        }
        const orderItems = cart.items.map(({ productId, quantity }) => ({
            productId: productId._id,
            name: productId.name,
            imageURL: productId.imageURL,
            price: productId.price,
            quantity,
        }));
        for (const item of cart.items) {
            const product = item.productId;
            if (product.quantity < item.quantity) {
            return next(new Error(`Not enough stock for "${product.name}". Only ${product.quantity} left.`, { cause: 400 }));
            }
            product.quantity -= item.quantity;
            await product.save();
        }
        const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingFee = subtotal >= 1000 ? 0 : 50;
        const total = subtotal + shippingFee;
        const order = await orderModel.create({
            userId,
            orderItems,
            shippingAddress, 
            subtotal,
            shippingFee,
            total,
            paymentMethod: "COD",
            paymentStatus: "pending",
            status: "pending",
            statusHistory: [{ status: "pending", note: "Order placed" }],
        });
        cart.items = [];
        await cart.save();
        return res.status(201).json({ message: "Order placed successfully", data: order });
    }
);

export const getMyOrders = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const orders = await orderModel.find({ userId, isDeleted: false })
            .sort({ createdAt: -1 }) 
            .select("-__v"); 
        return res.status(200).json({message: "Orders retrieved successfully",count: orders.length,data: orders,});
    }
);

export const getOrderById = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const { id } = req.params;
        const order = await orderModel.findOne({ _id: id, userId, isDeleted: false });
        if (!order) {
            return next(new Error("Order not found", { cause: 404 }));
        }
        return res.status(200).json({ message: "Order found", data: order });
    }
);

export const cancelOrder = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const { id } = req.params;
        const order = await orderModel.findOne({ _id: id, userId, isDeleted: false });
        if (!order) {
            return next(new Error("Order not found", { cause: 404 }));
        }
        if (["shipped", "delivered", "cancelled"].includes(order.status)) {
            return next(new Error(`Cannot cancel order with status '${order.status}'`, { cause: 400 }));
        }
        order.status = "cancelled";
        order.statusHistory.push({ status: "cancelled", note: "Cancelled by user" });
        await order.save();
        return res.status(200).json({ message: "Order cancelled", data: order });
    }
);

export const getAllOrders = asyncHandler(
    async (req, res, next) => {
        const orders = await orderModel.find({ isDeleted: false }).populate("userId", "name email phone").sort({ createdAt: -1 });
        return res.status(200).json({message: "All orders retrieved",count: orders.length,data: orders,});
    }
);

export const updateOrderStatus = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { newStatus, note } = req.body;
        const allowed = ["pending", "preparing", "ready", "shipped", "delivered", "cancelled"];
        if (!allowed.includes(newStatus)) {
            return next(new Error("Invalid status value", { cause: 400 }));
        }
        const order = await orderModel.findById(id);
        if (!order || order.isDeleted) {
            return next(new Error("Order not found", { cause: 404 }));
        }
        order.status = newStatus;
        order.statusHistory.push({ status: newStatus, note });
        await order.save();
        return res.status(200).json({ message: `Order updated to ${newStatus}`, data: order });
    }
);
export const softDeleteOrder = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        if (!order || order.isDeleted) {
            return next(new Error("Order not found", { cause: 404 }));
        }
        order.isDeleted = true;
        await order.save();
        return res.status(200).json({ message: "Order deleted (soft)", data: order });
    }
);

