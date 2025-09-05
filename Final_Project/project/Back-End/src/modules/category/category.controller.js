import { asyncHandler } from "../../utils/response.js";
import { categoryModel } from '../../database/models/Category.model.js';
import slugify from "slugify";
export const createCategory = asyncHandler(async (req, res, next) => {
    const { name, parentId, parentSlug } = req.body;
    if (!name) {
        return next(new Error('Name is required', { cause: 400 }));
    }
    let parent = null;
    if (parentSlug && !parentId) {
        parent = await categoryModel.findOne({ slug: parentSlug, isDeleted: false });
        if (!parent) {
        return next(new Error('Parent category not found', { cause: 404 }));
        }
        req.body.parentId = parent._id;
    }
    if (req.body.parentId && req.body.parentId === req.params?.id) {
        return next(new Error('Category cannot be its own parent', { cause: 400 }));
    }
    if (req.body.parentId) {
        parent = await categoryModel.findById(req.body.parentId);
        if (!parent || parent.isDeleted) {
        return next(new Error('Parent category not found or has been deleted', { cause: 404 }));
        }
    }
    const nameTrimmed = name.trim();
    let slug = slugify(nameTrimmed, { lower: true });
    const existing = await categoryModel.findOne({ slug });
    if (existing) {
        slug = slugify(`${nameTrimmed}-${Date.now()}`, { lower: true });
    }
    const category = await categoryModel.create({name: nameTrimmed,parentId: req.body.parentId || null,slug,isActive: true,isDeleted: false});
    return res.status(201).json({message: 'Category created successfully',data: category});
});
export const getCategoryTreeForUser = asyncHandler(async (req, res) => {
    const categories = await categoryModel.find({parentId: null,isDeleted: false,isActive: true})
    .select('name slug').sort({ name: 1 })
    .populate({path: 'children',match: { isDeleted: false, isActive: true },select: 'name slug',options: { sort: { name: 1 } }});
    res.status(200).json({ message: 'User categories', data: categories });
});
export const getCategoryTreeForAdmin = asyncHandler(async (req, res) => {
    const categories = await categoryModel.find({parentId: null,isDeleted: false})
        .select('name slug isActive isDeleted').sort({ name: 1 })
        .populate({path: 'children',match: { isDeleted: false },select: 'name slug isActive isDeleted',options: { sort: { name: 1 } }});
    res.status(200).json({ message: 'Admin categories', data: categories });
});
export const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, parentId } = req.body;
    const category = await categoryModel.findById(id);
    if (!category || category.isDeleted) {
        return next(new Error('Category not found', { cause: 404 }));
    }
    if (name) {
        category.name = name.trim();
    }
    if (parentId !== undefined) {
        if (parentId === null || parentId === '') {
            category.parentId = null;
        } else {
            if (String(parentId) === String(id)) {
                return next(new Error('Category cannot be its own parent', { cause: 400 }));
            }
            const parent = await categoryModel.findById(parentId);
            if (!parent || parent.isDeleted) {
                return next(new Error('Parent category not found or deleted', { cause: 404 }));
            }
            category.parentId = parentId;
        }
    }
    await category.save();
    return res.status(200).json({message: 'Category updated',data: category});
});
export const updateCategoryFlag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { isActive, isDeleted } = req.body;
    const category = await categoryModel.findById(id);
    if (!category)
        return next(new Error('Category not found', { cause: 404 }));
    if (typeof isActive === 'boolean')
        category.isActive = isActive;
    if (typeof isDeleted === 'boolean') {
        category.isDeleted = isDeleted;
        if (isDeleted) category.isActive = false; 
    }
    await category.save();
    return res.status(200).json({message: 'Category flags updated',data: category,});
});
export const getCategoryBySlug = asyncHandler(
    async (req,res,next) =>{
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug, isDeleted: false, isActive: true }).populate('children');
        if(!category){
            return next(new Error('Category not found', { cause: 404 }));
        }
        return res.status(200).json({ message: 'success', data: category });
    }
)