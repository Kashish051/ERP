import { Request, Response } from "express";
import db from "../config/db";

// Add Follow-up
export const addFollowup = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      customer_id,
      follow_up_date,
      notes
    } = req.body;

    const [result]: any = await db.query(
      `
      INSERT INTO customer_followups
      (
        customer_id,
        follow_up_date,
        notes
      )
      VALUES (?,?,?)
      `,
      [
        customer_id,
        follow_up_date,
        notes
      ]
    );

    res.status(201).json({
      success: true,
      message: "Follow-up Added Successfully",
      id: result.insertId
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};


// Get Follow-ups of One Customer
export const getFollowups = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM customer_followups
      WHERE customer_id = ?
      ORDER BY follow_up_date DESC
      `,
      [req.params.customerId]
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};