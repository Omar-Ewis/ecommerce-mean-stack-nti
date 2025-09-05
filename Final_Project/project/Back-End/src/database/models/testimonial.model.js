import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const testimonialModel = mongoose.model('Testimonial', testimonialSchema);
