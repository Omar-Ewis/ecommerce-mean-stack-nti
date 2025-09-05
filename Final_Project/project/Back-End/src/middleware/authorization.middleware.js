import { asyncHandler } from "../utils/response.js";

    export const authorizeRoles = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
        return next(new Error("Not authorized", { cause: 403 }));
        }
        return next();
    });
};


