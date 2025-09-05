import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
        question: {
        type: String,
        required: true,
        trim: true,
        },
        answer: {
        type: String,
        required: true,
        trim: true,
        },
        isActive: {
        type: Boolean,
        default: true,
        },
        isDeleted: {
        type: Boolean,
        default: false,
        }
    },
    { timestamps: true }
);

export const faqModel = mongoose.model("Faq", faqSchema);
