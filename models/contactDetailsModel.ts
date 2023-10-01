import mongoose, { Schema, Document } from "mongoose";

export interface IContactDetails extends Document {
    phoneNumber: string;
    email: string;
}

const contactDetailsSchema = new Schema({
    phoneNumber: { type: String },
    email: { type: String },
});

export default mongoose.model<IContactDetails>("ContactDetails", contactDetailsSchema);
