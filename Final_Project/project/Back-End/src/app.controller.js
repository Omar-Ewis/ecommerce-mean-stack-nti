import * as dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, './config/.env.dev') });
import express from "express";
import conncectDB from "./database/connection.db.js";
import corsMiddleware from "./middleware/cors.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/user/user.route.js";
import categoryRoutes from './modules/category/category.route.js'
import productRoutes from './modules/product/product.route.js';
import cartRoutes from "./modules/cart/cart.route.js";
import orderRoutes from "./modules/order/order.route.js";
import FAQsRouter from "./modules/FAQs/FAQs.route.js";
import testimonialRouter from "./modules/testimonial/testimonial.route.js";
import reportRouter from "./modules/reports/report.route.js"
import { globalErrorHandling } from "./utils/response.js";

const bootStrap = async () => {
  const app = express();
  const port = process.env.PORT;
  app.use(corsMiddleware());
  await conncectDB();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  // Routes
  app.use(express.json());
  app.get("/", (req, res, next) => {
    return res.json({ message: "Welcome to E-Commerce App" });
  });
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/order", orderRoutes);
  app.use("/api/faq", FAQsRouter);
  app.use("/api/testimonial", testimonialRouter);
  app.use('/api/report', reportRouter);

  app.all("{*dummy}", (req, res, next) => {
    return res.status(404).json({ message: "In-valid page" });
  });
  app.use(globalErrorHandling);
  app.listen(port, () => {
    console.log(`Application is Running at port ::: ${port}`);
  });
};
export default bootStrap;
