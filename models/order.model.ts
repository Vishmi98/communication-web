import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    id: {
        type: Number,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
})

const OrderItemSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            ref: "Item",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        price: {
            type: Number,
            required: true
        },

        color: {
            type: String
        },
        mainImagePath: {
            type: String,
            required: true
        },
    },
    {
        _id: false
    }
);

const OrderSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true
        },

        customer: {
            type: CustomerSchema,
            required: true
        },

        items: {
            type: [OrderItemSchema],
            required: true,
            validate: {
                validator: function (value: any[]) {
                    return value.length > 0;
                },
                message: "Order must contain at least one item"
            }
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        deliveryFee: {
            type: Number,
            default: 0,
            min: 0
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "Card"],
            required: true
        },

        isPaid: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        note: {
            type: String,
            trim: true
        },

        estimatedDeliveryTime: {
            type: Date
        },
        trackingNumber: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

OrderSchema.virtual("customerInfo", {
    ref: "User",
    localField: "customer.id",
    foreignField: "id",
    justOne: true
});

OrderSchema.virtual("itemsInfo", {
    ref: "Item",
    localField: "items.id",
    foreignField: "id",
});

OrderSchema.set("toObject", { virtuals: true });
OrderSchema.set("toJSON", { virtuals: true });

const OrderModel =
    mongoose.models.Order ||
    mongoose.model("Order", OrderSchema);

export default OrderModel;