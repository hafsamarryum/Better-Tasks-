import { Request, Response } from "express";
import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { Role } from "../generated/prisma/index.js";
export const JWT_SECRET = process.env.JWT_SECRET!
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!


  // signup 
export const signup = async (req:Request, res:Response): Promise<any> =>{
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 400, message: error.message });
    

    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) { return res.status(400).json({status: 400, message: "Email Already Taken. Please use another email.",});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = email === ADMIN_EMAIL ? Role.ADMIN : Role.MEMBER;
    const newUser = await prisma.user.create({
      data: {name: name, email: email, password: hashedPassword, role: userRole},
    });

    return res.status(201).json({ status: 201, data: newUser, msg: "User Register successfully." });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

  // login
  export const login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 400, message: error.message });

      const { email, password } = req.body;

      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return res.status(404).json({ status: 404, message: "User does not exist" });
      }
 
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ status: 401, message: "Invalid password!" });
      }

      const token = jwt.sign({
        userId: user.id, role: user.role
      },JWT_SECRET)

      return res.status(200).json({ status: 200, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };

   // authlogin user
  export const me = async (req:Request, res:Response): Promise<any> => {
    return res.json(req.user)
  }

