import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import prisma from "../DB/db.config.js";
import { JWT_SECRET } from "../Controller/auth.js";

const authMiddleware = async (req: Request, res:Response, next:NextFunction): Promise<any> =>{
   const token = req.headers.authorization?.split(" ")[1];
   if(!token) {
    return res.status(401).json({status: 401, msg: "Unauthorized access!"})
   }
   try {
    const payload = jwt.verify(token!, JWT_SECRET) as any;
    const user = await prisma.user.findUnique({where: {id: payload.userId}})
    if (!user) {
      return res.status(401).json({status: 401, msg: "User not found"})
    }

    req.user = { id: user.id, role: user.role };
    next();
   } catch (error) {
    return  res.status(401).json({status: 401, msg: "Unvalid token!"})
   }
}

export default authMiddleware;