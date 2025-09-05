import { Router } from 'express';
import { authentication } from '../../middleware/authentication.middleware.js';
import { authorizeRoles } from '../../middleware/authorization.middleware.js';
import {placeOrder,getMyOrders,getOrderById,cancelOrder,getAllOrders,updateOrderStatus,softDeleteOrder} from './order.controller.js';

const router = Router();
router.use(authentication());
// User
router.post('/',placeOrder); // Place new order
router.get('/my',getMyOrders); // Get user's own orders
router.get('/my/:id', getOrderById); // User get specific order by ID 
router.patch('/my/:id/cancel',cancelOrder); // Cancel order 
// Admin 
router.get('/',authorizeRoles('admin'), getAllOrders); // Admin get all orders
router.patch('/:id/status', authorizeRoles('admin'), updateOrderStatus); // Admin update status
router.delete('/:id', authorizeRoles('admin'), softDeleteOrder); // Soft delete 
export default router;

