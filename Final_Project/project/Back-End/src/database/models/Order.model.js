import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const addressSnapshotSchema = new mongoose.Schema({
    governorate: String,
    city: String,
    street: String,
    building: String,
    apartment: String,
    floor: String,
    landmark: String,
    zip: String,
    country: {
        type: String,
        default: 'Egypt'
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    orderItems: {
        type: [orderItemSchema],
        required: true
    },

    shippingAddress: {
        type: addressSnapshotSchema,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ['COD'], 
        default: 'COD'
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },

    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },

    statusHistory: [
        {
        status: {
            type: String,
            enum: ['pending', 'preparing', 'ready', 'shipped', 'delivered', 'cancelled'],
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        note: String
        }
    ],

    shippingFee: {
        type: Number,
        default: 0,
        min: 0
    },

    subtotal: {
        type: Number,
        required: true,
        min: 0
    },

    total: {
        type: Number,
        required: true,
        min: 0
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export const orderModel = mongoose.model('Order', orderSchema);
