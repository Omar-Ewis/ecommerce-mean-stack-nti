import { cartModel } from "../../database/models/Cart.model.js";
import { asyncHandler } from "../../utils/response.js";
import { productModel } from "../../database/models/Product.model.js";

export const addToCart = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        if (!productId || !quantity || quantity < 1) {
        return next(new Error("Invalid product or quantity", { cause: 400 }));
        }
        const product = await productModel.findById(productId);
        if (!product) {
        return next(new Error("Product not found", { cause: 404 }));
        }
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
        if (quantity > product.quantity) {
            return next(new Error("Not enough stock available", { cause: 400 }));
        }
        cart = await cartModel.create({ userId, items: [{ productId, quantity }] });
        } else {
        const index = cart.items.findIndex(item => item.productId.equals(productId));
        if (index > -1) {
            const newQuantity = cart.items[index].quantity + quantity;
            if (newQuantity > product.quantity) {
            return next(new Error(`Only ${product.quantity} items in stock`, { cause: 400 }));
            }
            cart.items[index].quantity = newQuantity;
        } else {
            if (quantity > product.quantity) {
            return next(new Error(`Only ${product.quantity} items in stock`, { cause: 400 }));
            }
            cart.items.push({ productId, quantity });
        }
        }
        await cart.save();
        cart = await cartModel.findOne({ userId }).populate("items.productId", "name price imageURL slug");
        const items = cart.items.filter(item => item?.productId) || [];
        const data = items.map(({ productId, quantity }) => ({
        _id: productId._id,
        name: productId.name,
        price: productId.price,
        imageURL: productId.imageURL,
        slug: productId.slug,
        quantity
        }));
        const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return res.status(200).json({ message: "Product added to cart", total:0, data });
    }
);
export const getUserCart = asyncHandler(
    async (req, res, next) => {
        const cart = await cartModel.findOne({ userId: req.user._id })
            .populate("items.productId", "name price imageURL slug");

        const items = cart?.items?.filter(item => item?.productId) || [];

        if (!items.length) {
            return res.status(200).json({ message: "Your cart is empty", total:0,data: [] });
        }

        const data = items.map(({ productId, quantity }) => ({
            _id: productId._id,
            name: productId.name,
            price: productId.price,
            imageURL: productId.imageURL,
            slug: productId.slug,
            quantity
        }));
        const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return res.status(200).json({message: "Cart retrieved successfully",total,data});
    }
);
export const updateCartItemQuantity = asyncHandler(
async (req, res, next) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
        return next(new Error("Invalid product or quantity", { cause: 400 }));
    }
    const cart = await cartModel.findOne({ userId }).populate("items.productId", "name price imageURL slug");
    if (!cart) return next(new Error("Cart not found", { cause: 404 }));
    const index = cart.items.findIndex(item => item.productId.equals(productId));
    if (index === -1) {
        return next(new Error("Product not found in cart", { cause: 404 }));
    }
    cart.items[index].quantity = quantity;
    await cart.save();
    const items = cart.items.filter(item => item?.productId) || [];
    const data = items.map(({ productId, quantity }) => ({
        _id: productId._id,
        name: productId.name,
        price: productId.price,
        imageURL: productId.imageURL,
        slug: productId.slug,
        quantity
    }));
    const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return res.status(200).json({ message: `Quantity updated`, total, data });
}
);
export const removeFromCart = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const { productId } = req.body;
        if (!productId) {
            return next(new Error("Product ID is required", { cause: 400 }));
        }
        const cart = await cartModel.findOne({ userId }).populate("items.productId", "name price imageURL slug");
        if (!cart) return next(new Error("Cart not found", { cause: 404 }));
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        if (cart.items.length === initialLength) {
            return next(new Error("Product not found in cart", { cause: 404 }));
        }
        await cart.save();
        const items = cart.items.filter(item => item?.productId) || [];
        const data = items.map(({ productId, quantity }) => ({
            _id: productId._id,
            name: productId.name,
            price: productId.price,
            imageURL: productId.imageURL,
            slug: productId.slug,
            quantity
        }));
        const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return res.status(200).json({message: "Product removed from cart",total,data})
    }
);
export const clearCart = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ userId });
        if (!cart) return next(new Error("Cart not found", { cause: 404 }));
        cart.items = [];
        await cart.save();
        return res.status(200).json({message: "Cart cleared successfully" ,total: 0,data: []});
    }
);

