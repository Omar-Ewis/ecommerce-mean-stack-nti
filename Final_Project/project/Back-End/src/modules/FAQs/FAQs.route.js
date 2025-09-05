import { Router } from "express";
import { authentication } from "../../middleware/authentication.middleware.js";
import { authorizeRoles } from "../../middleware/authorization.middleware.js";
import {createFaq,updateFaq,deleteFaq,getPublicFaqs,getAllFaqs,toggleFlag} from "./FAQs.controller.js";

const router = Router();
router.get("/", getPublicFaqs);
router.use(authentication());
router.post("/", authorizeRoles("admin"), createFaq);
router.put("/:id", authorizeRoles("admin"), updateFaq);
router.delete("/:id", authorizeRoles("admin"), deleteFaq);
router.get("/admin/all", authorizeRoles("admin"), getAllFaqs);
router.patch("/:id/toggle", authorizeRoles("admin"), toggleFlag);

export default router;
