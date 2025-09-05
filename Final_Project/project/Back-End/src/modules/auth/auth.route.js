import * as authcontrollers from './auth.controller.js';
import {Router} from 'express';
const router = Router();
router.post('/signup',authcontrollers.signup);
router.post('/login',authcontrollers.login);
export default router ; 

