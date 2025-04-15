import { Request, Response } from "express";
import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";

const createUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Email Already Taken. Please use another email.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res
      .status(200)
      .json({ status: 200, data: newUser, msg: "User Created." });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};


export default createUser;