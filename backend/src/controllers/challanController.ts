import { Request, Response } from "express";
import db from "../config/db";

// ======================
// CREATE CHALLAN
// ======================

export const createChallan = async (
  req: Request,
  res: Response
) => {

  const connection = await db.getConnection();

  try {

    const {
      customer_id,
      products,
      status,
      created_by
    } = req.body;

    if (!customer_id) {
      throw new Error("Customer is required");
    }

    if (!products || products.length === 0) {
      throw new Error("Please select at least one product");
    }

    await connection.beginTransaction();

    const challanNumber =
      "CH-" + Date.now();

    let totalQuantity = 0;

    for (const item of products) {

      const [rows]: any = await connection.query(
        "SELECT * FROM products WHERE id=?",
        [item.product_id]
      );

      if (rows.length === 0) {
        throw new Error("Product not found");
      }

      const product = rows[0];

      if (
        status === "CONFIRMED" &&
        product.current_stock < item.quantity
      ) {
        throw new Error(
          `${product.product_name} has insufficient stock`
        );
      }

      totalQuantity += Number(item.quantity);

    }

    const [challanResult]: any =
      await connection.query(

        `INSERT INTO challans
        (
          challan_number,
          customer_id,
          total_quantity,
          status,
          created_by
        )
        VALUES(?,?,?,?,?)`,

        [
          challanNumber,
          customer_id,
          totalQuantity,
          status,
          created_by
        ]

      );

    const challanId =
      challanResult.insertId;

    for (const item of products) {

      const [rows]: any =
        await connection.query(
          "SELECT * FROM products WHERE id=?",
          [item.product_id]
        );

      const product = rows[0];

      await connection.query(

        `INSERT INTO challan_items
        (
          challan_id,
          product_id,
          product_name,
          sku,
          unit_price,
          quantity
        )
        VALUES(?,?,?,?,?,?)`,

        [
          challanId,
          product.id,
          product.product_name,
          product.sku,
          product.unit_price,
          item.quantity
        ]

      );

      if (status === "CONFIRMED") {

        await connection.query(

          `UPDATE products
           SET current_stock =
           current_stock - ?
           WHERE id=?`,

          [
            item.quantity,
            product.id
          ]

        );

        await connection.query(

          `INSERT INTO stock_movements
          (
            product_id,
            quantity,
            movement_type,
            remarks,
            created_by
          )
          VALUES(?,?,?,?,?)`,

          [
            product.id,
            item.quantity,
            "OUT",
            "Sales Challan",
            created_by
          ]

        );

      }

    }

    await connection.commit();

    res.status(201).json({

      success: true,

      message:
        "Challan Created Successfully",

      challan_number:
        challanNumber

    });

  }

  catch (error: any) {

    await connection.rollback();

    console.log(error);

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

  finally {

    connection.release();

  }

};

// ======================
// GET CHALLANS
// ======================

export const getChallans = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows] =
      await db.query(

      `SELECT
        c.id,
        c.challan_number,
        cu.customer_name,
        c.total_quantity,
        c.status,
        c.created_at
      FROM challans c

      JOIN customers cu
      ON c.customer_id = cu.id

      ORDER BY c.id DESC`

    );

    res.json(rows);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};