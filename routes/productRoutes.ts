import express, { Request, Response } from "express";
import ProductModel, { IProduct } from "../models/productModel";

const router = express.Router();

// Lisage toode
router.post("/products", async (req: Request, res: Response) => {
    try {
        const productData: IProduct = req.body;
        const newProduct = new ProductModel(productData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: "Toote lisamine ebaõnnestus" });
    }
});

// Hangi kõik tooted
router.get("/products", async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Toodete hankimine ebaõnnestus" });
    }
});

// Muuda toodet
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedProductData: IProduct = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Toodet ei leitud" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Toote muutmine ebaõnnestus" });
    }
});

// Kustuta toode
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndRemove(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Toodet ei leitud" });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: "Toote kustutamine ebaõnnestus" });
    }
});

export default router;
