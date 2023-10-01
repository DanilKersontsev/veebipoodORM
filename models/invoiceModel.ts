import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
    date: Date;
    invoiceLine: string; // Või kasutage vastavat andmetüüpi
    totalAmount: number;
    paymentStatus: string; // Või kasutage vastavat andmetüüpi
    client: string; // Või kasutage vastavat andmetüüpi
}

const invoiceSchema = new Schema({
    date: { type: Date, required: true },
    invoiceLine: { type: Schema.Types.ObjectId, ref: "InvoiceLine", required: true }, // Eeldusel, et seostate arveridaga
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: Schema.Types.ObjectId, ref: "PaymentStatus", required: true }, // Eeldusel, et seostate maksestaatusega
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true }, // Eeldusel, et seostate kliendiga
});

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);
