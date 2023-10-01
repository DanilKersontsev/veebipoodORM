import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
    street: string;
    house: string;
    city: string;
    postalCode: string;
}

const addressSchema = new Schema({
    street: { type: String },
    house: { type: String },
    city: { type: String },
    postalCode: { type: String },
});

export default mongoose.model<IAddress>("Address", addressSchema);
