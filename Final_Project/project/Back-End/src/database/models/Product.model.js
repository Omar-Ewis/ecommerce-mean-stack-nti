import mongoose from "mongoose";
import slugify from "slugify";
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:5,
        maxLength:100
    },
    description:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    slug:{
        type: String,
        unique: true,
        trim: true,
        index: true,
    },
    imageURL:{
        type: String,
        required: true,
        trim:true
    },
    ratingsAverage: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    ratingsCount: {
        type: Number,
        default: 0,
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
{
    timestamps:true,
});

productSchema.pre('save', function (next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = slugify(this.name, {
        lower: true,
        strict: true,
        trim: true,
        });
    }
    next();
});

export const productModel = mongoose.model('Product',productSchema);
