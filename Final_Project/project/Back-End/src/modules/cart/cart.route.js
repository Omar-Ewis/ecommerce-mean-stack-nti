import {Router} from "express";
import {addToCart,getUserCart,updateCartItemQuantity,removeFromCart,clearCart} from "./cart.controller.js";
import { authentication } from '../../middleware/authentication.middleware.js';

const router = Router();
router.use(authentication());
router.post("/add",addToCart);
router.get("/",getUserCart);
router.patch("/update",updateCartItemQuantity);
router.delete("/remove",removeFromCart);
router.delete("/clear",clearCart);

export default router;

