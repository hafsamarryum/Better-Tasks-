import { Request, Response } from "express";
import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";


 // create user
const createUser = async (req: Request, res: Response): Promise<any> => {

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
   // update User
  export const updateUser = async (req: Request, res: Response): Promise<any> =>{
     const userId = req.params.id;
     const {name, email, password} = req.body;

     await prisma.user.update({
       where: {id:Number(userId)},
       data: { name:name, email:email, password:password}})

       return res.status(200).json({status:200,  msg: "User updated successfully"})
  };

  // fetch Users
  export const fetchUsers = async (req:Request, res:Response): Promise<any> =>{
    const users = await prisma.user.findMany({})

    return res.status(200).json({ status: 200, data: users});
  };

  // show user
  export const showUser = async (req:Request, res:Response): Promise<any> =>{
     const userId = req.params.id;
     const user = await prisma.user.findFirst({
      where:{
        id:Number(userId)
      }
     })

     return res.status(200).json({status: 200, data: user})
  };
 
   // delete user
   export const deleteUser = async (req:Request, res:Response): Promise<any> =>{
      const userId = req.params.id;
      await prisma.user.delete({
        where: { id: Number(userId)},
      });

      return res.status(200).json({status:200,  msg: "User deleted successfully"})
   }; 

export default createUser;

