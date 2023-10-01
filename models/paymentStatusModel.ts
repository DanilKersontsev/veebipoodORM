import mongoose, { Schema, Document } from "mongoose";

export interface IPaymentStatus extends Document {
    status: boolean;
    dueDate: Date;
    paidAmount: number;
    paymentDate: Date;
}

const paymentStatusSchema = new Schema({
    status: { type: Boolean, required: true },
    dueDate: { type: Date, required: true },
    paidAmount: { type: Number, required: true },
    paymentDate: { type: Date },
});

export default mongoose.model<IPaymentStatus>("PaymentStatus", paymentStatusSchema);
