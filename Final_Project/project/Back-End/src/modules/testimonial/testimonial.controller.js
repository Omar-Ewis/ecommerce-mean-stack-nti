import { testimonialModel } from "../../database/models/testimonial.model.js";
import { asyncHandler } from "../../utils/response.js";

export const createTestimonial = asyncHandler(async (req, res) => {
    const { name, message } = req.body;
    const testimonial = await testimonialModel.create({ name, message });
    res.status(201).json({ message: "Testimonial submitted", data: testimonial });
});

export const getActiveTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await testimonialModel
        .find({ isActive: true, isDeleted: false })
        .sort({ createdAt: -1 });
    res.status(200).json({ message: "Public testimonials", count: testimonials.length, data: testimonials });
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await testimonialModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All testimonials", count: testimonials.length, data: testimonials });
});

export const toggleTestimonialFlag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { field } = req.body;
    if (!["isActive", "isDeleted"].includes(field)) {
        return next(new Error("Invalid field", { cause: 400 }));
    }
    const testimonial = await testimonialModel.findById(id);
    if (!testimonial) return next(new Error("Testimonial not found", { cause: 404 }));
    testimonial[field] = !testimonial[field];
    await testimonial.save();
    res.status(200).json({ message: "Field updated", testimonial });
});
