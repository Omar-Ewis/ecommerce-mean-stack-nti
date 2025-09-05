    import { asyncHandler } from "../utils/response.js";
    import { userModel } from "../database/models/User.model.js";
    import JWT from "jsonwebtoken";
    export const authentication = () => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) 
        return next(new Error("Missing authorization header", { cause: 401 }));
        let token = authorization;
        if (authorization.startsWith("Bearer "))
        token = authorization.split(" ")[1];
        const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SIGNATURE);
        if (!decoded) {
            return next(new Error("In Valid Token", { cause: 400 }));
        }
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return next(new Error("Not Register Account", { cause: 404 }));
        }
        req.user = user;
        return next();
    });
    };
