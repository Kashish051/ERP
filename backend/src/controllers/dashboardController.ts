import { Request, Response } from "express";
import db from "../config/db";


export const getDashboardStats = async (
  req: Request,
  res: Response
) => {

  try {

    // Total Customers
    const [customerCount]: any = await db.query(
      "SELECT COUNT(*) as total FROM customers"
    );


    // Total Products
    const [productCount]: any = await db.query(
      "SELECT COUNT(*) as total FROM products"
    );


    // Total Challans
    const [challanCount]: any = await db.query(
      "SELECT COUNT(*) as total FROM challans"
    );


    // Low Stock Products
    const [lowStock]: any = await db.query(

      `SELECT COUNT(*) as total
       FROM products
       WHERE current_stock <= minimum_stock`

    );


    // Pending Followups
    const [followups]: any = await db.query(

      `SELECT COUNT(*) as total
       FROM customer_followups
       WHERE follow_up_date >= CURDATE()`

    );


    // Recent Stock Movement
    const [stockMovements]: any = await db.query(

      `SELECT 
        sm.id,
        p.product_name,
        sm.quantity,
        sm.movement_type,
        sm.remarks,
        sm.created_at

       FROM stock_movements sm

       JOIN products p
       ON sm.product_id = p.id

       ORDER BY sm.id DESC

       LIMIT 5`

    );


    res.json({

      customers:
        customerCount[0].total,

      products:
        productCount[0].total,

      challans:
        challanCount[0].total,

      lowStock:
        lowStock[0].total,

      followups:
        followups[0].total,

      recentStock:
        stockMovements

    });


  } catch(error:any){

    console.log("DASHBOARD ERROR:", error.message);

    res.status(500).json({

      success:false,

      message:error.message

    });

}

  }

