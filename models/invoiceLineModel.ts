import mongoose, { Schema, Document } from "mongoose";

export interface IInvoiceLine extends Document {
    product: string; // Või kasutage vastavat andmetüüpi
    quantity: number;
}

const invoiceLineSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Eeldusel, et seostate tootega
    quantity: { type: Number, required: true },
});

export default mongoose.model<IInvoiceLine>("InvoiceLine", invoiceLineSchema);
