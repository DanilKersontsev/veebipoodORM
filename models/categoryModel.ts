import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
}

const categorySchema = new Schema({
    name: { type: String, required: true },
});

export default mongoose.model<ICategory>("Category", categorySchema);
