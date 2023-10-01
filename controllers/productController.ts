import { Request, Response } from "express";
import ProductModel, { IProduct } from "../models/productModel";

// Lisage toode
export const addProduct = async (req: Request, res: Response) => {
    try {
        const productData: IProduct = req.body;

        // Kontrolli vananemisaega
        if (productData.expirationDate < new Date()) {
            return res.status(400).json({ error: "Toote vananemisaeg ei saa olla minevikus" });
        }

        // Kontrolli hinna kehtivust
        if (productData.price <= 0) {
            return res.status(400).json({ error: "Toote hind peab olema suurem kui null" });
        }

        const newProduct = new ProductModel(productData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: "Toote lisamine ebaõnnestus" });
    }
};

// Hangi kõik tooted
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Toodete hankimine ebaõnnestus" });
    }
};

// Muuda toodet
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedProductData: IProduct = req.body;

        // Kontrolli vananemisaega
        if (updatedProductData.expirationDate < new Date()) {
            return res.status(400).json({ error: "Toote vananemisaeg ei saa olla minevikus" });
        }

        // Kontrolli hinna kehtivust
        if (updatedProductData.price <= 0) {
            return res.status(400).json({ error: "Toote hind peab olema suurem kui null" });
        }

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
};

// Kustuta toode
export const deleteProduct = async (req: Request, res: Response) => {
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
};
