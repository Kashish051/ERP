import { Request, Response } from "express";
import db from "../config/db";

// Add Product
export const addProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      product_name,
      sku,
      category,
      unit_price,
      current_stock,
      minimum_stock,
      warehouse_location,
    } = req.body;

    const [result]: any = await db.query(

      `INSERT INTO products
      (
        product_name,
        sku,
        category,
        unit_price,
        current_stock,
        minimum_stock,
        warehouse_location
      )
      VALUES (?,?,?,?,?,?,?)`,

      [
        product_name,
        sku,
        category,
        unit_price,
        current_stock,
        minimum_stock,
        warehouse_location,
      ]

    );

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      id: result.insertId,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// Get All Products
// Get All Products + Search
export const getProducts = async (
  req: Request,
  res: Response
) => {

  try {

    const search = (req.query.search as string) || "";

    const [rows] = await db.query(

      `SELECT * FROM products
       WHERE
       product_name LIKE ?
       OR sku LIKE ?
       OR category LIKE ?
       ORDER BY id DESC`,

      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
      ]

    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// Get Product By Id
export const getProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows]: any = await db.query(

      "SELECT * FROM products WHERE id=?",

      [req.params.id]

    );

    if (rows.length === 0) {

      return res.status(404).json({
        message: "Product Not Found",
      });

    }

    res.json(rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// Update Product
export const updateProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      product_name,
      sku,
      category,
      unit_price,
      current_stock,
      minimum_stock,
      warehouse_location,
    } = req.body;

    await db.query(

      `UPDATE products SET
      product_name=?,
      sku=?,
      category=?,
      unit_price=?,
      current_stock=?,
      minimum_stock=?,
      warehouse_location=?
      WHERE id=?`,

      [
        product_name,
        sku,
        category,
        unit_price,
        current_stock,
        minimum_stock,
       warehouse_location,
        req.params.id,
      ]

    );

    res.json({

      success: true,
      message: "Product Updated",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// Delete Product
export const deleteProduct = async (
  req: Request,
  res: Response
) => {

  try {

    await db.query(
      "DELETE FROM products WHERE id=?",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Product Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};