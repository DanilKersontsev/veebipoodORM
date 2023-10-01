import express, { Request, Response } from "express";
import InvoiceModel, { IInvoice } from "../models/invoiceModel";

const router = express.Router();

// Lisage arve
router.post("/", async (req: Request, res: Response) => {
    try {
        const invoiceData: IInvoice = req.body;
        const newInvoice = new InvoiceModel(invoiceData);
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(500).json({ error: "Arve lisamine ebaõnnestus" });
    }
});

// Hankige kõik arved
router.get("/", async (req: Request, res: Response) => {
    try {
        const invoices = await InvoiceModel.find();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: "Arvete hankimine ebaõnnestus" });
    }
});

// Muutke arvet
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const invoiceId = req.params.id;
        const updatedInvoiceData: IInvoice = req.body;
        const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
            invoiceId,
            updatedInvoiceData,
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ error: "Arvet ei leitud" });
        }

        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ error: "Arve muutmine ebaõnnestus" });
    }
});

// Kustutage arve
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const invoiceId = req.params.id;
        const deletedInvoice = await InvoiceModel.findByIdAndRemove(invoiceId);

        if (!deletedInvoice) {
            return res.status(404).json({ error: "Arvet ei leitud" });
        }

        res.json(deletedInvoice);
    } catch (error) {
        res.status(500).json({ error: "Arve kustutamine ebaõnnestus" });
    }
});

export default router;
