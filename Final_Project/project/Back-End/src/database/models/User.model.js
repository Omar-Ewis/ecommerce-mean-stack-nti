import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minLength:2, maxLength:100 },
    phone: { type: String, required: true},
    email: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
},{
    timestamps:true,
});
export const userModel = mongoose.model("User",userSchema);
