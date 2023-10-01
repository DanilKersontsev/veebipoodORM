import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
    name: string;
    contactDetails: string; // Või kasutage vastavat andmetüüpi
    address: string; // Või kasutage vastavat andmetüüpi
}

const clientSchema = new Schema({
    name: { type: String, required: true },
    contactDetails: { type: Schema.Types.ObjectId, ref: "ContactDetails", required: true }, // Eeldusel, et seostate kontaktandmetega
    address: { type: Schema.Types.ObjectId, ref: "Address", required: true }, // Eeldusel, et seostate aadressiga
});

export default mongoose.model<IClient>("Client", clientSchema);
