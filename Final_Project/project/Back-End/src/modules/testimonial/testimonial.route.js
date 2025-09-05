import { Router } from "express";
import {createTestimonial,getAllTestimonials,getActiveTestimonials,toggleTestimonialFlag,} from "./testimonial.controller.js";
import { authentication } from "../../middleware/authentication.middleware.js";
import { authorizeRoles } from "../../middleware/authorization.middleware.js";

const router = Router();
router.get("/", getActiveTestimonials);
router.post("/", createTestimonial);    
router.use(authentication());
router.get("/all", authorizeRoles("admin"), getAllTestimonials);
router.patch("/:id/toggle", authorizeRoles("admin"), toggleTestimonialFlag);

export default router;