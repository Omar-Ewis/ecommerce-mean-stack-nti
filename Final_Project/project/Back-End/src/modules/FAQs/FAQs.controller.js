import { faqModel } from "../../database/models/FAQs.model.js";
import { asyncHandler } from "../../utils/response.js";

export const createFaq = asyncHandler(async (req, res) => {
    const { question, answer } = req.body;
    const faq = await faqModel.create({ question, answer });
    res.status(201).json({ message: "FAQ created", data: faq });
});

export const updateFaq = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = await faqModel.findByIdAndUpdate(
        id,
        { question, answer },
        { new: true }
    );
    if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ updated", data: faq });
});

export const deleteFaq = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const faq = await faqModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ deleted", data: faq });
});

export const getPublicFaqs = asyncHandler(async (req, res) => {
    const faqs = await faqModel.find({ isDeleted: false, isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ message: "FAQs retrieved", count: faqs.length, data: faqs });
});

export const getAllFaqs = asyncHandler(async (req, res) => {
    const faqs = await faqModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All FAQs retrieved", count: faqs.length, data: faqs });
});

export const toggleFlag = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { field } = req.query;
    if (!["isActive", "isDeleted"].includes(field)) {
        return res.status(400).json({ message: "Invalid field to toggle" });
    }
    const faq = await faqModel.findById(id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    faq[field] = !faq[field];
    await faq.save();
    res.status(200).json({ message: `FAQ ${field} toggled`, data: faq });
});
