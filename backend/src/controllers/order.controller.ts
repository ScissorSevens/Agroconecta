import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creando pedido:", error);
    res.status(500).json({ message: "Error al crear pedido" });
  }
};

export const getOrders = async (_: Request, res: Response) => {
  try {
    const orders = await OrderModel.find()
      .populate("comprador_id productos.producto_id");
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate("comprador_id productos.producto_id");
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);
  } catch {
    res.status(500).json({ message: "Error al obtener pedido" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const updated = await OrderModel.findByIdAndUpdate(req.params.id, { estado: req.body.estado }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error al actualizar estado" });
  }
};
