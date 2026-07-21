import { Request, Response } from "express";
import db from "../config/db";


// Add Customer
export const addCustomer = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      customer_name,
      mobile,
      email,
      business_name,
      gst_number,
      customer_type,
      address,
      status,
      follow_up_date,
      notes,
    } = req.body;


    const [result]: any = await db.query(

      `INSERT INTO customers
      (
        customer_name,
        mobile,
        email,
        business_name,
        gst_number,
        customer_type,
        address,
        status,
        follow_up_date,
        notes
      )
      VALUES(?,?,?,?,?,?,?,?,?,?)`,

      [
        customer_name,
        mobile,
        email,
        business_name,
        gst_number || null,
        customer_type,
        address || null,
        status || "ACTIVE",
        follow_up_date || null,
        notes || null,
      ]

    );


    res.status(201).json({

      success:true,
      message:"Customer Added Successfully",
      id:result.insertId,

    });


  } catch(error) {

    console.log(error);

    res.status(500).json({

      success:false,
      message:"Server Error",

    });

  }

};




// Get All Customers + Search
export const getCustomers = async (
  req: Request,
  res: Response
) => {

  try {

    const search = (req.query.search as string) || "";

    const [rows] = await db.query(

      `
      SELECT *
      FROM customers
      WHERE
        customer_name LIKE ?
        OR mobile LIKE ?
        OR business_name LIKE ?
      ORDER BY id DESC
      `,

      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      ]

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


// Get Customer By Id
export const getCustomer = async (
  req:Request,
  res:Response
)=>{

  try{


    const [rows]:any = await db.query(

      "SELECT * FROM customers WHERE id=?",
      [req.params.id]

    );


    if(rows.length === 0){

      return res.status(404).json({
        message:"Customer Not Found"
      });

    }


    res.json(rows[0]);


  }catch(error){

    res.status(500).json({
      message:"Server Error"
    });

  }

};



// Update Customer
export const updateCustomer = async (
  req:Request,
  res:Response
)=>{

  try{


    const {
      customer_name,
      mobile,
      email,
      business_name,
      gst_number,
      customer_type,
      address,
      status,
      follow_up_date,
      notes,

    } = req.body;



    await db.query(

      `UPDATE customers SET
      customer_name=?,
      mobile=?,
      email=?,
      business_name=?,
      gst_number=?,
      customer_type=?,
      address=?,
      status=?,
      follow_up_date=?,
      notes=?
      WHERE id=?`,

      [

        customer_name,
        mobile,
        email,
        business_name,
        gst_number || null,
        customer_type,
        address || null,
        status || "ACTIVE",
        follow_up_date || null,
        notes || null,
        req.params.id

      ]

    );


    res.json({

      success:true,
      message:"Customer Updated"

    });


  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};



// Delete Customer
export const deleteCustomer = async (
  req:Request,
  res:Response
)=>{

  try{


    await db.query(

      "DELETE FROM customers WHERE id=?",
      [req.params.id]

    );


    res.json({

      success:true,
      message:"Customer Deleted"

    });


  }catch(error){

    console.log(error);

    res.status(500).json({

      message:"Server Error"

    });

  }

};