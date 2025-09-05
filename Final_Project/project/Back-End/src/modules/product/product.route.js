import {Router} from "express";
import {upload} from '../../middleware/multer.middleware.js';
import {authentication} from '../../middleware/authentication.middleware.js';
import {authorizeRoles} from '../../middleware/authorization.middleware.js';
import {createProduct,getAllProductsForUser,getProductBySlug,updateProductByID,updateProductFlags,getProductsByCategorySlug,getAllProductsForAdmin} from './product.controller.js'
const router = Router();

router.get('/',getAllProductsForUser);
router.get('/admin',authentication(),authorizeRoles('admin'),getAllProductsForAdmin);
router.get('/by-category/:slug', getProductsByCategorySlug);
router.get('/:slug',getProductBySlug);
router.post('/',authentication(),authorizeRoles('admin'),upload.single('image'),createProduct);
router.put('/:id',authentication(),authorizeRoles('admin'),upload.single('image'),updateProductByID);
router.patch('/:id',authentication(),authorizeRoles('admin'),updateProductFlags);

export default router;
