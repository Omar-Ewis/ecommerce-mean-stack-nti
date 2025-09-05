import { Router } from "express";
import { authentication } from "../../middleware/authentication.middleware.js";
import { authorizeRoles } from "../../middleware/authorization.middleware.js";
import {createCategory , getCategoryTreeForUser , updateCategory , updateCategoryFlag,getCategoryBySlug,getCategoryTreeForAdmin} from './category.controller.js';
const router = Router();
// router.get('/ping', (req, res) => {
//     console.log('ping');
    
//     res.send('pong');
// });
router.get('/',getCategoryTreeForUser);
router.get('/admin',authentication(),authorizeRoles('admin'),getCategoryTreeForAdmin);
router.get('/:slug',getCategoryBySlug);
router.post('/',authentication(),authorizeRoles('admin'),createCategory);
router.put('/:id',authentication(),authorizeRoles('admin'),updateCategory);
router.patch('/:id',authentication(),authorizeRoles('admin'),updateCategoryFlag)
export default router;
