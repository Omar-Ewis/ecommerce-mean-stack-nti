import {userModel} from '../../database/models/User.model.js'
import { generateHash , compareHash} from '../../utils/security/hash.security.js';
import {asyncHandler} from '../../utils/response.js';
import { generateToken } from '../../utils/security/token.security.js';

export const signup = asyncHandler(
    async (req,res,next) => {
        const {name,email,password,phone} = req.body;
        if(await userModel.findOne({email})){
            return next(new Error("Email exist", {cause:409}));
        }
        const hashPassword = await generateHash({plaintext:password});
        const user = await userModel.create({name,email,password:hashPassword,phone});
        return res.status(201).json({message:"User Created Successfully" , data:user});
}
)

export const login = asyncHandler(
    async (req,res,next) => {

        //======================= catch data from req ====================
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return next(new Error('In-Valid Email Or Password',{cause:404}));
        }
        //======================= match return Boolean ===================
        const match = await compareHash({plaintext:password,hashValue:user.password})
        if(!match){
            return next(new Error('In-Valid Email Or Password',{cause:404}));
        }
        //======================= generate token ========================= 
        const access_token = await generateToken({
            payload:{id:user.id,name:user.name,role:user.role},
            options:{
                expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN,
            }
        });
        return res.status(200).json({message:'Login Successfully',access_token});
}
)