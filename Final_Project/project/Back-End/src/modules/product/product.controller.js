import { productModel } from "../../database/models/Product.model.js";
import {categoryModel} from "../../database/models/Category.model.js";
import { asyncHandler } from "../../utils/response.js";
import slugify from "slugify";
export const createProduct = asyncHandler(
    async (req,res,next) => {
        const { name, description, price, quantity,categoryId} = req.body;
        const category = await categoryModel.findOne({_id:categoryId,isDeleted:false});
        if(!category){
            return next(new Error('Invalid category ID', { cause: 400 }));
        }
        const imageURL =  req.file?.filename || '';
        const product = await productModel.create({name, description, price, quantity,categoryId, imageURL});
        return res.status(201).json({ message: 'Product created Successfully', data: product }); 
    }
);
export const getProductBySlug = asyncHandler(
    async (req,res,next) => {
        const {slug} = req.params;
        const product = await productModel.findOne({slug,isActive:true,isDeleted:false}).populate('categoryId','name');
        if(!product)
            return next (new Error('Product not found', { cause: 404 }));
        return res.status(200).json({ message: 'Get Product by slug successfully', data: product });
    }
);

export const updateProductByID = asyncHandler(
    async (req,res,next) => {
            const { id } = req.params;
            const { name, description, price, quantity, categoryId } = req.body;
            const product = await productModel.findById(id);
            if (!product || product.isDeleted) {
            return next(new Error('Product not found or has been deleted', { cause: 404 }));
            }
            if (categoryId) {
            const category = await categoryModel.findOne({ _id: categoryId, isDeleted: false });
            if (!category) {
                return next(new Error('Invalid category ID', { cause: 400 }));
            }
            }
            const imageURL = req.file?.filename;
            const updatedData = {
                ...(name && { name }),
                ...(name && { slug: slugify(name) }), 
                ...(description && { description }),
                ...(price && { price: Number(price) }),
                ...(quantity && { quantity: Number(quantity) }),
                ...(categoryId && { categoryId }),
                ...(imageURL && { imageURL }),
            };
            const updatedProduct = await productModel.findByIdAndUpdate(id,updatedData,{ new: true }).populate('categoryId', 'name');
            return res.status(200).json({message: 'Product updated successfully',data: updatedProduct});
    }
);

export const updateProductFlags = asyncHandler(
    async (req, res, next) => {
            const { id } = req.params;
            const { isActive, isDeleted } = req.body;
            const product = await productModel.findById(id);
            if (!product) {
                return next(new Error('Product not found', { cause: 404 }));
            }
            if (typeof isActive === 'boolean') {
                product.isActive = isActive;
            }
            if (typeof isDeleted === 'boolean') {
                product.isDeleted = isDeleted;
                if (isDeleted) {
                product.isActive = false;
                }
            }
            await product.save();
            return res.status(200).json({message: 'Product flags updated',data: product});
});


export const getProductsByCategorySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug, isDeleted: false });
    if (!category) {
        return next(new Error('Category not found', { cause: 404 }));
    }
    let categoryIds = [category._id];
    if (!category.parentId) {
        const subcategories = await categoryModel.find({ parentId: category._id, isDeleted: false });
        const subIds = subcategories.map(sub => sub._id);
        categoryIds.push(...subIds);
    }
    const products = await productModel.find({categoryId: { $in: categoryIds },isActive: true,isDeleted: false}).populate('categoryId', 'name');
    return res.status(200).json({message: `Products under ${slug}`,data: products});
});

//=============================================================================
export const getAllProductsForUser = asyncHandler(async (req, res, next) => {
    const {categoryId,sort = '-createdAt',search,page = 1,limit = 10} = req.query;
    const filter = {isActive: true,isDeleted: false};
    if (categoryId) filter.categoryId = categoryId;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const skip = (+page - 1) * parseInt(limit);
    const products = await productModel
        .find(filter).sort(sort).skip(skip).limit(parseInt(limit))
        .populate({path: 'categoryId',select: 'name isActive',match: { isActive: true }});
    const filteredProducts = products.filter(p => p.categoryId !== null);
    const total = await productModel.countDocuments(filter);
    res.status(200).json({message: 'Get all products (User)',count: filteredProducts.length,total,pages: Math.ceil(total / +limit),currentPage: +page,data: filteredProducts});
});
export const getAllProductsForAdmin = asyncHandler(async (req, res, next) => {
    const {categoryId,sort = '-createdAt',search,page = 1,limit = 8,isActive,isDeleted} = req.query;
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isDeleted !== undefined) filter.isDeleted = isDeleted === 'true';
    else filter.isDeleted = false;
    if (categoryId) filter.categoryId = categoryId;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const skip = (+page - 1) * parseInt(limit);
    const products = await productModel
    .find(filter).sort(sort).skip(skip).limit(parseInt(limit))
    .populate({path: 'categoryId',select: 'name isActive',match: { isActive: true }}).then(docs => docs.filter(p => p.categoryId));
    const total = await productModel.countDocuments(filter);
    res.status(200).json({message: 'Get all products (Admin)',count: products.length,total,pages: Math.ceil(total / +limit),currentPage: +page,data: products});
});
