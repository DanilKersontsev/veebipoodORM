import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    active: boolean;
    stockQuantity: number;
    expirationDate: Date;
}

const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    active: { type: Boolean, required: true },
    stockQuantity: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
});

export default mongoose.model<IProduct>("Product", productSchema);
