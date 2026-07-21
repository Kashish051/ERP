import { Request, Response } from "express";
import db from "../config/db";

// Add Stock Movement
export const addStockMovement = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      product_id,
      movement_type,
      quantity,
      remarks,
    } = req.body;

    // Save movement
    await db.query(

  `INSERT INTO stock_movements
  (
    product_id,
    movement_type,
    quantity,
    remarks,
    created_by
  )
  VALUES (?,?,?,?,?)`,

  [
    product_id,
    movement_type,
    quantity,
    remarks || null,
    null
  ]

);

    // Update stock
    if (movement_type === "IN") {

      await db.query(

        `UPDATE products
         SET current_stock = current_stock + ?
         WHERE id=?`,

        [
          quantity,
          product_id,
        ]

      );

    } else {

      await db.query(

        `UPDATE products
         SET current_stock = current_stock - ?
         WHERE id=?`,

        [
          quantity,
          product_id,
        ]

      );

    }

    res.status(201).json({

      success: true,
      message: "Stock Updated Successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message: "Server Error",

    });

  }

};

// Get Stock Movements
export const getStockMovements = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows] = await db.query(

      `SELECT
          sm.id,
          p.product_name,
          sm.movement_type,
          sm.quantity,
          sm.remarks,
          sm.created_at
       FROM stock_movements sm
       JOIN products p
       ON sm.product_id = p.id
       ORDER BY sm.created_at DESC`

    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};