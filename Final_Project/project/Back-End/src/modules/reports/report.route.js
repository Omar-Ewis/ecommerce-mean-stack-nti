import { Router } from "express";
import { getSalesReport } from "./report.controller.js";
import { authentication } from "../../middleware/authentication.middleware.js";
import { authorizeRoles } from "../../middleware/authorization.middleware.js";

const router = Router();
router.get("/sales", authentication(), authorizeRoles("admin"), getSalesReport);
export default router;