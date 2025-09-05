    import { asyncHandler } from "../../utils/response.js";
    import { userModel } from "../../database/models/User.model.js";
    import {generateHash,compareHash} from "../../utils/security/hash.security.js";
    export const profile = asyncHandler(async (req, res, next) => {
    return res.status(200).json({ message: "Get User Profile Data", data: req.user });
    });
    export const updateProfile = asyncHandler(async (req, res, next) => {
    const { name, phone } = req.body;
    const updated = await userModel.findByIdAndUpdate(req.user._id, { name, phone }, { new: true }).select("-password");
    return res.status(200).json({ message: "Profile updated", data: updated });
    });
    // export const addAddress = asyncHandler(async (req, res, next) => {
    // const user = await userModel.findById(req.user._id);
    // user.addresses.push(req.body);
    // await user.save();
    // return res.status(200).json({ message: "Address added", data: user.addresses });
    // });

    // export const updateAddress = asyncHandler(async (req, res, next) => {
    // const { index } = req.params;
    // const user = await userModel.findById(req.user._id);
    // const idx = Number(index);
    // if (Number.isNaN(idx) || idx < 0 || idx >= user.addresses.length) {
    //     return next(new Error("Invalid address index", { cause: 400 }));
    // }
    // user.addresses[idx] = {...(user.addresses[idx].toObject?.() || user.addresses[idx]),...req.body,};
    // await user.save();
    // return res.status(200).json({ message: "Address updated", data: user.addresses[idx] });
    // });

    // export const removeAddress = asyncHandler(async (req, res, next) => {
    // const { index } = req.params;
    // const user = await userModel.findById(req.user._id);
    // const idx = Number(index);
    // if (Number.isNaN(idx) || idx < 0 || idx >= user.addresses.length) {
    //     return next(new Error("Invalid address index", { cause: 400 }));
    // }
    // user.addresses.splice(idx, 1);
    // await user.save();
    // return res.status(200).json({ message: "Address removed", data: user.addresses });
    // });
    export const changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id);
    const match = await compareHash({plaintext: oldPassword,hashValue: user.password,});
    if (!match)
        return next(new Error("Old password is incorrect", { cause: 400 }));
    user.password = await generateHash({ plaintext: newPassword });
    await user.save();
    return res.status(200).json({ message: "Password changed" });
    });

    export const listUsers = asyncHandler(async (req, res, next) => {
    const users = await userModel.find({}).select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ message: "Users", data: users });
    });
