import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
    },

    slug: {
        type: String,
        unique: true,
        trim: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);

categorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parentId',
    justOne: false,
});
//================================================================================================================
// categorySchema.pre('save', function (next) {
//     if (this.isModified('name') || !this.slug) {
//         this.slug = slugify(this.name, {
//         lower: true,
//         strict: true,
//         trim: true,
//         });
//     }
//     next();
// });
// we removed [this.isModified('name')] because if we want to add another name with same slug
// Men Clothes --> shirts
// Kids Clothes --> shirts
// last code we can't do that so we use this code and we handle the everythings in createCategory.controller.js
categorySchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = slugify(this.name, {
        lower: true,
        strict: true,
        trim: true,
        });
    }
    next();
});
//================================================================================================================
export const categoryModel = mongoose.model('Category', categorySchema);

