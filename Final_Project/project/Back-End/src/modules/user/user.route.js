import { Router } from "express";
import * as userControllers from "./user.controller.js";
import { authentication } from "../../middleware/authentication.middleware.js";
import { authorizeRoles } from "../../middleware/authorization.middleware.js";

const router = Router();
router.use(authentication());
router.get("/", userControllers.profile);
router.put("/", userControllers.updateProfile);
// router.post("/addresses", userControllers.addAddress);
// router.put("/addresses/:index", userControllers.updateAddress);
// router.delete("/addresses/:index", userControllers.removeAddress);
router.post("/change-password", userControllers.changePassword);

//admin 
router.get("/admin/all", authorizeRoles("admin"), userControllers.listUsers);

export default router;
