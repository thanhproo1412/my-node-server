import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    try {
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
