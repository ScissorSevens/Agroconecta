import { Request, Response } from "express";
import { ProductModel } from "../models/products.model";

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// Obtener todos los productos
export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate("categoria_id vendedor_id");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Obtener producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate("categoria_id vendedor_id");
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
