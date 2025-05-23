import { Request, Response } from "express";
import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import { roleSchema } from "../validations/roleValidation.js";


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
  export const fetchUsers = async (_req:Request, res:Response): Promise<any> =>{
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } })

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
      const currentUserId = req.user?.id;
      try {
        const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
        if (!user) {
          return res.status(404).json({ status: 404, msg: "User not found" });
        }
        if (Number(userId) !== currentUserId && req.user.role !== "ADMIN") {
          return res.status(400).json({
            status: 400,
            msg: "You cannot delete your own account while logged in.",
          });
        }
        await prisma.user.delete({ where: { id: Number(userId) }, });
    
        return res.status(200).json({ status: 200, msg: "User deleted successfully" });
      } catch (error: any) {
        console.error("Delete user error:", error.message);
    
        return res.status(500).json({
          status: 500,
          msg: "Failed to delete user. Possibly due to foreign key constraint.",
          error: error.message,
        });
      }
   }; 

   // update role 
   export const updateRole = async (req: Request, res: Response) => {
    const { error } = roleSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 400, message: error.message });
  
    const { userId } = req.params;
    const { role } = req.body;
    if (Number(userId) === req.user.id) {
      return res.status(403).json({ message: "You cannot change your own role." });
    }
  
    try {
      const updated = await prisma.user.update({
        where: { id: Number(userId) },
        data: { role }
      });
      res.status(200).json({ status: 200, message: "User role updated", user: updated });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Error updating role" });
    }
  };

export default createUser;

